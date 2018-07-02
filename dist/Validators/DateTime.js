"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
exports.getDateTimeFormat = function (options) {
    var format;
    if (options.format) {
        format = options.format;
    }
    else if (options.dateOnly) {
        format = "YYYY-MM-DD";
    }
    else if (options.timeOnly) {
        format = "hh:mm:ss a";
    }
    else {
        format = "YYYY-MM-DDTHH:mm:ss";
    }
    return format;
};
exports.initializeDateTimeValidator = function (validate) {
    return validate.extend(validate.validators.datetime, {
        parse: function (value, options) {
            var parsedDate = value;
            if (!(value instanceof Date)) {
                var format = exports.getDateTimeFormat(options);
                var date = new Date();
                parsedDate = date_fns_1.parse(value, format, date);
            }
            if (options.dateOnly) {
                return parsedDate.getTime() - (parsedDate.getTimezoneOffset() * 60 * 1000);
            }
            else {
                return parsedDate.getTime();
            }
        },
        format: function (value) {
            return value;
        },
    });
};
//# sourceMappingURL=DateTime.js.map