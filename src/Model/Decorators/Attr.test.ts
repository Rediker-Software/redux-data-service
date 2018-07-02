/* tslint:disable: max-classes-per-file */

import { stub } from "sinon";

import { attr, IAttrs } from "./Attr";
import { StringField, EmailField } from "../FieldType";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("@attr", () => {
  describe("@attr - magic getter", () => {
    let defaultValue;
    let expectedValue;
    let myClass;

    beforeEach(() => {
      defaultValue = "hello world";
      expectedValue = "this is a test";

      class MyClass implements IAttrs {
        @attr(StringField, { defaultValue })
        public name: string;

        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getField = stub().callsFake(() => expectedValue);
        public setField = stub();
      }

      myClass = new MyClass();
      const studentName = myClass.name;
    });

    it("returns the expected output from the magic getter", () => {
      expect(myClass).to.have.property("name").to.equal(expectedValue);
    });

    it("called the magic getter once", () => {
      expect(myClass.getField.calledOnce).to.equal(true);
    });

    it("passed the correct field name to the magic getter", () => {
      expect(myClass.getField.firstCall.args[0]).to.equal("name");
    });

    it("passed the correct default value to the magic getter", () => {
      expect(myClass.getField.firstCall.args[1]).to.equal(defaultValue);
    });
  });

  describe("@attr - magic setter", () => {
    let expectedValue;
    let myClass;

    beforeEach(() => {
      expectedValue = "this is a test";

      class MyClass implements IAttrs {
        @attr(StringField)
        public name: string;

        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getField = stub();
        public setField = stub();
      }

      myClass = new MyClass();
      myClass.name = expectedValue;
    });

    it("called the magic setter once", () => {
      expect(myClass.setField.calledOnce).to.equal(true);
    });

    it("passed the correct field name to the magic setter", () => {
      expect(myClass.setField.firstCall.args[0]).to.equal("name");
    });

    it("passed the correct value to the magic setter", () => {
      expect(myClass.setField.firstCall.args[1]).to.equal(expectedValue);
    });
  });

  describe("@attr - field definition", () => {
    let expectedValue;
    let myClass;

    beforeEach(() => {
      expectedValue = "";

      class MyClass implements IAttrs {
        @attr(EmailField)
        public homeEmail: string;

        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getField = stub().callsFake(() => expectedValue);
        public setField = stub();
      }

      myClass = new MyClass();
    });

    it("creates a field decorator which tracks the FieldType for the field", () => {
      expect(myClass.fields).to.have.property("homeEmail").to.deep.equal(EmailField, "it keeps track of the field's FieldType correctly");
    });

    it("creates a field decorator which sets up default validation rules for the FieldType", () => {
      expect(myClass.validationRules).to.have.property("homeEmail").to.deep.equal({ email: true }, "it sets correct validation rules for the FieldType");
    });

    it("returns the expected default value based on the given FieldType", () => {
      expect(myClass).to.have.property("homeEmail").to.equal(expectedValue);
    });
  });

  describe("@attr - memory efficiency", () => {
    let expectedValue;
    let myClass;
    let anotherMyClass;

    beforeEach(() => {
      expectedValue = { name: "Bob" };

      class MyClass implements IAttrs {
        @attr(EmailField)
        public homeEmail: string;

        public readonly fields;
        public readonly validationRules;
        public validate = stub();
        public getField = stub().callsFake(() => expectedValue);
        public setField = stub();
      }

      myClass = new MyClass();
      anotherMyClass = new MyClass();
    });

    it("shares fieldTypes among every instance of the class to use memory efficiently", () => {
      expect(myClass.fields).to.equal(anotherMyClass.fields);
    });

    it("defines fieldTypes on the prototype, not as an own property, for each instance", () => {
      expect(myClass).to.have.property("fields").but.not.own.property("fields");
    });
  });
});
