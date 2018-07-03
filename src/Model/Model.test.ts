// tslint:disable: max-classes-per-file no-unused-expression
import "rxjs/add/operator/publishReplay";

import { spy, stub } from "sinon";
import { of as of$ } from "rxjs/observable/of";
import { Subject } from "rxjs/Subject";
import { lorem, random } from "faker";

import { initializeTestServices, seedService } from "../TestUtils";
import { fakeModelModule } from "../TestUtils/FakeModelModule";

import { BaseService, DataService, registerService } from "../Services";
import { initializeValidateJS } from "../Initializers";

import { Model } from "./Model";
import { IModelData } from "./IModel";
import { attr, belongsTo, hasMany, required } from "./Decorators";

import { ArrayField, DateField, DateTimeField, NumberField, StringField, TimeField } from "./FieldType";
import { IFakeModelData } from "./Model.mock";

declare var intern;
const { describe, it, beforeEach, before } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("Model", () => {
  before(() => {
    initializeValidateJS();
  });

  describe("Saving the model", () => {
    let service;
    let modelId;
    let relatedModelId;
    let favoriteColor;
    let name;

    beforeEach(() => {
      modelId = random.number().toString();
      relatedModelId = random.number().toString();
      favoriteColor = lorem.word();
      name = lorem.word();

      BaseService.registerDispatch(spy());

      interface IRelatedModelData extends IModelData {
        favoriteColor: string;
      }

      class RelatedModel extends Model<IRelatedModelData> {
        public readonly serviceName = "relatedModel";

        @required()
        @attr(StringField)
        public favoriteColor: string;
      }

      class RelatedModelService extends DataService<IModelData> {
        public readonly name = "relatedModel";
        public readonly ModelClass = RelatedModel;
      }

      interface IExampleData extends IModelData {
        name: string;
        relatedModelId: string;
      }

      class Example extends Model<IExampleData> {
        public serviceName = "example";

        @required()
        @attr(StringField)
        public name: string;

        @attr(StringField)
        public relatedModelId: string;

        @belongsTo()
        public relatedModel: RelatedModel;
      }

      class ExampleService extends DataService<IModelData> {
        public readonly name = "example";
        public readonly ModelClass = Example;
      }

      const relatedModel = new RelatedModel(
        {
          id: relatedModelId,
        },
        {
          original: {
            id: relatedModelId,
            favoriteColor,
          },
        },
      );
      const relatedModelService = new RelatedModelService();

      stub(relatedModelService, "getById").returns(of$(relatedModel));
      registerService(relatedModelService);

      service = new ExampleService();
      registerService(service);
    });

    describe("Model#save", () => {

      it("rejects the promise if there are validation errors", () => {
        const model = service.createNew();
        return model.save()
          .then(() => {
            throw new Error("Promise should throw when there are validation errors");
          })
          .catch((errors) => {
            expect(errors).to.have.property("name").deep.equal(["is required"]);
          });
      });

      it("calls saveRelatedModels to save related models", () => {
        const model = service
          .createNew()
          .applyUpdates({ name: lorem.word() });

        const stubSaveRelatedModels = stub(model, "saveRelatedModels");
        stub(model, "saveModel");

        return model.save().finally(() => {
          expect(stubSaveRelatedModels.callCount).to.equal(1);
        });
      });

      it("calls saveModel to save the model's own data", () => {
        const model = service
          .createNew()
          .applyUpdates({ name: lorem.word() });

        const stubSaveModel = stub(model, "saveModel");
        stub(model, "saveRelatedModels");

        return model.save().finally(() => {
          expect(stubSaveModel.callCount).to.equal(1);
        });
      });

      it("returns the same instance of the model when there are no errors and no changes", () => {
        const model = service.createNew({ name: lorem.word() });

        return model
          .save()
          .then((result) => {
            expect(result).to.equal(model);
          })
          .catch(() => {
            throw new Error("Expected promise to resolve when there are no errors or changes");
          });
      });

    });

    describe("Model.saveRelatedModels", () => {

      it("saves related models with pending changes", () => {
        const model = service.createNew({ relatedModelId });
        const stubRelatedSaveModel = stub(model.relatedModel, "saveModel").resolves();

        return model.saveRelatedModels().finally(() => {
          expect(stubRelatedSaveModel.callCount).to.equal(1);
        });
      });

      it("assigns new related models onto the model after it is saved", () => {
        const fakeModel = spy();
        const model = service.createNew({ relatedModelId });
        const stubSetRelated = stub(model, "setRelated");
        stub(model.relatedModel, "saveModel").resolves(fakeModel);

        return model.saveRelatedModels().finally(() => {
          expect(stubSetRelated.firstCall.args).to.deep.equal([
            "relatedModel",
            fakeModel,
          ]);
        });
      });

    });

    describe("Model#saveModel", () => {

      describe("saving a new record", () => {
        let expectedName;
        let invokeSpy;
        let createRecordStub;
        let model;

        it("calls createRecord action on the service when calling save() on a new record", () => {
          expectedName = "hello, world!";
          invokeSpy = spy();
          createRecordStub = stub(service.actions, "createRecord").returns({
            invoke: invokeSpy,
          });

          model = service
            .createNew()
            .applyUpdates({ name: expectedName });

          model.saveModel();

          expect(createRecordStub.firstCall.args[0]).to.deep.equal({ id: model.id });
        });

        it("dispatches createRecord action to the service when calling save() on a new record", () => {
          expectedName = "hello, world!";
          invokeSpy = spy();
          createRecordStub = stub(service.actions, "createRecord").returns({
            invoke: invokeSpy,
          });

          model = service
            .createNew()
            .applyUpdates({ name: expectedName });

          model.saveModel();

          expect(invokeSpy.calledOnce).to.equal(true);
        });
      });

      describe("saving an existing record", () => {
        let updateRecordStub;
        let model;

        beforeEach(() => {
          updateRecordStub = stub(service.actions, "updateRecord");
          model = new service.ModelClass(service, { id: random.number().toString(), name: lorem.word() });
        });

        it("calls updateRecord action on the service when calling save() on an existing record", () => {
          const expectedName = "hello, world!";

          model = model.applyUpdates({ name: expectedName });
          model.saveModel();

          expect(updateRecordStub.firstCall.args[0]).to.deep.equal({ id: model.id });
        });

        it("dispatches updateRecord action to the service when calling save() on an existing record", () => {
          const invokeSpy = spy();

          updateRecordStub.returns({
            invoke: invokeSpy,
          });

          model
            .applyUpdates({ name: lorem.word() })
            .saveModel();

          expect(invokeSpy.calledOnce).to.be.true;
        });
      });
    });
  });

  describe("Model#validate & Model#validateField", () => {
    let service;
    let modelId;
    let relatedModelId;
    let favoriteColor;
    let name;

    beforeEach(() => {
      modelId = random.number().toString();
      relatedModelId = random.number().toString();
      favoriteColor = lorem.word();
      name = lorem.word();

      BaseService.registerDispatch(spy());

      interface IRelatedModelData extends IModelData {
        favoriteColor: string;
      }

      class RelatedModel extends Model<IRelatedModelData> {
        public readonly serviceName = "relatedModel";

        @required()
        @attr(StringField)
        public favoriteColor: string;
      }

      class RelatedModelService extends DataService<IModelData> {
        public readonly name = "relatedModel";
        public readonly ModelClass = RelatedModel;
      }

      interface IExampleData extends IModelData {
        name: string;
        relatedModelId: string;
      }

      class Example extends Model<IExampleData> {
        public serviceName = "example";

        @required()
        @attr(StringField)
        public name: string;

        @attr(StringField)
        public relatedModelId: string;

        @belongsTo()
        public relatedModel: RelatedModel;
      }

      class ExampleService extends DataService<IModelData> {
        public readonly name = "example";
        public readonly ModelClass = Example;
      }

      const relatedModel = new RelatedModel(
        {
          id: relatedModelId,
        },
        {
          original: {
            id: relatedModelId,
            favoriteColor,
          },
        },
      );
      const relatedModelService = new RelatedModelService();

      stub(relatedModelService, "getById").returns(of$(relatedModel));
      registerService(relatedModelService);

      service = new ExampleService();
      registerService(service);
    });

    it("validates the model's data using the model's validation rules", () => {
      const model = new service.ModelClass({ id: modelId, name: "" });
      expect(model.validate()).to.deep.equal({
        name: ["is required"],
      });
    });

    it("passes validation result to the SET_META_FIELD action creator on the DataService to update the model's error meta field", () => {
      const model = new service.ModelClass({ id: modelId, name: "" });
      const setMetaFieldStub = stub(service.actions, "setMetaField").returns({
        invoke: spy(),
      });
      model.validate();
      expect(setMetaFieldStub.firstCall.args[0]).to.deep.equal({
        id: modelId,
        fieldName: "errors",
        value: {
          name: ["is required"],
        },
      });
    });

    it("dispatches SET_META_FIELD action after it is created to update the model's error meta field", () => {
      const model = new service.ModelClass({ id: modelId, name: "" });
      const invokeSpy = spy();
      stub(service.actions, "setMetaField").returns({
        invoke: invokeSpy,
      });
      model.validate();
      expect(invokeSpy.calledOnce).to.equal(true);
    });

    it("optionally includes related models when validating the model", () => {
      const model = new service.ModelClass({ id: modelId, name: "", relatedModelId });
      model.getRelated("relatedModel");
      expect(model.validate(true)).to.deep.equal({
        "relatedModel.favoriteColor": ["is required"],
        name: ["is required"],
      });
    });

    it("does not validate related models which have not been loaded previously", () => {
      const model = new service.ModelClass({ id: modelId, name, relatedModelId });
      expect(model.validate(true)).to.deep.equal({});
    });

    it("validates a single field", () => {
      const model = new service.ModelClass({ id: modelId, name: "" });
      expect(model.validateField("name")).to.deep.equal([
        "is required",
      ]);
    });

    it("validates a single nested field", () => {
      const model = new service.ModelClass({ id: modelId, name: "", relatedModelId });
      expect(model.validateField("relatedModel.favoriteColor")).to.deep.equal([
        "is required",
      ]);
    });

    it("updates existing validation results when validating a single field", () => {
      let model = new service.ModelClass({ id: modelId, name: "" });

      const errors = model.validate();
      model = model.applyUpdates({ name }, { errors });

      expect(model.validateField("name")).to.be.undefined;
    });
  });

  describe("Model#reset", () => {
    let service;
    let model;
    let originalData;
    let modelId;
    let name;

    beforeEach(() => {
      modelId = random.number().toString();
      name = lorem.word();

      BaseService.registerDispatch(spy());

      interface IExampleData extends IModelData {
        name: string;
      }

      class Example extends Model<IExampleData> {
        public serviceName = "example";

        @attr(StringField)
        public name: string;
      }

      class ExampleService extends DataService<IModelData> {
        public readonly name = "example";
        public readonly ModelClass = Example;
      }

      service = new ExampleService();
      registerService(service);

      originalData = { id: modelId, name };
      model = new Example(originalData);
    });

    it("does not attempt to reset if the Model has not changed", () => {
      const pushRecordStub = stub(service.actions, "pushRecord");
      model.reset();
      expect(pushRecordStub.callCount).to.equal(0);
    });

    it("passes the model's original data to the DataService's pushRecord action creator to reset the Model's data", () => {
      const pushRecordStub = stub(service.actions, "pushRecord").returns({
        invoke: spy(),
      });
      model
        .applyUpdates({
          name: lorem.word(),
        })
        .reset();
      expect(pushRecordStub.firstCall.args[0]).to.deep.equal(model);
    });

    it("dispatches the pushRecord action to reset the Model's data", () => {
      const invokeSpy = spy();
      stub(service.actions, "pushRecord").returns({
        invoke: invokeSpy,
      });
      model
        .applyUpdates({
          name: lorem.word(),
        })
        .reset();
      expect(invokeSpy.calledOnce).to.equal(true);
    });

    it("unloads the model if it is new", () => {
      const newModel = service.createNew();
      const unloadStub = stub(newModel, "unload");

      newModel.reset();

      expect(unloadStub.callCount).to.equal(1);
    });
  });

  describe("Model#forceReload", () => {
    let service;
    let modelId;

    beforeEach(() => {
      modelId = random.number().toString();

      BaseService.registerDispatch(spy());

      interface IExampleData extends IModelData {
        name: string;
      }

      class Example extends Model<IExampleData> {
        public serviceName = "example";

        @attr(StringField)
        public name: string;
      }

      class ExampleService extends DataService<IModelData> {
        public readonly name = "example";
        public readonly ModelClass = Example;
      }

      service = new ExampleService();
      registerService(service);
    });

    it("does not attempt to forceReload if the model is new", () => {
      const fetchRecordStub = stub(service.actions, "fetchRecord");
      const model = service.createNew();
      model.forceReload();
      expect(fetchRecordStub.callCount).to.equal(0);
    });

    it("passes the model's id and forceReload: true to the fetchRecord action creator to force the model to reload", () => {
      const fetchRecordStub = stub(service.actions, "fetchRecord").returns({
        invoke: spy(),
      });
      const model = new service.ModelClass({ id: modelId });
      model.forceReload();
      expect(fetchRecordStub.firstCall.args).to.deep.equal([
        { id: modelId },
        { forceReload: true },
      ]);
    });

    it("dispatches fetchRecord action to force the model to reload", () => {
      const invokeSpy = spy();
      stub(service.actions, "fetchRecord").returns({
        invoke: invokeSpy,
      });
      const model = new service.ModelClass({ id: modelId });
      model.forceReload();
      expect(invokeSpy.calledOnce).to.equal(true);
    });
  });

  describe("Model#applyUpdates", () => {
    describe("creates a new instance of the Model", () => {
      let service;
      let modelId;
      let name;

      beforeEach(() => {
        modelId = random.number().toString();
        name = lorem.word();

        BaseService.registerDispatch(spy());

        interface IExampleData extends IModelData {
          name: string;
        }

        class Example extends Model<IExampleData> {
          public serviceName = "example";

          @attr(StringField)
          public name: string;
        }

        class ExampleService extends DataService<IModelData> {
          public readonly name = "example";
          public readonly ModelClass = Example;
        }

        service = new ExampleService();
        registerService(service);
      });

      it("creates a new instance of the Model", () => {
        const firstModel = service.createNew();
        const secondModel = firstModel.applyUpdates();
        expect(firstModel).to.not.equal(secondModel);
      });

      it("creates a new instance of the Model using its own data", () => {
        const originalData = { id: modelId, name };
        const firstModel = new service.ModelClass(service, originalData);
        const secondModel = firstModel.applyUpdates();
        expect(firstModel).to.deep.equal(secondModel);
      });

      it("creates a new instance of the Model with new meta", () => {
        const firstModel = service.createNew();
        const secondModel = firstModel.applyUpdates(null, { isLoading: true });
        expect(secondModel).to.have.property("isLoading").to.be.true;
      });

      it("creates a new instance of the Model with new meta without modifying the original", () => {
        const firstModel = service.createNew();
        const secondModel = firstModel.applyUpdates(null, { isLoading: true });
        expect(firstModel).to.have.property("isLoading").to.be.false;
      });

      it("creates a new instance of the Model with new data", () => {
        const expectedValue = lorem.word();
        const firstModel = service.createNew();
        const secondModel = firstModel.applyUpdates({ name: expectedValue });
        expect(secondModel).to.have.property("name").to.equal(expectedValue);
      });

      it("creates a new instance of the Model with new data without modifying the original", () => {
        const firstModel = service.createNew();
        const secondModel = firstModel.applyUpdates({ name: lorem.word() });
        expect(firstModel).to.have.property("name").to.equal("");
      });

      it("throws a ReferenceError if attempting to set on an invalid field name", () => {
        const model = service.createNew();
        expect(() => model.applyUpdates({ asdf: random.number() })).to.throw(ReferenceError, "not found");
      });

      it("throws a TypeError if attempting to set an invalid type for a field", () => {
        const model = service.createNew();
        expect(() => model.applyUpdates({ name: random.number() })).to.throw(TypeError, "invalid");
      });
    });

    describe("creates new instance by merging own data with new data", () => {
      let service;
      let originalData;
      let firstModel;
      let modelId;
      let name;
      let age;

      beforeEach(() => {
        modelId = random.number().toString();
        name = lorem.word();
        age = random.number();

        interface IExampleData extends IModelData {
          name: string;
        }

        class Example extends Model<IExampleData> {
          public serviceName = "example";

          @attr(StringField)
          public name: string;

          @attr(NumberField)
          public age: number;

          public getMeta() {
            return this.meta;
          }

          public getModelData() {
            return this.modelData;
          }
        }

        class ExampleService extends DataService<IModelData> {
          public readonly name = "example";
          public readonly ModelClass = Example;
        }

        service = new ExampleService();
        registerService(service);

        originalData = { id: modelId, name, age };
        firstModel = new service.ModelClass(originalData);
      });

      it("creates a new instance of the Model with new data and sets the previous data as the meta.original", () => {
        const secondModel = firstModel.applyUpdates({ name: lorem.word() });
        expect(secondModel.getMeta()).to.have.property("original").to.deep.equal(originalData);
      });

      it("creates a new instance of the Model with new data without modifying the meta.original on the first model", () => {
        const secondModel = firstModel.applyUpdates({ name: lorem.word() });
        expect(firstModel.getMeta()).to.have.property("original").to.be.null;
      });

      it("creates a new instance of the Model with new data and doesn't change meta.original if it was already set", () => {
        const secondModel = firstModel.applyUpdates({ name: lorem.word() });
        const thirdModel = secondModel.applyUpdates({ name: lorem.word() });
        expect(thirdModel.getMeta()).to.have.property("original").to.deep.equal(originalData);
      });

      it("creates a new instance of the Model with new meta without modifying the meta on the first model", () => {
        const secondModel = firstModel.applyUpdates(null, { isLoading: true });
        expect(firstModel.getMeta()).to.have.property("isLoading").to.be.false;
      });

      it("creates a new instance of the Model with new meta", () => {
        const secondModel = firstModel.applyUpdates(null, { isLoading: true });
        expect(secondModel.getMeta()).to.have.property("isLoading").to.be.true;
      });

      it("creates a new instance of the Model with new meta and previous data was copied over", () => {
        const secondModel = firstModel.applyUpdates(null, { isLoading: true });
        expect(secondModel.getModelData()).to.deep.equal(originalData);
      });
    });
  });

  describe("Model#getField", () => {
    let service;
    let model;
    let modelId;
    let name;

    beforeEach(() => {
      modelId = random.number().toString();
      name = lorem.word();

      BaseService.registerDispatch(spy());

      interface IExampleData extends IModelData {
        name: string;
      }

      class Example extends Model<IExampleData> {
        public serviceName = "example";

        @attr(StringField)
        public name: string;
      }

      class ExampleService extends DataService<IModelData> {
        public readonly name = "example";
        public readonly ModelClass = Example;
      }

      service = new ExampleService();
      registerService(service);

      model = new Example({ id: modelId, name });
    });

    it("returns the default value if the fieldName is not in the modelData", () => {
      expect(model.getField("fakeField", "hello")).to.equal("hello");
    });

    it("returns the value in modelData for the given fieldName", () => {
      expect(model.getField("name")).to.equal(name);
    });
  });

  describe("Model#setField", () => {
    let service;
    let ExampleModel;
    let modelId;
    let name;

    beforeEach(() => {
      modelId = random.number().toString();
      name = lorem.word();

      BaseService.registerDispatch(spy());

      interface IExampleData extends IModelData {
        name: string;
      }

      class Example extends Model<IExampleData> {
        public serviceName = "example";

        @attr(StringField)
        public name: string;
      }

      class ExampleService extends DataService<IModelData> {
        public readonly name = "example";
        public readonly ModelClass = Example;
      }

      service = new ExampleService();
      registerService(service);

      ExampleModel = Example;
    });

    it("passes the model's id and the given data to the setField action creator", () => {
      const setFieldStub = stub(service.actions, "setField").returns({
        invoke: spy(),
      });
      const model = new ExampleModel({ id: modelId, name });
      const expectedValue = lorem.word();
      model.setField("name", expectedValue);
      expect(setFieldStub.firstCall.args[0]).to.deep.equal({
        id: modelId,
        fieldName: "name",
        value: expectedValue,
      });
    });

    it("dispatches fetchRecord action to force the model to reload", () => {
      const invokeSpy = spy();
      stub(service.actions, "setField").returns({
        invoke: invokeSpy,
      });
      const model = new ExampleModel({ id: modelId, name });
      model.setField("name", lorem.word());
      expect(invokeSpy.calledOnce).to.be.true;
    });

    it("does not mutate the current instance of the Model", () => {
      stub(service.actions, "setField").returns({
        invoke: spy(),
      });
      const model = new ExampleModel({ id: modelId, name });
      model.setField("name", lorem.word());
      expect(model.name).to.equal(name);
    });

    it("throws a ReferenceError if attempting to set on an invalid field name", () => {
      const model = new ExampleModel({ id: modelId, name });
      expect(() => model.setField("asdf", random.number())).to.throw(ReferenceError, "not found");
    });

    it("throws a TypeError if attempting to set an invalid type for a field", () => {
      const model = new ExampleModel({ id: modelId, name });
      expect(() => model.setField("name", random.number())).to.throw(TypeError, "invalid");
    });
  });

  describe("Model - relationship magic getter and setter", () => {
    let exampleService;
    let studentService;
    let organizationService;
    let ExampleModelClass;
    let id;
    let organizationId;

    beforeEach(() => {
      id = random.number().toString();
      organizationId = random.number().toString();

      BaseService.registerDispatch(spy());

      interface IOrganization extends IModelData {
        id: string;
      }

      class Organization extends Model<IOrganization> {
        public serviceName = "organization";
      }

      class OrganizationService extends DataService<IOrganization> {
        public readonly name = "organization";
        public readonly ModelClass = Organization;
      }

      interface IStudent extends IModelData {
        id: string;
      }

      class Student extends Model<IStudent> {
        public serviceName = "student";
      }

      class StudentService extends DataService<IStudent> {
        public readonly name = "student";
        public readonly ModelClass = Student;
      }

      interface IExampleData extends IModelData {
        organizationId: string;
        studentIds: string[];
      }

      class Example extends Model<IExampleData> {
        public serviceName = "example";

        @attr(StringField)
        public organizationId: string;

        @attr(ArrayField)
        public studentIds: string[];

        @belongsTo()
        public organization: IOrganization;

        @hasMany()
        public students: IStudent[];
      }

      ExampleModelClass = Example;

      class ExampleService extends DataService<IModelData> {
        public readonly name = "example";
        public readonly ModelClass = Example;
      }

      exampleService = new ExampleService();
      studentService = new StudentService();
      organizationService = new OrganizationService();

      registerService(exampleService);
      registerService(studentService);
      registerService(organizationService);
    });

    describe("Model#getRelated", () => {
      it("returns undefined if the requested related field is not a property on the model", () => {
        const model = new ExampleModelClass({ id, organizationId });
        expect(model.getRelated("fakeField")).to.be.undefined;
      });

      it("returns a shadow for a belongsTo relationship if the current model is a shadow", () => {
        const shadowModel = exampleService.getShadowObject();
        expect(shadowModel.getRelated("organization")).to.have.property("isShadow").to.be.true;
      });

      it("returns null for a belongsTo relationship if the related id field is empty", () => {
        const model = new ExampleModelClass({ id, organizationId: null });
        expect(model.getRelated("organization")).to.be.null;
      });

      it("returns an empty array for a hasMany relationship if the related ids field is empty", () => {
        const model = new ExampleModelClass({ id, studentIds: [] });
        expect(model.getRelated("students")).to.be.an("array").that.is.empty;
      });

      it("uses the Observable returned from the DataService to get the related BelongsTo model", () => {
        const organizationObservable = of$(new organizationService.ModelClass({ id: organizationId }));
        stub(organizationService, "getById").returns(organizationObservable);

        const model = new ExampleModelClass({ id, organizationId });
        expect(model).to.have.property("organization").to.have.property("id").to.equal(organizationId);
      });

      it("uses the Observable returned from the DataService to get the related HasMany models", () => {
        const studentIds = [random.number().toString(), random.number().toString()];
        const students = studentIds.map((studentId) => new studentService.ModelClass({ id: studentId }));
        const studentObservable = of$(students);
        stub(studentService, "getByIds").returns(studentObservable);

        const model = new ExampleModelClass({ id, studentIds });
        expect(model).to.have.property("students").to.deep.equal(students);
      });

      it("listens for new changes from the related Observable", () => {
        const organizationObservable = new Subject();
        stub(organizationService, "getById").returns(organizationObservable.publishReplay(1).refCount());

        const organization1 = new organizationService.ModelClass({ id: organizationId });
        const organization2 = new organizationService.ModelClass({ id: organizationId });

        const model = new ExampleModelClass({ id, organizationId });
        model.getRelated("organization");

        organizationObservable.next(organization1);
        organizationObservable.next(organization2);

        expect(model).to.have.property("organization").to.equal(organization2).but.to.not.equal(organization1);
      });

      it("stops listening to new changes when the Model is being torn down", () => {
        const organizationObservable = new Subject();
        stub(organizationService, "getById").returns(organizationObservable.publishReplay(1).refCount());

        const organization1 = new organizationService.ModelClass({ id: organizationId });
        const organization2 = new organizationService.ModelClass({ id: organizationId });

        const model = new ExampleModelClass({ id, organizationId });
        model.getRelated("organization");

        organizationObservable.next(organization1);
        model.markForDestruction();

        // note: model.markForDestruction() uses setTimeout to bump its execution to avoid a Redux issue.
        // So, we need to return a promise from the test so we can use setTimeout here as well,
        // such that the assertion occurs after the observable has been triggered
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              organizationObservable.next(organization2);
              expect(model).to.have.property("organization").to.equal(organization1).but.to.not.equal(organization2);
              resolve();
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      });

      it("will not subscribe to new changes when the Model is being torn down", () => {
        const organization = new organizationService.ModelClass({ id: organizationId });
        const organizationObservable = of$(organization);
        stub(organizationService, "getById").returns(organizationObservable);

        const model = new ExampleModelClass({ id, organizationId });
        model.markForDestruction();
        expect(model).to.have.property("organization").to.be.null;
      });
    });

    describe("Model#setRelated", () => {
      it("passes the BelongsTo model id to the setField method", () => {
        const organization = new organizationService.ModelClass({ id: organizationId });
        const model = new ExampleModelClass({ id, organizationId });
        const setFieldStub = stub(model, "setField");

        model.setRelated("organization", organization);
        expect(setFieldStub.firstCall.args).to.deep.equal([
          "organizationId",
          organizationId,
        ]);
      });

      it("passes the HasMany model ids to the setField method", () => {
        const studentIds = [random.number().toString(), random.number().toString()];
        const students = studentIds.map((studentId) => new studentService.ModelClass({ id: studentId }));

        const model = new ExampleModelClass({ id, studentIds });
        const setFieldStub = stub(model, "setField");

        model.setRelated("students", students);
        expect(setFieldStub.firstCall.args).to.deep.equal([
          "studentIds",
          studentIds,
        ]);
      });
    });
  });

  describe("Model#isDirty", () => {

    it("considers the model to be dirty when a field has changed", () => {
      initializeTestServices(fakeModelModule);

      let model = seedService<IFakeModelData>("fakeModel");
      model = model.applyUpdates({ fullText: lorem.word() });

      expect(model.isDirty).to.be.true;
    });

    it("does not consider the model to be dirty when the model has not been changed", () => {
      initializeTestServices(fakeModelModule);

      const model = seedService<IFakeModelData>("fakeModel");

      expect(model.isDirty).to.be.false;
    });

  });

  describe("Model#hasUnsavedChanges", () => {

    it("considers the model to have unsaved changes when one of its own fields has changed", () => {
      initializeTestServices(fakeModelModule);

      let model = seedService<IFakeModelData>("fakeModel");
      model = model.applyUpdates({ fullText: lorem.word() });

      expect(model.hasUnsavedChanges).to.be.true;
    });

    it("considers the model to have unsaved changes when one of its previously loaded related models has changed", () => {
      initializeTestServices(fakeModelModule);

      const model = seedService<IFakeModelData>("fakeModel") as any;
      model.relatedModels = { someRelatedModel: { isDirty: true } };

      expect(model.hasUnsavedChanges).to.be.true;
    });

    it("does not consider the model to have unsaved changes when the model and its relationships have not been changed", () => {
      initializeTestServices(fakeModelModule);

      const model = seedService<IFakeModelData>("fakeModel") as any;
      model.relatedModels = { someRelatedModel: { isDirty: false } };

      expect(model.hasUnsavedChanges).to.be.false;
    });

  });

  describe("sub-classing works as expected", () => {
    it("Model decorators apply only to the subtype and not the parent", () => {
      class MockModel extends Model<any> {
        @attr(DateField)
        public asdfasdfasdf: Date;

        @attr(TimeField)
        public startTime: Date;

        @attr(DateTimeField)
        public endDateTime: Date;

        @attr(NumberField)
        public age: number;

        @attr(StringField)
        public organizationId: string;
      }

      const model = new Model({ id: random.number().toString() });

      expect(model.fields).to.deep.equal({
        id: { ...StringField, serialize: false },
        dateDeleted: { ...DateTimeField, serialize: false },
        dateUpdated: { ...DateTimeField, serialize: false },
      });
    });
  });
});
