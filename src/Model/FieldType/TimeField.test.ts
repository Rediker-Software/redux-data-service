/* tslint:disable: no-unused-expression */

import { parse } from "date-fns";
import { validate } from "validate.js";

import { initializeDateTimeValidator } from "../../Validators";
import { TimeField } from "./TimeField";

declare var intern;
const { describe, it, before } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: TimeField", () => {
  before(() => {
    initializeDateTimeValidator(validate);
  });

  it("has correct default value", () => {
    expect(TimeField).to.have.property("defaultValue").to.be.null;
  });

  it("provides default form validation rules which require the value to be a valid time", () => {
    const value = "05:06:07 am";
    expect(validate({ startTime: value }, { startTime: TimeField.defaultValidationRules })).to.be.undefined;
  });

  it("provides default form validation rules which do not allow invalid time", () => {
    const value = "asdfasdf";
    expect(validate({ startTime: value }, { startTime: TimeField.defaultValidationRules })).to.deep.equal({
      startTime: ["Start time must be a valid time"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(TimeField.isValidType(value)).to.be.true;
  });

  it("considers a Date to be a valid type", () => {
    const value = new Date();
    expect(TimeField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-string to be a valid type", () => {
    const value = 7;
    expect(TimeField.isValidType(value)).to.be.false;
  });

  it("transforms a Time into the correct Time string", async () => {
    const serializedDate = "04:20:32 pm";
    const date = parse(serializedDate, "hh:mm:ss a", new Date());

    expect(await TimeField.transform(date)).to.equal(serializedDate);
  });

  it("normalizes a Time string into its corresponding Date object", async () => {
    const serializedDate = "04:20:32 pm";
    const date = parse(serializedDate, "hh:mm:ss a", new Date());

    expect(await TimeField.normalize(serializedDate)).to.deep.equal(date);
  });

  it("should be serialized", () => {
    expect(TimeField.serialize).to.be.true;
  });
});
