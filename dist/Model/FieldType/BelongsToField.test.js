"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var BelongsToField_1 = require("./BelongsToField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: BelongsToField", function () {
    it("has correct default value", function () {
        expect(BelongsToField_1.BelongsToField).to.have.property("defaultValue").to.deep.equal(null);
    });
    it("provides default form validation rules which require the value to be an object", function () {
        var value = { hello: "world" };
        expect(validate_js_1.validate({ student: value }, { student: BelongsToField_1.BelongsToField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow non-null non-object types", function () {
        var value = 7;
        expect(validate_js_1.validate({ student: value }, { student: BelongsToField_1.BelongsToField.defaultValidationRules })).to.deep.equal({
            student: ["Student must be of type object"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(BelongsToField_1.BelongsToField.isValidType(value)).to.be.true;
    });
    it("considers an object instance to be a valid type", function () {
        var value = { hello: "world" };
        expect(BelongsToField_1.BelongsToField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-object instance to be a valid type", function () {
        var value = 7;
        expect(BelongsToField_1.BelongsToField.isValidType(value)).to.be.false;
    });
    it("should not be serialized", function () {
        expect(BelongsToField_1.BelongsToField.serialize).to.be.false;
    });
});
