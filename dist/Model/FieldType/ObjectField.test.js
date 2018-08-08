"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var faker_1 = require("faker");
var ObjectField_1 = require("./ObjectField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: ObjectField", function () {
    it("has correct default value", function () {
        expect(ObjectField_1.ObjectField).to.have.property("defaultValue").to.deep.equal(null);
    });
    it("provides default form validation rules which require the value to be an object", function () {
        var value = { hello: "world" };
        expect(validate_js_1.validate({ student: value }, { student: ObjectField_1.ObjectField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow non-null non-object types", function () {
        var value = 7;
        expect(validate_js_1.validate({ student: value }, { student: ObjectField_1.ObjectField.defaultValidationRules })).to.deep.equal({
            student: ["Student must be of type object"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(ObjectField_1.ObjectField.isValidType(value)).to.be.true;
    });
    it("considers an object instance to be a valid type", function () {
        var value = { hello: "world" };
        expect(ObjectField_1.ObjectField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-object instance to be a valid type", function () {
        var value = 7;
        expect(ObjectField_1.ObjectField.isValidType(value)).to.be.false;
    });
    it("should be serialized", function () {
        expect(ObjectField_1.ObjectField.serialize).to.be.true;
    });
    it("normalizes an object by returning the given value", function () {
        var randomObject = {
            asdf: faker_1.random.number(),
        };
        expect(ObjectField_1.ObjectField.normalize(randomObject)).to.equal(randomObject);
    });
});
