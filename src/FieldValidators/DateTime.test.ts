/* tslint:disable: no-unused-expression */

import { stub } from "sinon";
import { validate } from "validate.js";
import { initializeDateTimeValidator } from "./DateTime";

declare var intern;
const { describe, it, before } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("validator: datetime", () => {
  before(() => {
    initializeDateTimeValidator(validate);
  });

  it("supports ISO format by default", () => {
    const validationRule = { startDate: { datetime: true } };
    expect(validate({ startDate: "2018-01-01T05:06:07" }, validationRule)).to.be.undefined;
  });

  it("validating by ISO format will return an error message with incorrect data", () => {
    const validationRule = { startDate: { datetime: true } };
    expect(validate({ startDate: "01/17/2018" }, validationRule)).to.deep.equal({ startDate: ["Start date must be a valid date"] });
  });

  it("supports validating by dateOnly", () => {
    const validationRule = { startDate: { datetime: { dateOnly: true } } };
    expect(validate({ startDate: "2018-01-01" }, validationRule)).to.be.undefined;
  });

  it("validating by dateOnly will return an error message with incorrect data", () => {
    const validationRule = { startDate: { datetime: { dateOnly: true } } };
    expect(validate({ startDate: "2018/01/01" }, validationRule)).to.deep.equal({ startDate: ["Start date must be a valid date"] });
  });

  it("supports validating by timeOnly", () => {
    const validationRule = { startTime: { datetime: { timeOnly: true, message: "must be a valid time" } } };
    expect(validate({ startTime: "10:09:08 am" }, validationRule)).to.be.undefined;
  });

  it("validating by timeOnly will return an error message with incorrect data", () => {
    const validationRule = { startTime: { datetime: { timeOnly: true, message: "must be a valid time" } } };
    expect(validate({ startTime: "2018-01-01" }, validationRule)).to.deep.equal({ startTime: ["Start time must be a valid time"] });
  });

  it("supports validating by a custom pattern", () => {
    const validationRule = { startMonth: { datetime: { format: "YYYY MM", message: "must be a valid month" } } };
    expect(validate({ startMonth: "2018 01" }, validationRule)).to.be.undefined;
  });

  it("validating by a custom pattern will return an error message with incorrect data", () => {
    const validationRule = { startMonth: { datetime: { format: "YYYY MM", message: "must be a valid month" } } };
    expect(validate({ startMonth: "2018-12-04" }, validationRule)).to.deep.equal({ startMonth: ["Start month must be a valid month"] });
  });

  it("properly validates existing dates", () => {
    const validationRule = { startMonth: { datetime: { format: "YYYY MM", message: "must be a valid month" } } };
    expect(validate({ startMonth: new Date() }, validationRule)).to.be.undefined;
  });
});
