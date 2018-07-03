"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var date_fns_1 = require("date-fns");
exports.TimeField = {
    serialize: true,
    defaultValidationRules: { datetime: { timeOnly: true, message: "must be a valid time" } },
    defaultValue: null,
    isValidType: function (value) { return value == null || validate_js_1.isDate(value); },
    transform: function (date) { return date != null ? date_fns_1.format(date, "hh:mm:ss a") : null; },
    normalize: function (serializedDate) { return (serializedDate != null
        ? date_fns_1.parse(serializedDate, "hh:mm:ss a", new Date())
        : null); },
};
