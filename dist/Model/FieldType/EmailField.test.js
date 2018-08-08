"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var faker_1 = require("faker");
var EmailField_1 = require("./EmailField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: EmailField", function () {
    it("has correct default value", function () {
        expect(EmailField_1.EmailField).to.have.property("defaultValue").to.equal("");
    });
    it("provides default form validation rules which require the value to be a valid email", function () {
        var value = "hello@example.com";
        expect(validate_js_1.validate({ homeEmail: value }, { homeEmail: EmailField_1.EmailField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow invalid email", function () {
        var value = "asdfasdf";
        expect(validate_js_1.validate({ homeEmail: value }, { homeEmail: EmailField_1.EmailField.defaultValidationRules })).to.deep.equal({
            homeEmail: ["Home email is not a valid email"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(EmailField_1.EmailField.isValidType(value)).to.be.true;
    });
    it("considers a string to be a valid type", function () {
        var value = "asdf";
        expect(EmailField_1.EmailField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-email instance to be a valid type", function () {
        var value = 7;
        expect(EmailField_1.EmailField.isValidType(value)).to.be.false;
    });
    it("should be serialized", function () {
        expect(EmailField_1.EmailField.serialize).to.be.true;
    });
    it("normalizes any value into a string", function () {
        var randomNumber = faker_1.random.number();
        expect(EmailField_1.EmailField.normalize(randomNumber)).to.be.a("string").and.to.equal(String(randomNumber));
    });
});
