"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
exports.ArrayField = {
    serialize: true,
    defaultValidationRules: { type: "array" },
    defaultValue: [],
    isValidType: function (value) { return value == null || validate_js_1.isArray(value); },
};
//# sourceMappingURL=ArrayField.js.map