// tslint:disable: max-classes-per-file no-unused-expression
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { spy, stub } from "sinon";

import faker from "faker";
import { parse, format } from "date-fns";

import { DataService, registerService } from "../Services";
import { attr, belongsTo, DateField, Model, NumberField, StringField, TimeField, IModelFactory } from "../Model";
import { MockAdapter } from "../Adapters";

import { RestSerializer } from "./RestSerializer";

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
    let fakeRelatedModel;
    let stubRelatedSerializerTransform;
    let fakeModel;
    let mockSerializer;
    let fakeRelatedModelId;
    let age;
    let fullText;
    let startDateString;
    let startTimeString;

    beforeEach(() => {
      age = faker.random.number();
      fullText = faker.lorem.word();
      startDateString = format(faker.date.recent(), "YYYY-MM-DD");
      startTimeString = format(faker.date.recent(), "hh:mm:ss a");

      fakeRelatedModelId = faker.random.number().toString();
      const modelId = faker.random.number().toString();

      fakeRelatedModel = new FakeRelatedModel({
        id: fakeRelatedModelId,
        fullText: faker.lorem.word(),
      });

      mockModelData = {
        id: modelId,
        fullText,
        age,
        startDate: parse(startDateString, "YYYY-MM-DD", new Date()),
        startTime: parse(startTimeString, "hh:mm:ss a", new Date()),
        organizationId: fakeRelatedModelId,
      };
      fakeModel = new MockModel(mockModelData);

      mockSerializer = new RestSerializer(MockModel);
      fakeService = new FakeService();
      fakeRelatedService = new FakeRelatedService();

      stub(fakeRelatedService, "getById").returns(Observable.of(fakeRelatedModel));
      stubRelatedSerializerTransform = stub(fakeRelatedService.serializer, "transform").callThrough();

      registerService(fakeService);
      registerService(fakeRelatedService);
    });

    it("transforms the model into a plain javascript object based on each field's FieldType", () => {
      const transformedModelData = mockSerializer.transform(fakeModel);

      expect(transformedModelData).to.deep.equal({
        age,
        fullText,
        startDate: startDateString,
        startTime: startTimeString,
        organizationId: fakeRelatedModelId,
      });
    });

    it("excludes transforming fields from the model using the model's fields property", () => {
      fakeModel.fields.age.serialize = false;
      const transformedModelData = mockSerializer.transform(fakeModel);

      expect(transformedModelData).to.not.have.property("age");
    });

    it("excludes transforming relationships from the model by default", () => {
      const transformedModelData = mockSerializer.transform(fakeModel);

      expect(fakeModel).to.have.property("organization");
      expect(transformedModelData).to.not.have.property("organization");
    });

    it("transforms relationships on the model when serialize = true", () => {
      fakeModel.fields.organization.serialize = true;
      const transformedModelData = mockSerializer.transform(fakeModel);

      expect(fakeModel).to.have.property("organization");
      expect(transformedModelData).to.have.property("organization");
    });

    it("uses the relationship's own data service to transform it when serialize = true", () => {
      fakeModel.fields.organization.serialize = true;
      mockSerializer.transform(fakeModel);

      expect(stubRelatedSerializerTransform.firstCall.args[0]).to.equal(fakeRelatedModel);
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

    it("normalizes raw data to create an instance of the model", () => {
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

      const model = mockSerializer.normalize(rawModelData);

      expect(model).to.deep.contain({
        age,
        fullText,
        startDate: parse(startDateString, "YYYY-MM-DD", new Date()),
        startTime: parse(startTimeString, "hh:mm:ss a", new Date()),
        organizationId: fakeRelatedModelId,
        organization: fakeRelatedModel,
      });
    });

    describe("side loads nested related models", () => {
      let relatedModelData;
      let rawModelData;
      let invokeSpy;
      let pushRecordStub;

      beforeEach(() => {
        relatedModelData = {
          id: fakeRelatedModelId,
          fullText: fakeRelatedModel.fullText,
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

      it("normalizes nested related data", () => {
        const normalizeStub = stub(fakeRelatedService.serializer, "normalize");
        mockSerializer.normalize(rawModelData);

        expect(normalizeStub.firstCall.args[0]).to.equal(relatedModelData);
      });

      it("creates a pushRecord action with related data", () => {
        mockSerializer.normalize(rawModelData);

        expect(pushRecordStub.firstCall.args[0]).to.deep.equal(fakeRelatedModel);
      });

      it("invokes a pushRecord action with related data", () => {
        mockSerializer.normalize(rawModelData);
        expect(invokeSpy.calledOnce).to.be.true;
      });
    });

  });
});
