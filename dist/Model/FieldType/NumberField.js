"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
exports.NumberField = {
    serialize: true,
    defaultValidationRules: { numericality: true },
    defaultValue: 0,
    isValidType: function (value) { return value == null || validate_js_1.isNumber(value); },
};
//# sourceMappingURL=NumberField.js.map