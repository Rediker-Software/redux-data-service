/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { random } from "faker";

import { EmailField } from "./EmailField";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: EmailField", () => {
  it("has correct default value", () => {
    expect(EmailField).to.have.property("defaultValue").to.equal("");
  });

  it("provides default form validation rules which require the value to be a valid email", () => {
    const value = "hello@example.com";
    expect(validate({ homeEmail: value }, { homeEmail: EmailField.defaultValidationRules })).to.be.undefined;
  });

  it("provides default form validation rules which do not allow invalid email", () => {
    const value = "asdfasdf";
    expect(validate({ homeEmail: value }, { homeEmail: EmailField.defaultValidationRules })).to.deep.equal({
      homeEmail: ["Home email is not a valid email"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(EmailField.isValidType(value)).to.be.true;
  });

  it("considers a string to be a valid type", () => {
    const value = "asdf";
    expect(EmailField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-email instance to be a valid type", () => {
    const value = 7;
    expect(EmailField.isValidType(value)).to.be.false;
  });

  it("should be serialized", () => {
    expect(EmailField.serialize).to.be.true;
  });

  it("declares it's type", () =>
    expect(EmailField.type).to.eq("email"),
  );

  it("normalizes any value into a string", async () => {
    const randomNumber = random.number();
    expect(await EmailField.normalize(randomNumber)).to.be.a("string").and.to.equal(String(randomNumber));
  });
});
