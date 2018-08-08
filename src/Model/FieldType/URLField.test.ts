/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { random } from "faker";

import { URLField } from "./URLField";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: URLField", () => {
  it("has correct default value", () => {
    expect(URLField).to.have.property("defaultValue").to.equal("");
  });

  it("provides default form validation rules which require the value to be a valid url", () => {
    const value = "http://example.com";
    expect(validate({ website: value }, { website: URLField.defaultValidationRules })).to.be.undefined;
  });

  it("provides default form validation rules which do not allow invalid url", () => {
    const value = "asdfasdf";
    expect(validate({ website: value }, { website: URLField.defaultValidationRules })).to.deep.equal({
      website: ["Website is not a valid url"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(URLField.isValidType(value)).to.be.true;
  });

  it("considers a string to be a valid type", () => {
    const value = "asdf";
    expect(URLField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-url instance to be a valid type", () => {
    const value = 7;
    expect(URLField.isValidType(value)).to.be.false;
  });

  it("should be serialized", () => {
    expect(URLField.serialize).to.be.true;
  });

  it("normalizes any value into a string", () => {
    const randomNumber = random.number();
    expect(URLField.normalize(randomNumber)).to.be.a("string").and.to.equal(String(randomNumber));
  });
});
