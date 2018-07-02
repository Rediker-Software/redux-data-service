"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var DateTime_1 = require("./DateTime");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
var expect = intern.getPlugin("chai").expect;
describe("validator: datetime", function () {
    before(function () {
        DateTime_1.initializeDateTimeValidator(validate_js_1.validate);
    });
    it("supports ISO format by default", function () {
        var validationRule = { startDate: { datetime: true } };
        expect(validate_js_1.validate({ startDate: "2018-01-01T05:06:07" }, validationRule)).to.be.undefined;
    });
    it("validating by ISO format will return an error message with incorrect data", function () {
        var validationRule = { startDate: { datetime: true } };
        expect(validate_js_1.validate({ startDate: "01/17/2018" }, validationRule)).to.deep.equal({ startDate: ["Start date must be a valid date"] });
    });
    it("supports validating by dateOnly", function () {
        var validationRule = { startDate: { datetime: { dateOnly: true } } };
        expect(validate_js_1.validate({ startDate: "2018-01-01" }, validationRule)).to.be.undefined;
    });
    it("validating by dateOnly will return an error message with incorrect data", function () {
        var validationRule = { startDate: { datetime: { dateOnly: true } } };
        expect(validate_js_1.validate({ startDate: "2018/01/01" }, validationRule)).to.deep.equal({ startDate: ["Start date must be a valid date"] });
    });
    it("supports validating by timeOnly", function () {
        var validationRule = { startTime: { datetime: { timeOnly: true, message: "must be a valid time" } } };
        expect(validate_js_1.validate({ startTime: "10:09:08 am" }, validationRule)).to.be.undefined;
    });
    it("validating by timeOnly will return an error message with incorrect data", function () {
        var validationRule = { startTime: { datetime: { timeOnly: true, message: "must be a valid time" } } };
        expect(validate_js_1.validate({ startTime: "2018-01-01" }, validationRule)).to.deep.equal({ startTime: ["Start time must be a valid time"] });
    });
    it("supports validating by a custom pattern", function () {
        var validationRule = { startMonth: { datetime: { format: "YYYY MM", message: "must be a valid month" } } };
        expect(validate_js_1.validate({ startMonth: "2018 01" }, validationRule)).to.be.undefined;
    });
    it("validating by a custom pattern will return an error message with incorrect data", function () {
        var validationRule = { startMonth: { datetime: { format: "YYYY MM", message: "must be a valid month" } } };
        expect(validate_js_1.validate({ startMonth: "2018-12-04" }, validationRule)).to.deep.equal({ startMonth: ["Start month must be a valid month"] });
    });
    it("properly validates existing dates", function () {
        var validationRule = { startMonth: { datetime: { format: "YYYY MM", message: "must be a valid month" } } };
        expect(validate_js_1.validate({ startMonth: new Date() }, validationRule)).to.be.undefined;
    });
});
//# sourceMappingURL=DateTime.test.js.map