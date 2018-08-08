"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
exports.BooleanField = {
    serialize: true,
    defaultValidationRules: { type: "boolean" },
    defaultValue: false,
    isValidType: function (value) { return value == null || validate_js_1.isBoolean(value); },
    normalize: function (value) { return (value && typeof value === "string" && value.toLowerCase() === "false"
        ? false
        : Boolean(value)); },
};
