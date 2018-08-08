"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
exports.DateTimeField = {
    serialize: true,
    defaultValidationRules: { datetime: true },
    defaultValue: null,
    isValidType: function (value) { return value == null || validate_js_1.isDate(value); },
    transform: function (date) { return date != null ? date.toISOString() : null; },
    normalize: function (value) { return (validate_js_1.isDate(value)
        ? value
        : (value != null
            ? new Date(value)
            : null)); },
};
