"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var BooleanField_1 = require("./BooleanField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: BooleanField", function () {
    it("has correct default value", function () {
        expect(BooleanField_1.BooleanField).to.have.property("defaultValue").to.deep.equal(false);
    });
    it("provides default form validation rules which require the value to be an boolean", function () {
        var value = false;
        expect(validate_js_1.validate({ student: value }, { student: BooleanField_1.BooleanField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow non-null non-boolean types", function () {
        var value = 7;
        expect(validate_js_1.validate({ student: value }, { student: BooleanField_1.BooleanField.defaultValidationRules })).to.deep.equal({
            student: ["Student must be of type boolean"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(BooleanField_1.BooleanField.isValidType(value)).to.be.true;
    });
    it("considers an boolean instance to be a valid type", function () {
        var value = false;
        expect(BooleanField_1.BooleanField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-boolean instance to be a valid type", function () {
        var value = 7;
        expect(BooleanField_1.BooleanField.isValidType(value)).to.be.false;
    });
    it("should be serialized", function () {
        expect(BooleanField_1.BooleanField.serialize).to.be.true;
    });
});
//# sourceMappingURL=BooleanField.test.js.map