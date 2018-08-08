"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var faker_1 = require("faker");
var URLField_1 = require("./URLField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: URLField", function () {
    it("has correct default value", function () {
        expect(URLField_1.URLField).to.have.property("defaultValue").to.equal("");
    });
    it("provides default form validation rules which require the value to be a valid url", function () {
        var value = "http://example.com";
        expect(validate_js_1.validate({ website: value }, { website: URLField_1.URLField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow invalid url", function () {
        var value = "asdfasdf";
        expect(validate_js_1.validate({ website: value }, { website: URLField_1.URLField.defaultValidationRules })).to.deep.equal({
            website: ["Website is not a valid url"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(URLField_1.URLField.isValidType(value)).to.be.true;
    });
    it("considers a string to be a valid type", function () {
        var value = "asdf";
        expect(URLField_1.URLField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-url instance to be a valid type", function () {
        var value = 7;
        expect(URLField_1.URLField.isValidType(value)).to.be.false;
    });
    it("should be serialized", function () {
        expect(URLField_1.URLField.serialize).to.be.true;
    });
    it("normalizes any value into a string", function () {
        var randomNumber = faker_1.random.number();
        expect(URLField_1.URLField.normalize(randomNumber)).to.be.a("string").and.to.equal(String(randomNumber));
    });
});
