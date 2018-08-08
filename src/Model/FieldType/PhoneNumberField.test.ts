/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { random } from "faker";

import { PhoneNumberField } from "./PhoneNumberField";
import { initializePhoneNumberValidator } from "../../Validators";

declare var intern;
const { describe, it, before } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: PhoneNumberField", () => {
  before(() => {
    initializePhoneNumberValidator(validate);
  });

  it("has correct default value", () => {
    expect(PhoneNumberField).to.have.property("defaultValue").to.equal("");
  });

  it("provides default form validation rules which require the value to be a valid phone number", () => {
    const value = "1234567890";
    expect(validate({ homePhone: value }, { homePhone: PhoneNumberField.defaultValidationRules })).to.be.undefined;
  });

  it("provides default form validation rules which do not allow invalid phone numbers", () => {
    const value = "888.222.3334";
    expect(validate({ homePhone: value }, { homePhone: PhoneNumberField.defaultValidationRules })).to.deep.equal({
      homePhone: ["Home phone must be a valid phone number"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(PhoneNumberField.isValidType(value)).to.be.true;
  });

  it("considers a string to be a valid type", () => {
    const value = "asdf";
    expect(PhoneNumberField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-phoneNumber instance to be a valid type", () => {
    const value = 7;
    expect(PhoneNumberField.isValidType(value)).to.be.false;
  });

  it("should be serialized", () => {
    expect(PhoneNumberField.serialize).to.be.true;
  });

  it("normalizes any value into a string", () => {
    const randomNumber = random.number();
    expect(PhoneNumberField.normalize(randomNumber)).to.be.a("string").and.to.equal(String(randomNumber));
  });
});
