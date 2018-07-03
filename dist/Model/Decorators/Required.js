"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validation_1 = require("./Validation");
function required(message, allowEmpty) {
    if (message === void 0) { message = "is required"; }
    if (allowEmpty === void 0) { allowEmpty = false; }
    return function (target, key) {
        return Validation_1.validation({ presence: { message: message, allowEmpty: allowEmpty } })(target, key);
    };
}
exports.required = required;
