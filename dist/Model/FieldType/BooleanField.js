"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
exports.BooleanField = {
    serialize: true,
    defaultValidationRules: { type: "boolean" },
    defaultValue: false,
    isValidType: function (value) { return value == null || validate_js_1.isBoolean(value); },
};
//# sourceMappingURL=BooleanField.js.map