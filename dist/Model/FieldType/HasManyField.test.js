"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var HasManyField_1 = require("./HasManyField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: HasManyField", function () {
    it("has correct default value", function () {
        expect(HasManyField_1.HasManyField).to.have.property("defaultValue").to.deep.equal([]);
    });
    it("provides default form validation rules which require the value to be an array", function () {
        var value = [];
        expect(validate_js_1.validate({ students: value }, { students: HasManyField_1.HasManyField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow non-null non-array types", function () {
        var value = 7;
        expect(validate_js_1.validate({ students: value }, { students: HasManyField_1.HasManyField.defaultValidationRules })).to.deep.equal({
            students: ["Students must be of type array"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(HasManyField_1.HasManyField.isValidType(value)).to.be.true;
    });
    it("considers an array instance to be a valid type", function () {
        var value = [];
        expect(HasManyField_1.HasManyField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-array instance to be a valid type", function () {
        var value = 7;
        expect(HasManyField_1.HasManyField.isValidType(value)).to.be.false;
    });
    it("should not be serialized", function () {
        expect(HasManyField_1.HasManyField.serialize).to.be.false;
    });
});
//# sourceMappingURL=HasManyField.test.js.map