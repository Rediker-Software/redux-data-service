/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { random } from "faker";

import { StringField } from "./StringField";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: StringField", () => {
  it("has correct default value", () => {
    expect(StringField).to.have.property("defaultValue").to.equal("");
  });

  it("provides default form validation rules which require the value to be an string", () => {
    const value = "Rich Rediker";
    expect(validate({ name: value }, { name: StringField.defaultValidationRules })).to.be.undefined;
  });

  it("provides default form validation rules which do not allow non-null non-string types", () => {
    const value = 7;
    expect(validate({ name: value }, { name: StringField.defaultValidationRules })).to.deep.equal({
      name: ["Name must be of type string"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(StringField.isValidType(value)).to.be.true;
  });

  it("considers a string instance to be a valid type", () => {
    const value = "asdf";
    expect(StringField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-string instance to be a valid type", () => {
    const value = 7;
    expect(StringField.isValidType(value)).to.be.false;
  });

  it("should be serialized", () => {
    expect(StringField.serialize).to.be.true;
  });

  it("normalizes any value into a string", async () => {
    const randomNumber = random.number();
    expect(await StringField.normalize(randomNumber)).to.be.a("string").and.to.equal(String(randomNumber));
  });

  it("normalizes any null-like value into an empty string", async () => {
    expect(await StringField.normalize(null)).to.be.a("string").and.to.equal("");
  });
});
