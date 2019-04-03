// tslint:disable: max-classes-per-file no-unused-expression
import "rxjs/add/operator/publishReplay";

import { spy, stub } from "sinon";
import { of as of$ } from "rxjs/observable/of";
import { Subject } from "rxjs/Subject";
import { lorem, random } from "faker";

import { initializeValidateJS } from "../../Initializers";

import { Model } from "../Model";
import { IModelData } from "../IModel";

import { ArrayField, StringField } from "../FieldType";

import { fakeModelModule, initializeTestServices } from "../../TestUtils";

import { BaseService, DataService, registerService } from "../../Services";

import { attr, belongsTo, hasMany } from "../Decorators";

declare var intern;
const { describe, it, beforeEach, before } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("Model.getRelated", () => {
  before(() => {
    initializeValidateJS();
  });

  let exampleService;
  let studentService;
  let organizationService;
  let ExampleModelClass;
  let id;
  let organizationId;

  beforeEach(() => {
    initializeTestServices(fakeModelModule);
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

  it("returns undefined if the requested related field is not a property on the model", () => {
    const model = new ExampleModelClass({ id, organizationId });
    expect(model.getRelated("fakeField")).to.be.undefined;
  });

  it("returns a shadow for a belongsTo relationship if the current model is a shadow", () => {
    const shadowModel = exampleService.getShadowObject();
    expect(shadowModel.getRelated("organization")).to.have.property("isShadow").to.be.true;
  });

  it("returns undefined for a belongsTo relationship if the related id field is empty", () => {
    const model = new ExampleModelClass({ id, organizationId: null });
    expect(model.getRelated("organization")).to.be.undefined;
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

  it("dispatches a setRelationship action when the Observable updates more than once", () => {
    const stubSetRelationship = stub(exampleService.actions, "setRelationship").returns({ invoke: spy() });
    const organizationObservable = new Subject();
    stub(organizationService, "getById").returns(organizationObservable.publishReplay(1).refCount());

    const organization1 = new organizationService.ModelClass({ id: organizationId });
    const organization2 = new organizationService.ModelClass({ id: organizationId });

    const model = new ExampleModelClass({ id, organizationId });
    model.getRelated("organization");

    organizationObservable.next(organization1);
    organizationObservable.next(organization2);

    expect(stubSetRelationship.firstCall.args[0]).to.have.property("value").to.equal(organization2);
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
    expect(model).to.have.property("organization").to.be.undefined;
  });

  it("will return the correct version of a relationship when its related id changes", () => {
    const newOrganizationId = random.number().toString();
    const organization = new organizationService.ModelClass({ id: organizationId });
    const newOrganization = new organizationService.ModelClass({ id: newOrganizationId });

    const getByIdStub = stub(organizationService, "getById").returns(of$(organization));

    const model = new ExampleModelClass({ id, organizationId });
    expect(model).to.have.property("organization").to.equal(organization);

    getByIdStub.restore();
    stub(organizationService, "getById").returns(of$(newOrganization));

    const updatedModel = model.applyUpdates({ organizationId: newOrganizationId });

    expect(updatedModel).to.have.property("organization").to.equal(newOrganization);
  });

  it("will not change the relationship of the current model instance when its related id changes", () => {
    const organization = new organizationService.ModelClass({ id: organizationId });
    const newOrganizationId = random.number().toString();
    const newOrganization = new organizationService.ModelClass({ id: organizationId });

    const getByIdStub = stub(organizationService, "getById").returns(of$(organization));

    const model = new ExampleModelClass({ id, organizationId });
    expect(model).to.have.property("organization").to.equal(organization);

    getByIdStub.restore();
    stub(organizationService, "getById").returns(of$(newOrganization));

    model.applyUpdates({ organizationId: newOrganizationId });

    expect(model).to.have.property("organization").to.equal(organization);
  });

  describe("setting existing related records as destroyed", () => {
    it("sets related scalar value as destroyed", () => {
      const organizationObservable = new Subject();
      stub(organizationService, "getById").returns(organizationObservable.publishReplay(1).refCount());

      const organization1 = new organizationService.ModelClass({ id: organizationId });
      const organization1DestroyStub = stub(organization1, "markForDestruction").callThrough();

      const model = new ExampleModelClass({ id, organizationId });
      model.getRelated("organization");

      organizationObservable.next(organization1);
      const organization2 = new organizationService.ModelClass({ id: organizationId });
      organizationObservable.next(organization2);

      expect(organization1DestroyStub.calledOnce).to.be.true;
    });

    it("sets related array value as destroyed", () => {
      const studentArrayCreator = () => [1, 2, 3].map(() =>
        new studentService.ModelClass({ id: random.number().toString() }),
      );

      const studentObservable = new Subject();
      stub(studentService, "getByIds").returns(studentObservable.publishReplay(1).refCount());

      const students1 = studentArrayCreator();
      const students1DestroyStub = students1.map(student => stub(student, "markForDestruction").callThrough());

      const model = new ExampleModelClass({ id, studentIds: students1.map(student => student.id) });
      model.getRelated("students");

      studentObservable.next(students1);
      const students2 = studentArrayCreator();
      studentObservable.next(students2);

      expect(students1DestroyStub).not.to.be.empty;
      students1DestroyStub.forEach((stub, index) =>
        expect(stub.calledOnce).to.eq(true, `first student array, stub at position ${index} should be destroyed`),
      );
    });
  });
});
