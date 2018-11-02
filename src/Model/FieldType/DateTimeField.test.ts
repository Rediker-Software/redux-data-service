/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { DateTimeField } from "./DateTimeField";
import { initializeDateTimeValidator } from "../../Validators";

declare var intern;
const { describe, it, before } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: DateTimeField", () => {
  before(() => {
    initializeDateTimeValidator(validate);
  });

  it("has correct default value", () => {
    expect(DateTimeField).to.have.property("defaultValue").to.be.null;
  });

  it("provides default form validation rules which require the value to be a valid datetime", () => {
    const value = "2018-01-01T05:06:07";
    expect(validate({ birthDate: value }, { birthDate: DateTimeField.defaultValidationRules })).to.be.undefined;
  });

  it("provides default form validation rules which do not allow invalid datetime", () => {
    const value = "asdfasdf";
    expect(validate({ birthDate: value }, { birthDate: DateTimeField.defaultValidationRules })).to.deep.equal({
      birthDate: ["Birth date must be a valid date"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(DateTimeField.isValidType(value)).to.be.true;
  });

  it("considers a Date to be a valid type", () => {
    const value = new Date();
    expect(DateTimeField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-string to be a valid type", () => {
    const value = 7;
    expect(DateTimeField.isValidType(value)).to.be.false;
  });

  it("transforms a Date into its corresponding ISO string", async () => {
    const value = new Date();
    expect(await DateTimeField.transform(value)).to.equal(value.toISOString());
  });

  it("should be serialized", () => {
    expect(DateTimeField.serialize).to.be.true;
  });

  it("declares it's type", () =>
    expect(DateTimeField.type).to.eq("dateTime"),
  );

  describe("normalize", () => {

    it("normalizes a Date ISO string into its corresponding Date object", async () => {
      const date = new Date();
      const value = date.toISOString();

      expect(await DateTimeField.normalize(value)).to.deep.equal(date);
    });

    it("normalizes a Date object by returning the given value", async () => {
      const date = new Date();
      expect(await DateTimeField.normalize(date)).to.equal(date);
    });

  });
});
