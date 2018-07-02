/* tslint:disable: max-classes-per-file */

import { stub } from "sinon";
import { IValidate } from "./Validation";
import { required } from "./Required";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("@required", () => {
  it("creates a decorator to mark a field as required", () => {
    class MyClass implements IValidate {

      @required()
      public name: string;

      public validate = stub();
      public readonly validationRules;
    }

    expect(MyClass.prototype.validationRules).to.have.property("name").to.deep.equal(
      { presence: { message: "is required", allowEmpty: false } }, "it has the expected validation rules",
    );
  });

  it("creates a decorator to mark a field as required with a custom error message", () => {
    class MyClass implements IValidate {

      @required("^Name is required")
      public fullText: string;

      public validate = stub();
      public readonly validationRules;
    }

    expect(MyClass.prototype.validationRules).to.have.property("fullText").to.deep.equal(
      { presence: { message: "^Name is required", allowEmpty: false } }, "it has the expected validation rules",
    );
  });

  it("creates a decorator to mark a field as required with a custom error message and allows certain empty values", () => {
    class MyClass implements IValidate {

      @required("is required", true)
      public name: string;

      public validate = stub();
      public readonly validationRules;
    }

    expect(MyClass.prototype.validationRules).to.have.property("name").to.deep.equal(
      { presence: { message: "is required", allowEmpty: true } }, "it has the expected validation rules",
    );
  });
});
