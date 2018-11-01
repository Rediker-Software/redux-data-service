"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var lodash_1 = require("lodash");
var Utils_1 = require("../Utils");
var Model_1 = require("../Model");
var Services_1 = require("../Services");
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
        var _this = this;
        return function (fieldType, fieldName) { return __awaiter(_this, void 0, void 0, function () {
            var fieldValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fieldValue = model[fieldName];
                        if (!(fieldValue != null)) return [3, 4];
                        if (!(this.relationships && fieldName in this.relationships)) return [3, 2];
                        return [4, this.transformRelationship(fieldValue, this.relationships[fieldName])];
                    case 1:
                        fieldValue = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!("transform" in fieldType)) return [3, 4];
                        return [4, fieldType.transform(fieldValue)];
                    case 3:
                        fieldValue = _a.sent();
                        _a.label = 4;
                    case 4: return [2, [fieldName, fieldValue]];
                }
            });
        }); };
    };
    BaseSerializer.prototype.normalizeField = function (data) {
        var _this = this;
        return function (fieldType, fieldName) { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = data[fieldName];
                        if (!fieldType.normalize) return [3, 2];
                        return [4, fieldType.normalize(value)];
                    case 1:
                        value = _a.sent();
                        _a.label = 2;
                    case 2: return [2, [fieldName, value]];
                }
            });
        }); };
    };
    BaseSerializer.prototype.transform = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var transformPromises, pairs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transformPromises = fp_1.flow(fp_1.pickBy(fp_1.property("serialize")), Utils_1.mapWithKeys(this.transformField(model)))(this.fields);
                        return [4, Promise.all(transformPromises)];
                    case 1:
                        pairs = _a.sent();
                        return [2, lodash_1.fromPairs(pairs)];
                }
            });
        });
    };
    BaseSerializer.prototype.normalize = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, relationshipKeys, fieldKeys, normalizeFieldPromises, _b, _c, _d, pairs, modelData, model, _i, relationshipKeys_1, key, relationship, relatedModelData, relatedIdOrIds;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = fp_1.flow(fp_1.keys, fp_1.partition(this.isRelationship))(data), relationshipKeys = _a[0], fieldKeys = _a[1];
                        _b = fp_1.flow;
                        _c = [fp_1.pick(fieldKeys)];
                        _d = Utils_1.mapWithKeys;
                        return [4, this.normalizeField(data)];
                    case 1:
                        normalizeFieldPromises = _b.apply(void 0, _c.concat([_d.apply(void 0, [_e.sent()])]))(this.fields);
                        return [4, Promise.all(normalizeFieldPromises)];
                    case 2:
                        pairs = _e.sent();
                        modelData = lodash_1.fromPairs(pairs);
                        model = new this.ModelClass(modelData);
                        _i = 0, relationshipKeys_1 = relationshipKeys;
                        _e.label = 3;
                    case 3:
                        if (!(_i < relationshipKeys_1.length)) return [3, 6];
                        key = relationshipKeys_1[_i];
                        relationship = this.relationships[key];
                        relatedModelData = data[key];
                        return [4, this.processNestedRelationship(model, relatedModelData, relationship)];
                    case 4:
                        relatedIdOrIds = _e.sent();
                        if (!modelData.hasOwnProperty(relationship.relatedFieldName)) {
                            modelData[relationship.relatedFieldName] = relatedIdOrIds;
                        }
                        _e.label = 5;
                    case 5:
                        _i++;
                        return [3, 3];
                    case 6: return [2, model];
                }
            });
        });
    };
    BaseSerializer.prototype.transformRelationship = function (fieldValue, relationship) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, promises;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = relationship.type;
                        switch (_a) {
                            case Model_1.RelationshipType.BelongsTo: return [3, 1];
                            case Model_1.RelationshipType.HasMany: return [3, 3];
                        }
                        return [3, 5];
                    case 1: return [4, this.transformRelatedModel(fieldValue)];
                    case 2: return [2, _b.sent()];
                    case 3:
                        promises = fieldValue.map(function (item) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, this.transformRelatedModel(item)];
                                case 1: return [2, _a.sent()];
                            }
                        }); }); });
                        return [4, Promise.all(promises)];
                    case 4: return [2, _b.sent()];
                    case 5: throw new TypeError("BaseSerializer: attempted to transform unknown relationship \"" + relationship.type + "\"");
                }
            });
        });
    };
    BaseSerializer.prototype.transformRelatedModel = function (relatedModel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Services_1.getDataService(relatedModel.serviceName)
                            .serializer
                            .transform(relatedModel)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    BaseSerializer.prototype.processNestedRelationship = function (model, nestedData, relationship) {
        return __awaiter(this, void 0, void 0, function () {
            var relatedModel, relatedModels;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(relationship.type === Model_1.RelationshipType.BelongsTo)) return [3, 2];
                        return [4, this.loadRelatedModel(model, nestedData, relationship)];
                    case 1:
                        relatedModel = _a.sent();
                        return [2, relatedModel.id];
                    case 2:
                        if (!(relationship.type === Model_1.RelationshipType.HasMany && nestedData instanceof Array)) return [3, 4];
                        return [4, Promise.all(nestedData.map(function (relatedModelData) { return _this.loadRelatedModel(model, relatedModelData, relationship); }))];
                    case 3:
                        relatedModels = _a.sent();
                        return [2, relatedModels.map(function (relatedModel) { return relatedModel.id; })];
                    case 4: return [2];
                }
            });
        });
    };
    BaseSerializer.prototype.loadRelatedModel = function (model, relatedModelData, relationship) {
        return __awaiter(this, void 0, void 0, function () {
            var modelRelatedFieldName, service, relatedModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modelRelatedFieldName = relationship.modelRelatedFieldName != null
                            ? relationship.modelRelatedFieldName
                            : model.serviceName + "Id";
                        if (!relatedModelData.hasOwnProperty(modelRelatedFieldName)) {
                            relatedModelData[modelRelatedFieldName] = model.id;
                        }
                        service = Services_1.getDataService(relationship.serviceName);
                        return [4, service.serializer.normalize(relatedModelData)];
                    case 1:
                        relatedModel = _a.sent();
                        service.actions.pushRecord(relatedModel).invoke();
                        return [2, relatedModel];
                }
            });
        });
    };
    return BaseSerializer;
}());
exports.BaseSerializer = BaseSerializer;
