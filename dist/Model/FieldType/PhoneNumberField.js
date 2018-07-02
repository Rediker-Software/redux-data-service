"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
exports.PhoneNumberField = {
    serialize: true,
    defaultValidationRules: { phoneNumber: true },
    defaultValue: "",
    isValidType: function (value) { return value == null || validate_js_1.isString(value); },
};
//# sourceMappingURL=PhoneNumberField.js.map