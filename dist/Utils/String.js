"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNestedFieldName = function (path) {
    var fieldNameParts = path.split(".");
    return fieldNameParts[fieldNameParts.length - 1];
};
exports.addPenultimateFieldToPath = function (path, field) {
    var updatedPath = path.split(".");
    updatedPath.splice(updatedPath.length - 1, 0, field);
    return updatedPath;
};
