/* tslint:disable: max-classes-per-file */

import { stub } from "sinon";

import { field, IFieldTypes} from "./Field";
import { StringField, EmailField } from "../FieldType";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("@field", () => {
  it("creates a decorator which tracks the FieldType for the field", () => {
    class MyClass implements IFieldTypes {
      @field(StringField)
      public name: string;

      public readonly fields;
      public readonly validationRules;
      public validate = stub();
    }

    const myClass = new MyClass();

    expect(myClass.fields).to.have.property("name").to.deep.equal(StringField, "it keeps track of the field's FieldType correctly");
  });

  it("creates a decorator which sets up default validation rules for the FieldType", () => {
    class MyClass implements IFieldTypes {
      @field(EmailField)
      public name: string;

      public readonly fields;
      public readonly validationRules;
      public validate = stub();
    }

    const myClass = new MyClass();

    expect(myClass.validationRules).to.have.property("name").to.deep.equal({ email: true }, "it sets correct validation rules for the FieldType");
  });

  it("shares the same fieldTypes object among every instance of the class to use memory efficiently", () => {
    const expectedValue = 0;

    class MyClass implements IFieldTypes {
      @field(StringField)
      public name: string;

      public readonly fields;
      public readonly validationRules;
      public validate = stub();
    }

    const myClass = new MyClass();
    const anotherMyClass = new MyClass();

    expect(myClass.fields).to.equal(anotherMyClass.fields);
  });
});
