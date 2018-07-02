"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var Lodash_1 = require("Utils/Lodash");
var Services_1 = require("Services");
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
        return fp_1.flow(fp_1.pickBy(fp_1.property("serialize")), Lodash_1.mapValuesWithKeys(this.transformField(model)))(this.fields);
    };
    BaseSerializer.prototype.normalize = function (data) {
        var _a = fp_1.flow(fp_1.keys, fp_1.partition(this.isRelationship))(data), relationshipKeys = _a[0], fieldKeys = _a[1];
        for (var _i = 0, relationshipKeys_1 = relationshipKeys; _i < relationshipKeys_1.length; _i++) {
            var key = relationshipKeys_1[_i];
            var service = Services_1.getDataService(this.relationships[key].serviceName);
            var relatedModel = service.serializer.normalize(data[key]);
            service.actions.pushRecord(relatedModel).invoke();
        }
        var modelData = fp_1.flow(fp_1.pick(fieldKeys), Lodash_1.mapValuesWithKeys(this.normalizeField(data)))(this.fields);
        return new this.ModelClass(modelData);
    };
    return BaseSerializer;
}());
exports.BaseSerializer = BaseSerializer;
//# sourceMappingURL=BaseSerializer.js.map