"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validateJS = require("validate.js");
var Validators = require("../Validators");
var lodash_1 = require("lodash");
exports.makeInitializeValidateJS = function (validate, validators) { return function () {
    return lodash_1.forEach(validators, function (initializer, name) {
        if (name.startsWith("initialize")) {
            initializer(validate);
        }
    });
}; };
exports.initializeValidateJS = exports.makeInitializeValidateJS(validateJS, Validators);
//# sourceMappingURL=InitializeValidateJS.js.map