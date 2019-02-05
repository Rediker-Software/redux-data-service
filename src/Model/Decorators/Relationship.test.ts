/* tslint:disable: max-classes-per-file */

import { stub } from "sinon";

import { IRelationship, relationship, RelationshipType } from "./Relationship";
import { ArrayField, BelongsToField, StringField } from "../FieldType";
import { attr } from "./Attr";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

interface IFakeStudent {
  name: string;
}

describe("@relationship", () => {
  describe("@relationship - magic getter", () => {
    let expectedValue;
    let myClass;

    beforeEach(() => {
      expectedValue = { name: "Bob" };

      class MyClass implements IRelationship {
        @attr(ArrayField)
        public studentIds: string[];

        @relationship(RelationshipType.HasMany)
        public student: IFakeStudent[];

        public readonly relationships;
        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getRelated = stub().callsFake(() => expectedValue);
        public setRelated = stub();
        public getField = stub();
        public setField = stub();
      }

      myClass = new MyClass();
    });

    it("returns the expected output from the magic getter", () => {
      expect(myClass).to.have.property("student").to.equal(expectedValue);
    });

    it("called the magic getter once", () => {
      const theStudent = myClass.student;
      expect(myClass.getRelated.calledOnce).to.equal(true);
    });

    it("passed the correct field name to the magic getter", () => {
      const theStudent = myClass.student;
      expect(myClass.getRelated.firstCall.args[0]).to.equal("student");
    });
  });

  describe("@relationship - magic setter", () => {
    let expectedValue;
    let myClass;

    beforeEach(() => {
      expectedValue = { name: "Bob" };

      class MyClass implements IRelationship {
        @attr(StringField)
        public studentId: string;

        @relationship(RelationshipType.BelongsTo)
        public student: IFakeStudent;

        public readonly relationships;
        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getRelated = stub().callsFake(() => expectedValue);
        public setRelated = stub();
        public getField = stub();
        public setField = stub();
      }

      myClass = new MyClass();
      myClass.student = expectedValue;
    });

    it("called the magic setter once", () => {
      expect(myClass.setRelated.calledOnce).to.equal(true);
    });

    it("passed the correct field name to the magic setter", () => {
      expect(myClass.setRelated.firstCall.args[0]).to.equal("student");
    });

    it("passed the correct value to the magic setter", () => {
      expect(myClass.setRelated.firstCall.args[1]).to.equal(expectedValue);
    });
  });

  describe("@relationship - relationship definition with default values", () => {
    let expectedValue;
    let myClass;

    beforeEach(() => {
      expectedValue = { name: "Bob" };

      class MyClass implements IRelationship {
        @attr(StringField)
        public studentId: string;

        @relationship(RelationshipType.BelongsTo)
        public student: IFakeStudent;

        public readonly relationships;
        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getRelated = stub().callsFake(() => expectedValue);
        public setRelated = stub();
        public getField = stub();
        public setField = stub();
      }

      myClass = new MyClass();
    });

    it("sets the navigationFieldName on the id field", () => {
      expect(myClass.fields)
        .to.have.property("studentId")
        .that.has.property("navigationFieldName", "student");
    });

    it("creates a field decorator which tracks the FieldType of the relationship", () => {
      expect(myClass.fields).to.have.property("student").to.deep.contain(BelongsToField, "it keeps track of the field's FieldType correctly");
    });

    it("builds the IFieldRelationship object using the property name as the service name by default", () => {
      expect(myClass.relationships).to.have.property("student").to.deep.equal({
        field: "student",
        serviceName: "student",
        serviceNameField: undefined,
        relatedFieldName: "studentId",
        modelRelatedFieldName: undefined,
        type: RelationshipType.BelongsTo,
      });
    });

    it("requires the default related field name to be defined on the Model", () => {
      expect(() => relationship(RelationshipType.BelongsTo)(myClass, "organization")).to.throw(ReferenceError, "missing for relationship");
    });
  });

  describe("@relationship - relationship definition with custom values", () => {
    it("builds the IFieldRelationship object using a custom service name", () => {
      class MyClass implements IRelationship {
        @attr(StringField)
        public someKidId: string;

        @relationship(RelationshipType.BelongsTo, { serviceName: "student" })
        public someKid: IFakeStudent;

        public readonly relationships;
        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getRelated = stub();
        public setRelated = stub();
        public getField = stub();
        public setField = stub();
      }

      const myClass = new MyClass();

      expect(myClass.relationships).to.have.property("someKid").to.deep.equal({
        field: "someKid",
        serviceName: "student",
        serviceNameField: undefined,
        relatedFieldName: "someKidId",
        modelRelatedFieldName: undefined,
        type: RelationshipType.BelongsTo,
      });
    });

    it("builds the IFieldRelationship object using a custom service name and custom relatedFieldName", () => {

      class MyClass implements IRelationship {
        @attr(StringField)
        public studentFK: string;

        @relationship(RelationshipType.BelongsTo, { serviceName: "student", relatedFieldName: "studentFK" })
        public someKid: IFakeStudent;

        public readonly relationships;
        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getRelated = stub();
        public setRelated = stub();
        public getField = stub();
        public setField = stub();
      }

      const myClass = new MyClass();

      expect(myClass.relationships).to.have.property("someKid").to.deep.equal({
        field: "someKid",
        serviceName: "student",
        serviceNameField: undefined,
        relatedFieldName: "studentFK",
        modelRelatedFieldName: undefined,
        type: RelationshipType.BelongsTo,
      });
    });

    it("requires the custom related field name to be defined on the Model", () => {

      class MyClass implements IRelationship {
        @attr(StringField)
        public studentFK: string;

        @relationship(RelationshipType.BelongsTo, { serviceName: "student", relatedFieldName: "studentFK" })
        public someKid: IFakeStudent;

        public readonly relationships;
        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getRelated = stub();
        public setRelated = stub();
        public getField = stub();
        public setField = stub();
      }

      const myClass = new MyClass();

      expect(() => relationship(RelationshipType.BelongsTo, {
        serviceName: "organization",
        relatedFieldName: "orgIds",
      })(myClass, "organization")).to.throw(ReferenceError, "missing for relationship");
    });

    it("builds the IFieldRelationship object using a custom service name field", () => {
      class MyClass implements IRelationship {
        @attr(StringField)
        public objectType: string;

        @attr(StringField)
        public someKidId: string;

        @relationship(RelationshipType.BelongsTo, { serviceNameField: "objectType" })
        public someKid: IFakeStudent;

        public readonly relationships;
        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getRelated = stub();
        public setRelated = stub();
        public getField = stub();
        public setField = stub();
      }

      const myClass = new MyClass();

      expect(myClass.relationships).to.have.property("someKid").to.deep.equal({
        field: "someKid",
        serviceName: undefined,
        serviceNameField: "objectType",
        relatedFieldName: "someKidId",
        modelRelatedFieldName: undefined,
        type: RelationshipType.BelongsTo,
      });
    });

  });

  describe("@relationship - supports BelongsTo and HasMany", () => {

    it("builds the IFieldRelationship object with the correct type and relatedFieldName for BelongsTo", () => {
      const expectedValue = { name: "Bob" };

      class MyClass implements IRelationship {
        @attr(StringField)
        public studentId: string;

        @relationship(RelationshipType.BelongsTo)
        public student: IFakeStudent;

        public readonly relationships;
        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getRelated = stub().callsFake(() => expectedValue);
        public setRelated = stub();
        public getField = stub();
        public setField = stub();
      }

      const myClass = new MyClass();

      expect(myClass.relationships).to.have.property("student").to.deep.equal({
        field: "student",
        serviceName: "student",
        serviceNameField: undefined,
        relatedFieldName: "studentId",
        modelRelatedFieldName: undefined,
        type: RelationshipType.BelongsTo,
      });
    });

    it("builds the IFieldRelationship object with the correct type and relatedFieldName for HasMany", () => {
      const expectedValue = { name: "Bob" };

      class MyClass implements IRelationship {
        @attr(ArrayField)
        public studentIds: string[];

        @relationship(RelationshipType.HasMany)
        public students: IFakeStudent[];

        public readonly relationships;
        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getRelated = stub().callsFake(() => expectedValue);
        public setRelated = stub();
        public getField = stub();
        public setField = stub();
      }

      const myClass = new MyClass();

      expect(myClass.relationships).to.have.property("students").to.deep.equal({
        field: "students",
        serviceName: "student",
        serviceNameField: undefined,
        relatedFieldName: "studentIds",
        modelRelatedFieldName: undefined,
        type: RelationshipType.HasMany,
      });
    });
  });

  describe("@relationship - memory efficiency", () => {
    let expectedValue;
    let myClass;
    let anotherMyClass;

    beforeEach(() => {
      expectedValue = { name: "Bob" };

      class MyClass implements IRelationship {
        @attr(StringField)
        public studentId: string;

        @relationship(RelationshipType.BelongsTo)
        public student: IFakeStudent;

        public readonly relationships;
        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getRelated = stub().callsFake(() => expectedValue);
        public setRelated = stub();
        public getField = stub();
        public setField = stub();
      }

      myClass = new MyClass();
      anotherMyClass = new MyClass();
    });

    it("shares relationships among every instance of the class to use memory efficiently", () => {
      expect(myClass.relationships).to.equal(anotherMyClass.relationships);
    });

    it("defines relationships on the prototype, not as an own property, for each instance", () => {
      expect(myClass).to.have.property("relationships").but.not.own.property("relationships");
    });
  });

});
