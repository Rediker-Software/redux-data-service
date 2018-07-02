/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { HasManyField } from "./HasManyField";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: HasManyField", () => {
  it("has correct default value", () => {
    expect(HasManyField).to.have.property("defaultValue").to.deep.equal([]);
  });

  it("provides default form validation rules which require the value to be an array", () => {
    const value = [];
    expect(validate({ students: value }, { students: HasManyField.defaultValidationRules })).to.be.undefined;
  });

  it("provides default form validation rules which do not allow non-null non-array types", () => {
    const value = 7;
    expect(validate({ students: value }, { students: HasManyField.defaultValidationRules })).to.deep.equal({
      students: ["Students must be of type array"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(HasManyField.isValidType(value)).to.be.true;
  });

  it("considers an array instance to be a valid type", () => {
    const value = [];
    expect(HasManyField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-array instance to be a valid type", () => {
    const value = 7;
    expect(HasManyField.isValidType(value)).to.be.false;
  });

  it("should not be serialized", () => {
    expect(HasManyField.serialize).to.be.false;
  });
});
