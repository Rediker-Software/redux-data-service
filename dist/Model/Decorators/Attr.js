"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Field_1 = require("./Field");
function attr(fieldType, options) {
    if (options === void 0) { options = {}; }
    var defaultValue = options.defaultValue || fieldType.defaultValue;
    return function (target, key) {
        if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: function () {
                    return this.getField(key, defaultValue);
                },
                set: function (value) {
                    return this.setField(key, value);
                },
                enumerable: true,
                configurable: true,
            });
        }
        Field_1.field(fieldType, options)(target, key);
    };
}
exports.attr = attr;
