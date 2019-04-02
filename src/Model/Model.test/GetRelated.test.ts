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
  let studentService;
  let ExampleModelClass;
  let id;
  let studentId;

  beforeEach(() => {
    initializeTestServices(fakeModelModule);
    id = random.number().toString();
    studentId = random.number().toString();

    BaseService.registerDispatch(spy());

    interface IOrganization extends IModelData {
      id: string;
    }

    class Organization extends Model<IOrganization> {
      public serviceName = "student";
    }

    class OrganizationService extends DataService<IOrganization> {
      public readonly name = "student";
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
      studentId: string;
      studentIds: string[];
    }

    class Example extends Model<IExampleData> {
      public serviceName = "example";

      @attr(StringField)
      public studentId: string;

      @attr(ArrayField)
      public studentIds: string[];

      @belongsTo()
      public student: IOrganization;

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
    studentService = new OrganizationService();

    registerService(exampleService);
    registerService(studentService);
    registerService(studentService);
  });

  it("returns undefined if the requested related field is not a property on the model", () => {
    const model = new ExampleModelClass({ id, studentId });
    expect(model.getRelated("fakeField")).to.be.undefined;
  });

  it("returns a shadow for a belongsTo relationship if the current model is a shadow", () => {
    const shadowModel = exampleService.getShadowObject();
    expect(shadowModel.getRelated("student")).to.have.property("isShadow").to.be.true;
  });

  it("returns undefined for a belongsTo relationship if the related id field is empty", () => {
    const model = new ExampleModelClass({ id, studentId: null });
    expect(model.getRelated("student")).to.be.undefined;
  });

  it("returns an empty array for a hasMany relationship if the related ids field is empty", () => {
    const model = new ExampleModelClass({ id, studentIds: [] });
    expect(model.getRelated("students")).to.be.an("array").that.is.empty;
  });

  it("uses the Observable returned from the DataService to get the related BelongsTo model", () => {
    const studentObservable = of$(new studentService.ModelClass({ id: studentId }));
    stub(studentService, "getById").returns(studentObservable);

    const model = new ExampleModelClass({ id, studentId });
    expect(model).to.have.property("student").to.have.property("id").to.equal(studentId);
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
    const studentObservable = new Subject();
    stub(studentService, "getById").returns(studentObservable.publishReplay(1).refCount());

    const student1 = new studentService.ModelClass({ id: studentId });
    const student2 = new studentService.ModelClass({ id: studentId });

    const model = new ExampleModelClass({ id, studentId });
    model.getRelated("student");

    studentObservable.next(student1);
    studentObservable.next(student2);

    expect(stubSetRelationship.firstCall.args[0]).to.have.property("value").to.equal(student2);
  });

  describe("when model is being destroyed", () => {
    it("stops listening to new changes when the Model is being torn down", () => {
      const studentObservable = new Subject();
      stub(studentService, "getById").returns(studentObservable.publishReplay(1).refCount());

      const student1 = new studentService.ModelClass({ id: studentId });
      const student2 = new studentService.ModelClass({ id: studentId });

      const model = new ExampleModelClass({ id, studentId });
      model.getRelated("student");

      studentObservable.next(student1);
      model.markForDestruction();

      // note: model.markForDestruction() uses setTimeout to bump its execution to avoid a Redux issue.
      // So, we need to return a promise from the test so we can use setTimeout here as well,
      // such that the assertion occurs after the observable has been triggered
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            studentObservable.next(student2);
            expect(model).to.have.property("student").to.equal(student1).but.to.not.equal(student2);
            resolve();
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    });

    it("will not subscribe to new changes when the Model is being torn down", () => {
      const student = new studentService.ModelClass({ id: studentId });
      const studentObservable = of$(student);
      stub(studentService, "getById").returns(studentObservable);

      const model = new ExampleModelClass({ id, studentId });
      model.markForDestruction();
      expect(model).to.have.property("student").to.be.undefined;
    });

    describe("setting existing related records as destroyed", () => {
      it("sets related scalar value as destroyed", () => {
        const studentObservable = new Subject();
        stub(studentService, "getById").returns(studentObservable.publishReplay(1).refCount());

        const student1 = new studentService.ModelClass({ id: studentId });
        const student1DestroyStub = stub(student1, "markForDestruction").callThrough();

        const model = new ExampleModelClass({ id, studentId });
        model.getRelated("student");

        studentObservable.next(student1);
        const student2 = new studentService.ModelClass({ id: studentId });
        studentObservable.next(student2);

        expect(student1DestroyStub.calledOnce).to.be.true;
      });

      it("sets related array value as destroyed", () => {
        const studentArrayCreator = () => [1, 2, 3].map(() =>
          new studentService.ModelClass({ id: random.number.toString() })
        );

        const studentObservable = new Subject();
        stub(studentService, "getByIds").returns(studentObservable.publishReplay(1).refCount());

        const students1 = studentArrayCreator();
        const students1DestroyStub = students1.map(student => stub(student, "markForDestruction").callThrough());

        const model = new ExampleModelClass({ id, students1 });
        model.getRelated("students");

        studentObservable.next(students1);
        const student2 =  studentArrayCreator();
        studentObservable.next(student2);

        expect(students1DestroyStub).not.to.be.empty;
        students1DestroyStub.forEach((stub, index) =>
          expect(stub.calledOnce).to.eq(true, `first student array, stub at position ${index} should be destroyed`)
        );
      });
    });
  });

  it("will return the correct version of a relationship when its related id changes", () => {
    const newOrganizationId = random.number().toString();
    const student = new studentService.ModelClass({ id: studentId });
    const newOrganization = new studentService.ModelClass({ id: newOrganizationId });

    const getByIdStub = stub(studentService, "getById").returns(of$(student));

    const model = new ExampleModelClass({ id, studentId });
    expect(model).to.have.property("student").to.equal(student);

    getByIdStub.restore();
    stub(studentService, "getById").returns(of$(newOrganization));

    const updatedModel = model.applyUpdates({ studentId: newOrganizationId });

    expect(updatedModel).to.have.property("student").to.equal(newOrganization);
  });

  it("will not change the relationship of the current model instance when its related id changes", () => {
    const student = new studentService.ModelClass({ id: studentId });
    const newOrganizationId = random.number().toString();
    const newOrganization = new studentService.ModelClass({ id: studentId });

    const getByIdStub = stub(studentService, "getById").returns(of$(student));

    const model = new ExampleModelClass({ id, studentId });
    expect(model).to.have.property("student").to.equal(student);

    getByIdStub.restore();
    stub(studentService, "getById").returns(of$(newOrganization));

    model.applyUpdates({ studentId: newOrganizationId });

    expect(model).to.have.property("student").to.equal(student);
  });
});
