"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var DateTimeField_1 = require("./DateTimeField");
var Validators_1 = require("../../Validators");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: DateTimeField", function () {
    before(function () {
        Validators_1.initializeDateTimeValidator(validate_js_1.validate);
    });
    it("has correct default value", function () {
        expect(DateTimeField_1.DateTimeField).to.have.property("defaultValue").to.be.null;
    });
    it("provides default form validation rules which require the value to be a valid datetime", function () {
        var value = "2018-01-01T05:06:07";
        expect(validate_js_1.validate({ birthDate: value }, { birthDate: DateTimeField_1.DateTimeField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow invalid datetime", function () {
        var value = "asdfasdf";
        expect(validate_js_1.validate({ birthDate: value }, { birthDate: DateTimeField_1.DateTimeField.defaultValidationRules })).to.deep.equal({
            birthDate: ["Birth date must be a valid date"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(DateTimeField_1.DateTimeField.isValidType(value)).to.be.true;
    });
    it("considers a Date to be a valid type", function () {
        var value = new Date();
        expect(DateTimeField_1.DateTimeField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-string to be a valid type", function () {
        var value = 7;
        expect(DateTimeField_1.DateTimeField.isValidType(value)).to.be.false;
    });
    it("transforms a Date into its corresponding ISO string", function () {
        var value = new Date();
        expect(DateTimeField_1.DateTimeField.transform(value)).to.equal(value.toISOString());
    });
    it("normalizes a Date ISO string into its corresponding Date object", function () {
        var date = new Date();
        var value = date.toISOString();
        expect(DateTimeField_1.DateTimeField.normalize(value)).to.deep.equal(date);
    });
    it("should be serialized", function () {
        expect(DateTimeField_1.DateTimeField.serialize).to.be.true;
    });
});
