"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/takeUntil");
require("rxjs/add/operator/skip");
var Subject_1 = require("rxjs/Subject");
var validate_js_1 = require("validate.js");
var lodash_1 = require("lodash");
var fp_1 = require("lodash/fp");
var Services_1 = require("../Services");
var FieldType_1 = require("./FieldType");
var Decorators_1 = require("./Decorators");
var Utils_1 = require("../Utils");
var Model = (function () {
    function Model(modelData, meta, relatedModels) {
        if (meta === void 0) { meta = {}; }
        if (relatedModels === void 0) { relatedModels = {}; }
        this._isDestroying = false;
        this.modelData = modelData;
        this.relatedModels = relatedModels;
        this.meta = __assign({ isLoading: false, isShadow: false, errors: null, original: null }, meta);
    }
    Model.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var validationErrors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validationErrors = this.validate(true);
                        if (!lodash_1.isEmpty(validationErrors)) {
                            throw validationErrors;
                        }
                        if (!this.hasUnsavedChanges) return [3, 3];
                        return [4, this.saveRelatedModels()];
                    case 1:
                        _a.sent();
                        return [4, this.saveModel()];
                    case 2: return [2, _a.sent()];
                    case 3: return [2, this];
                }
            });
        });
    };
    Model.prototype.saveModel = function () {
        var _this = this;
        var service = Services_1.getDataService(this.serviceName);
        var action = (this.isNew) ? service.actions.createRecord : service.actions.updateRecord;
        return new Promise(function (resolve, reject) {
            action({ id: _this.id }, {
                onSuccess: function (model) { return resolve(model); },
                onError: function (error) { return reject("xhr" in error ? error.xhr.response : error); },
            }).invoke();
        });
    };
    Model.prototype.saveRelatedModels = function () {
        var _this = this;
        var promises = [];
        lodash_1.forEach(this.relatedModels, function (relatedModel, key) {
            if (relatedModel && "isDirty" in relatedModel && relatedModel.isDirty && !_this.fields[key].serialize) {
                var promise = relatedModel.saveModel();
                promise.then(function (newRelatedModel) { return _this.setRelated(key, newRelatedModel); });
                promises.push(promise);
            }
        });
        return Promise.all(promises);
    };
    Model.prototype.validate = function (includeRelatedModels) {
        if (includeRelatedModels === void 0) { includeRelatedModels = false; }
        var _a = this.modelData, id = _a.id, dateUpdated = _a.dateUpdated, dateDeleted = _a.dateDeleted, data = __rest(_a, ["id", "dateUpdated", "dateDeleted"]);
        var errors = validate_js_1.validate(data, this.validationRules, { fullMessages: false }) || {};
        if (includeRelatedModels) {
            errors = fp_1.flow(fp_1.omitBy(function (relatedModel) { return relatedModel == null || !relatedModel.isDirty; }), fp_1.mapValues(function (relatedModel) { return relatedModel.validate(); }), Utils_1.flattenObjectKeys, fp_1.assign(errors))(this.relatedModels);
        }
        if (!(lodash_1.isEmpty(this.errors) && lodash_1.isEmpty(errors))) {
            this.errors = errors;
        }
        return errors;
    };
    Model.prototype.validateField = function (fieldName) {
        var _a;
        var errors = this.errors || {};
        var validationRules = this.getValidationRulesForField(fieldName);
        var value = lodash_1.get(this, fieldName);
        var validationResult = validate_js_1.single(value, validationRules);
        this.errors = lodash_1.isEmpty(validationResult)
            ? lodash_1.omit(errors, fieldName)
            : __assign({}, errors, (_a = {}, _a[fieldName] = validationResult, _a));
        return validationResult;
    };
    Model.prototype.getValidationRulesForField = function (fieldName) {
        var validationRulesPath = fieldName.split(".");
        validationRulesPath.splice(validationRulesPath.length - 1, 0, "validationRules");
        return lodash_1.get(this, validationRulesPath, {});
    };
    Model.prototype.reset = function () {
        if (this.isNew) {
            this.unload();
        }
        else if (this.isDirty) {
            var model = this.applyUpdates(this.meta.original, { original: null });
            Services_1.getDataService(this.serviceName)
                .actions
                .pushRecord(model)
                .invoke();
        }
    };
    Model.prototype.unload = function () {
        Services_1.getDataService(this.serviceName)
            .actions
            .unloadRecord({ id: this.id })
            .invoke();
    };
    Model.prototype.forceReload = function () {
        if (!this.isNew) {
            Services_1.getDataService(this.serviceName)
                .actions
                .fetchRecord({ id: this.id }, { forceReload: true })
                .invoke();
        }
    };
    Model.prototype.applyUpdates = function (modelData, meta, relatedModels) {
        if (modelData === void 0) { modelData = null; }
        if (meta === void 0) { meta = {}; }
        if (relatedModels === void 0) { relatedModels = {}; }
        if (!lodash_1.isEmpty(modelData)) {
            for (var key in modelData) {
                this.checkFieldUpdateIsAllowed(key, modelData[key]);
            }
            if (!this.isDirty) {
                meta.original = this.modelData;
            }
            modelData = lodash_1.merge({}, this.modelData, modelData);
        }
        meta = __assign({}, this.meta, meta);
        relatedModels = __assign({}, this.relatedModels, relatedModels);
        var service = Services_1.getDataService(this.serviceName);
        return new service.ModelClass(modelData || this.modelData, meta, relatedModels);
    };
    Model.prototype.initializeNewModel = function () {
        return;
    };
    Model.prototype.getField = function (fieldName, defaultValue) {
        return fieldName in this.modelData ? this.modelData[fieldName] : defaultValue;
    };
    Model.prototype.checkFieldUpdateIsAllowed = function (key, value) {
        if (key in this.fields) {
            var fieldType = this.fields[key];
            if (!fieldType.isValidType(value)) {
                throw new TypeError(this.serviceName + ": Value for field \"" + key + "\" invalid. Provided " + typeof value + ": " + value);
            }
        }
        else {
            throw new ReferenceError(this.serviceName + ": Field \"" + key + "\" not found in the Model. Did you forget to add an @attr decorator?");
        }
    };
    Model.prototype.setField = function (fieldName, value) {
        this.checkFieldUpdateIsAllowed(fieldName, value);
        Services_1.getDataService(this.serviceName).actions.setField({ id: this.id, fieldName: fieldName, value: value }).invoke();
    };
    Model.prototype.getRelated = function (fieldName) {
        var _this = this;
        if (fieldName in this.relatedModels) {
            return this.relatedModels[fieldName];
        }
        if (!this.relationships.hasOwnProperty(fieldName)) {
            return undefined;
        }
        var relationship = this.relationships[fieldName];
        var relatedService = Services_1.getDataService(relationship.serviceName);
        var relatedIDorIDs = this.getField(relationship.relatedFieldName);
        if (this.isShadow && relationship.type === Decorators_1.RelationshipType.BelongsTo) {
            this.relatedModels[fieldName] = relatedService.getShadowObject();
        }
        else if (relationship.type === Decorators_1.RelationshipType.HasMany && lodash_1.isEmpty(relatedIDorIDs)) {
            this.relatedModels[fieldName] = [];
        }
        if (lodash_1.isEmpty(relatedIDorIDs) || this.isDestroying) {
            return this.relatedModels[fieldName];
        }
        var observable = (relationship.type === Decorators_1.RelationshipType.BelongsTo)
            ? relatedService.getById(relatedIDorIDs)
            : relatedService.getByIds(relatedIDorIDs);
        var service = Services_1.getDataService(this.serviceName);
        observable
            .takeUntil(this.getWillDestroyObservable$())
            .subscribe(function (value) {
            if (!_this.relatedModels.hasOwnProperty(fieldName)) {
                _this.relatedModels[fieldName] = value;
            }
            else if (_this.relatedModels[fieldName] !== value) {
                service
                    .actions
                    .setRelationship({ id: _this.id, fieldName: fieldName, value: value })
                    .invoke();
            }
        });
        return this.relatedModels[fieldName];
    };
    Model.prototype.setRelated = function (fieldName, value) {
        if (!this.relationships.hasOwnProperty(fieldName)) {
            throw new ReferenceError(this.serviceName + ": Relationship field \"" + fieldName + "\" not found in the Model's relationships. Did you forget to add a relationship decorator?");
        }
        var relationship = this.relationships[fieldName];
        var relatedFieldName = relationship.relatedFieldName, type = relationship.type;
        if (lodash_1.isEmpty(value)) {
            this.setField(relatedFieldName, value);
            return;
        }
        if (type === Decorators_1.RelationshipType.BelongsTo) {
            this.setField(relatedFieldName, value.id);
        }
        else if (type === Decorators_1.RelationshipType.HasMany) {
            this.setField(relatedFieldName, value.map(function (item) { return item.id; }));
        }
        else {
            throw new TypeError(this.serviceName + ": Relationship type \"" + type + "\" unknown.");
        }
    };
    Model.prototype.triggerWillDestroyObservable = function () {
        if (this._willDestroyObservable$) {
            this._willDestroyObservable$.next(true);
        }
    };
    Model.prototype.markForDestruction = function () {
        var _this = this;
        this._isDestroying = true;
        setTimeout(function () {
            _this.triggerWillDestroyObservable();
        }, 0);
    };
    Object.defineProperty(Model.prototype, "isDestroying", {
        get: function () {
            return this._isDestroying;
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.getWillDestroyObservable$ = function () {
        if (!this._willDestroyObservable$) {
            this._willDestroyObservable$ = new Subject_1.Subject();
            if (this.isDestroying) {
                this.triggerWillDestroyObservable();
            }
        }
        return this._willDestroyObservable$;
    };
    Model.prototype.setMetaField = function (fieldName, value) {
        if (this.meta[fieldName] !== value) {
            Services_1.getDataService(this.serviceName)
                .actions
                .setMetaField({ id: this.id, fieldName: fieldName, value: value })
                .invoke();
        }
    };
    Object.defineProperty(Model.prototype, "isLoading", {
        get: function () {
            return this.meta.isLoading;
        },
        set: function (value) {
            this.setMetaField("isLoading", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "isShadow", {
        get: function () {
            return this.meta.isShadow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "errors", {
        get: function () {
            return this.meta.errors;
        },
        set: function (value) {
            this.setMetaField("errors", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "isDirty", {
        get: function () {
            return this.meta.original != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "hasUnsavedChanges", {
        get: function () {
            return this.isDirty || Object
                .values(this.relatedModels)
                .some(function (relatedModel) { return "isDirty" in relatedModel && relatedModel.isDirty; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "isNew", {
        get: function () {
            return !this.isShadow && this.modelData.id && this.modelData.id.startsWith("new");
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.getFieldError = function (fieldName) {
        if (lodash_1.isEmpty(this.errors)) {
            return {};
        }
        else {
            var error = this.errors[fieldName];
            return (error instanceof Array) ? error[0] : error;
        }
    };
    __decorate([
        Decorators_1.attr(FieldType_1.StringField, { serialize: false }),
        __metadata("design:type", String)
    ], Model.prototype, "id", void 0);
    __decorate([
        Decorators_1.attr(FieldType_1.DateTimeField, { serialize: false }),
        __metadata("design:type", Date)
    ], Model.prototype, "dateUpdated", void 0);
    __decorate([
        Decorators_1.attr(FieldType_1.DateTimeField, { serialize: false }),
        __metadata("design:type", Date)
    ], Model.prototype, "dateDeleted", void 0);
    return Model;
}());
exports.Model = Model;
