"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var validate_js_1 = require("validate.js");
var Validators_1 = require("Validators");
var TimeField_1 = require("./TimeField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: TimeField", function () {
    before(function () {
        Validators_1.initializeDateTimeValidator(validate_js_1.validate);
    });
    it("has correct default value", function () {
        expect(TimeField_1.TimeField).to.have.property("defaultValue").to.be.null;
    });
    it("provides default form validation rules which require the value to be a valid time", function () {
        var value = "05:06:07 am";
        expect(validate_js_1.validate({ startTime: value }, { startTime: TimeField_1.TimeField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow invalid time", function () {
        var value = "asdfasdf";
        expect(validate_js_1.validate({ startTime: value }, { startTime: TimeField_1.TimeField.defaultValidationRules })).to.deep.equal({
            startTime: ["Start time must be a valid time"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(TimeField_1.TimeField.isValidType(value)).to.be.true;
    });
    it("considers a Date to be a valid type", function () {
        var value = new Date();
        expect(TimeField_1.TimeField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-string to be a valid type", function () {
        var value = 7;
        expect(TimeField_1.TimeField.isValidType(value)).to.be.false;
    });
    it("transforms a Time into the correct Time string", function () {
        var serializedDate = "04:20:32 pm";
        var date = date_fns_1.parse(serializedDate, "hh:mm:ss a", new Date());
        expect(TimeField_1.TimeField.transform(date)).to.equal(serializedDate);
    });
    it("normalizes a Time string into its corresponding Date object", function () {
        var serializedDate = "04:20:32 pm";
        var date = date_fns_1.parse(serializedDate, "hh:mm:ss a", new Date());
        expect(TimeField_1.TimeField.normalize(serializedDate)).to.deep.equal(date);
    });
    it("should be serialized", function () {
        expect(TimeField_1.TimeField.serialize).to.be.true;
    });
});
//# sourceMappingURL=TimeField.test.js.map