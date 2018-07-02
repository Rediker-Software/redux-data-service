"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validation_1 = require("./Validation");
var lodash_1 = require("lodash");
function field(fieldType, options) {
    if (options === void 0) { options = {}; }
    var fieldConfig = lodash_1.defaultsDeep({}, options, fieldType);
    var validationRules = fieldConfig.defaultValidationRules;
    return function (target, key) {
        var _a;
        target.fields = lodash_1.merge({}, target.fields, (_a = {}, _a[key] = fieldConfig, _a));
        Validation_1.validation(validationRules)(target, key);
    };
}
exports.field = field;
//# sourceMappingURL=Field.js.map