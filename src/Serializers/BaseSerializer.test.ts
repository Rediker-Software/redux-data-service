// tslint:disable: max-classes-per-file no-unused-expression
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { spy, stub } from "sinon";

import faker from "faker";
import { format, parse } from "date-fns";
import { omit } from "lodash";

import { BaseService, DataService, registerService } from "../Services";
import { attr, belongsTo, hasMany, DateField, IModelFactory, Model, NumberField, StringField, TimeField } from "../Model";
import { MockAdapter } from "../Adapters/MockAdapter";

import { RestSerializer } from "./RestSerializer";
import { ArrayField } from "../Model/FieldType";

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
  protected _serializer = new RestSerializer(MockModel);
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
  protected _serializer = new RestSerializer(FakeRelatedModel);
}

describe("BaseSerializer", () => {

  describe("transform", () => {
    let mockModelData;
    let fakeService;
    let fakeRelatedService;
    let fakeRelatedModelData;
    let fakeRelatedModel;
    let fakeModel;
    let mockSerializer;
    let fakeRelatedModelId;
    let age;
    let fullText;
    let startDateString;
    let startTimeString;
    let modelId;

    beforeEach(() => {
      BaseService.registerDispatch(spy());

      mockSerializer = new RestSerializer(MockModel);
      fakeService = new FakeService();
      fakeRelatedService = new FakeRelatedService();

      registerService(fakeService);
      registerService(fakeRelatedService);

      age = faker.random.number();
      fullText = faker.lorem.word();
      startDateString = format(faker.date.recent(), "YYYY-MM-DD");
      startTimeString = format(faker.date.recent(), "hh:mm:ss a");

      fakeRelatedModelId = faker.random.number().toString();
      modelId = faker.random.number().toString();

      fakeRelatedModelData = {
        id: fakeRelatedModelId,
        fullText: faker.lorem.word(),
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
      const transformedModelData = await mockSerializer.transform(fakeModel);

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
      const transformedModelData = await mockSerializer.transform(fakeModel);

      expect(transformedModelData).to.not.have.property("age");
    });

    it("excludes transforming relationships from the model by default", async () => {
      const transformedModelData = await mockSerializer.transform(fakeModel);

      expect(fakeModel).to.have.property("organization");
      expect(transformedModelData).to.not.have.property("organization");
    });

    it("transforms belongsTo relationships on the model when serialize = true", async () => {
      stub(fakeRelatedService.serializer, "transform").callThrough();

      fakeModel.fields.organization.serialize = true;
      const transformedModelData = await mockSerializer.transform(fakeModel);

      expect(transformedModelData).to.have.property("organization").to.deep.equal(omit(fakeRelatedModelData, "id"));
    });

    it("uses the belongsTo relationship's own data service to transform it when serialize = true", async () => {
      const stubRelatedSerializerTransform = stub(fakeRelatedService.serializer, "transform").returns(fakeRelatedModelData);

      fakeModel.fields.organization.serialize = true;
      await mockSerializer.transform(fakeModel);

      expect(stubRelatedSerializerTransform.firstCall.args[0]).to.equal(fakeModel.organization);
    });

    it("transforms hasMany relationships on the model when serialize = true", async () => {
      stub(fakeRelatedService.serializer, "transform").callThrough();

      const anotherFakeRelatedModelId = faker.random.number().toString();
      const anotherFakeRelatedModelData = {
        id: anotherFakeRelatedModelId,
        fullText: faker.lorem.word(),
        fakeModelId: modelId,
      };

      const anotherFakeRelatedModel = new FakeRelatedModel(anotherFakeRelatedModelData);

      fakeModel = fakeModel.applyUpdates(undefined, undefined, {
        fakeItems: [fakeRelatedModel, anotherFakeRelatedModel],
      });

      fakeModel.fields.fakeItems.serialize = true;
      const transformedModelData = await mockSerializer.transform(fakeModel);

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
    let mockSerializer;
    let fakeRelatedModelId;
    let modelId;

    beforeEach(() => {
      modelId = faker.random.number().toString();
      fakeRelatedModelId = faker.random.number().toString();

      fakeRelatedModel = new FakeRelatedModel({
        id: fakeRelatedModelId,
        fullText: faker.lorem.word(),
      });

      mockSerializer = new RestSerializer(MockModel);
      fakeService = new FakeService();
      fakeRelatedService = new FakeRelatedService();

      stub(fakeRelatedService, "getById").returns(Observable.of(fakeRelatedModel));

      registerService(fakeService);
      registerService(fakeRelatedService);
    });

    it("normalizes raw data to create an instance of the model", async () => {
      const age = faker.random.number();
      const fullText = faker.lorem.word();
      const startDateString = format(faker.date.recent(), "YYYY-MM-DD");
      const startTimeString = format(faker.date.recent(), "hh:mm:ss a");

      const rawModelData = {
        id: modelId,
        fullText,
        age,
        startDate: startDateString,
        startTime: startTimeString,
        organizationId: fakeRelatedModelId,
      };

      const model = await mockSerializer.normalize(rawModelData);

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
        const normalizeStub = stub(fakeRelatedService.serializer, "normalize").callThrough();
        await mockSerializer.normalize(rawModelData);

        expect(normalizeStub.firstCall.args[0]).to.equal(relatedModelData);
      });

      it("creates a pushRecord action with related data", async () => {
        await mockSerializer.normalize(rawModelData);

        expect(pushRecordStub.firstCall.args[0]).to.deep.equal(new FakeRelatedModel(relatedModelData));
      });

      it("invokes a pushRecord action with related data", async () => {
        await mockSerializer.normalize(rawModelData);
        expect(invokeSpy.calledOnce).to.be.true;
      });
    });

    describe("side loads nested related models - hasMany", () => {
      let relatedModelsData;
      let rawModelData;
      let invokeSpy;
      let pushRecordStub;

      beforeEach(() => {
        relatedModelsData = [
          {
            id: fakeRelatedModelId,
            fullText: faker.lorem.word(),
          },
          {
            id: faker.random.number.toString(),
            fullText: faker.lorem.word(),
          },
          {
            id: faker.random.number.toString(),
            fullText: faker.lorem.word(),
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
        const normalizeStub = stub(fakeRelatedService.serializer, "normalize").callThrough();
        await mockSerializer.normalize(rawModelData);

        relatedModelsData.forEach((itemData, index) => {
          expect(normalizeStub.getCall(index).args[0]).to.equal(itemData);
        });
      });

      it("creates a pushRecord action for each item", async () => {
        await mockSerializer.normalize(rawModelData);

        relatedModelsData.forEach((itemData, index) => {
          expect(pushRecordStub.getCall(index).args[0]).to.deep.equal(new FakeRelatedModel(itemData));
        });
      });

      it("invokes a pushRecord action for each item", async () => {
        await mockSerializer.normalize(rawModelData);
        expect(invokeSpy.callCount).to.equal(relatedModelsData.length);
      });
    });

  });
});
