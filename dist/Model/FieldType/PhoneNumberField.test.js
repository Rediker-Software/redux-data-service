"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var faker_1 = require("faker");
var PhoneNumberField_1 = require("./PhoneNumberField");
var Validators_1 = require("../../Validators");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: PhoneNumberField", function () {
    before(function () {
        Validators_1.initializePhoneNumberValidator(validate_js_1.validate);
    });
    it("has correct default value", function () {
        expect(PhoneNumberField_1.PhoneNumberField).to.have.property("defaultValue").to.equal("");
    });
    it("provides default form validation rules which require the value to be a valid phone number", function () {
        var value = "1234567890";
        expect(validate_js_1.validate({ homePhone: value }, { homePhone: PhoneNumberField_1.PhoneNumberField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow invalid phone numbers", function () {
        var value = "888.222.3334";
        expect(validate_js_1.validate({ homePhone: value }, { homePhone: PhoneNumberField_1.PhoneNumberField.defaultValidationRules })).to.deep.equal({
            homePhone: ["Home phone must be a valid phone number"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(PhoneNumberField_1.PhoneNumberField.isValidType(value)).to.be.true;
    });
    it("considers a string to be a valid type", function () {
        var value = "asdf";
        expect(PhoneNumberField_1.PhoneNumberField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-phoneNumber instance to be a valid type", function () {
        var value = 7;
        expect(PhoneNumberField_1.PhoneNumberField.isValidType(value)).to.be.false;
    });
    it("should be serialized", function () {
        expect(PhoneNumberField_1.PhoneNumberField.serialize).to.be.true;
    });
    it("normalizes any value into a string", function () {
        var randomNumber = faker_1.random.number();
        expect(PhoneNumberField_1.PhoneNumberField.normalize(randomNumber)).to.be.a("string").and.to.equal(String(randomNumber));
    });
});
