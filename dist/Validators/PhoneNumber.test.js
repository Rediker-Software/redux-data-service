"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var PhoneNumber_1 = require("./PhoneNumber");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
var expect = intern.getPlugin("chai").expect;
describe("validator: phoneNumber", function () {
    before(function () {
        PhoneNumber_1.initializePhoneNumberValidator(validate_js_1.validate);
    });
    it("provides validation rules which require the value to be a phone number", function () {
        var value = "+1999999999";
        expect(validate_js_1.validate({ homePhone: value }, { homePhone: { phoneNumber: true } })).to.be.undefined;
    });
    it("provides validation rules which do not allow incorrectly formatted phone numbers", function () {
        var value = "(123) 456-7890";
        expect(validate_js_1.validate({ homePhone: value }, { homePhone: { phoneNumber: true } })).to.deep.equal({
            homePhone: ["Home phone must be a valid phone number"],
        });
    });
});
