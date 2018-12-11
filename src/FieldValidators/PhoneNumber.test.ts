/* tslint:disable: no-unused-expression */

import { stub } from "sinon";
import { validate } from "validate.js";
import { initializePhoneNumberValidator } from "./PhoneNumber";

declare var intern;
const { describe, it, before } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("validator: phoneNumber", () => {
  before(() => {
    initializePhoneNumberValidator(validate);
  });

  it("provides validation rules which require the value to be a phone number", () => {
    const value = "+1999999999";
    expect(validate({homePhone: value}, {homePhone: {phoneNumber: true}})).to.be.undefined;
  });

  it("provides validation rules which do not allow incorrectly formatted phone numbers", () => {
    const value = "(123) 456-7890";
    expect(validate({homePhone: value}, {homePhone: {phoneNumber: true}})).to.deep.equal({
      homePhone: ["Home phone must be a valid phone number"],
    });
  });
});
