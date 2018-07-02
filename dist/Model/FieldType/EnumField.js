"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.createEnumField = function (fieldEnum) {
    var enumValues = Object.values(fieldEnum);
    return {
        serialize: false,
        defaultValidationRules: {
            inclusion: {
                within: enumValues,
                message: "^Selected value is not a valid choice",
            },
        },
        defaultValue: null,
        isValidType: function (value) { return value == null || lodash_1.includes(fieldEnum, value); },
    };
};
//# sourceMappingURL=EnumField.js.map