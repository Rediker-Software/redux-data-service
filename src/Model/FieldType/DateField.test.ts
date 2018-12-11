/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { parse } from "date-fns";
import { DateField } from "./DateField";
import { initializeDateTimeValidator } from "../../FieldValidators";

declare var intern;
const { describe, it, before } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: DateField", () => {
  before(() => {
    initializeDateTimeValidator(validate);
  });

  it("has correct default value", () => {
    expect(DateField).to.have.property("defaultValue").to.be.null;
  });

  it("provides default form validation rules which require the value to be a valid date", () => {
    const value = "2018-01-01";
    expect(validate({ birthDate: value }, { birthDate: DateField.defaultValidationRules })).to.be.undefined;
  });

  it("provides default form validation rules which do not allow invalid date", () => {
    const value = "asdfasdf";
    expect(validate({ birthDate: value }, { birthDate: DateField.defaultValidationRules })).to.deep.equal({
      birthDate: ["Birth date must be a valid date"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(DateField.isValidType(value)).to.be.true;
  });

  it("considers a Date to be a valid type", () => {
    const value = new Date();
    expect(DateField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-string to be a valid type", () => {
    const value = 7;
    expect(DateField.isValidType(value)).to.be.false;
  });

  it("transforms a Date into the correct Date string", async () => {
    const serializedDate = "2018-02-14";
    const date = parse(serializedDate, "YYYY-MM-DD", new Date());

    expect(await DateField.transform(date)).to.equal(serializedDate);
  });

  it("should be serialized", () => {
    expect(DateField.serialize).to.be.true;
  });

  it("declares its type", () =>
    expect(DateField.type).to.eq("date"),
  );

  describe("normalize", () => {

    it("normalizes a Date string into its corresponding Date object", async () => {
      const serializedDate = "2018-02-14";
      const date = parse(serializedDate, "YYYY-MM-DD", new Date());

      expect(await DateField.normalize(serializedDate)).to.deep.equal(date);
    });

    it("normalizes a Date object by returning the given value", async () => {
      const date = new Date();
      expect(await DateField.normalize(date)).to.equal(date);
    });

  });
});
