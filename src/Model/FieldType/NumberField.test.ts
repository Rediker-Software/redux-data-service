/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { NumberField } from "./NumberField";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: NumberField", () => {
  it("has correct default value", () => {
    expect(NumberField).to.have.property("defaultValue").to.equal(0);
  });

  it("provides default form validation rules which require the value to be a number", () => {
    const value = 7;
    expect(validate({ age: value }, { age: NumberField.defaultValidationRules })).to.be.undefined;
  });

  it("provides default form validation rules which do not allow non-numeric input", () => {
    const value = "asdfasdf";
    expect(validate({ age: value }, { age: NumberField.defaultValidationRules })).to.deep.equal({
      age: ["Age is not a number"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(NumberField.isValidType(value)).to.be.true;
  });

  it("considers a number to be a valid type", () => {
    const value = 7;
    expect(NumberField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-number instance to be a valid type", () => {
    const value = "asdf";
    expect(NumberField.isValidType(value)).to.be.false;
  });

  it("should be serialized", () => {
    expect(NumberField.serialize).to.be.true;
  });

  it("normalizes any value into a string", () => {
    const value = "7";
    expect(NumberField.normalize(value)).to.be.a("number").and.to.equal(7);
  });
});
