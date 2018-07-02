"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function validation(validationRules) {
    return function (target, key) {
        var _a;
        target.validationRules = lodash_1.merge({}, target.validationRules, (_a = {},
            _a[key] = validationRules,
            _a));
    };
}
exports.validation = validation;
//# sourceMappingURL=Validation.js.map