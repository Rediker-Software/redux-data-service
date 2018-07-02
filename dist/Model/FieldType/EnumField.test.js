"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var EnumField_1 = require("./EnumField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
var TestEnum;
(function (TestEnum) {
    TestEnum[TestEnum["hello"] = 0] = "hello";
    TestEnum[TestEnum["world"] = 1] = "world";
})(TestEnum || (TestEnum = {}));
describe("FieldType: EnumField", function () {
    var EnumField;
    beforeEach(function () {
        EnumField = EnumField_1.createEnumField(TestEnum);
    });
    it("has correct default value", function () {
        expect(EnumField).to.have.property("defaultValue").to.be.null;
    });
    it("provides default form validation rules which require the value to be one of the given enum members", function () {
        var value = TestEnum.hello;
        var validation = validate_js_1.validate({ testField: value }, { testField: EnumField.defaultValidationRules });
        expect(validation).to.be.undefined;
    });
    it("provides default form validation rules which do not allow non-null non-enum types", function () {
        var value = 7;
        var validation = validate_js_1.validate({ testField: value }, { testField: EnumField.defaultValidationRules });
        expect(validation).to.deep.equal({
            testField: ["Selected value is not a valid choice"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(EnumField.isValidType(value)).to.be.true;
    });
    it("considers a member of the given enum to be a valid type", function () {
        var value = TestEnum.world;
        expect(EnumField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-enum member to be a valid type", function () {
        var value = 7;
        expect(EnumField.isValidType(value)).to.be.false;
    });
    it("should not be serialized", function () {
        expect(EnumField.serialize).to.be.false;
    });
});
//# sourceMappingURL=EnumField.test.js.map