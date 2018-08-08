"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
exports.URLField = {
    serialize: true,
    defaultValidationRules: { url: { allowLocal: true } },
    defaultValue: "",
    isValidType: function (value) { return value == null || validate_js_1.isString(value); },
    normalize: function (value) { return String(value); },
};
