"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var date_fns_1 = require("date-fns");
var DateField_1 = require("./DateField");
var Validators_1 = require("../../Validators");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: DateField", function () {
    before(function () {
        Validators_1.initializeDateTimeValidator(validate_js_1.validate);
    });
    it("has correct default value", function () {
        expect(DateField_1.DateField).to.have.property("defaultValue").to.be.null;
    });
    it("provides default form validation rules which require the value to be a valid date", function () {
        var value = "2018-01-01";
        expect(validate_js_1.validate({ birthDate: value }, { birthDate: DateField_1.DateField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow invalid date", function () {
        var value = "asdfasdf";
        expect(validate_js_1.validate({ birthDate: value }, { birthDate: DateField_1.DateField.defaultValidationRules })).to.deep.equal({
            birthDate: ["Birth date must be a valid date"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(DateField_1.DateField.isValidType(value)).to.be.true;
    });
    it("considers a Date to be a valid type", function () {
        var value = new Date();
        expect(DateField_1.DateField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-string to be a valid type", function () {
        var value = 7;
        expect(DateField_1.DateField.isValidType(value)).to.be.false;
    });
    it("transforms a Date into the correct Date string", function () {
        var serializedDate = "2018-02-14";
        var date = date_fns_1.parse(serializedDate, "YYYY-MM-DD", new Date());
        expect(DateField_1.DateField.transform(date)).to.equal(serializedDate);
    });
    it("normalizes a Date string into its corresponding Date object", function () {
        var serializedDate = "2018-02-14";
        var date = date_fns_1.parse(serializedDate, "YYYY-MM-DD", new Date());
        expect(DateField_1.DateField.normalize(serializedDate)).to.deep.equal(date);
    });
    it("should be serialized", function () {
        expect(DateField_1.DateField.serialize).to.be.true;
    });
});
//# sourceMappingURL=DateField.test.js.map