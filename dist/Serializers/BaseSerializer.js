"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var Utils_1 = require("../Utils");
var Services_1 = require("../Services");
var Decorators_1 = require("../Model/Decorators");
var BaseSerializer = (function () {
    function BaseSerializer(ModelClass) {
        var _this = this;
        this.isRelationship = function (key) { return (_this.relationships != null && (_this.relationships.hasOwnProperty(key))); };
        this.ModelClass = ModelClass;
    }
    Object.defineProperty(BaseSerializer.prototype, "relationships", {
        get: function () {
            return this.ModelClass.prototype.relationships;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSerializer.prototype, "fields", {
        get: function () {
            return this.ModelClass.prototype.fields;
        },
        enumerable: true,
        configurable: true
    });
    BaseSerializer.prototype.transformField = function (model) {
        return function (fieldType, fieldName) {
            var fieldValue = model[fieldName];
            if ("serviceName" in fieldType) {
                return Services_1.getDataService(fieldType.serviceName)
                    .serializer
                    .transform(fieldValue);
            }
            else if ("transform" in fieldType) {
                return fieldType.transform(fieldValue);
            }
            else {
                return fieldValue;
            }
        };
    };
    BaseSerializer.prototype.normalizeField = function (data) {
        return function (fieldType, fieldName) { return ("normalize" in fieldType
            ? fieldType.normalize(data[fieldName])
            : data[fieldName]); };
    };
    BaseSerializer.prototype.transform = function (model) {
        return fp_1.flow(fp_1.pickBy(fp_1.property("serialize")), Utils_1.mapValuesWithKeys(this.transformField(model)))(this.fields);
    };
    BaseSerializer.prototype.normalize = function (data) {
        var _a = fp_1.flow(fp_1.keys, fp_1.partition(this.isRelationship))(data), relationshipKeys = _a[0], fieldKeys = _a[1];
        var modelData = fp_1.flow(fp_1.pick(fieldKeys), Utils_1.mapValuesWithKeys(this.normalizeField(data)))(this.fields);
        var model = new this.ModelClass(modelData);
        for (var _i = 0, relationshipKeys_1 = relationshipKeys; _i < relationshipKeys_1.length; _i++) {
            var key = relationshipKeys_1[_i];
            var relationship = this.relationships[key];
            var relatedModelData = data[key];
            var relatedIdOrIds = this.processNestedRelationship(model, relatedModelData, relationship);
            if (!modelData.hasOwnProperty(relationship.relatedFieldName)) {
                modelData[relationship.relatedFieldName] = relatedIdOrIds;
            }
        }
        return model;
    };
    BaseSerializer.prototype.processNestedRelationship = function (model, nestedData, relationship) {
        var _this = this;
        if (relationship.type === Decorators_1.RelationshipType.BelongsTo) {
            var relatedModel = this.loadRelatedModel(model, nestedData, relationship);
            return relatedModel.id;
        }
        else if (relationship.type === Decorators_1.RelationshipType.HasMany && nestedData instanceof Array) {
            var relatedModels = nestedData.map(function (relatedModelData) { return _this.loadRelatedModel(model, relatedModelData, relationship); });
            return relatedModels.map(function (relatedModel) { return relatedModel.id; });
        }
    };
    BaseSerializer.prototype.loadRelatedModel = function (model, relatedModelData, relationship) {
        var modelRelatedFieldName = relationship.modelRelatedFieldName != null
            ? relationship.modelRelatedFieldName
            : model.serviceName + "Id";
        if (!relatedModelData.hasOwnProperty(modelRelatedFieldName)) {
            relatedModelData[modelRelatedFieldName] = model.id;
        }
        var service = Services_1.getDataService(relationship.serviceName);
        var relatedModel = service.serializer.normalize(relatedModelData);
        service.actions.pushRecord(relatedModel).invoke();
        return relatedModel;
    };
    return BaseSerializer;
}());
exports.BaseSerializer = BaseSerializer;
