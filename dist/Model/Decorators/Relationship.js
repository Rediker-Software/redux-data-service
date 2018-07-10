"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var FieldType_1 = require("../FieldType");
var Field_1 = require("./Field");
var pluralize_1 = require("pluralize");
var RelationshipType;
(function (RelationshipType) {
    RelationshipType["BelongsTo"] = "BelongsTo";
    RelationshipType["HasMany"] = "HasMany";
})(RelationshipType = exports.RelationshipType || (exports.RelationshipType = {}));
exports.getFieldTypeForRelationship = function (relationshipType) {
    switch (relationshipType) {
        case RelationshipType.BelongsTo:
            return FieldType_1.BelongsToField;
        case RelationshipType.HasMany:
            return FieldType_1.HasManyField;
        default:
            throw new TypeError("Unknown relationship type " + relationshipType);
    }
};
exports.getRelatedFieldNameForRelationship = function (relationshipType, baseName) {
    switch (relationshipType) {
        case RelationshipType.BelongsTo:
            return baseName + "Id";
        case RelationshipType.HasMany:
            return baseName + "Ids";
        default:
            throw new TypeError("Unknown relationship type " + relationshipType);
    }
};
function relationship(relationshipType, options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        var _a;
        var singularKey = pluralize_1.singular(key);
        if (!options.serviceName) {
            options.serviceName = singularKey;
        }
        if (!options.relatedFieldName) {
            options.relatedFieldName = exports.getRelatedFieldNameForRelationship(relationshipType, singularKey);
        }
        if (process.env.NODE_ENV !== "production" && !options.serialize && !(options.relatedFieldName in target)) {
            throw new ReferenceError("Related field name \"" + options.relatedFieldName + "\" missing for relationship \"" + key + "\". Did you forget to add an @attr decorator?");
        }
        target.relationships = __assign({}, target.relationships, (_a = {}, _a[key] = {
            serviceName: options.serviceName,
            relatedFieldName: options.relatedFieldName,
            modelRelatedFieldName: options.modelRelatedFieldName,
            field: key,
            type: relationshipType,
        }, _a));
        if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: function () {
                    return this.getRelated(key);
                },
                set: function (value) {
                    return this.setRelated(key, value);
                },
                enumerable: true,
                configurable: true,
            });
        }
        Field_1.field(exports.getFieldTypeForRelationship(relationshipType), options)(target, key);
    };
}
exports.relationship = relationship;
