"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var NumberField_1 = require("./NumberField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: NumberField", function () {
    it("has correct default value", function () {
        expect(NumberField_1.NumberField).to.have.property("defaultValue").to.equal(0);
    });
    it("provides default form validation rules which require the value to be a number", function () {
        var value = 7;
        expect(validate_js_1.validate({ age: value }, { age: NumberField_1.NumberField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow non-numeric input", function () {
        var value = "asdfasdf";
        expect(validate_js_1.validate({ age: value }, { age: NumberField_1.NumberField.defaultValidationRules })).to.deep.equal({
            age: ["Age is not a number"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(NumberField_1.NumberField.isValidType(value)).to.be.true;
    });
    it("considers a number to be a valid type", function () {
        var value = 7;
        expect(NumberField_1.NumberField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-number instance to be a valid type", function () {
        var value = "asdf";
        expect(NumberField_1.NumberField.isValidType(value)).to.be.false;
    });
    it("should be serialized", function () {
        expect(NumberField_1.NumberField.serialize).to.be.true;
    });
});
