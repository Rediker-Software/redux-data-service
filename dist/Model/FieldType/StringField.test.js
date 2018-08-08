"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var faker_1 = require("faker");
var StringField_1 = require("./StringField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: StringField", function () {
    it("has correct default value", function () {
        expect(StringField_1.StringField).to.have.property("defaultValue").to.equal("");
    });
    it("provides default form validation rules which require the value to be an string", function () {
        var value = "Rich Rediker";
        expect(validate_js_1.validate({ name: value }, { name: StringField_1.StringField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow non-null non-string types", function () {
        var value = 7;
        expect(validate_js_1.validate({ name: value }, { name: StringField_1.StringField.defaultValidationRules })).to.deep.equal({
            name: ["Name must be of type string"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(StringField_1.StringField.isValidType(value)).to.be.true;
    });
    it("considers a string instance to be a valid type", function () {
        var value = "asdf";
        expect(StringField_1.StringField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-string instance to be a valid type", function () {
        var value = 7;
        expect(StringField_1.StringField.isValidType(value)).to.be.false;
    });
    it("should be serialized", function () {
        expect(StringField_1.StringField.serialize).to.be.true;
    });
    it("normalizes any value into a string", function () {
        var randomNumber = faker_1.random.number();
        expect(StringField_1.StringField.normalize(randomNumber)).to.be.a("string").and.to.equal(String(randomNumber));
    });
});
