"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNestedFieldName = function (path) {
    var fieldNameParts = path.split(".");
    return fieldNameParts[fieldNameParts.length - 1];
};
