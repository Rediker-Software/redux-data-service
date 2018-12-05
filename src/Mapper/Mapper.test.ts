// tslint:disable: max-classes-per-file no-unused-expression
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { spy, stub } from "sinon";

import { date, lorem, random } from "faker";
import { format, parse } from "date-fns";
import { omit } from "lodash";

import { BaseService, DataService, registerService } from "../Services";
import { attr, belongsTo, hasMany, DateField, IModelFactory, Model, NumberField, StringField, TimeField } from "../Model";

import { MockAdapter } from "../Adapters/MockAdapter";
import { ArrayField } from "../Model/FieldType";
import { Mapper } from "./Mapper";

import { IRawQueryResponse, IQueryResponse } from "../Query";
import { createMockFakeModel, createMockFakeModels, FakeModel, IFakeModelData } from "../Model/Model.mock";

declare var intern;
const { describe, it, beforeEach, afterEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

class MockModel extends Model<any> {
  public readonly serviceName = "fakeModel";

  @attr(StringField)
  public fullText: string;

  @attr(DateField)
  public startDate: Date;

  @attr(TimeField)
  public startTime: Date;

  @attr(NumberField)
  public age: number;

  @attr(StringField)
  public organizationId: string;

  @belongsTo({ serviceName: "fakeRelatedModel" })
  public organization: any;

  @attr(ArrayField)
  public fakeItemIds: string[];

  @hasMany({ serviceName: "fakeRelatedModel" })
  public fakeItems: any[];
}

class FakeService extends DataService<any> {
  public readonly name = "fakeModel";
  public readonly ModelClass: IModelFactory<any> = MockModel;
  protected _adapter = new MockAdapter();
  protected _mapper = new Mapper(MockModel);
}

class FakeRelatedModel extends Model<any> {
  public readonly serviceName = "fakeRelatedModel";

  @attr(StringField)
  public fullText: string;

  @attr(StringField)
  public fakeModelId: string;
}

class FakeRelatedService extends DataService<any> {
  public readonly name = "fakeRelatedModel";
  public readonly ModelClass: IModelFactory<any> = FakeRelatedModel;
  protected _adapter = new MockAdapter();
  protected _mapper = new Mapper(FakeRelatedModel);
}

describe("Mapper", () => {

  describe("transform", () => {
    let mockModelData;
    let fakeService;
    let fakeRelatedService;
    let fakeRelatedModelData;
    let fakeRelatedModel;
    let fakeModel;
    let fakeRelatedModelId;
    let age;
    let fullText;
    let startDateString;
    let startTimeString;
    let modelId;
    let mapper;

    beforeEach(() => {
      BaseService.registerDispatch(spy());

      mapper = new Mapper(MockModel);
      fakeService = new FakeService();
      fakeRelatedService = new FakeRelatedService();

      registerService(fakeService);
      registerService(fakeRelatedService);

      age = random.number();
      fullText = lorem.word();
      startDateString = format(date.recent(), "YYYY-MM-DD");
      startTimeString = format(date.recent(), "hh:mm:ss a");

      fakeRelatedModelId = random.number().toString();
      modelId = random.number().toString();

      fakeRelatedModelData = {
        id: fakeRelatedModelId,
        fullText: lorem.word(),
        fakeModelId: modelId,
      };

      fakeRelatedModel = new FakeRelatedModel(fakeRelatedModelData);

      stub(fakeRelatedService, "getById").returns(Observable.of(fakeRelatedModel));

      mockModelData = {
        id: modelId,
        fullText,
        age,
        startDate: parse(startDateString, "YYYY-MM-DD", new Date()),
        startTime: parse(startTimeString, "hh:mm:ss a", new Date()),
        organizationId: fakeRelatedModelId,
      };
      fakeModel = new MockModel(mockModelData);
    });

    it("transforms the model into a plain javascript object based on each field's FieldType", async () => {
      const transformedModelData = await mapper.transform(fakeModel);

      expect(transformedModelData).to.deep.equal({
        age,
        fullText,
        startDate: startDateString,
        startTime: startTimeString,
        organizationId: fakeRelatedModelId,
        fakeItemIds: [],
      });
    });

    it("excludes transforming fields from the model using the model's fields property", async () => {
      fakeModel.fields.age.serialize = false;
      const transformedModelData = await mapper.transform(fakeModel);

      expect(transformedModelData).to.not.have.property("age");
    });

    it("excludes transforming relationships from the model by default", async () => {
      const transformedModelData = await mapper.transform(fakeModel);

      expect(fakeModel).to.have.property("organization");
      expect(transformedModelData).to.not.have.property("organization");
    });

    it("transforms belongsTo relationships on the model when serialize = true", async () => {

      fakeModel.fields.organization.serialize = true;
      const transformedModelData = await mapper.transform(fakeModel);

      expect(transformedModelData).to.have.property("organization").to.deep.equal(omit(fakeRelatedModelData, "id"));
    });

    it("uses the belongsTo relationship's own data service to transform it when serialize = true", async () => {
      const stubRelatedMapperTransform = stub(fakeRelatedService.mapper, "transform").returns(fakeRelatedModelData);

      fakeModel.fields.organization.serialize = true;
      await mapper.transform(fakeModel);

      expect(stubRelatedMapperTransform.firstCall.args[0]).to.equal(fakeModel.organization);
    });

    it("transforms hasMany relationships on the model when serialize = true", async () => {
      
      const anotherFakeRelatedModelId = random.number().toString();
      const anotherFakeRelatedModelData = {
        id: anotherFakeRelatedModelId,
        fullText: lorem.word(),
        fakeModelId: modelId,
      };

      const anotherFakeRelatedModel = new FakeRelatedModel(anotherFakeRelatedModelData);

      fakeModel = fakeModel.applyUpdates(undefined, undefined, {
        fakeItems: [fakeRelatedModel, anotherFakeRelatedModel],
      });

      fakeModel.fields.fakeItems.serialize = true;
      const transformedModelData = await mapper.transform(fakeModel);

      expect(transformedModelData).to.have.property("fakeItems").to.deep.equal([
        omit(fakeRelatedModelData, "id"),
        omit(anotherFakeRelatedModelData, "id"),
      ]);
    });
  });

  describe("normalize", () => {
    let fakeService;
    let fakeRelatedService;
    let fakeRelatedModel;
    let mapper;
    let fakeRelatedModelId;
    let modelId;

    beforeEach(() => {
      modelId = random.number().toString();
      fakeRelatedModelId = random.number().toString();

      fakeRelatedModel = new FakeRelatedModel({
        id: fakeRelatedModelId,
        fullText: lorem.word(),
      });

      fakeService = new FakeService();
      fakeRelatedService = new FakeRelatedService();
      mapper = new Mapper(MockModel);

      stub(fakeRelatedService, "getById").returns(Observable.of(fakeRelatedModel));

      registerService(fakeService);
      registerService(fakeRelatedService);
    });

    it("normalizes raw data to create an instance of the model", async () => {
      const age = random.number();
      const fullText = lorem.word();
      const startDateString = format(date.recent(), "YYYY-MM-DD");
      const startTimeString = format(date.recent(), "hh:mm:ss a");

      const rawModelData = {
        id: modelId,
        fullText,
        age,
        startDate: startDateString,
        startTime: startTimeString,
        organizationId: fakeRelatedModelId,
      };

      const model = await mapper.normalize(rawModelData);

      expect(model).to.deep.contain({
        age,
        fullText,
        startDate: parse(startDateString, "YYYY-MM-DD", new Date()),
        startTime: parse(startTimeString, "hh:mm:ss a", new Date()),
        organizationId: fakeRelatedModelId,
        organization: fakeRelatedModel,
      });
    });

    describe("side loads nested related models - belongsTo", () => {
      let relatedModelData;
      let rawModelData;
      let invokeSpy;
      let pushRecordStub;
      
      beforeEach(() => {
        mapper = new Mapper(MockModel);

        relatedModelData = {
          id: fakeRelatedModelId,
          fullText: fakeRelatedModel.fullText,
          fakeModelId: modelId,
        };

        rawModelData = {
          id: modelId,
          organizationId: fakeRelatedModelId,
          organization: relatedModelData,
        };

        invokeSpy = spy();
        pushRecordStub = stub(fakeRelatedService.actions, "pushRecord").returns({ invoke: invokeSpy });
      });

      afterEach(() => {
        pushRecordStub.restore();
      });

      it("normalizes nested related data", async () => {
        const normalizeStub = stub(fakeRelatedService.mapper, "normalize").callThrough();
        await mapper.normalize(rawModelData);
        expect(normalizeStub.firstCall.args[0]).to.equal(relatedModelData);
      });

      it("creates a pushRecord action with related data", async () => {
        await mapper.normalize(rawModelData);
        expect(pushRecordStub.firstCall.args[0]).to.deep.equal(new FakeRelatedModel(relatedModelData));
      });

      it("invokes a pushRecord action with related data", async () => {
        await mapper.normalize(rawModelData);
        expect(invokeSpy.calledOnce).to.be.true;
      });
    });

    describe("side loads nested related models - hasMany", () => {
      let relatedModelsData;
      let rawModelData;
      let invokeSpy;
      let pushRecordStub;

      beforeEach(() => {
        mapper = new Mapper(MockModel);
        relatedModelsData = [
          {
            id: fakeRelatedModelId,
            fullText: lorem.word(),
          },
          {
            id: random.number.toString(),
            fullText: lorem.word(),
          },
          {
            id: random.number.toString(),
            fullText: lorem.word(),
          },
        ];

        rawModelData = {
          id: modelId,
          fakeItemIds: relatedModelsData.map(item => item.id),
          fakeItems: relatedModelsData,
        };

        invokeSpy = spy();
        pushRecordStub = stub(fakeRelatedService.actions, "pushRecord").returns({ invoke: invokeSpy });
      });

      afterEach(() => {
        pushRecordStub.restore();
      });

      it("normalizes nested related data for each item", async () => {
        const normalizeStub = stub(fakeRelatedService.mapper, "normalize").callThrough();
        await mapper.normalize(rawModelData);

        relatedModelsData.forEach((itemData, index) => {
          expect(normalizeStub.getCall(index).args[0]).to.equal(itemData);
        });
      });

      it("creates a pushRecord action for each item", async () => {
        await mapper.normalize(rawModelData);

        relatedModelsData.forEach((itemData, index) => {
          expect(pushRecordStub.getCall(index).args[0]).to.deep.equal(new FakeRelatedModel(itemData));
        });
      });

      it("invokes a pushRecord action for each item", async () => {
        await mapper.normalize(rawModelData);
        expect(invokeSpy.callCount).to.equal(relatedModelsData.length);
      });
    });

  });

  describe("normalizeQueryResponse", () => {
    let fakeModel;
    let fakeService;
    let fakePushAll;
    let mapper;
    let fakeRawQueryParams;

    beforeEach(() => {

    class RawQueryParams implements IRawQueryResponse<MockModel> {
      public currentPage: number;
      public totalPages: number;
      public pageSize: number;
      public totalCount: number;
      public nextPage: number;
      public previousPage: number;
      public hasPrevious: boolean;
      public hasNext: number;
      public items: MockModel[];
    }   

    fakeRawQueryParams  = new RawQueryParams();
    fakeModel = createMockFakeModels(1);
    fakeRawQueryParams.items  = [fakeModel];

    mapper = new Mapper(MockModel);
    fakeService = new FakeService();
    registerService(fakeService);

    fakePushAll = stub(fakeService.actions, "pushAll");
    stub(mapper, "normalize").returns(fakeModel);
    
  });

    it("normalizeQueryResponse calls pushAll", () => {
        mapper.normalizeQueryResponse(fakeRawQueryParams);
        expect(fakePushAll.firstCall.args[0]).to.deep.equal({ items: fakeModel });
  });

  });

});
