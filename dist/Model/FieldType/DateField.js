"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
var date_fns_1 = require("date-fns");
exports.DateField = {
    serialize: true,
    defaultValidationRules: { datetime: { dateOnly: true } },
    defaultValue: null,
    isValidType: function (value) { return value == null || validate_js_1.isDate(value); },
    transform: function (date) { return date != null ? date_fns_1.format(date, "YYYY-MM-DD") : null; },
    normalize: function (serializedDate) { return (serializedDate != null
        ? date_fns_1.parse(serializedDate, "YYYY-MM-DD", new Date())
        : null); },
};
//# sourceMappingURL=DateField.js.map