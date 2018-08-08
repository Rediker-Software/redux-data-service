/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { random } from "faker";

import { BooleanField } from "./BooleanField";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: BooleanField", () => {

  it("has correct default value", () => {
    expect(BooleanField).to.have.property("defaultValue").to.deep.equal(false);
  });

  it("provides default form validation rules which require the value to be an boolean", () => {
    const value = false;
    expect(validate({student: value}, {student: BooleanField.defaultValidationRules})).to.be.undefined;
  });

  it("provides default form validation rules which do not allow non-null non-boolean types", () => {
    const value = 7;
    expect(validate({student: value}, {student: BooleanField.defaultValidationRules})).to.deep.equal({
      student: ["Student must be of type boolean"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(BooleanField.isValidType(value)).to.be.true;
  });

  it("considers an boolean instance to be a valid type", () => {
    const value = false;
    expect(BooleanField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-boolean instance to be a valid type", () => {
    const value = 7;
    expect(BooleanField.isValidType(value)).to.be.false;
  });

  it("should be serialized", () => {
    expect(BooleanField.serialize).to.be.true;
  });

  describe("normalize", () => {

    it(`normalizes string "true" into boolean "true"`, () => {
      const value = "true";
      expect(BooleanField.normalize(value)).to.be.a("boolean").and.to.be.true;
    });

    it(`normalizes string "false" into boolean "false"`, () => {
      const value = "false";
      expect(BooleanField.normalize(value)).to.be.a("boolean").and.to.be.false;
    });

    it(`normalizes number "1" into boolean "true"`, () => {
      const value = 1;
      expect(BooleanField.normalize(value)).to.be.a("boolean").and.to.be.true;
    });

    it(`normalizes number "0" into boolean "false"`, () => {
      const value = 0;
      expect(BooleanField.normalize(value)).to.be.a("boolean").and.to.be.false;
    });

    it(`normalizes an empty string into boolean "false"`, () => {
      const value = "";
      expect(BooleanField.normalize(value)).to.be.a("boolean").and.to.be.false;
    });

    it(`normalizes NaN into boolean "false"`, () => {
      const value = NaN;
      expect(BooleanField.normalize(value)).to.be.a("boolean").and.to.be.false;
    });

    it(`normalizes a non-empty string into boolean "true"`, () => {
      const value = random.word();
      expect(BooleanField.normalize(value)).to.be.a("boolean").and.to.be.true;
    });

  });

});
