"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Field_1 = require("./Field");
var FieldType_1 = require("../FieldType");
function isEnum(fieldEnum, options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        var EnumField = FieldType_1.createEnumField(fieldEnum);
        if (!options.relatedFieldName) {
            options.relatedFieldName = key + "Id";
        }
        if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: function () {
                    return this.getField(options.relatedFieldName);
                },
                set: function (value) {
                    return this.setField(options.relatedFieldName, value);
                },
                enumerable: true,
                configurable: true,
            });
        }
        Field_1.field(EnumField, options)(target, key);
    };
}
exports.isEnum = isEnum;
//# sourceMappingURL=IsEnum.js.map