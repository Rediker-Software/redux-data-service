"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var ArrayField_1 = require("./ArrayField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: ArrayField", function () {
    it("has correct default value", function () {
        expect(ArrayField_1.ArrayField).to.have.property("defaultValue").to.deep.equal([]);
    });
    it("provides default form validation rules which require the value to be an array", function () {
        var value = [];
        expect(validate_js_1.validate({ students: value }, { students: ArrayField_1.ArrayField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow non-null non-array types", function () {
        var value = 7;
        expect(validate_js_1.validate({ students: value }, { students: ArrayField_1.ArrayField.defaultValidationRules })).to.deep.equal({
            students: ["Students must be of type array"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(ArrayField_1.ArrayField.isValidType(value)).to.be.true;
    });
    it("considers an array instance to be a valid type", function () {
        var value = [];
        expect(ArrayField_1.ArrayField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-array instance to be a valid type", function () {
        var value = 7;
        expect(ArrayField_1.ArrayField.isValidType(value)).to.be.false;
    });
    it("should be serialized", function () {
        expect(ArrayField_1.ArrayField.serialize).to.be.true;
    });
});
//# sourceMappingURL=ArrayField.test.js.map