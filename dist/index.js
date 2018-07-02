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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Validators/DateTime", ["require", "exports", "date-fns"], function (require, exports, date_fns_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDateTimeFormat = function (options) {
        var format;
        if (options.format) {
            format = options.format;
        }
        else if (options.dateOnly) {
            format = "YYYY-MM-DD";
        }
        else if (options.timeOnly) {
            format = "hh:mm:ss a";
        }
        else {
            format = "YYYY-MM-DDTHH:mm:ss";
        }
        return format;
    };
    exports.initializeDateTimeValidator = function (validate) {
        return validate.extend(validate.validators.datetime, {
            parse: function (value, options) {
                var parsedDate = value;
                if (!(value instanceof Date)) {
                    var format = exports.getDateTimeFormat(options);
                    var date = new Date();
                    parsedDate = date_fns_1.parse(value, format, date);
                }
                if (options.dateOnly) {
                    return parsedDate.getTime() - (parsedDate.getTimezoneOffset() * 60 * 1000);
                }
                else {
                    return parsedDate.getTime();
                }
            },
            format: function (value) {
                return value;
            },
        });
    };
});
define("Validators/PhoneNumber", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initializePhoneNumberValidator = function (validate) {
        return validate.validators.phoneNumber = function (value) {
            return validate.single(value, {
                format: {
                    pattern: /^\+?[1-9]\d{1,14}$/,
                    message: "must be a valid phone number",
                },
            });
        };
    };
});
define("Validators/index", ["require", "exports", "Validators/DateTime", "Validators/PhoneNumber"], function (require, exports, DateTime_1, PhoneNumber_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(DateTime_1);
    __export(PhoneNumber_1);
});
define("Initializers/InitializeValidateJS", ["require", "exports", "validate.js", "Validators/index", "lodash"], function (require, exports, validateJS, Validators, lodash_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeInitializeValidateJS = function (validate, validators) { return function () {
        return lodash_1.forEach(validators, function (initializer, name) {
            if (name.startsWith("initialize")) {
                initializer(validate);
            }
        });
    }; };
    exports.initializeValidateJS = exports.makeInitializeValidateJS(validateJS, Validators);
});
define("Initializers/index", ["require", "exports", "Initializers/InitializeValidateJS"], function (require, exports, InitializeValidateJS_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(InitializeValidateJS_1);
});
define("Initialize", ["require", "exports", "Initializers/index", "lodash"], function (require, exports, Initializers, lodash_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var initializationComplete = false;
    exports.isApplicationInitialized = function () { return initializationComplete; };
    exports.resetInitializationStatus = function () { return initializationComplete = false; };
    exports.makeInitialize = function (initializers) { return function () {
        lodash_2.forEach(initializers, function (initializer, name) {
            if (name.startsWith("initialize")) {
                initializer();
            }
        });
        initializationComplete = true;
    }; };
    exports.initialize = exports.makeInitialize(Initializers);
});
define("Services/IService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Services/BaseService", ["require", "exports", "rxjs/add/operator/publishReplay"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseService = (function () {
        function BaseService() {
        }
        BaseService.prototype.makeActionType = function (type) {
            return [this.name, type].join("/");
        };
        BaseService.registerDispatch = function (dispatch) {
            BaseService.dispatch = dispatch;
        };
        BaseService.setStateObservable = function (state$) {
            BaseService.state$ = state$;
        };
        BaseService.getStateObservable = function () {
            return BaseService
                .state$
                .publishReplay(1)
                .refCount();
        };
        BaseService.prototype.makeActionCreator = function (type, defaultMeta) {
            return function (payload, meta) {
                var action = { type: type, payload: payload, meta: Object.assign({}, defaultMeta, meta), invoke: null };
                action.invoke = function () { return BaseService.dispatch(action); };
                return action;
            };
        };
        BaseService.prototype.createTypes = function () {
            return {};
        };
        BaseService.prototype.createActions = function () {
            return {};
        };
        BaseService.prototype.createReducers = function () {
            return {};
        };
        BaseService.prototype.createEpics = function () {
            return [];
        };
        BaseService.prototype.createSelectors = function () {
            var _this = this;
            return {
                getServiceState: function (rootState) { return rootState[_this.name] || rootState; },
            };
        };
        Object.defineProperty(BaseService.prototype, "reducers", {
            get: function () {
                if (!this.internalReducers) {
                    this.internalReducers = this.createReducers();
                }
                return this.internalReducers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseService.prototype, "reducer", {
            get: function () {
                var reducers = this.reducers;
                var defaultState = this.getDefaultState();
                return function (state, action) {
                    if (state === void 0) { state = defaultState; }
                    var type = action.type;
                    if (type in reducers && reducers.hasOwnProperty(type)) {
                        return reducers[type](state, action);
                    }
                    return state;
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseService.prototype, "types", {
            get: function () {
                if (!this.internalTypes) {
                    this.internalTypes = this.createTypes();
                }
                return this.internalTypes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseService.prototype, "actions", {
            get: function () {
                if (!this.internalActions) {
                    this.internalActions = this.createActions();
                }
                return this.internalActions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseService.prototype, "selectors", {
            get: function () {
                if (!this.internalSelectors) {
                    this.internalSelectors = this.createSelectors();
                }
                return this.internalSelectors;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseService.prototype, "epics", {
            get: function () {
                if (!this.internalEpics) {
                    this.internalEpics = this.createEpics();
                }
                return this.internalEpics;
            },
            enumerable: true,
            configurable: true
        });
        return BaseService;
    }());
    exports.BaseService = BaseService;
});
define("Model/Decorators/IDecorator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Model/FieldType/IFieldType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Model/FieldType/ArrayField", ["require", "exports", "validate.js"], function (require, exports, validate_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArrayField = {
        serialize: true,
        defaultValidationRules: { type: "array" },
        defaultValue: [],
        isValidType: function (value) { return value == null || validate_js_1.isArray(value); },
    };
});
define("Model/FieldType/ObjectField", ["require", "exports", "validate.js"], function (require, exports, validate_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObjectField = {
        serialize: true,
        defaultValidationRules: { type: "object" },
        defaultValue: null,
        isValidType: function (value) { return value == null || validate_js_2.isObject(value); },
    };
});
define("Model/FieldType/BelongsToField", ["require", "exports", "Model/FieldType/ObjectField"], function (require, exports, ObjectField_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BelongsToField = __assign({}, ObjectField_1.ObjectField, { serialize: false });
});
define("Model/FieldType/BooleanField", ["require", "exports", "validate.js"], function (require, exports, validate_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BooleanField = {
        serialize: true,
        defaultValidationRules: { type: "boolean" },
        defaultValue: false,
        isValidType: function (value) { return value == null || validate_js_3.isBoolean(value); },
    };
});
define("Model/FieldType/DateField", ["require", "exports", "validate.js", "date-fns"], function (require, exports, validate_js_4, date_fns_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DateField = {
        serialize: true,
        defaultValidationRules: { datetime: { dateOnly: true } },
        defaultValue: null,
        isValidType: function (value) { return value == null || validate_js_4.isDate(value); },
        transform: function (date) { return date != null ? date_fns_2.format(date, "YYYY-MM-DD") : null; },
        normalize: function (serializedDate) { return (serializedDate != null
            ? date_fns_2.parse(serializedDate, "YYYY-MM-DD", new Date())
            : null); },
    };
});
define("Model/FieldType/DateTimeField", ["require", "exports", "validate.js"], function (require, exports, validate_js_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DateTimeField = {
        serialize: true,
        defaultValidationRules: { datetime: true },
        defaultValue: null,
        isValidType: function (value) { return value == null || validate_js_5.isDate(value); },
        transform: function (date) { return date != null ? date.toISOString() : null; },
        normalize: function (serializedDate) { return (serializedDate != null
            ? new Date(serializedDate)
            : null); },
    };
});
define("Model/FieldType/EmailField", ["require", "exports", "validate.js"], function (require, exports, validate_js_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EmailField = {
        serialize: true,
        defaultValidationRules: { email: true },
        defaultValue: "",
        isValidType: function (value) { return value == null || validate_js_6.isString(value); },
    };
});
define("Model/FieldType/EnumField", ["require", "exports", "lodash"], function (require, exports, lodash_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createEnumField = function (fieldEnum) {
        var enumValues = Object.values(fieldEnum);
        return {
            serialize: false,
            defaultValidationRules: {
                inclusion: {
                    within: enumValues,
                    message: "^Selected value is not a valid choice",
                },
            },
            defaultValue: null,
            isValidType: function (value) { return value == null || lodash_3.includes(fieldEnum, value); },
        };
    };
});
define("Model/FieldType/HasManyField", ["require", "exports", "Model/FieldType/ArrayField"], function (require, exports, ArrayField_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HasManyField = __assign({}, ArrayField_1.ArrayField, { serialize: false });
});
define("Model/FieldType/NumberField", ["require", "exports", "validate.js"], function (require, exports, validate_js_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NumberField = {
        serialize: true,
        defaultValidationRules: { numericality: true },
        defaultValue: 0,
        isValidType: function (value) { return value == null || validate_js_7.isNumber(value); },
    };
});
define("Model/FieldType/PhoneNumberField", ["require", "exports", "validate.js"], function (require, exports, validate_js_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PhoneNumberField = {
        serialize: true,
        defaultValidationRules: { phoneNumber: true },
        defaultValue: "",
        isValidType: function (value) { return value == null || validate_js_8.isString(value); },
    };
});
define("Model/FieldType/StringField", ["require", "exports", "validate.js"], function (require, exports, validate_js_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StringField = {
        serialize: true,
        defaultValidationRules: { type: "string" },
        defaultValue: "",
        isValidType: function (value) { return value == null || validate_js_9.isString(value); },
        normalize: function (value) { return String(value); },
    };
});
define("Model/FieldType/TimeField", ["require", "exports", "validate.js", "date-fns"], function (require, exports, validate_js_10, date_fns_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimeField = {
        serialize: true,
        defaultValidationRules: { datetime: { timeOnly: true, message: "must be a valid time" } },
        defaultValue: null,
        isValidType: function (value) { return value == null || validate_js_10.isDate(value); },
        transform: function (date) { return date != null ? date_fns_3.format(date, "hh:mm:ss a") : null; },
        normalize: function (serializedDate) { return (serializedDate != null
            ? date_fns_3.parse(serializedDate, "hh:mm:ss a", new Date())
            : null); },
    };
});
define("Model/FieldType/URLField", ["require", "exports", "validate.js"], function (require, exports, validate_js_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.URLField = {
        serialize: true,
        defaultValidationRules: { url: { allowLocal: true } },
        defaultValue: "",
        isValidType: function (value) { return value == null || validate_js_11.isString(value); },
    };
});
define("Model/FieldType/index", ["require", "exports", "Model/FieldType/ArrayField", "Model/FieldType/BelongsToField", "Model/FieldType/BooleanField", "Model/FieldType/DateField", "Model/FieldType/DateTimeField", "Model/FieldType/EmailField", "Model/FieldType/EnumField", "Model/FieldType/HasManyField", "Model/FieldType/NumberField", "Model/FieldType/ObjectField", "Model/FieldType/PhoneNumberField", "Model/FieldType/StringField", "Model/FieldType/TimeField", "Model/FieldType/URLField"], function (require, exports, ArrayField_2, BelongsToField_1, BooleanField_1, DateField_1, DateTimeField_1, EmailField_1, EnumField_1, HasManyField_1, NumberField_1, ObjectField_2, PhoneNumberField_1, StringField_1, TimeField_1, URLField_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(ArrayField_2);
    __export(BelongsToField_1);
    __export(BooleanField_1);
    __export(DateField_1);
    __export(DateTimeField_1);
    __export(EmailField_1);
    __export(EnumField_1);
    __export(HasManyField_1);
    __export(NumberField_1);
    __export(ObjectField_2);
    __export(PhoneNumberField_1);
    __export(StringField_1);
    __export(TimeField_1);
    __export(URLField_1);
});
define("Model/Decorators/Validation", ["require", "exports", "lodash"], function (require, exports, lodash_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function validation(validationRules) {
        return function (target, key) {
            var _a;
            target.validationRules = lodash_4.merge({}, target.validationRules, (_a = {},
                _a[key] = validationRules,
                _a));
        };
    }
    exports.validation = validation;
});
define("Model/Decorators/Field", ["require", "exports", "Model/Decorators/Validation", "lodash"], function (require, exports, Validation_1, lodash_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function field(fieldType, options) {
        if (options === void 0) { options = {}; }
        var fieldConfig = lodash_5.defaultsDeep({}, options, fieldType);
        var validationRules = fieldConfig.defaultValidationRules;
        return function (target, key) {
            var _a;
            target.fields = lodash_5.merge({}, target.fields, (_a = {}, _a[key] = fieldConfig, _a));
            Validation_1.validation(validationRules)(target, key);
        };
    }
    exports.field = field;
});
define("Model/Decorators/Attr", ["require", "exports", "Model/Decorators/Field"], function (require, exports, Field_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
define("Model/Decorators/Relationship", ["require", "exports", "Model/FieldType/index", "Model/Decorators/Field", "pluralize"], function (require, exports, FieldType_1, Field_2, pluralize_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            if (process.env.NODE_ENV !== "production" && !(options.relatedFieldName in target)) {
                throw new ReferenceError("Related field name \"" + options.relatedFieldName + "\" missing for relationship \"" + key + "\". Did you forget to add an @attr decorator?");
            }
            target.relationships = __assign({}, target.relationships, (_a = {}, _a[key] = {
                serviceName: options.serviceName,
                relatedFieldName: options.relatedFieldName,
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
            Field_2.field(exports.getFieldTypeForRelationship(relationshipType), options)(target, key);
        };
    }
    exports.relationship = relationship;
});
define("Model/Decorators/BelongsTo", ["require", "exports", "Model/Decorators/Relationship"], function (require, exports, Relationship_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function belongsTo(options) {
        if (options === void 0) { options = {}; }
        return Relationship_1.relationship(Relationship_1.RelationshipType.BelongsTo, options);
    }
    exports.belongsTo = belongsTo;
});
define("Model/Decorators/HasMany", ["require", "exports", "Model/Decorators/Relationship"], function (require, exports, Relationship_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function hasMany(options) {
        if (options === void 0) { options = {}; }
        return Relationship_2.relationship(Relationship_2.RelationshipType.HasMany, options);
    }
    exports.hasMany = hasMany;
});
define("Model/Decorators/IsEnum", ["require", "exports", "Model/Decorators/Field", "Model/FieldType/index"], function (require, exports, Field_3, FieldType_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isEnum(fieldEnum, options) {
        if (options === void 0) { options = {}; }
        return function (target, key) {
            var EnumField = FieldType_2.createEnumField(fieldEnum);
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
            Field_3.field(EnumField, options)(target, key);
        };
    }
    exports.isEnum = isEnum;
});
define("Model/Decorators/Required", ["require", "exports", "Model/Decorators/Validation"], function (require, exports, Validation_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function required(message, allowEmpty) {
        if (message === void 0) { message = "is required"; }
        if (allowEmpty === void 0) { allowEmpty = false; }
        return function (target, key) {
            return Validation_2.validation({ presence: { message: message, allowEmpty: allowEmpty } })(target, key);
        };
    }
    exports.required = required;
});
define("Model/Decorators/index", ["require", "exports", "Model/Decorators/Attr", "Model/Decorators/BelongsTo", "Model/Decorators/Field", "Model/Decorators/HasMany", "Model/Decorators/IsEnum", "Model/Decorators/Relationship", "Model/Decorators/Required", "Model/Decorators/Validation"], function (require, exports, Attr_1, BelongsTo_1, Field_4, HasMany_1, IsEnum_1, Relationship_3, Required_1, Validation_3) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(Attr_1);
    __export(BelongsTo_1);
    __export(Field_4);
    __export(HasMany_1);
    __export(IsEnum_1);
    __export(Relationship_3);
    __export(Required_1);
    __export(Validation_3);
});
define("Model/IModel", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Utils/Lodash", ["require", "exports", "lodash/fp/convert", "lodash"], function (require, exports, convert, lodash_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mapValuesWithKeys = convert("mapValues", lodash_6.mapValues, {
        cap: false,
    });
    exports.flattenObjectKeys = function (obj) {
        var output = {};
        lodash_6.forEach(obj, function (child, key) {
            if (lodash_6.isPlainObject(child)) {
                lodash_6.forEach(child, function (subChild, childKey) {
                    output[key + "." + childKey] = subChild;
                });
            }
            else {
                output[key] = child;
            }
        });
        return output;
    };
});
define("Model/Model", ["require", "exports", "rxjs/Subject", "validate.js", "lodash", "lodash/fp", "Services/index", "Model/FieldType/index", "Model/Decorators/index", "Utils/Lodash", "rxjs/add/operator/takeUntil"], function (require, exports, Subject_1, validate_js_12, lodash_7, fp_1, Services_1, FieldType_3, Decorators_1, Lodash_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Model = (function () {
        function Model(modelData, meta) {
            if (meta === void 0) { meta = {}; }
            this.relatedModels = {};
            this._isDestroying = false;
            this.modelData = modelData;
            this.meta = __assign({ isLoading: false, isShadow: false, errors: null, original: null }, meta);
        }
        Model.prototype.save = function () {
            return __awaiter(this, void 0, void 0, function () {
                var validationErrors;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            validationErrors = this.validate(true);
                            if (!lodash_7.isEmpty(validationErrors)) {
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
            lodash_7.forEach(this.relatedModels, function (relatedModel, key) {
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
            var errors = validate_js_12.validate(data, this.validationRules, { fullMessages: false }) || {};
            if (includeRelatedModels) {
                errors = fp_1.flow(fp_1.omitBy(function (relatedModel) { return relatedModel == null || !relatedModel.isDirty; }), fp_1.mapValues(function (relatedModel) { return relatedModel.validate(); }), Lodash_1.flattenObjectKeys, fp_1.assign(errors))(this.relatedModels);
            }
            if (!(lodash_7.isEmpty(this.errors) && lodash_7.isEmpty(errors))) {
                this.errors = errors;
            }
            return errors;
        };
        Model.prototype.validateField = function (fieldName) {
            var _a;
            var errors = this.errors || {};
            var validationRules = this.getValidationRulesForField(fieldName);
            var value = lodash_7.get(this, fieldName);
            var validationResult = validate_js_12.single(value, validationRules);
            this.errors = lodash_7.isEmpty(validationResult)
                ? lodash_7.omit(errors, fieldName)
                : __assign({}, errors, (_a = {}, _a[fieldName] = validationResult, _a));
            return validationResult;
        };
        Model.prototype.getValidationRulesForField = function (fieldName) {
            var validationRulesPath = fieldName.split(".");
            validationRulesPath.splice(validationRulesPath.length - 1, 0, "validationRules");
            return lodash_7.get(this, validationRulesPath, {});
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
        Model.prototype.applyUpdates = function (modelData, meta) {
            if (modelData === void 0) { modelData = null; }
            if (meta === void 0) { meta = {}; }
            if (!lodash_7.isEmpty(modelData)) {
                for (var key in modelData) {
                    this.checkFieldUpdateIsAllowed(key, modelData[key]);
                }
                if (!this.isDirty) {
                    meta.original = this.modelData;
                }
                modelData = lodash_7.merge({}, this.modelData, modelData);
            }
            meta = __assign({}, this.meta, meta);
            var service = Services_1.getDataService(this.serviceName);
            return new service.ModelClass(modelData || this.modelData, meta);
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
            if (lodash_7.isEmpty(relatedIDorIDs) || this.isDestroying) {
                this.relatedModels[fieldName] = (relationship.type === Decorators_1.RelationshipType.BelongsTo)
                    ? ((this.isShadow) ? relatedService.getShadowObject() : null)
                    : [];
                return this.relatedModels[fieldName];
            }
            var observable = (relationship.type === Decorators_1.RelationshipType.BelongsTo)
                ? relatedService.getById(relatedIDorIDs)
                : relatedService.getByIds(relatedIDorIDs);
            observable
                .takeUntil(this.getWillDestroyObservable$())
                .subscribe(function (newValue) {
                _this.relatedModels[fieldName] = newValue;
            });
            return this.relatedModels[fieldName];
        };
        Model.prototype.setRelated = function (fieldName, value) {
            if (!this.relationships.hasOwnProperty(fieldName)) {
                throw new ReferenceError(this.serviceName + ": Relationship field \"" + fieldName + "\" not found in the Model's relationships. Did you forget to add a relationship decorator?");
            }
            var relationship = this.relationships[fieldName];
            var relatedFieldName = relationship.relatedFieldName, type = relationship.type;
            if (lodash_7.isEmpty(value)) {
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
            if (lodash_7.isEmpty(this.errors)) {
                return {};
            }
            else {
                var error = this.errors[fieldName];
                return (error instanceof Array) ? error[0] : error;
            }
        };
        __decorate([
            Decorators_1.attr(FieldType_3.StringField, { serialize: false }),
            __metadata("design:type", String)
        ], Model.prototype, "id", void 0);
        __decorate([
            Decorators_1.attr(FieldType_3.DateTimeField, { serialize: false }),
            __metadata("design:type", Date)
        ], Model.prototype, "dateUpdated", void 0);
        __decorate([
            Decorators_1.attr(FieldType_3.DateTimeField, { serialize: false }),
            __metadata("design:type", Date)
        ], Model.prototype, "dateDeleted", void 0);
        return Model;
    }());
    exports.Model = Model;
});
define("Model/Model.mock", ["require", "exports", "faker", "lodash", "Model/index", "Model/FieldType/index", "Model/Decorators/index"], function (require, exports, faker_1, lodash_8, Model_1, FieldType_4, Decorators_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FakeModel = (function (_super) {
        __extends(FakeModel, _super);
        function FakeModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.serviceName = "fakeModel";
            return _this;
        }
        FakeModel.prototype.getData = function () {
            return this.modelData;
        };
        __decorate([
            Decorators_2.attr(FieldType_4.StringField),
            __metadata("design:type", String)
        ], FakeModel.prototype, "fullText", void 0);
        return FakeModel;
    }(Model_1.Model));
    exports.FakeModel = FakeModel;
    function createMockFakeModelData(id) {
        return {
            id: id != null ? id : faker_1.random.number().toString(),
            fullText: faker_1.lorem.word(),
            dateUpdated: new Date(),
            dateDeleted: null,
        };
    }
    exports.createMockFakeModelData = createMockFakeModelData;
    function createMockFakeModel(overrideValues) {
        var modelData = lodash_8.merge({}, createMockFakeModelData(), overrideValues);
        return new FakeModel(modelData);
    }
    exports.createMockFakeModel = createMockFakeModel;
    function createMockFakeModelArray(numItems) {
        if (numItems === void 0) { numItems = 10; }
        var items = [];
        for (var x = 0; x < numItems; x++) {
            items.push(createMockFakeModelData(x.toString()));
        }
        return items;
    }
    exports.createMockFakeModelArray = createMockFakeModelArray;
    function createMockFakeModels(numItems) {
        if (numItems === void 0) { numItems = 10; }
        return createMockFakeModelArray(numItems).map(function (item) { return new FakeModel(item); });
    }
    exports.createMockFakeModels = createMockFakeModels;
});
define("Model/index", ["require", "exports", "Model/Model", "Model/Model.mock", "Model/Decorators/index", "Model/FieldType/index"], function (require, exports, Model_2, Model_mock_1, Decorators_3, FieldType_5) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(Model_2);
    __export(Model_mock_1);
    __export(Decorators_3);
    __export(FieldType_5);
});
define("Serializers/ISerializer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Serializers/BaseSerializer", ["require", "exports", "lodash/fp", "Utils/Lodash", "Services/index"], function (require, exports, fp_2, Lodash_2, Services_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                    return Services_2.getDataService(fieldType.serviceName)
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
            return fp_2.flow(fp_2.pickBy(fp_2.property("serialize")), Lodash_2.mapValuesWithKeys(this.transformField(model)))(this.fields);
        };
        BaseSerializer.prototype.normalize = function (data) {
            var _a = fp_2.flow(fp_2.keys, fp_2.partition(this.isRelationship))(data), relationshipKeys = _a[0], fieldKeys = _a[1];
            for (var _i = 0, relationshipKeys_1 = relationshipKeys; _i < relationshipKeys_1.length; _i++) {
                var key = relationshipKeys_1[_i];
                var service = Services_2.getDataService(this.relationships[key].serviceName);
                var relatedModel = service.serializer.normalize(data[key]);
                service.actions.pushRecord(relatedModel).invoke();
            }
            var modelData = fp_2.flow(fp_2.pick(fieldKeys), Lodash_2.mapValuesWithKeys(this.normalizeField(data)))(this.fields);
            return new this.ModelClass(modelData);
        };
        return BaseSerializer;
    }());
    exports.BaseSerializer = BaseSerializer;
});
define("Serializers/RestSerializer", ["require", "exports", "Serializers/BaseSerializer"], function (require, exports, BaseSerializer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RestSerializer = (function (_super) {
        __extends(RestSerializer, _super);
        function RestSerializer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RestSerializer.prototype.serialize = function (model) {
            var modelData = this.transform(model);
            return JSON.stringify(modelData);
        };
        RestSerializer.prototype.deserialize = function (data) {
            data = (typeof data === "string") ? JSON.parse(data) : data;
            return this.normalize(data);
        };
        return RestSerializer;
    }(BaseSerializer_1.BaseSerializer));
    exports.RestSerializer = RestSerializer;
});
define("Serializers/index", ["require", "exports", "Serializers/BaseSerializer", "Serializers/RestSerializer"], function (require, exports, BaseSerializer_2, RestSerializer_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(BaseSerializer_2);
    __export(RestSerializer_1);
});
define("Adapters/IAdapter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Adapters/MockAdapter", ["require", "exports", "sinon", "rxjs/observable/of", "faker"], function (require, exports, sinon_1, of_1, faker_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MockAdapter = (function () {
        function MockAdapter() {
            this.createItem = sinon_1.stub().callsFake(function (item) { return of_1.of(__assign({}, item, { id: faker_2.default.random.number().toString() })); });
            this.deleteItem = sinon_1.stub().callsFake(function (id) { return of_1.of({
                id: id,
                dateDeleted: new Date().toISOString(),
            }); });
            this.fetchAll = sinon_1.stub().callsFake(function () { return of_1.of([]); });
            this.fetchItem = sinon_1.stub().callsFake(function (id) { return of_1.of({ id: id }); });
            this.patchItem = sinon_1.stub().callsFake(function (id, item) { return of_1.of(__assign({}, item, { id: id })); });
            this.updateItem = sinon_1.stub().callsFake(function (id, item) { return of_1.of(__assign({}, item, { id: id })); });
        }
        return MockAdapter;
    }());
    exports.MockAdapter = MockAdapter;
});
define("Adapters/RestAdapter", ["require", "exports", "rxjs/observable/dom/ajax", "lodash"], function (require, exports, ajax_1, lodash_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RestAdapter = (function () {
        function RestAdapter(pathName, options) {
            if (options === void 0) { options = {}; }
            this.pathName = pathName;
            this.apiUrl = options.apiUrl || process.env.API_URL;
        }
        RestAdapter.prototype.getRestURL = function () {
            return this.apiUrl + "/" + this.pathName;
        };
        RestAdapter.prototype.fetchAll = function (requestParams) {
            return this.makeAjaxRequest("GET", this.getRestURL(), requestParams);
        };
        RestAdapter.prototype.fetchItem = function (id) {
            return this.makeAjaxRequest("GET", this.getRestURL() + "/" + id);
        };
        RestAdapter.prototype.createItem = function (item) {
            return this.makeAjaxRequest("POST", this.getRestURL(), item);
        };
        RestAdapter.prototype.updateItem = function (id, item) {
            return this.makeAjaxRequest("PUT", this.getRestURL() + "/" + id, item);
        };
        RestAdapter.prototype.patchItem = function (id, item) {
            return this.makeAjaxRequest("PATCH", this.getRestURL() + "/" + id, item);
        };
        RestAdapter.prototype.deleteItem = function (id) {
            return this.makeAjaxRequest("DELETE", this.getRestURL() + "/" + id);
        };
        RestAdapter.prototype.makeAjaxRequest = function (method, url, payload, headers) {
            if (headers === void 0) { headers = {}; }
            return ajax_1.ajax({
                body: method !== "GET" ? payload : undefined,
                headers: this.buildHeaders(headers),
                method: method,
                responseType: "json",
                url: (method !== "GET" || lodash_9.isEmpty(payload) ? url : url + "?" + this.buildQueryParams(payload)),
            }).map(function (x) { return x.response; });
        };
        RestAdapter.prototype.buildHeaders = function (headers) {
            return __assign({}, headers, { "Content-Type": "application/json" });
        };
        RestAdapter.prototype.buildQueryParams = function (payload) {
            return Object.keys(payload)
                .map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(payload[k]); })
                .join("&");
        };
        return RestAdapter;
    }());
    exports.RestAdapter = RestAdapter;
});
define("Adapters/index", ["require", "exports", "Adapters/MockAdapter", "Adapters/RestAdapter"], function (require, exports, MockAdapter_1, RestAdapter_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(MockAdapter_1);
    __export(RestAdapter_1);
});
define("Services/DataService", ["require", "exports", "rxjs/observable/of", "immutable", "lodash", "object-hash", "re-reselect", "reselect", "Serializers/index", "Adapters/index", "Services/BaseService", "rxjs/add/operator/catch", "rxjs/add/operator/concat", "rxjs/add/operator/distinct", "rxjs/add/operator/do", "rxjs/add/operator/filter", "rxjs/add/operator/map", "rxjs/add/operator/mergeMap", "rxjs/add/operator/switchMap", "rxjs/add/operator/take"], function (require, exports, of_2, immutable_1, lodash_10, hash, re_reselect_1, reselect_1, Serializers_1, Adapters_1, BaseService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RequestCacheRecord = immutable_1.Record({
        isLoading: false,
        errors: null,
        ids: immutable_1.List(),
    });
    var DataService = (function (_super) {
        __extends(DataService, _super);
        function DataService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shadowObject = null;
            _this.observablesByIdCache = {};
            _this.observablesByIdsCache = {};
            _this.observablesByQueryCache = {};
            _this.DataServiceStateRecord = immutable_1.Record({
                items: immutable_1.Map(),
                requestCache: immutable_1.Map(),
            });
            _this.fetchAllReducer = function (state, action) {
                return state.update("requestCache", function (requestCache) { return (requestCache.update(JSON.stringify(action.payload), function (requestCacheRecord) { return (requestCacheRecord
                    ? (_this.shouldFetchAll(action, state)
                        ? requestCacheRecord.set("isLoading", true)
                        : requestCacheRecord)
                    : new exports.RequestCacheRecord({ isLoading: true })); })); });
            };
            _this.pushAllReducer = function (state, action) { return state.withMutations(function (record) {
                var ids = [];
                record.update("items", function (items) { return items.withMutations(function (itemsMap) {
                    action.payload.items.forEach(function (item) {
                        itemsMap.update(item.id, function (oldModel) {
                            if (oldModel) {
                                oldModel.markForDestruction();
                            }
                            return item;
                        });
                        ids.push(item.id);
                    });
                }); });
                record.update("requestCache", function (requestCache) {
                    return requestCache.set(hash(action.meta.queryParams || {}), new exports.RequestCacheRecord({ ids: immutable_1.List(ids) }));
                });
            }); };
            _this.pushRecordReducer = function (state, action) { return state.withMutations(function (record) {
                var item = action.payload;
                record.set("items", record.items.update(item.id, function (oldModel) {
                    if (oldModel) {
                        oldModel.markForDestruction();
                    }
                    return item;
                }));
            }); };
            _this.unloadAllReducer = function (state) {
                state.items.forEach(function (oldModel) {
                    oldModel.markForDestruction();
                });
                return _this.getDefaultState();
            };
            _this.unloadRecordReducer = function (state, action) {
                return state.withMutations(function (record) {
                    var id = action.payload.id;
                    var oldModel = record.items.get(id);
                    if (oldModel) {
                        oldModel.markForDestruction();
                    }
                    record.set("items", record.items.delete(id));
                });
            };
            _this.setErrorsReducer = function (state, action) {
                return state.withMutations(function (record) {
                    return record.update("requestCache", function (requestCache) {
                        return requestCache.update(hash(action.meta.queryParams || {}), function (requestCacheRecord) {
                            return requestCacheRecord && requestCacheRecord.set("errors", action.payload.errors);
                        });
                    });
                });
            };
            _this.setFieldReducer = function (state, action) {
                return state.withMutations(function (record) {
                    var _a = action.payload, id = _a.id, fieldName = _a.fieldName, value = _a.value;
                    if (record.items.has(id)) {
                        record.update("items", function (items) { return items.update(id, function (item) {
                            var _a;
                            item.markForDestruction();
                            return item.applyUpdates((_a = {}, _a[fieldName] = value, _a));
                        }); });
                    }
                });
            };
            _this.setMetaFieldReducer = function (state, action) {
                return state.withMutations(function (record) {
                    var _a = action.payload, id = _a.id, fieldName = _a.fieldName, value = _a.value;
                    if (record.items.has(id)) {
                        record.update("items", function (items) { return items.update(id, function (item) {
                            var _a;
                            item.markForDestruction();
                            return item.applyUpdates(null, (_a = {}, _a[fieldName] = value, _a));
                        }); });
                    }
                });
            };
            _this.shouldFetchItem = function (action, state) {
                return _this.selectors.getItem(state, action.payload.id) == null
                    || (action.meta && action.meta.forceReload);
            };
            return _this;
        }
        Object.defineProperty(DataService.prototype, "adapter", {
            get: function () {
                if (!this._adapter) {
                    this._adapter = new Adapters_1.RestAdapter(this.name);
                }
                return this._adapter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataService.prototype, "serializer", {
            get: function () {
                if (!this._serializer) {
                    this._serializer = new Serializers_1.RestSerializer(this.ModelClass);
                }
                return this._serializer;
            },
            enumerable: true,
            configurable: true
        });
        DataService.prototype.getDefaultState = function () {
            return new this.DataServiceStateRecord();
        };
        DataService.prototype.getShadowObject = function () {
            if (!this.shadowObject) {
                this.shadowObject = new this.ModelClass({}, { isLoading: true, isShadow: true });
            }
            return this.shadowObject;
        };
        DataService.prototype.createNew = function (initialData) {
            if (initialData === void 0) { initialData = {}; }
            var data = "id" in initialData ? initialData : __assign({ id: lodash_10.uniqueId("new-") }, initialData);
            var model = new this.ModelClass(data);
            this.actions.pushRecord(model).invoke();
            model.initializeNewModel();
            return model;
        };
        DataService.prototype.getById = function (id) {
            var _this = this;
            if (id in this.observablesByIdCache) {
                return this.observablesByIdCache[id];
            }
            var observable = BaseService_1.BaseService
                .getStateObservable()
                .map(function (state) { return _this.selectors.getItem(state, id) || _this.getShadowObject(); })
                .distinct();
            observable
                .take(1)
                .filter(function (item) { return item.isShadow; })
                .subscribe(function () { return _this.actions.fetchRecord({ id: id }).invoke(); });
            this.observablesByIdCache[id] = observable;
            return observable;
        };
        DataService.prototype.getByIds = function (ids) {
            var _this = this;
            var cacheKey = JSON.stringify(ids.sort());
            if (cacheKey in this.observablesByIdsCache) {
                return this.observablesByIdsCache[cacheKey];
            }
            var observable = BaseService_1.BaseService
                .getStateObservable()
                .map(function (state) { return _this.selectors.getItemsByIds(state, ids); })
                .distinct();
            observable
                .take(1)
                .filter(function (items) { return items.length !== ids.length; })
                .subscribe(function (items) {
                var currentIds = items.map(function (item) { return item.id; });
                lodash_10.difference(ids, currentIds).forEach(function (id) {
                    _this.actions.fetchRecord({ id: id }).invoke();
                });
            });
            this.observablesByIdsCache[cacheKey] = observable;
            return observable;
        };
        DataService.prototype.getByQuery = function (queryParams) {
            var _this = this;
            var hashParams = hash(queryParams || {});
            if (hashParams in this.observablesByQueryCache) {
                return this.observablesByQueryCache[hashParams];
            }
            var observable = BaseService_1.BaseService
                .getStateObservable()
                .map(function (state) { return _this.selectors.getItems(state, queryParams); })
                .distinct()
                .map(function (items) { return (items != null && "toJS" in items) ? items.toJS() : items; });
            observable
                .take(1)
                .subscribe(function () { return _this.actions.fetchAll(queryParams).invoke(); });
            this.observablesByQueryCache[hashParams] = observable;
            return observable;
        };
        DataService.prototype.getAll = function () {
            var _this = this;
            var observable = BaseService_1.BaseService
                .getStateObservable()
                .map(function (state) { return _this.selectors.getAllItems(state).valueSeq(); })
                .distinct();
            observable
                .take(1)
                .subscribe(function () { return _this.actions.fetchAll(); });
            return observable;
        };
        DataService.prototype.getDefaultQueryParams = function () {
            return {};
        };
        DataService.prototype.createTypes = function () {
            var types = _super.prototype.createTypes.call(this);
            return __assign({}, types, { CREATE_RECORD: this.makeActionType("CREATE_RECORD"), DELETE_RECORD: this.makeActionType("DELETE_RECORD"), FETCH_ALL: this.makeActionType("FETCH_ALL"), FETCH_RECORD: this.makeActionType("FETCH_RECORD"), PATCH_RECORD: this.makeActionType("PATCH_RECORD"), PUSH_ALL: this.makeActionType("PUSH_ALL"), PUSH_RECORD: this.makeActionType("PUSH_RECORD"), SET_ERRORS: this.makeActionType("SET_ERRORS"), UNLOAD_ALL: this.makeActionType("UNLOAD_ALL"), UNLOAD_RECORD: this.makeActionType("UNLOAD_RECORD"), UPDATE_RECORD: this.makeActionType("UPDATE_RECORD"), SET_FIELD: this.makeActionType("SET_FIELD"), SET_META_FIELD: this.makeActionType("SET_META_FIELD") });
        };
        DataService.prototype.createActions = function () {
            var actions = _super.prototype.createActions.call(this);
            return __assign({}, actions, { createRecord: this.makeActionCreator(this.types.CREATE_RECORD), deleteRecord: this.makeActionCreator(this.types.DELETE_RECORD), fetchAll: this.makeActionCreator(this.types.FETCH_ALL), fetchRecord: this.makeActionCreator(this.types.FETCH_RECORD), patchRecord: this.makeActionCreator(this.types.PATCH_RECORD), pushAll: this.makeActionCreator(this.types.PUSH_ALL), pushRecord: this.makeActionCreator(this.types.PUSH_RECORD), setErrors: this.makeActionCreator(this.types.SET_ERRORS), unloadAll: this.makeActionCreator(this.types.UNLOAD_ALL), unloadRecord: this.makeActionCreator(this.types.UNLOAD_RECORD), updateRecord: this.makeActionCreator(this.types.UPDATE_RECORD), setField: this.makeActionCreator(this.types.SET_FIELD), setMetaField: this.makeActionCreator(this.types.SET_META_FIELD) });
        };
        DataService.prototype.createSelectors = function () {
            var selectors = _super.prototype.createSelectors.call(this);
            var getServiceState = selectors.getServiceState;
            var getAllItems = reselect_1.createSelector(getServiceState, function (store) { return store.items; });
            var getRequestCache = re_reselect_1.default(getServiceState, function (state, queryParams) { return queryParams; }, function (store, queryParams) { return store.requestCache.get(hash(queryParams || {})); })(function (state, queryParams) { return hash(queryParams || {}); });
            var getItems = re_reselect_1.default(getAllItems, function (state, queryParams) { return getRequestCache(state, queryParams); }, function (items, requestCache) { return requestCache ? requestCache.ids.map(function (id) { return items.get(id); }).valueSeq() : null; })(function (state, queryParams) { return hash(queryParams || {}); });
            var getItemsByIds = re_reselect_1.default(getServiceState, function (state, ids) { return ids; }, getAllItems, function (state, ids, items) {
                return ids
                    .map(function (id) { return items.get(id); })
                    .filter(function (item) { return item != null; });
            })(function (state, ids) { return JSON.stringify(ids.sort()); });
            var getItem = re_reselect_1.default(getAllItems, function (state, id) { return id; }, function (items, id) { return items.get(id); })(function (state, id) { return id; });
            return __assign({}, selectors, { getAllItems: getAllItems,
                getItem: getItem,
                getItems: getItems,
                getItemsByIds: getItemsByIds,
                getRequestCache: getRequestCache });
        };
        DataService.prototype.createReducers = function () {
            var _a;
            var reducers = _super.prototype.createReducers.call(this);
            return __assign({}, reducers, (_a = {}, _a[this.types.FETCH_ALL] = this.fetchAllReducer, _a[this.types.PUSH_ALL] = this.pushAllReducer, _a[this.types.PUSH_RECORD] = this.pushRecordReducer, _a[this.types.UNLOAD_ALL] = this.unloadAllReducer, _a[this.types.UNLOAD_RECORD] = this.unloadRecordReducer, _a[this.types.SET_FIELD] = this.setFieldReducer, _a[this.types.SET_META_FIELD] = this.setMetaFieldReducer, _a));
        };
        DataService.prototype.createEpics = function () {
            var epics = _super.prototype.createEpics.call(this);
            epics.push(this.fetchAllEpic.bind(this), this.fetchRecordEpic.bind(this), this.createRecordEpic.bind(this), this.updateRecordEpic.bind(this), this.patchRecordEpic.bind(this), this.deleteRecordEpic.bind(this));
            return epics;
        };
        DataService.prototype.fetchAllEpic = function (action$, store) {
            var _this = this;
            return action$.ofType(this.types.FETCH_ALL)
                .filter(function (action) { return _this.shouldFetchAll(action, store.getState()); })
                .mergeMap(function (action) {
                return _this.adapter.fetchAll(action.payload)
                    .map(function (_a) {
                    var items = _a.items, other = __rest(_a, ["items"]);
                    return (__assign({}, other, { items: items.map(function (item) { return _this.serializer.deserialize(item); }) }));
                })
                    .do(action.meta.onSuccess, action.meta.onError)
                    .map(function (data) { return _this.actions.pushAll(data, { queryParams: action.payload }); })
                    .catch(function (e) { return of_2.of(_this.actions.setErrors({ errors: e.xhr.response }, { queryParams: action.payload })); });
            });
        };
        DataService.prototype.fetchRecordEpic = function (action$, store) {
            var _this = this;
            return action$.ofType(this.types.FETCH_RECORD)
                .filter(function (action) { return _this.shouldFetchItem(action, store.getState()); })
                .mergeMap(function (action) {
                return _this.adapter.fetchItem(action.payload.id)
                    .map(function (response) { return _this.serializer.deserialize(response); })
                    .do(action.meta.onSuccess, action.meta.onError)
                    .map(_this.actions.pushRecord)
                    .catch(function (e) { return of_2.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response })); });
            });
        };
        DataService.prototype.createRecordEpic = function (action$, store) {
            var _this = this;
            return action$.ofType(this.types.CREATE_RECORD)
                .mergeMap(function (action) {
                return of_2.of(_this.selectors.getItem(store.getState(), action.payload.id))
                    .map(function (model) { return _this.serializer.serialize(model); })
                    .mergeMap(function (serializedModel) { return _this.adapter.createItem(serializedModel); })
                    .map(function (response) { return _this.serializer.deserialize(response); })
                    .do(action.meta.onSuccess, action.meta.onError)
                    .map(_this.actions.pushRecord)
                    .concat(of_2.of(_this.actions.unloadRecord(action.payload)))
                    .catch(function (e) { return of_2.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response || e })); });
            });
        };
        DataService.prototype.updateRecordEpic = function (action$, store) {
            var _this = this;
            return action$.ofType(this.types.UPDATE_RECORD)
                .mergeMap(function (action) {
                return of_2.of(_this.selectors.getItem(store.getState(), action.payload.id))
                    .map(function (model) { return _this.serializer.serialize(model); })
                    .mergeMap(function (model) { return _this.adapter.updateItem(action.payload.id, model); })
                    .map(function (response) { return _this.serializer.deserialize(response); })
                    .do(action.meta.onSuccess, action.meta.onError)
                    .map(_this.actions.pushRecord)
                    .catch(function (e) { return of_2.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response })); });
            });
        };
        DataService.prototype.patchRecordEpic = function (action$) {
            var _this = this;
            return action$.ofType(this.types.PATCH_RECORD)
                .mergeMap(function (action) { return (_this.adapter.patchItem(action.payload.id, _this.serializer.serialize(action.payload))
                .map(function (response) { return _this.serializer.deserialize(response); })
                .do(action.meta.onSuccess, action.meta.onError)
                .map(_this.actions.pushRecord)
                .catch(function (e) { return of_2.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response })); })); });
        };
        DataService.prototype.deleteRecordEpic = function (action$) {
            var _this = this;
            return action$.ofType(this.types.DELETE_RECORD)
                .mergeMap(function (action) { return (_this.adapter.deleteItem(action.payload.id)
                .map(function (response) { return _this.serializer.deserialize(response); })
                .do(action.meta.onSuccess, action.meta.onError)
                .map(_this.actions.pushRecord)
                .catch(function (e) { return of_2.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response })); })); });
        };
        DataService.prototype.shouldFetchAll = function (action, state) {
            var requestCache = this.selectors.getRequestCache(state, action.payload);
            return requestCache == null || requestCache.ids.isEmpty() || (action.meta && action.meta.forceReload);
        };
        return DataService;
    }(BaseService_1.BaseService));
    exports.DataService = DataService;
});
define("Services/DataService.mock", ["require", "exports", "Services/DataService", "Model/index"], function (require, exports, DataService_1, Model_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FakeModelService = (function (_super) {
        __extends(FakeModelService, _super);
        function FakeModelService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = "fakeModel";
            _this.ModelClass = Model_3.FakeModel;
            return _this;
        }
        return FakeModelService;
    }(DataService_1.DataService));
    exports.FakeModelService = FakeModelService;
});
define("Services/ServiceProvider", ["require", "exports", "lodash", "Initialize"], function (require, exports, lodash_11, Initialize_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var serviceMap = {};
    function getService(name) {
        if (name in serviceMap) {
            return serviceMap[name];
        }
        else if (process.env.NODE_ENV !== "production" && Initialize_1.isApplicationInitialized()) {
            throw new ReferenceError("Requested service \"" + name + "\" was not found. Did you forget to register it?");
        }
    }
    exports.getService = getService;
    function getDataService(name) {
        return getService(name);
    }
    exports.getDataService = getDataService;
    function initializeServices(modules) {
        serviceMap = {};
        lodash_11.forEach(modules, function (moduleObj, moduleName) {
            var serviceName = lodash_11.upperFirst(moduleName) + "Service";
            if (serviceName in moduleObj) {
                var ServiceClass = moduleObj[serviceName];
                registerService(new ServiceClass());
            }
        });
    }
    exports.initializeServices = initializeServices;
    function registerService(service) {
        var name = service.name;
        serviceMap[name] = service;
    }
    exports.registerService = registerService;
    function getReducers() {
        return lodash_11.mapValues(serviceMap, function (service) { return service.reducer; });
    }
    exports.getReducers = getReducers;
    function getEpics() {
        var epics = [];
        lodash_11.forEach(serviceMap, function (service) {
            epics = epics.concat(service.epics);
        });
        return epics;
    }
    exports.getEpics = getEpics;
});
define("Services/index", ["require", "exports", "Services/BaseService", "Services/DataService", "Services/DataService.mock", "Services/ServiceProvider"], function (require, exports, BaseService_2, DataService_2, DataService_mock_1, ServiceProvider_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(BaseService_2);
    __export(DataService_2);
    __export(DataService_mock_1);
    __export(ServiceProvider_1);
});
define("Store/Middleware/Logger", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function loggerMiddleware() {
        return function (next) { return function (action) {
            console.log(action);
            return next(action);
        }; };
    }
    exports.loggerMiddleware = loggerMiddleware;
});
define("Store/Middleware/index", ["require", "exports", "Store/Middleware/Logger"], function (require, exports, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loggerMiddleware = Logger_1.loggerMiddleware;
});
define("Store/ConfigureStore", ["require", "exports", "redux", "redux-devtools-extension", "redux-observable", "Store/Middleware/index"], function (require, exports, redux_1, redux_devtools_extension_1, redux_observable_1, Middleware_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configureStore = function (reducers, epics) {
        var rootEpic = redux_observable_1.combineEpics.apply(void 0, epics);
        var middleware = redux_1.applyMiddleware(Middleware_1.loggerMiddleware, redux_observable_1.createEpicMiddleware(rootEpic));
        if (process.env.NODE_ENV === "development") {
            middleware = redux_devtools_extension_1.composeWithDevTools(middleware);
        }
        return redux_1.createStore(redux_1.combineReducers(reducers), middleware);
    };
});
define("Store/index", ["require", "exports", "Store/ConfigureStore"], function (require, exports, ConfigureStore_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(ConfigureStore_1);
});
define("Configure", ["require", "exports", "rxjs/observable/from", "Initialize", "Services/index", "Store/index"], function (require, exports, from_1, Initialize_2, Services_3, Store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var configuration = {};
    function getConfiguration() {
        return configuration;
    }
    exports.getConfiguration = getConfiguration;
    function configure(config, configureStore) {
        if (configureStore === void 0) { configureStore = Store_1.configureStore; }
        configuration = config;
        Initialize_2.initialize();
        Services_3.initializeServices(config.modules);
        var store = configureStore(Services_3.getReducers(), Services_3.getEpics());
        Services_3.BaseService.setStateObservable(from_1.from(store));
        Services_3.BaseService.registerDispatch(store.dispatch);
        return store;
    }
    exports.configure = configure;
});
define("Initialize.test", ["require", "exports", "sinon", "Initialize"], function (require, exports, sinon_2, Initialize_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
    var expect = intern.getPlugin("chai").expect;
    describe("initialize", function () {
        var mockInitializers;
        var initialize;
        beforeEach(function () {
            mockInitializers = {
                initializeSomething: sinon_2.spy(),
                fakeOtherThing: sinon_2.spy(),
            };
            initialize = Initialize_3.makeInitialize(mockInitializers);
        });
        it("initialization status is set to false before the application initializes", function () {
            Initialize_3.resetInitializationStatus();
            expect(Initialize_3.isApplicationInitialized()).to.be.false;
        });
        it("initialization status is set to true after the application initializes", function () {
            Initialize_3.resetInitializationStatus();
            initialize();
            expect(Initialize_3.isApplicationInitialized()).to.be.true;
        });
        it("runs every function whose name starts with \"initialize\"", function () {
            initialize();
            expect(mockInitializers.initializeSomething).to.have.property("callCount").to.equal(1);
        });
        it("does not run functions which do not start with \"initialize\"", function () {
            initialize();
            expect(mockInitializers.fakeOtherThing).to.have.property("callCount").to.equal(0);
        });
    });
});
define("Utils/String", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNestedFieldName = function (path) {
        var fieldNameParts = path.split(".");
        return fieldNameParts[fieldNameParts.length - 1];
    };
});
define("Utils/index", ["require", "exports", "Utils/Lodash", "Utils/String"], function (require, exports, Lodash_3, String_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(Lodash_3);
    __export(String_1);
});
define("index", ["require", "exports", "Adapters/index", "Initializers/index", "Model/index", "Serializers/index", "Services/index", "Utils/index", "Validators/index"], function (require, exports, Adapters_2, Initializers_1, Model_4, Serializers_2, Services_4, Utils_1, Validators_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(Adapters_2);
    __export(Initializers_1);
    __export(Model_4);
    __export(Serializers_2);
    __export(Services_4);
    __export(Utils_1);
    __export(Validators_1);
});
define("Adapters/RestAdapter.test", ["require", "exports", "sinon", "Adapters/RestAdapter"], function (require, exports, sinon_3, RestAdapter_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach, afterEach = _a.afterEach;
    var expect = intern.getPlugin("chai").expect;
    describe("RestAdapter", function () {
        var apiUrl = "http://www.example.com";
        var pathName = "test";
        var restUrl = apiUrl + "/" + pathName;
        var xhr;
        var restAdapter;
        beforeEach(function () {
            xhr = sinon_3.useFakeXMLHttpRequest();
            xhr.onCreate = sinon_3.spy();
            restAdapter = new RestAdapter_2.RestAdapter(pathName, { apiUrl: apiUrl });
        });
        afterEach(function () { return xhr.restore(); });
        it("builds the URL of the endpoint", function () {
            expect(restAdapter.getRestURL()).to.equal(restUrl);
        });
        it("performs a fetchAll request", function () {
            restAdapter.fetchAll().subscribe(sinon_3.spy());
            expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
            expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(restUrl, "it should send a request to the correct url");
            expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
        });
        it("performs a fetchAll request with the given query param", function () {
            restAdapter.fetchAll({ filter: "all" }).subscribe(sinon_3.spy());
            expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
            expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(restUrl + "?filter=all", "it should send a request to the correct url");
            expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
        });
        it("performs a fetchAll request with multiple query params", function () {
            restAdapter.fetchAll({ filter: "all", hello: "world" }).subscribe(sinon_3.spy());
            expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
            expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(restUrl + "?filter=all&hello=world", "it should send a request to the correct url");
            expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
        });
        it("performs a fetchItem request", function () {
            restAdapter.fetchItem("2").subscribe(sinon_3.spy());
            expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
            expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(restUrl + "/2", "it should send a request to the correct url");
            expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
        });
    });
});
define("Initializers/InitializeValidateJS.test", ["require", "exports", "sinon", "Initializers/InitializeValidateJS"], function (require, exports, sinon_4, InitializeValidateJS_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
    var expect = intern.getPlugin("chai").expect;
    describe("initializeValidateJS", function () {
        var fakeValidateJS;
        var mockInitializers;
        var initialize;
        beforeEach(function () {
            fakeValidateJS = sinon_4.spy();
            mockInitializers = {
                initializeSomeValidator: sinon_4.spy(),
                initializeSomeOtherValidator: sinon_4.spy(),
                fakeOtherThing: sinon_4.spy(),
            };
            initialize = InitializeValidateJS_2.makeInitializeValidateJS(fakeValidateJS, mockInitializers);
        });
        it("runs every function whose name starts with \"initialize\"", function () {
            initialize();
            expect(mockInitializers.initializeSomeValidator).to.have.property("callCount").to.equal(1);
            expect(mockInitializers.initializeSomeOtherValidator).to.have.property("callCount").to.equal(1);
        });
        it("passes the validateJS object into the validator initializer", function () {
            initialize();
            expect(mockInitializers.initializeSomeValidator.firstCall.args[0]).to.equal(fakeValidateJS);
        });
        it("does not run functions which do not start with \"initialize\"", function () {
            initialize();
            expect(mockInitializers.fakeOtherThing).to.have.property("callCount").to.equal(0);
        });
    });
});
define("TestUtils/Service", ["require", "exports", "lodash", "sinon", "Services/index", "Configure"], function (require, exports, lodash_12, sinon_5, Services_5, Configure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var modelDataCreatorMap = {};
    var actionStubMap = {};
    var _FakedXHRHistory = [];
    var _FakeXHR;
    function initializeTestServices(modules, shouldStubActionCreators) {
        if (shouldStubActionCreators === void 0) { shouldStubActionCreators = true; }
        var store = Configure_1.configure({ modules: modules });
        initializeMockDataCreators(modules);
        stubXHR();
        if (shouldStubActionCreators) {
            stubActionCreators(modules);
        }
        else {
            actionStubMap = {};
        }
        return store;
    }
    exports.initializeTestServices = initializeTestServices;
    function initializeMockDataCreators(modules) {
        modelDataCreatorMap = {};
        lodash_12.forEach(modules, function (moduleItem, moduleName) {
            var mockDataCreatorName = "createMock" + lodash_12.upperFirst(moduleName);
            if (mockDataCreatorName in moduleItem) {
                modelDataCreatorMap[moduleName] = moduleItem[mockDataCreatorName];
            }
        });
    }
    exports.initializeMockDataCreators = initializeMockDataCreators;
    function stubActionCreators(modules) {
        actionStubMap = {};
        Object.keys(modules).forEach(function (moduleName) {
            var stubMapEntry = stubService(moduleName);
            if (stubMapEntry) {
                actionStubMap[moduleName] = stubMapEntry;
            }
        });
    }
    exports.stubActionCreators = stubActionCreators;
    function stubXHR() {
        _FakeXHR = sinon_5.useFakeXMLHttpRequest();
        _FakedXHRHistory = [];
        _FakeXHR.onCreate = function (xhr) {
            _FakedXHRHistory.push(xhr);
        };
    }
    exports.stubXHR = stubXHR;
    function getFakeXHR() {
        return _FakeXHR;
    }
    exports.getFakeXHR = getFakeXHR;
    function getFakedXHRHistory() {
        return _FakedXHRHistory;
    }
    exports.getFakedXHRHistory = getFakedXHRHistory;
    function stubService(moduleName) {
        var service = Services_5.getDataService(moduleName);
        var actionsToStub = ["fetchAll", "fetchRecord", "createRecord", "updateRecord", "patchRecord", "deleteRecord"];
        var stubActions = actionsToStub.reduce(function (actionStubMapEntry, fnNameToStub) {
            var stubAction = tryStubAction(moduleName, service.actions, fnNameToStub);
            if (stubAction) {
                actionStubMapEntry[fnNameToStub] = stubAction;
            }
            return actionStubMapEntry;
        }, {});
        return lodash_12.isEmpty(stubActions) ? undefined : stubActions;
    }
    function tryStubAction(moduleName, obj, methodName) {
        if (methodName in obj) {
            var invokeSpy_1 = sinon_5.spy();
            var mainStub = sinon_5.stub(obj, methodName).callsFake(function (payload, meta) {
                return {
                    invoke: invokeSpy_1,
                    type: moduleName + "/" + methodName,
                    payload: payload,
                    meta: meta,
                };
            });
            return { base: mainStub, invokeSpy: invokeSpy_1 };
        }
    }
    function getActionStubMap() {
        return actionStubMap;
    }
    exports.getActionStubMap = getActionStubMap;
    function restoreActionStubs() {
        Object.keys(actionStubMap).forEach(function (moduleName) {
            Object.keys(actionStubMap[moduleName]).forEach(function (actionName) {
                actionStubMap[moduleName][actionName].base.restore();
            });
        });
        actionStubMap = {};
    }
    exports.restoreActionStubs = restoreActionStubs;
    function seedService(serviceName, overrideValues) {
        if (overrideValues === void 0) { overrideValues = {}; }
        if (serviceName in modelDataCreatorMap) {
            var model = modelDataCreatorMap[serviceName](overrideValues);
            var service = Services_5.getDataService(serviceName);
            service.actions.pushRecord(model).invoke();
            return model;
        }
        else {
            throw new ReferenceError("ModelDataCreator for \"" + serviceName + "\" not registered!");
        }
    }
    exports.seedService = seedService;
    function seedServiceList(serviceName, count, overrideValues) {
        if (count === void 0) { count = 5; }
        if (overrideValues === void 0) { overrideValues = {}; }
        var seededData = [];
        for (var i = 0; i < count; i++) {
            seededData.push(seedService(serviceName, overrideValues));
        }
        var service = Services_5.getDataService(serviceName);
        service.actions.pushAll({ items: seededData }, { queryParams: overrideValues }).invoke();
        return seededData;
    }
    exports.seedServiceList = seedServiceList;
    function seedServices(serviceNames) {
        if (!serviceNames) {
            serviceNames = Object.keys(modelDataCreatorMap);
        }
        return serviceNames.reduce(function (seededData, serviceName) {
            seededData[serviceName] = seedServiceList(serviceName);
            return seededData;
        }, {});
    }
    exports.seedServices = seedServices;
    function createMockServiceState(service, actions) {
        if (actions === void 0) { actions = []; }
        var _a;
        var state = service.getDefaultState();
        actions.forEach(function (action) {
            state = service.reducer(state, action);
        });
        return _a = {},
            _a[service.name] = state,
            _a;
    }
    exports.createMockServiceState = createMockServiceState;
});
define("TestUtils/index", ["require", "exports", "TestUtils/Service"], function (require, exports, Service_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(Service_1);
});
define("TestUtils/Modules", ["require", "exports", "Model/Model.mock", "Services/DataService.mock"], function (require, exports, Model_mock_2, DataService_mock_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.modules = {
        fakeModel: {
            FakeModel: Model_mock_2.FakeModel,
            FakeModelService: DataService_mock_2.FakeModelService,
            createMockFakeModel: Model_mock_2.createMockFakeModel,
        },
    };
});
define("Model/Model.test", ["require", "exports", "sinon", "rxjs/observable/of", "rxjs/Subject", "faker", "Services/index", "Initializers/index", "Model/Model", "Model/Decorators/index", "Model/FieldType/index", "TestUtils/index", "TestUtils/Modules", "rxjs/add/operator/publishReplay"], function (require, exports, sinon_6, of_3, Subject_2, faker_3, Services_6, Initializers_2, Model_5, Decorators_4, FieldType_6, TestUtils_1, Modules_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach, before = _a.before;
    var expect = intern.getPlugin("chai").expect;
    describe("Model", function () {
        before(function () {
            Initializers_2.initializeValidateJS();
        });
        describe("Saving the model", function () {
            var service;
            var modelId;
            var relatedModelId;
            var favoriteColor;
            var name;
            beforeEach(function () {
                modelId = faker_3.random.number().toString();
                relatedModelId = faker_3.random.number().toString();
                favoriteColor = faker_3.lorem.word();
                name = faker_3.lorem.word();
                Services_6.BaseService.registerDispatch(sinon_6.spy());
                var RelatedModel = (function (_super) {
                    __extends(RelatedModel, _super);
                    function RelatedModel() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "relatedModel";
                        return _this;
                    }
                    __decorate([
                        Decorators_4.required(),
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], RelatedModel.prototype, "favoriteColor", void 0);
                    return RelatedModel;
                }(Model_5.Model));
                var RelatedModelService = (function (_super) {
                    __extends(RelatedModelService, _super);
                    function RelatedModelService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "relatedModel";
                        _this.ModelClass = RelatedModel;
                        return _this;
                    }
                    return RelatedModelService;
                }(Services_6.DataService));
                var Example = (function (_super) {
                    __extends(Example, _super);
                    function Example() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "example";
                        return _this;
                    }
                    __decorate([
                        Decorators_4.required(),
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], Example.prototype, "name", void 0);
                    __decorate([
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], Example.prototype, "relatedModelId", void 0);
                    __decorate([
                        Decorators_4.belongsTo(),
                        __metadata("design:type", RelatedModel)
                    ], Example.prototype, "relatedModel", void 0);
                    return Example;
                }(Model_5.Model));
                var ExampleService = (function (_super) {
                    __extends(ExampleService, _super);
                    function ExampleService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "example";
                        _this.ModelClass = Example;
                        return _this;
                    }
                    return ExampleService;
                }(Services_6.DataService));
                var relatedModel = new RelatedModel({
                    id: relatedModelId,
                }, {
                    original: {
                        id: relatedModelId,
                        favoriteColor: favoriteColor,
                    },
                });
                var relatedModelService = new RelatedModelService();
                sinon_6.stub(relatedModelService, "getById").returns(of_3.of(relatedModel));
                Services_6.registerService(relatedModelService);
                service = new ExampleService();
                Services_6.registerService(service);
            });
            describe("Model#save", function () {
                it("rejects the promise if there are validation errors", function () {
                    var model = service.createNew();
                    return model.save()
                        .then(function () {
                        throw new Error("Promise should throw when there are validation errors");
                    })
                        .catch(function (errors) {
                        expect(errors).to.have.property("name").deep.equal(["is required"]);
                    });
                });
                it("calls saveRelatedModels to save related models", function () {
                    var model = service
                        .createNew()
                        .applyUpdates({ name: faker_3.lorem.word() });
                    var stubSaveRelatedModels = sinon_6.stub(model, "saveRelatedModels");
                    sinon_6.stub(model, "saveModel");
                    return model.save().finally(function () {
                        expect(stubSaveRelatedModels.callCount).to.equal(1);
                    });
                });
                it("calls saveModel to save the model's own data", function () {
                    var model = service
                        .createNew()
                        .applyUpdates({ name: faker_3.lorem.word() });
                    var stubSaveModel = sinon_6.stub(model, "saveModel");
                    sinon_6.stub(model, "saveRelatedModels");
                    return model.save().finally(function () {
                        expect(stubSaveModel.callCount).to.equal(1);
                    });
                });
                it("returns the same instance of the model when there are no errors and no changes", function () {
                    var model = service.createNew({ name: faker_3.lorem.word() });
                    return model
                        .save()
                        .then(function (result) {
                        expect(result).to.equal(model);
                    })
                        .catch(function () {
                        throw new Error("Expected promise to resolve when there are no errors or changes");
                    });
                });
            });
            describe("Model.saveRelatedModels", function () {
                it("saves related models with pending changes", function () {
                    var model = service.createNew({ relatedModelId: relatedModelId });
                    var stubRelatedSaveModel = sinon_6.stub(model.relatedModel, "saveModel").resolves();
                    return model.saveRelatedModels().finally(function () {
                        expect(stubRelatedSaveModel.callCount).to.equal(1);
                    });
                });
                it("assigns new related models onto the model after it is saved", function () {
                    var fakeModel = sinon_6.spy();
                    var model = service.createNew({ relatedModelId: relatedModelId });
                    var stubSetRelated = sinon_6.stub(model, "setRelated");
                    sinon_6.stub(model.relatedModel, "saveModel").resolves(fakeModel);
                    return model.saveRelatedModels().finally(function () {
                        expect(stubSetRelated.firstCall.args).to.deep.equal([
                            "relatedModel",
                            fakeModel,
                        ]);
                    });
                });
            });
            describe("Model#saveModel", function () {
                describe("saving a new record", function () {
                    var expectedName;
                    var invokeSpy;
                    var createRecordStub;
                    var model;
                    it("calls createRecord action on the service when calling save() on a new record", function () {
                        expectedName = "hello, world!";
                        invokeSpy = sinon_6.spy();
                        createRecordStub = sinon_6.stub(service.actions, "createRecord").returns({
                            invoke: invokeSpy,
                        });
                        model = service
                            .createNew()
                            .applyUpdates({ name: expectedName });
                        model.saveModel();
                        expect(createRecordStub.firstCall.args[0]).to.deep.equal({ id: model.id });
                    });
                    it("dispatches createRecord action to the service when calling save() on a new record", function () {
                        expectedName = "hello, world!";
                        invokeSpy = sinon_6.spy();
                        createRecordStub = sinon_6.stub(service.actions, "createRecord").returns({
                            invoke: invokeSpy,
                        });
                        model = service
                            .createNew()
                            .applyUpdates({ name: expectedName });
                        model.saveModel();
                        expect(invokeSpy.calledOnce).to.equal(true);
                    });
                });
                describe("saving an existing record", function () {
                    var updateRecordStub;
                    var model;
                    beforeEach(function () {
                        updateRecordStub = sinon_6.stub(service.actions, "updateRecord");
                        model = new service.ModelClass(service, { id: faker_3.random.number().toString(), name: faker_3.lorem.word() });
                    });
                    it("calls updateRecord action on the service when calling save() on an existing record", function () {
                        var expectedName = "hello, world!";
                        model = model.applyUpdates({ name: expectedName });
                        model.saveModel();
                        expect(updateRecordStub.firstCall.args[0]).to.deep.equal({ id: model.id });
                    });
                    it("dispatches updateRecord action to the service when calling save() on an existing record", function () {
                        var invokeSpy = sinon_6.spy();
                        updateRecordStub.returns({
                            invoke: invokeSpy,
                        });
                        model
                            .applyUpdates({ name: faker_3.lorem.word() })
                            .saveModel();
                        expect(invokeSpy.calledOnce).to.be.true;
                    });
                });
            });
        });
        describe("Model#validate & Model#validateField", function () {
            var service;
            var modelId;
            var relatedModelId;
            var favoriteColor;
            var name;
            beforeEach(function () {
                modelId = faker_3.random.number().toString();
                relatedModelId = faker_3.random.number().toString();
                favoriteColor = faker_3.lorem.word();
                name = faker_3.lorem.word();
                Services_6.BaseService.registerDispatch(sinon_6.spy());
                var RelatedModel = (function (_super) {
                    __extends(RelatedModel, _super);
                    function RelatedModel() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "relatedModel";
                        return _this;
                    }
                    __decorate([
                        Decorators_4.required(),
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], RelatedModel.prototype, "favoriteColor", void 0);
                    return RelatedModel;
                }(Model_5.Model));
                var RelatedModelService = (function (_super) {
                    __extends(RelatedModelService, _super);
                    function RelatedModelService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "relatedModel";
                        _this.ModelClass = RelatedModel;
                        return _this;
                    }
                    return RelatedModelService;
                }(Services_6.DataService));
                var Example = (function (_super) {
                    __extends(Example, _super);
                    function Example() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "example";
                        return _this;
                    }
                    __decorate([
                        Decorators_4.required(),
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], Example.prototype, "name", void 0);
                    __decorate([
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], Example.prototype, "relatedModelId", void 0);
                    __decorate([
                        Decorators_4.belongsTo(),
                        __metadata("design:type", RelatedModel)
                    ], Example.prototype, "relatedModel", void 0);
                    return Example;
                }(Model_5.Model));
                var ExampleService = (function (_super) {
                    __extends(ExampleService, _super);
                    function ExampleService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "example";
                        _this.ModelClass = Example;
                        return _this;
                    }
                    return ExampleService;
                }(Services_6.DataService));
                var relatedModel = new RelatedModel({
                    id: relatedModelId,
                }, {
                    original: {
                        id: relatedModelId,
                        favoriteColor: favoriteColor,
                    },
                });
                var relatedModelService = new RelatedModelService();
                sinon_6.stub(relatedModelService, "getById").returns(of_3.of(relatedModel));
                Services_6.registerService(relatedModelService);
                service = new ExampleService();
                Services_6.registerService(service);
            });
            it("validates the model's data using the model's validation rules", function () {
                var model = new service.ModelClass({ id: modelId, name: "" });
                expect(model.validate()).to.deep.equal({
                    name: ["is required"],
                });
            });
            it("passes validation result to the SET_META_FIELD action creator on the DataService to update the model's error meta field", function () {
                var model = new service.ModelClass({ id: modelId, name: "" });
                var setMetaFieldStub = sinon_6.stub(service.actions, "setMetaField").returns({
                    invoke: sinon_6.spy(),
                });
                model.validate();
                expect(setMetaFieldStub.firstCall.args[0]).to.deep.equal({
                    id: modelId,
                    fieldName: "errors",
                    value: {
                        name: ["is required"],
                    },
                });
            });
            it("dispatches SET_META_FIELD action after it is created to update the model's error meta field", function () {
                var model = new service.ModelClass({ id: modelId, name: "" });
                var invokeSpy = sinon_6.spy();
                sinon_6.stub(service.actions, "setMetaField").returns({
                    invoke: invokeSpy,
                });
                model.validate();
                expect(invokeSpy.calledOnce).to.equal(true);
            });
            it("optionally includes related models when validating the model", function () {
                var model = new service.ModelClass({ id: modelId, name: "", relatedModelId: relatedModelId });
                model.getRelated("relatedModel");
                expect(model.validate(true)).to.deep.equal({
                    "relatedModel.favoriteColor": ["is required"],
                    name: ["is required"],
                });
            });
            it("does not validate related models which have not been loaded previously", function () {
                var model = new service.ModelClass({ id: modelId, name: name, relatedModelId: relatedModelId });
                expect(model.validate(true)).to.deep.equal({});
            });
            it("validates a single field", function () {
                var model = new service.ModelClass({ id: modelId, name: "" });
                expect(model.validateField("name")).to.deep.equal([
                    "is required",
                ]);
            });
            it("validates a single nested field", function () {
                var model = new service.ModelClass({ id: modelId, name: "", relatedModelId: relatedModelId });
                expect(model.validateField("relatedModel.favoriteColor")).to.deep.equal([
                    "is required",
                ]);
            });
            it("updates existing validation results when validating a single field", function () {
                var model = new service.ModelClass({ id: modelId, name: "" });
                var errors = model.validate();
                model = model.applyUpdates({ name: name }, { errors: errors });
                expect(model.validateField("name")).to.be.undefined;
            });
        });
        describe("Model#reset", function () {
            var service;
            var model;
            var originalData;
            var modelId;
            var name;
            beforeEach(function () {
                modelId = faker_3.random.number().toString();
                name = faker_3.lorem.word();
                Services_6.BaseService.registerDispatch(sinon_6.spy());
                var Example = (function (_super) {
                    __extends(Example, _super);
                    function Example() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "example";
                        return _this;
                    }
                    __decorate([
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], Example.prototype, "name", void 0);
                    return Example;
                }(Model_5.Model));
                var ExampleService = (function (_super) {
                    __extends(ExampleService, _super);
                    function ExampleService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "example";
                        _this.ModelClass = Example;
                        return _this;
                    }
                    return ExampleService;
                }(Services_6.DataService));
                service = new ExampleService();
                Services_6.registerService(service);
                originalData = { id: modelId, name: name };
                model = new Example(originalData);
            });
            it("does not attempt to reset if the Model has not changed", function () {
                var pushRecordStub = sinon_6.stub(service.actions, "pushRecord");
                model.reset();
                expect(pushRecordStub.callCount).to.equal(0);
            });
            it("passes the model's original data to the DataService's pushRecord action creator to reset the Model's data", function () {
                var pushRecordStub = sinon_6.stub(service.actions, "pushRecord").returns({
                    invoke: sinon_6.spy(),
                });
                model
                    .applyUpdates({
                    name: faker_3.lorem.word(),
                })
                    .reset();
                expect(pushRecordStub.firstCall.args[0]).to.deep.equal(model);
            });
            it("dispatches the pushRecord action to reset the Model's data", function () {
                var invokeSpy = sinon_6.spy();
                sinon_6.stub(service.actions, "pushRecord").returns({
                    invoke: invokeSpy,
                });
                model
                    .applyUpdates({
                    name: faker_3.lorem.word(),
                })
                    .reset();
                expect(invokeSpy.calledOnce).to.equal(true);
            });
            it("unloads the model if it is new", function () {
                var newModel = service.createNew();
                var unloadStub = sinon_6.stub(newModel, "unload");
                newModel.reset();
                expect(unloadStub.callCount).to.equal(1);
            });
        });
        describe("Model#forceReload", function () {
            var service;
            var modelId;
            beforeEach(function () {
                modelId = faker_3.random.number().toString();
                Services_6.BaseService.registerDispatch(sinon_6.spy());
                var Example = (function (_super) {
                    __extends(Example, _super);
                    function Example() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "example";
                        return _this;
                    }
                    __decorate([
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], Example.prototype, "name", void 0);
                    return Example;
                }(Model_5.Model));
                var ExampleService = (function (_super) {
                    __extends(ExampleService, _super);
                    function ExampleService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "example";
                        _this.ModelClass = Example;
                        return _this;
                    }
                    return ExampleService;
                }(Services_6.DataService));
                service = new ExampleService();
                Services_6.registerService(service);
            });
            it("does not attempt to forceReload if the model is new", function () {
                var fetchRecordStub = sinon_6.stub(service.actions, "fetchRecord");
                var model = service.createNew();
                model.forceReload();
                expect(fetchRecordStub.callCount).to.equal(0);
            });
            it("passes the model's id and forceReload: true to the fetchRecord action creator to force the model to reload", function () {
                var fetchRecordStub = sinon_6.stub(service.actions, "fetchRecord").returns({
                    invoke: sinon_6.spy(),
                });
                var model = new service.ModelClass({ id: modelId });
                model.forceReload();
                expect(fetchRecordStub.firstCall.args).to.deep.equal([
                    { id: modelId },
                    { forceReload: true },
                ]);
            });
            it("dispatches fetchRecord action to force the model to reload", function () {
                var invokeSpy = sinon_6.spy();
                sinon_6.stub(service.actions, "fetchRecord").returns({
                    invoke: invokeSpy,
                });
                var model = new service.ModelClass({ id: modelId });
                model.forceReload();
                expect(invokeSpy.calledOnce).to.equal(true);
            });
        });
        describe("Model#applyUpdates", function () {
            describe("creates a new instance of the Model", function () {
                var service;
                var modelId;
                var name;
                beforeEach(function () {
                    modelId = faker_3.random.number().toString();
                    name = faker_3.lorem.word();
                    Services_6.BaseService.registerDispatch(sinon_6.spy());
                    var Example = (function (_super) {
                        __extends(Example, _super);
                        function Example() {
                            var _this = _super !== null && _super.apply(this, arguments) || this;
                            _this.serviceName = "example";
                            return _this;
                        }
                        __decorate([
                            Decorators_4.attr(FieldType_6.StringField),
                            __metadata("design:type", String)
                        ], Example.prototype, "name", void 0);
                        return Example;
                    }(Model_5.Model));
                    var ExampleService = (function (_super) {
                        __extends(ExampleService, _super);
                        function ExampleService() {
                            var _this = _super !== null && _super.apply(this, arguments) || this;
                            _this.name = "example";
                            _this.ModelClass = Example;
                            return _this;
                        }
                        return ExampleService;
                    }(Services_6.DataService));
                    service = new ExampleService();
                    Services_6.registerService(service);
                });
                it("creates a new instance of the Model", function () {
                    var firstModel = service.createNew();
                    var secondModel = firstModel.applyUpdates();
                    expect(firstModel).to.not.equal(secondModel);
                });
                it("creates a new instance of the Model using its own data", function () {
                    var originalData = { id: modelId, name: name };
                    var firstModel = new service.ModelClass(service, originalData);
                    var secondModel = firstModel.applyUpdates();
                    expect(firstModel).to.deep.equal(secondModel);
                });
                it("creates a new instance of the Model with new meta", function () {
                    var firstModel = service.createNew();
                    var secondModel = firstModel.applyUpdates(null, { isLoading: true });
                    expect(secondModel).to.have.property("isLoading").to.be.true;
                });
                it("creates a new instance of the Model with new meta without modifying the original", function () {
                    var firstModel = service.createNew();
                    var secondModel = firstModel.applyUpdates(null, { isLoading: true });
                    expect(firstModel).to.have.property("isLoading").to.be.false;
                });
                it("creates a new instance of the Model with new data", function () {
                    var expectedValue = faker_3.lorem.word();
                    var firstModel = service.createNew();
                    var secondModel = firstModel.applyUpdates({ name: expectedValue });
                    expect(secondModel).to.have.property("name").to.equal(expectedValue);
                });
                it("creates a new instance of the Model with new data without modifying the original", function () {
                    var firstModel = service.createNew();
                    var secondModel = firstModel.applyUpdates({ name: faker_3.lorem.word() });
                    expect(firstModel).to.have.property("name").to.equal("");
                });
                it("throws a ReferenceError if attempting to set on an invalid field name", function () {
                    var model = service.createNew();
                    expect(function () { return model.applyUpdates({ asdf: faker_3.random.number() }); }).to.throw(ReferenceError, "not found");
                });
                it("throws a TypeError if attempting to set an invalid type for a field", function () {
                    var model = service.createNew();
                    expect(function () { return model.applyUpdates({ name: faker_3.random.number() }); }).to.throw(TypeError, "invalid");
                });
            });
            describe("creates new instance by merging own data with new data", function () {
                var service;
                var originalData;
                var firstModel;
                var modelId;
                var name;
                var age;
                beforeEach(function () {
                    modelId = faker_3.random.number().toString();
                    name = faker_3.lorem.word();
                    age = faker_3.random.number();
                    var Example = (function (_super) {
                        __extends(Example, _super);
                        function Example() {
                            var _this = _super !== null && _super.apply(this, arguments) || this;
                            _this.serviceName = "example";
                            return _this;
                        }
                        Example.prototype.getMeta = function () {
                            return this.meta;
                        };
                        Example.prototype.getModelData = function () {
                            return this.modelData;
                        };
                        __decorate([
                            Decorators_4.attr(FieldType_6.StringField),
                            __metadata("design:type", String)
                        ], Example.prototype, "name", void 0);
                        __decorate([
                            Decorators_4.attr(FieldType_6.NumberField),
                            __metadata("design:type", Number)
                        ], Example.prototype, "age", void 0);
                        return Example;
                    }(Model_5.Model));
                    var ExampleService = (function (_super) {
                        __extends(ExampleService, _super);
                        function ExampleService() {
                            var _this = _super !== null && _super.apply(this, arguments) || this;
                            _this.name = "example";
                            _this.ModelClass = Example;
                            return _this;
                        }
                        return ExampleService;
                    }(Services_6.DataService));
                    service = new ExampleService();
                    Services_6.registerService(service);
                    originalData = { id: modelId, name: name, age: age };
                    firstModel = new service.ModelClass(originalData);
                });
                it("creates a new instance of the Model with new data and sets the previous data as the meta.original", function () {
                    var secondModel = firstModel.applyUpdates({ name: faker_3.lorem.word() });
                    expect(secondModel.getMeta()).to.have.property("original").to.deep.equal(originalData);
                });
                it("creates a new instance of the Model with new data without modifying the meta.original on the first model", function () {
                    var secondModel = firstModel.applyUpdates({ name: faker_3.lorem.word() });
                    expect(firstModel.getMeta()).to.have.property("original").to.be.null;
                });
                it("creates a new instance of the Model with new data and doesn't change meta.original if it was already set", function () {
                    var secondModel = firstModel.applyUpdates({ name: faker_3.lorem.word() });
                    var thirdModel = secondModel.applyUpdates({ name: faker_3.lorem.word() });
                    expect(thirdModel.getMeta()).to.have.property("original").to.deep.equal(originalData);
                });
                it("creates a new instance of the Model with new meta without modifying the meta on the first model", function () {
                    var secondModel = firstModel.applyUpdates(null, { isLoading: true });
                    expect(firstModel.getMeta()).to.have.property("isLoading").to.be.false;
                });
                it("creates a new instance of the Model with new meta", function () {
                    var secondModel = firstModel.applyUpdates(null, { isLoading: true });
                    expect(secondModel.getMeta()).to.have.property("isLoading").to.be.true;
                });
                it("creates a new instance of the Model with new meta and previous data was copied over", function () {
                    var secondModel = firstModel.applyUpdates(null, { isLoading: true });
                    expect(secondModel.getModelData()).to.deep.equal(originalData);
                });
            });
        });
        describe("Model#getField", function () {
            var service;
            var model;
            var modelId;
            var name;
            beforeEach(function () {
                modelId = faker_3.random.number().toString();
                name = faker_3.lorem.word();
                Services_6.BaseService.registerDispatch(sinon_6.spy());
                var Example = (function (_super) {
                    __extends(Example, _super);
                    function Example() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "example";
                        return _this;
                    }
                    __decorate([
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], Example.prototype, "name", void 0);
                    return Example;
                }(Model_5.Model));
                var ExampleService = (function (_super) {
                    __extends(ExampleService, _super);
                    function ExampleService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "example";
                        _this.ModelClass = Example;
                        return _this;
                    }
                    return ExampleService;
                }(Services_6.DataService));
                service = new ExampleService();
                Services_6.registerService(service);
                model = new Example({ id: modelId, name: name });
            });
            it("returns the default value if the fieldName is not in the modelData", function () {
                expect(model.getField("fakeField", "hello")).to.equal("hello");
            });
            it("returns the value in modelData for the given fieldName", function () {
                expect(model.getField("name")).to.equal(name);
            });
        });
        describe("Model#setField", function () {
            var service;
            var ExampleModel;
            var modelId;
            var name;
            beforeEach(function () {
                modelId = faker_3.random.number().toString();
                name = faker_3.lorem.word();
                Services_6.BaseService.registerDispatch(sinon_6.spy());
                var Example = (function (_super) {
                    __extends(Example, _super);
                    function Example() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "example";
                        return _this;
                    }
                    __decorate([
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], Example.prototype, "name", void 0);
                    return Example;
                }(Model_5.Model));
                var ExampleService = (function (_super) {
                    __extends(ExampleService, _super);
                    function ExampleService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "example";
                        _this.ModelClass = Example;
                        return _this;
                    }
                    return ExampleService;
                }(Services_6.DataService));
                service = new ExampleService();
                Services_6.registerService(service);
                ExampleModel = Example;
            });
            it("passes the model's id and the given data to the setField action creator", function () {
                var setFieldStub = sinon_6.stub(service.actions, "setField").returns({
                    invoke: sinon_6.spy(),
                });
                var model = new ExampleModel({ id: modelId, name: name });
                var expectedValue = faker_3.lorem.word();
                model.setField("name", expectedValue);
                expect(setFieldStub.firstCall.args[0]).to.deep.equal({
                    id: modelId,
                    fieldName: "name",
                    value: expectedValue,
                });
            });
            it("dispatches fetchRecord action to force the model to reload", function () {
                var invokeSpy = sinon_6.spy();
                sinon_6.stub(service.actions, "setField").returns({
                    invoke: invokeSpy,
                });
                var model = new ExampleModel({ id: modelId, name: name });
                model.setField("name", faker_3.lorem.word());
                expect(invokeSpy.calledOnce).to.be.true;
            });
            it("does not mutate the current instance of the Model", function () {
                sinon_6.stub(service.actions, "setField").returns({
                    invoke: sinon_6.spy(),
                });
                var model = new ExampleModel({ id: modelId, name: name });
                model.setField("name", faker_3.lorem.word());
                expect(model.name).to.equal(name);
            });
            it("throws a ReferenceError if attempting to set on an invalid field name", function () {
                var model = new ExampleModel({ id: modelId, name: name });
                expect(function () { return model.setField("asdf", faker_3.random.number()); }).to.throw(ReferenceError, "not found");
            });
            it("throws a TypeError if attempting to set an invalid type for a field", function () {
                var model = new ExampleModel({ id: modelId, name: name });
                expect(function () { return model.setField("name", faker_3.random.number()); }).to.throw(TypeError, "invalid");
            });
        });
        describe("Model - relationship magic getter and setter", function () {
            var exampleService;
            var studentService;
            var organizationService;
            var ExampleModelClass;
            var id;
            var organizationId;
            beforeEach(function () {
                id = faker_3.random.number().toString();
                organizationId = faker_3.random.number().toString();
                Services_6.BaseService.registerDispatch(sinon_6.spy());
                var Organization = (function (_super) {
                    __extends(Organization, _super);
                    function Organization() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "organization";
                        return _this;
                    }
                    return Organization;
                }(Model_5.Model));
                var OrganizationService = (function (_super) {
                    __extends(OrganizationService, _super);
                    function OrganizationService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "organization";
                        _this.ModelClass = Organization;
                        return _this;
                    }
                    return OrganizationService;
                }(Services_6.DataService));
                var Student = (function (_super) {
                    __extends(Student, _super);
                    function Student() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "student";
                        return _this;
                    }
                    return Student;
                }(Model_5.Model));
                var StudentService = (function (_super) {
                    __extends(StudentService, _super);
                    function StudentService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "student";
                        _this.ModelClass = Student;
                        return _this;
                    }
                    return StudentService;
                }(Services_6.DataService));
                var Example = (function (_super) {
                    __extends(Example, _super);
                    function Example() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "example";
                        return _this;
                    }
                    __decorate([
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], Example.prototype, "organizationId", void 0);
                    __decorate([
                        Decorators_4.attr(FieldType_6.ArrayField),
                        __metadata("design:type", Array)
                    ], Example.prototype, "studentIds", void 0);
                    __decorate([
                        Decorators_4.belongsTo(),
                        __metadata("design:type", Object)
                    ], Example.prototype, "organization", void 0);
                    __decorate([
                        Decorators_4.hasMany(),
                        __metadata("design:type", Array)
                    ], Example.prototype, "students", void 0);
                    return Example;
                }(Model_5.Model));
                ExampleModelClass = Example;
                var ExampleService = (function (_super) {
                    __extends(ExampleService, _super);
                    function ExampleService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "example";
                        _this.ModelClass = Example;
                        return _this;
                    }
                    return ExampleService;
                }(Services_6.DataService));
                exampleService = new ExampleService();
                studentService = new StudentService();
                organizationService = new OrganizationService();
                Services_6.registerService(exampleService);
                Services_6.registerService(studentService);
                Services_6.registerService(organizationService);
            });
            describe("Model#getRelated", function () {
                it("returns undefined if the requested related field is not a property on the model", function () {
                    var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                    expect(model.getRelated("fakeField")).to.be.undefined;
                });
                it("returns a shadow for a belongsTo relationship if the current model is a shadow", function () {
                    var shadowModel = exampleService.getShadowObject();
                    expect(shadowModel.getRelated("organization")).to.have.property("isShadow").to.be.true;
                });
                it("returns null for a belongsTo relationship if the related id field is empty", function () {
                    var model = new ExampleModelClass({ id: id, organizationId: null });
                    expect(model.getRelated("organization")).to.be.null;
                });
                it("returns an empty array for a hasMany relationship if the related ids field is empty", function () {
                    var model = new ExampleModelClass({ id: id, studentIds: [] });
                    expect(model.getRelated("students")).to.be.an("array").that.is.empty;
                });
                it("uses the Observable returned from the DataService to get the related BelongsTo model", function () {
                    var organizationObservable = of_3.of(new organizationService.ModelClass({ id: organizationId }));
                    sinon_6.stub(organizationService, "getById").returns(organizationObservable);
                    var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                    expect(model).to.have.property("organization").to.have.property("id").to.equal(organizationId);
                });
                it("uses the Observable returned from the DataService to get the related HasMany models", function () {
                    var studentIds = [faker_3.random.number().toString(), faker_3.random.number().toString()];
                    var students = studentIds.map(function (studentId) { return new studentService.ModelClass({ id: studentId }); });
                    var studentObservable = of_3.of(students);
                    sinon_6.stub(studentService, "getByIds").returns(studentObservable);
                    var model = new ExampleModelClass({ id: id, studentIds: studentIds });
                    expect(model).to.have.property("students").to.deep.equal(students);
                });
                it("listens for new changes from the related Observable", function () {
                    var organizationObservable = new Subject_2.Subject();
                    sinon_6.stub(organizationService, "getById").returns(organizationObservable.publishReplay(1).refCount());
                    var organization1 = new organizationService.ModelClass({ id: organizationId });
                    var organization2 = new organizationService.ModelClass({ id: organizationId });
                    var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                    model.getRelated("organization");
                    organizationObservable.next(organization1);
                    organizationObservable.next(organization2);
                    expect(model).to.have.property("organization").to.equal(organization2).but.to.not.equal(organization1);
                });
                it("stops listening to new changes when the Model is being torn down", function () {
                    var organizationObservable = new Subject_2.Subject();
                    sinon_6.stub(organizationService, "getById").returns(organizationObservable.publishReplay(1).refCount());
                    var organization1 = new organizationService.ModelClass({ id: organizationId });
                    var organization2 = new organizationService.ModelClass({ id: organizationId });
                    var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                    model.getRelated("organization");
                    organizationObservable.next(organization1);
                    model.markForDestruction();
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            try {
                                organizationObservable.next(organization2);
                                expect(model).to.have.property("organization").to.equal(organization1).but.to.not.equal(organization2);
                                resolve();
                            }
                            catch (e) {
                                reject(e);
                            }
                        }, 0);
                    });
                });
                it("will not subscribe to new changes when the Model is being torn down", function () {
                    var organization = new organizationService.ModelClass({ id: organizationId });
                    var organizationObservable = of_3.of(organization);
                    sinon_6.stub(organizationService, "getById").returns(organizationObservable);
                    var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                    model.markForDestruction();
                    expect(model).to.have.property("organization").to.be.null;
                });
            });
            describe("Model#setRelated", function () {
                it("passes the BelongsTo model id to the setField method", function () {
                    var organization = new organizationService.ModelClass({ id: organizationId });
                    var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                    var setFieldStub = sinon_6.stub(model, "setField");
                    model.setRelated("organization", organization);
                    expect(setFieldStub.firstCall.args).to.deep.equal([
                        "organizationId",
                        organizationId,
                    ]);
                });
                it("passes the HasMany model ids to the setField method", function () {
                    var studentIds = [faker_3.random.number().toString(), faker_3.random.number().toString()];
                    var students = studentIds.map(function (studentId) { return new studentService.ModelClass({ id: studentId }); });
                    var model = new ExampleModelClass({ id: id, studentIds: studentIds });
                    var setFieldStub = sinon_6.stub(model, "setField");
                    model.setRelated("students", students);
                    expect(setFieldStub.firstCall.args).to.deep.equal([
                        "studentIds",
                        studentIds,
                    ]);
                });
            });
        });
        describe("Model#isDirty", function () {
            it("considers the model to be dirty when a field has changed", function () {
                TestUtils_1.initializeTestServices(Modules_1.modules);
                var model = TestUtils_1.seedService("fakeModel");
                model = model.applyUpdates({ fullText: faker_3.lorem.word() });
                expect(model.isDirty).to.be.true;
            });
            it("does not consider the model to be dirty when the model has not been changed", function () {
                TestUtils_1.initializeTestServices(Modules_1.modules);
                var model = TestUtils_1.seedService("fakeModel");
                expect(model.isDirty).to.be.false;
            });
        });
        describe("Model#hasUnsavedChanges", function () {
            it("considers the model to have unsaved changes when one of its own fields has changed", function () {
                TestUtils_1.initializeTestServices(Modules_1.modules);
                var model = TestUtils_1.seedService("fakeModel");
                model = model.applyUpdates({ fullText: faker_3.lorem.word() });
                expect(model.hasUnsavedChanges).to.be.true;
            });
            it("considers the model to have unsaved changes when one of its previously loaded related models has changed", function () {
                TestUtils_1.initializeTestServices(Modules_1.modules);
                var model = TestUtils_1.seedService("fakeModel");
                model.relatedModels = { someRelatedModel: { isDirty: true } };
                expect(model.hasUnsavedChanges).to.be.true;
            });
            it("does not consider the model to have unsaved changes when the model and its relationships have not been changed", function () {
                TestUtils_1.initializeTestServices(Modules_1.modules);
                var model = TestUtils_1.seedService("fakeModel");
                model.relatedModels = { someRelatedModel: { isDirty: false } };
                expect(model.hasUnsavedChanges).to.be.false;
            });
        });
        describe("sub-classing works as expected", function () {
            it("Model decorators apply only to the subtype and not the parent", function () {
                var MockModel = (function (_super) {
                    __extends(MockModel, _super);
                    function MockModel() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    __decorate([
                        Decorators_4.attr(FieldType_6.DateField),
                        __metadata("design:type", Date)
                    ], MockModel.prototype, "asdfasdfasdf", void 0);
                    __decorate([
                        Decorators_4.attr(FieldType_6.TimeField),
                        __metadata("design:type", Date)
                    ], MockModel.prototype, "startTime", void 0);
                    __decorate([
                        Decorators_4.attr(FieldType_6.DateTimeField),
                        __metadata("design:type", Date)
                    ], MockModel.prototype, "endDateTime", void 0);
                    __decorate([
                        Decorators_4.attr(FieldType_6.NumberField),
                        __metadata("design:type", Number)
                    ], MockModel.prototype, "age", void 0);
                    __decorate([
                        Decorators_4.attr(FieldType_6.StringField),
                        __metadata("design:type", String)
                    ], MockModel.prototype, "organizationId", void 0);
                    return MockModel;
                }(Model_5.Model));
                var model = new Model_5.Model({ id: faker_3.random.number().toString() });
                expect(model.fields).to.deep.equal({
                    id: __assign({}, FieldType_6.StringField, { serialize: false }),
                    dateDeleted: __assign({}, FieldType_6.DateTimeField, { serialize: false }),
                    dateUpdated: __assign({}, FieldType_6.DateTimeField, { serialize: false }),
                });
            });
        });
    });
});
define("Model/Decorators/Attr.test", ["require", "exports", "sinon", "Model/Decorators/Attr", "Model/FieldType/index"], function (require, exports, sinon_7, Attr_2, FieldType_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
    var expect = intern.getPlugin("chai").expect;
    describe("@attr", function () {
        describe("@attr - magic getter", function () {
            var defaultValue;
            var expectedValue;
            var myClass;
            beforeEach(function () {
                defaultValue = "hello world";
                expectedValue = "this is a test";
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_7.stub();
                        this.getField = sinon_7.stub().callsFake(function () { return expectedValue; });
                        this.setField = sinon_7.stub();
                    }
                    __decorate([
                        Attr_2.attr(FieldType_7.StringField, { defaultValue: defaultValue }),
                        __metadata("design:type", String)
                    ], MyClass.prototype, "name", void 0);
                    return MyClass;
                }());
                myClass = new MyClass();
                var studentName = myClass.name;
            });
            it("returns the expected output from the magic getter", function () {
                expect(myClass).to.have.property("name").to.equal(expectedValue);
            });
            it("called the magic getter once", function () {
                expect(myClass.getField.calledOnce).to.equal(true);
            });
            it("passed the correct field name to the magic getter", function () {
                expect(myClass.getField.firstCall.args[0]).to.equal("name");
            });
            it("passed the correct default value to the magic getter", function () {
                expect(myClass.getField.firstCall.args[1]).to.equal(defaultValue);
            });
        });
        describe("@attr - magic setter", function () {
            var expectedValue;
            var myClass;
            beforeEach(function () {
                expectedValue = "this is a test";
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_7.stub();
                        this.getField = sinon_7.stub();
                        this.setField = sinon_7.stub();
                    }
                    __decorate([
                        Attr_2.attr(FieldType_7.StringField),
                        __metadata("design:type", String)
                    ], MyClass.prototype, "name", void 0);
                    return MyClass;
                }());
                myClass = new MyClass();
                myClass.name = expectedValue;
            });
            it("called the magic setter once", function () {
                expect(myClass.setField.calledOnce).to.equal(true);
            });
            it("passed the correct field name to the magic setter", function () {
                expect(myClass.setField.firstCall.args[0]).to.equal("name");
            });
            it("passed the correct value to the magic setter", function () {
                expect(myClass.setField.firstCall.args[1]).to.equal(expectedValue);
            });
        });
        describe("@attr - field definition", function () {
            var expectedValue;
            var myClass;
            beforeEach(function () {
                expectedValue = "";
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_7.stub();
                        this.getField = sinon_7.stub().callsFake(function () { return expectedValue; });
                        this.setField = sinon_7.stub();
                    }
                    __decorate([
                        Attr_2.attr(FieldType_7.EmailField),
                        __metadata("design:type", String)
                    ], MyClass.prototype, "homeEmail", void 0);
                    return MyClass;
                }());
                myClass = new MyClass();
            });
            it("creates a field decorator which tracks the FieldType for the field", function () {
                expect(myClass.fields).to.have.property("homeEmail").to.deep.equal(FieldType_7.EmailField, "it keeps track of the field's FieldType correctly");
            });
            it("creates a field decorator which sets up default validation rules for the FieldType", function () {
                expect(myClass.validationRules).to.have.property("homeEmail").to.deep.equal({ email: true }, "it sets correct validation rules for the FieldType");
            });
            it("returns the expected default value based on the given FieldType", function () {
                expect(myClass).to.have.property("homeEmail").to.equal(expectedValue);
            });
        });
        describe("@attr - memory efficiency", function () {
            var expectedValue;
            var myClass;
            var anotherMyClass;
            beforeEach(function () {
                expectedValue = { name: "Bob" };
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_7.stub();
                        this.getField = sinon_7.stub().callsFake(function () { return expectedValue; });
                        this.setField = sinon_7.stub();
                    }
                    __decorate([
                        Attr_2.attr(FieldType_7.EmailField),
                        __metadata("design:type", String)
                    ], MyClass.prototype, "homeEmail", void 0);
                    return MyClass;
                }());
                myClass = new MyClass();
                anotherMyClass = new MyClass();
            });
            it("shares fieldTypes among every instance of the class to use memory efficiently", function () {
                expect(myClass.fields).to.equal(anotherMyClass.fields);
            });
            it("defines fieldTypes on the prototype, not as an own property, for each instance", function () {
                expect(myClass).to.have.property("fields").but.not.own.property("fields");
            });
        });
    });
});
define("Model/Decorators/BelongsTo.test", ["require", "exports", "sinon", "Model/Decorators/Relationship", "Model/FieldType/index", "Model/Decorators/BelongsTo", "Model/Decorators/Attr"], function (require, exports, sinon_8, Relationship_4, FieldType_8, BelongsTo_2, Attr_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
    var expect = intern.getPlugin("chai").expect;
    describe("@belongsTo", function () {
        var expectedValue;
        var myClass;
        beforeEach(function () {
            expectedValue = { name: "Bob" };
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_8.stub();
                    this.getRelated = sinon_8.stub().callsFake(function () { return expectedValue; });
                    this.setRelated = sinon_8.stub();
                    this.getField = sinon_8.stub();
                    this.setField = sinon_8.stub();
                }
                __decorate([
                    Attr_3.attr(FieldType_8.StringField),
                    __metadata("design:type", String)
                ], MyClass.prototype, "studentId", void 0);
                __decorate([
                    BelongsTo_2.belongsTo(),
                    __metadata("design:type", Object)
                ], MyClass.prototype, "student", void 0);
                return MyClass;
            }());
            myClass = new MyClass();
        });
        it("creates a field decorator which with a BelongsTo FieldType", function () {
            expect(myClass.fields).to.have.property("student").to.deep.contain(FieldType_8.BelongsToField, "it keeps track of the field's FieldType correctly");
        });
        it("creates a BelongsTo relationship", function () {
            expect(myClass.relationships).to.have.property("student").to.deep.equal({
                type: Relationship_4.RelationshipType.BelongsTo,
                field: "student",
                relatedFieldName: "studentId",
                serviceName: "student",
            });
        });
    });
});
define("Model/Decorators/Field.test", ["require", "exports", "sinon", "Model/Decorators/Field", "Model/FieldType/index"], function (require, exports, sinon_9, Field_5, FieldType_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("@field", function () {
        it("creates a decorator which tracks the FieldType for the field", function () {
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_9.stub();
                }
                __decorate([
                    Field_5.field(FieldType_9.StringField),
                    __metadata("design:type", String)
                ], MyClass.prototype, "name", void 0);
                return MyClass;
            }());
            var myClass = new MyClass();
            expect(myClass.fields).to.have.property("name").to.deep.equal(FieldType_9.StringField, "it keeps track of the field's FieldType correctly");
        });
        it("creates a decorator which sets up default validation rules for the FieldType", function () {
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_9.stub();
                }
                __decorate([
                    Field_5.field(FieldType_9.EmailField),
                    __metadata("design:type", String)
                ], MyClass.prototype, "name", void 0);
                return MyClass;
            }());
            var myClass = new MyClass();
            expect(myClass.validationRules).to.have.property("name").to.deep.equal({ email: true }, "it sets correct validation rules for the FieldType");
        });
        it("shares the same fieldTypes object among every instance of the class to use memory efficiently", function () {
            var expectedValue = 0;
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_9.stub();
                }
                __decorate([
                    Field_5.field(FieldType_9.StringField),
                    __metadata("design:type", String)
                ], MyClass.prototype, "name", void 0);
                return MyClass;
            }());
            var myClass = new MyClass();
            var anotherMyClass = new MyClass();
            expect(myClass.fields).to.equal(anotherMyClass.fields);
        });
    });
});
define("Model/Decorators/HasMany.test", ["require", "exports", "sinon", "Model/Decorators/Relationship", "Model/FieldType/index", "Model/Decorators/HasMany", "Model/Decorators/Attr"], function (require, exports, sinon_10, Relationship_5, FieldType_10, HasMany_2, Attr_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
    var expect = intern.getPlugin("chai").expect;
    describe("@hasMany", function () {
        var expectedValue;
        var myClass;
        beforeEach(function () {
            expectedValue = { name: "Bob" };
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_10.stub();
                    this.getRelated = sinon_10.stub().callsFake(function () { return expectedValue; });
                    this.setRelated = sinon_10.stub();
                    this.getField = sinon_10.stub();
                    this.setField = sinon_10.stub();
                }
                __decorate([
                    Attr_4.attr(FieldType_10.ArrayField),
                    __metadata("design:type", Array)
                ], MyClass.prototype, "studentIds", void 0);
                __decorate([
                    HasMany_2.hasMany(),
                    __metadata("design:type", Array)
                ], MyClass.prototype, "students", void 0);
                return MyClass;
            }());
            myClass = new MyClass();
        });
        it("creates a field decorator which with a HasMany FieldType", function () {
            expect(myClass.fields).to.have.property("students").to.deep.contain(FieldType_10.HasManyField);
        });
        it("creates a HasMany relationship", function () {
            expect(myClass.relationships).to.have.property("students").to.deep.equal({
                type: Relationship_5.RelationshipType.HasMany,
                field: "students",
                relatedFieldName: "studentIds",
                serviceName: "student",
            });
        });
    });
});
define("Model/Decorators/Relationship.test", ["require", "exports", "sinon", "Model/Decorators/Relationship", "Model/FieldType/index", "Model/Decorators/Attr"], function (require, exports, sinon_11, Relationship_6, FieldType_11, Attr_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
    var expect = intern.getPlugin("chai").expect;
    describe("@relationship", function () {
        describe("@relationship - magic getter", function () {
            var expectedValue;
            var myClass;
            beforeEach(function () {
                expectedValue = { name: "Bob" };
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_11.stub();
                        this.getRelated = sinon_11.stub().callsFake(function () { return expectedValue; });
                        this.setRelated = sinon_11.stub();
                        this.getField = sinon_11.stub();
                        this.setField = sinon_11.stub();
                    }
                    __decorate([
                        Attr_5.attr(FieldType_11.ArrayField),
                        __metadata("design:type", Array)
                    ], MyClass.prototype, "studentIds", void 0);
                    __decorate([
                        Relationship_6.relationship(Relationship_6.RelationshipType.HasMany),
                        __metadata("design:type", Array)
                    ], MyClass.prototype, "student", void 0);
                    return MyClass;
                }());
                myClass = new MyClass();
            });
            it("returns the expected output from the magic getter", function () {
                expect(myClass).to.have.property("student").to.equal(expectedValue);
            });
            it("called the magic getter once", function () {
                var theStudent = myClass.student;
                expect(myClass.getRelated.calledOnce).to.equal(true);
            });
            it("passed the correct field name to the magic getter", function () {
                var theStudent = myClass.student;
                expect(myClass.getRelated.firstCall.args[0]).to.equal("student");
            });
        });
        describe("@relationship - magic setter", function () {
            var expectedValue;
            var myClass;
            beforeEach(function () {
                expectedValue = { name: "Bob" };
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_11.stub();
                        this.getRelated = sinon_11.stub().callsFake(function () { return expectedValue; });
                        this.setRelated = sinon_11.stub();
                        this.getField = sinon_11.stub();
                        this.setField = sinon_11.stub();
                    }
                    __decorate([
                        Attr_5.attr(FieldType_11.StringField),
                        __metadata("design:type", String)
                    ], MyClass.prototype, "studentId", void 0);
                    __decorate([
                        Relationship_6.relationship(Relationship_6.RelationshipType.BelongsTo),
                        __metadata("design:type", Object)
                    ], MyClass.prototype, "student", void 0);
                    return MyClass;
                }());
                myClass = new MyClass();
                myClass.student = expectedValue;
            });
            it("called the magic setter once", function () {
                expect(myClass.setRelated.calledOnce).to.equal(true);
            });
            it("passed the correct field name to the magic setter", function () {
                expect(myClass.setRelated.firstCall.args[0]).to.equal("student");
            });
            it("passed the correct value to the magic setter", function () {
                expect(myClass.setRelated.firstCall.args[1]).to.equal(expectedValue);
            });
        });
        describe("@relationship - relationship definition with default values", function () {
            var expectedValue;
            var myClass;
            beforeEach(function () {
                expectedValue = { name: "Bob" };
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_11.stub();
                        this.getRelated = sinon_11.stub().callsFake(function () { return expectedValue; });
                        this.setRelated = sinon_11.stub();
                        this.getField = sinon_11.stub();
                        this.setField = sinon_11.stub();
                    }
                    __decorate([
                        Attr_5.attr(FieldType_11.StringField),
                        __metadata("design:type", String)
                    ], MyClass.prototype, "studentId", void 0);
                    __decorate([
                        Relationship_6.relationship(Relationship_6.RelationshipType.BelongsTo),
                        __metadata("design:type", Object)
                    ], MyClass.prototype, "student", void 0);
                    return MyClass;
                }());
                myClass = new MyClass();
            });
            it("creates a field decorator which tracks the FieldType of the relationship", function () {
                expect(myClass.fields).to.have.property("student").to.deep.contain(FieldType_11.BelongsToField, "it keeps track of the field's FieldType correctly");
            });
            it("builds the IFieldRelationship object using the property name as the service name by default", function () {
                expect(myClass.relationships).to.have.property("student").to.deep.equal({ field: "student", serviceName: "student", relatedFieldName: "studentId", type: Relationship_6.RelationshipType.BelongsTo });
            });
            it("requires the default related field name to be defined on the Model", function () {
                expect(function () { return Relationship_6.relationship(Relationship_6.RelationshipType.BelongsTo)(myClass, "organization"); }).to.throw(ReferenceError, "missing for relationship");
            });
        });
        describe("@relationship - relationship definition with custom values", function () {
            it("builds the IFieldRelationship object using a custom service name", function () {
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_11.stub();
                        this.getRelated = sinon_11.stub();
                        this.setRelated = sinon_11.stub();
                        this.getField = sinon_11.stub();
                        this.setField = sinon_11.stub();
                    }
                    __decorate([
                        Attr_5.attr(FieldType_11.StringField),
                        __metadata("design:type", String)
                    ], MyClass.prototype, "someKidId", void 0);
                    __decorate([
                        Relationship_6.relationship(Relationship_6.RelationshipType.BelongsTo, { serviceName: "student" }),
                        __metadata("design:type", Object)
                    ], MyClass.prototype, "someKid", void 0);
                    return MyClass;
                }());
                var myClass = new MyClass();
                expect(myClass.relationships).to.have.property("someKid").to.deep.equal({ field: "someKid", serviceName: "student", relatedFieldName: "someKidId", type: Relationship_6.RelationshipType.BelongsTo });
            });
            it("builds the IFieldRelationship object using a custom service name and custom relatedFieldName", function () {
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_11.stub();
                        this.getRelated = sinon_11.stub();
                        this.setRelated = sinon_11.stub();
                        this.getField = sinon_11.stub();
                        this.setField = sinon_11.stub();
                    }
                    __decorate([
                        Attr_5.attr(FieldType_11.StringField),
                        __metadata("design:type", String)
                    ], MyClass.prototype, "studentFK", void 0);
                    __decorate([
                        Relationship_6.relationship(Relationship_6.RelationshipType.BelongsTo, { serviceName: "student", relatedFieldName: "studentFK" }),
                        __metadata("design:type", Object)
                    ], MyClass.prototype, "someKid", void 0);
                    return MyClass;
                }());
                var myClass = new MyClass();
                expect(myClass.relationships).to.have.property("someKid").to.deep.equal({ field: "someKid", serviceName: "student", relatedFieldName: "studentFK", type: Relationship_6.RelationshipType.BelongsTo });
            });
            it("requires the custom related field name to be defined on the Model", function () {
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_11.stub();
                        this.getRelated = sinon_11.stub();
                        this.setRelated = sinon_11.stub();
                        this.getField = sinon_11.stub();
                        this.setField = sinon_11.stub();
                    }
                    __decorate([
                        Attr_5.attr(FieldType_11.StringField),
                        __metadata("design:type", String)
                    ], MyClass.prototype, "studentFK", void 0);
                    __decorate([
                        Relationship_6.relationship(Relationship_6.RelationshipType.BelongsTo, { serviceName: "student", relatedFieldName: "studentFK" }),
                        __metadata("design:type", Object)
                    ], MyClass.prototype, "someKid", void 0);
                    return MyClass;
                }());
                var myClass = new MyClass();
                expect(function () { return Relationship_6.relationship(Relationship_6.RelationshipType.BelongsTo, {
                    serviceName: "organization",
                    relatedFieldName: "orgIds",
                })(myClass, "organization"); }).to.throw(ReferenceError, "missing for relationship");
            });
        });
        describe("@relationship - supports BelongsTo and HasMany", function () {
            it("builds the IFieldRelationship object with the correct type and relatedFieldName for BelongsTo", function () {
                var expectedValue = { name: "Bob" };
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_11.stub();
                        this.getRelated = sinon_11.stub().callsFake(function () { return expectedValue; });
                        this.setRelated = sinon_11.stub();
                        this.getField = sinon_11.stub();
                        this.setField = sinon_11.stub();
                    }
                    __decorate([
                        Attr_5.attr(FieldType_11.StringField),
                        __metadata("design:type", String)
                    ], MyClass.prototype, "studentId", void 0);
                    __decorate([
                        Relationship_6.relationship(Relationship_6.RelationshipType.BelongsTo),
                        __metadata("design:type", Object)
                    ], MyClass.prototype, "student", void 0);
                    return MyClass;
                }());
                var myClass = new MyClass();
                expect(myClass.relationships).to.have.property("student").to.deep.equal({ field: "student", serviceName: "student", relatedFieldName: "studentId", type: Relationship_6.RelationshipType.BelongsTo });
            });
            it("builds the IFieldRelationship object with the correct type and relatedFieldName for HasMany", function () {
                var expectedValue = { name: "Bob" };
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_11.stub();
                        this.getRelated = sinon_11.stub().callsFake(function () { return expectedValue; });
                        this.setRelated = sinon_11.stub();
                        this.getField = sinon_11.stub();
                        this.setField = sinon_11.stub();
                    }
                    __decorate([
                        Attr_5.attr(FieldType_11.ArrayField),
                        __metadata("design:type", Array)
                    ], MyClass.prototype, "studentIds", void 0);
                    __decorate([
                        Relationship_6.relationship(Relationship_6.RelationshipType.HasMany),
                        __metadata("design:type", Array)
                    ], MyClass.prototype, "students", void 0);
                    return MyClass;
                }());
                var myClass = new MyClass();
                expect(myClass.relationships).to.have.property("students").to.deep.equal({ field: "students", serviceName: "student", relatedFieldName: "studentIds", type: Relationship_6.RelationshipType.HasMany });
            });
        });
        describe("@relationship - memory efficiency", function () {
            var expectedValue;
            var myClass;
            var anotherMyClass;
            beforeEach(function () {
                expectedValue = { name: "Bob" };
                var MyClass = (function () {
                    function MyClass() {
                        this.validate = sinon_11.stub();
                        this.getRelated = sinon_11.stub().callsFake(function () { return expectedValue; });
                        this.setRelated = sinon_11.stub();
                        this.getField = sinon_11.stub();
                        this.setField = sinon_11.stub();
                    }
                    __decorate([
                        Attr_5.attr(FieldType_11.StringField),
                        __metadata("design:type", String)
                    ], MyClass.prototype, "studentId", void 0);
                    __decorate([
                        Relationship_6.relationship(Relationship_6.RelationshipType.BelongsTo),
                        __metadata("design:type", Object)
                    ], MyClass.prototype, "student", void 0);
                    return MyClass;
                }());
                myClass = new MyClass();
                anotherMyClass = new MyClass();
            });
            it("shares relationships among every instance of the class to use memory efficiently", function () {
                expect(myClass.relationships).to.equal(anotherMyClass.relationships);
            });
            it("defines relationships on the prototype, not as an own property, for each instance", function () {
                expect(myClass).to.have.property("relationships").but.not.own.property("relationships");
            });
        });
    });
});
define("Model/Decorators/Required.test", ["require", "exports", "sinon", "Model/Decorators/Required"], function (require, exports, sinon_12, Required_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("@required", function () {
        it("creates a decorator to mark a field as required", function () {
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_12.stub();
                }
                __decorate([
                    Required_2.required(),
                    __metadata("design:type", String)
                ], MyClass.prototype, "name", void 0);
                return MyClass;
            }());
            expect(MyClass.prototype.validationRules).to.have.property("name").to.deep.equal({ presence: { message: "is required", allowEmpty: false } }, "it has the expected validation rules");
        });
        it("creates a decorator to mark a field as required with a custom error message", function () {
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_12.stub();
                }
                __decorate([
                    Required_2.required("^Name is required"),
                    __metadata("design:type", String)
                ], MyClass.prototype, "fullText", void 0);
                return MyClass;
            }());
            expect(MyClass.prototype.validationRules).to.have.property("fullText").to.deep.equal({ presence: { message: "^Name is required", allowEmpty: false } }, "it has the expected validation rules");
        });
        it("creates a decorator to mark a field as required with a custom error message and allows certain empty values", function () {
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_12.stub();
                }
                __decorate([
                    Required_2.required("is required", true),
                    __metadata("design:type", String)
                ], MyClass.prototype, "name", void 0);
                return MyClass;
            }());
            expect(MyClass.prototype.validationRules).to.have.property("name").to.deep.equal({ presence: { message: "is required", allowEmpty: true } }, "it has the expected validation rules");
        });
    });
});
define("Model/Decorators/Validation.test", ["require", "exports", "sinon", "Model/Decorators/Validation"], function (require, exports, sinon_13, Validation_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
    var expect = intern.getPlugin("chai").expect;
    describe("@validation", function () {
        it("creates a decorator with custom validation rules", function () {
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_13.stub();
                }
                __decorate([
                    Validation_4.validation({ asdf: 123 }),
                    __metadata("design:type", String)
                ], MyClass.prototype, "name", void 0);
                return MyClass;
            }());
            expect(MyClass.prototype.validationRules).to.have.property("name").to.deep.equal({ asdf: 123 }, "it has the expected validation rules");
        });
        it("shares validation rules among every instance of the class to use memory efficiently", function () {
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_13.stub();
                }
                __decorate([
                    Validation_4.validation({ asdf: 123 }),
                    __metadata("design:type", String)
                ], MyClass.prototype, "name", void 0);
                return MyClass;
            }());
            var myClass = new MyClass();
            var anotherMyClass = new MyClass();
            expect(myClass.validationRules).to.equal(anotherMyClass.validationRules, "it shares the validation rules");
        });
    });
});
define("Model/FieldType/ArrayField.test", ["require", "exports", "validate.js", "Model/FieldType/ArrayField"], function (require, exports, validate_js_13, ArrayField_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: ArrayField", function () {
        it("has correct default value", function () {
            expect(ArrayField_3.ArrayField).to.have.property("defaultValue").to.deep.equal([]);
        });
        it("provides default form validation rules which require the value to be an array", function () {
            var value = [];
            expect(validate_js_13.validate({ students: value }, { students: ArrayField_3.ArrayField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow non-null non-array types", function () {
            var value = 7;
            expect(validate_js_13.validate({ students: value }, { students: ArrayField_3.ArrayField.defaultValidationRules })).to.deep.equal({
                students: ["Students must be of type array"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(ArrayField_3.ArrayField.isValidType(value)).to.be.true;
        });
        it("considers an array instance to be a valid type", function () {
            var value = [];
            expect(ArrayField_3.ArrayField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-array instance to be a valid type", function () {
            var value = 7;
            expect(ArrayField_3.ArrayField.isValidType(value)).to.be.false;
        });
        it("should be serialized", function () {
            expect(ArrayField_3.ArrayField.serialize).to.be.true;
        });
    });
});
define("Model/FieldType/BelongsToField.test", ["require", "exports", "validate.js", "Model/FieldType/BelongsToField"], function (require, exports, validate_js_14, BelongsToField_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: BelongsToField", function () {
        it("has correct default value", function () {
            expect(BelongsToField_2.BelongsToField).to.have.property("defaultValue").to.deep.equal(null);
        });
        it("provides default form validation rules which require the value to be an object", function () {
            var value = { hello: "world" };
            expect(validate_js_14.validate({ student: value }, { student: BelongsToField_2.BelongsToField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow non-null non-object types", function () {
            var value = 7;
            expect(validate_js_14.validate({ student: value }, { student: BelongsToField_2.BelongsToField.defaultValidationRules })).to.deep.equal({
                student: ["Student must be of type object"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(BelongsToField_2.BelongsToField.isValidType(value)).to.be.true;
        });
        it("considers an object instance to be a valid type", function () {
            var value = { hello: "world" };
            expect(BelongsToField_2.BelongsToField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-object instance to be a valid type", function () {
            var value = 7;
            expect(BelongsToField_2.BelongsToField.isValidType(value)).to.be.false;
        });
        it("should not be serialized", function () {
            expect(BelongsToField_2.BelongsToField.serialize).to.be.false;
        });
    });
});
define("Model/FieldType/BooleanField.test", ["require", "exports", "validate.js", "Model/FieldType/BooleanField"], function (require, exports, validate_js_15, BooleanField_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: BooleanField", function () {
        it("has correct default value", function () {
            expect(BooleanField_2.BooleanField).to.have.property("defaultValue").to.deep.equal(false);
        });
        it("provides default form validation rules which require the value to be an boolean", function () {
            var value = false;
            expect(validate_js_15.validate({ student: value }, { student: BooleanField_2.BooleanField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow non-null non-boolean types", function () {
            var value = 7;
            expect(validate_js_15.validate({ student: value }, { student: BooleanField_2.BooleanField.defaultValidationRules })).to.deep.equal({
                student: ["Student must be of type boolean"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(BooleanField_2.BooleanField.isValidType(value)).to.be.true;
        });
        it("considers an boolean instance to be a valid type", function () {
            var value = false;
            expect(BooleanField_2.BooleanField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-boolean instance to be a valid type", function () {
            var value = 7;
            expect(BooleanField_2.BooleanField.isValidType(value)).to.be.false;
        });
        it("should be serialized", function () {
            expect(BooleanField_2.BooleanField.serialize).to.be.true;
        });
    });
});
define("Model/FieldType/DateField.test", ["require", "exports", "validate.js", "date-fns", "Model/FieldType/DateField", "Validators/index"], function (require, exports, validate_js_16, date_fns_4, DateField_2, Validators_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: DateField", function () {
        before(function () {
            Validators_2.initializeDateTimeValidator(validate_js_16.validate);
        });
        it("has correct default value", function () {
            expect(DateField_2.DateField).to.have.property("defaultValue").to.be.null;
        });
        it("provides default form validation rules which require the value to be a valid date", function () {
            var value = "2018-01-01";
            expect(validate_js_16.validate({ birthDate: value }, { birthDate: DateField_2.DateField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow invalid date", function () {
            var value = "asdfasdf";
            expect(validate_js_16.validate({ birthDate: value }, { birthDate: DateField_2.DateField.defaultValidationRules })).to.deep.equal({
                birthDate: ["Birth date must be a valid date"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(DateField_2.DateField.isValidType(value)).to.be.true;
        });
        it("considers a Date to be a valid type", function () {
            var value = new Date();
            expect(DateField_2.DateField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-string to be a valid type", function () {
            var value = 7;
            expect(DateField_2.DateField.isValidType(value)).to.be.false;
        });
        it("transforms a Date into the correct Date string", function () {
            var serializedDate = "2018-02-14";
            var date = date_fns_4.parse(serializedDate, "YYYY-MM-DD", new Date());
            expect(DateField_2.DateField.transform(date)).to.equal(serializedDate);
        });
        it("normalizes a Date string into its corresponding Date object", function () {
            var serializedDate = "2018-02-14";
            var date = date_fns_4.parse(serializedDate, "YYYY-MM-DD", new Date());
            expect(DateField_2.DateField.normalize(serializedDate)).to.deep.equal(date);
        });
        it("should be serialized", function () {
            expect(DateField_2.DateField.serialize).to.be.true;
        });
    });
});
define("Model/FieldType/DateTimeField.test", ["require", "exports", "validate.js", "Model/FieldType/DateTimeField", "Validators/index"], function (require, exports, validate_js_17, DateTimeField_2, Validators_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: DateTimeField", function () {
        before(function () {
            Validators_3.initializeDateTimeValidator(validate_js_17.validate);
        });
        it("has correct default value", function () {
            expect(DateTimeField_2.DateTimeField).to.have.property("defaultValue").to.be.null;
        });
        it("provides default form validation rules which require the value to be a valid datetime", function () {
            var value = "2018-01-01T05:06:07";
            expect(validate_js_17.validate({ birthDate: value }, { birthDate: DateTimeField_2.DateTimeField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow invalid datetime", function () {
            var value = "asdfasdf";
            expect(validate_js_17.validate({ birthDate: value }, { birthDate: DateTimeField_2.DateTimeField.defaultValidationRules })).to.deep.equal({
                birthDate: ["Birth date must be a valid date"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(DateTimeField_2.DateTimeField.isValidType(value)).to.be.true;
        });
        it("considers a Date to be a valid type", function () {
            var value = new Date();
            expect(DateTimeField_2.DateTimeField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-string to be a valid type", function () {
            var value = 7;
            expect(DateTimeField_2.DateTimeField.isValidType(value)).to.be.false;
        });
        it("transforms a Date into its corresponding ISO string", function () {
            var value = new Date();
            expect(DateTimeField_2.DateTimeField.transform(value)).to.equal(value.toISOString());
        });
        it("normalizes a Date ISO string into its corresponding Date object", function () {
            var date = new Date();
            var value = date.toISOString();
            expect(DateTimeField_2.DateTimeField.normalize(value)).to.deep.equal(date);
        });
        it("should be serialized", function () {
            expect(DateTimeField_2.DateTimeField.serialize).to.be.true;
        });
    });
});
define("Model/FieldType/EmailField.test", ["require", "exports", "validate.js", "Model/FieldType/EmailField"], function (require, exports, validate_js_18, EmailField_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: EmailField", function () {
        it("has correct default value", function () {
            expect(EmailField_2.EmailField).to.have.property("defaultValue").to.equal("");
        });
        it("provides default form validation rules which require the value to be a valid email", function () {
            var value = "hello@example.com";
            expect(validate_js_18.validate({ homeEmail: value }, { homeEmail: EmailField_2.EmailField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow invalid email", function () {
            var value = "asdfasdf";
            expect(validate_js_18.validate({ homeEmail: value }, { homeEmail: EmailField_2.EmailField.defaultValidationRules })).to.deep.equal({
                homeEmail: ["Home email is not a valid email"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(EmailField_2.EmailField.isValidType(value)).to.be.true;
        });
        it("considers a string to be a valid type", function () {
            var value = "asdf";
            expect(EmailField_2.EmailField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-email instance to be a valid type", function () {
            var value = 7;
            expect(EmailField_2.EmailField.isValidType(value)).to.be.false;
        });
        it("should be serialized", function () {
            expect(EmailField_2.EmailField.serialize).to.be.true;
        });
    });
});
define("Model/FieldType/EnumField.test", ["require", "exports", "validate.js", "Model/FieldType/EnumField"], function (require, exports, validate_js_19, EnumField_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
    var expect = intern.getPlugin("chai").expect;
    var TestEnum;
    (function (TestEnum) {
        TestEnum[TestEnum["hello"] = 0] = "hello";
        TestEnum[TestEnum["world"] = 1] = "world";
    })(TestEnum || (TestEnum = {}));
    describe("FieldType: EnumField", function () {
        var EnumField;
        beforeEach(function () {
            EnumField = EnumField_2.createEnumField(TestEnum);
        });
        it("has correct default value", function () {
            expect(EnumField).to.have.property("defaultValue").to.be.null;
        });
        it("provides default form validation rules which require the value to be one of the given enum members", function () {
            var value = TestEnum.hello;
            var validation = validate_js_19.validate({ testField: value }, { testField: EnumField.defaultValidationRules });
            expect(validation).to.be.undefined;
        });
        it("provides default form validation rules which do not allow non-null non-enum types", function () {
            var value = 7;
            var validation = validate_js_19.validate({ testField: value }, { testField: EnumField.defaultValidationRules });
            expect(validation).to.deep.equal({
                testField: ["Selected value is not a valid choice"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(EnumField.isValidType(value)).to.be.true;
        });
        it("considers a member of the given enum to be a valid type", function () {
            var value = TestEnum.world;
            expect(EnumField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-enum member to be a valid type", function () {
            var value = 7;
            expect(EnumField.isValidType(value)).to.be.false;
        });
        it("should not be serialized", function () {
            expect(EnumField.serialize).to.be.false;
        });
    });
});
define("Model/FieldType/HasManyField.test", ["require", "exports", "validate.js", "Model/FieldType/HasManyField"], function (require, exports, validate_js_20, HasManyField_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: HasManyField", function () {
        it("has correct default value", function () {
            expect(HasManyField_2.HasManyField).to.have.property("defaultValue").to.deep.equal([]);
        });
        it("provides default form validation rules which require the value to be an array", function () {
            var value = [];
            expect(validate_js_20.validate({ students: value }, { students: HasManyField_2.HasManyField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow non-null non-array types", function () {
            var value = 7;
            expect(validate_js_20.validate({ students: value }, { students: HasManyField_2.HasManyField.defaultValidationRules })).to.deep.equal({
                students: ["Students must be of type array"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(HasManyField_2.HasManyField.isValidType(value)).to.be.true;
        });
        it("considers an array instance to be a valid type", function () {
            var value = [];
            expect(HasManyField_2.HasManyField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-array instance to be a valid type", function () {
            var value = 7;
            expect(HasManyField_2.HasManyField.isValidType(value)).to.be.false;
        });
        it("should not be serialized", function () {
            expect(HasManyField_2.HasManyField.serialize).to.be.false;
        });
    });
});
define("Model/FieldType/NumberField.test", ["require", "exports", "validate.js", "Model/FieldType/NumberField"], function (require, exports, validate_js_21, NumberField_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: NumberField", function () {
        it("has correct default value", function () {
            expect(NumberField_2.NumberField).to.have.property("defaultValue").to.equal(0);
        });
        it("provides default form validation rules which require the value to be a number", function () {
            var value = 7;
            expect(validate_js_21.validate({ age: value }, { age: NumberField_2.NumberField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow non-numeric input", function () {
            var value = "asdfasdf";
            expect(validate_js_21.validate({ age: value }, { age: NumberField_2.NumberField.defaultValidationRules })).to.deep.equal({
                age: ["Age is not a number"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(NumberField_2.NumberField.isValidType(value)).to.be.true;
        });
        it("considers a number to be a valid type", function () {
            var value = 7;
            expect(NumberField_2.NumberField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-number instance to be a valid type", function () {
            var value = "asdf";
            expect(NumberField_2.NumberField.isValidType(value)).to.be.false;
        });
        it("should be serialized", function () {
            expect(NumberField_2.NumberField.serialize).to.be.true;
        });
    });
});
define("Model/FieldType/ObjectField.test", ["require", "exports", "validate.js", "Model/FieldType/ObjectField"], function (require, exports, validate_js_22, ObjectField_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: ObjectField", function () {
        it("has correct default value", function () {
            expect(ObjectField_3.ObjectField).to.have.property("defaultValue").to.deep.equal(null);
        });
        it("provides default form validation rules which require the value to be an object", function () {
            var value = { hello: "world" };
            expect(validate_js_22.validate({ student: value }, { student: ObjectField_3.ObjectField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow non-null non-object types", function () {
            var value = 7;
            expect(validate_js_22.validate({ student: value }, { student: ObjectField_3.ObjectField.defaultValidationRules })).to.deep.equal({
                student: ["Student must be of type object"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(ObjectField_3.ObjectField.isValidType(value)).to.be.true;
        });
        it("considers an object instance to be a valid type", function () {
            var value = { hello: "world" };
            expect(ObjectField_3.ObjectField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-object instance to be a valid type", function () {
            var value = 7;
            expect(ObjectField_3.ObjectField.isValidType(value)).to.be.false;
        });
        it("should be serialized", function () {
            expect(ObjectField_3.ObjectField.serialize).to.be.true;
        });
    });
});
define("Model/FieldType/PhoneNumberField.test", ["require", "exports", "validate.js", "Model/FieldType/PhoneNumberField", "Validators/index"], function (require, exports, validate_js_23, PhoneNumberField_2, Validators_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: PhoneNumberField", function () {
        before(function () {
            Validators_4.initializePhoneNumberValidator(validate_js_23.validate);
        });
        it("has correct default value", function () {
            expect(PhoneNumberField_2.PhoneNumberField).to.have.property("defaultValue").to.equal("");
        });
        it("provides default form validation rules which require the value to be a valid phone number", function () {
            var value = "1234567890";
            expect(validate_js_23.validate({ homePhone: value }, { homePhone: PhoneNumberField_2.PhoneNumberField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow invalid phone numbers", function () {
            var value = "888.222.3334";
            expect(validate_js_23.validate({ homePhone: value }, { homePhone: PhoneNumberField_2.PhoneNumberField.defaultValidationRules })).to.deep.equal({
                homePhone: ["Home phone must be a valid phone number"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(PhoneNumberField_2.PhoneNumberField.isValidType(value)).to.be.true;
        });
        it("considers a string to be a valid type", function () {
            var value = "asdf";
            expect(PhoneNumberField_2.PhoneNumberField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-phoneNumber instance to be a valid type", function () {
            var value = 7;
            expect(PhoneNumberField_2.PhoneNumberField.isValidType(value)).to.be.false;
        });
        it("should be serialized", function () {
            expect(PhoneNumberField_2.PhoneNumberField.serialize).to.be.true;
        });
    });
});
define("Model/FieldType/StringField.test", ["require", "exports", "validate.js", "Model/FieldType/StringField"], function (require, exports, validate_js_24, StringField_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: StringField", function () {
        it("has correct default value", function () {
            expect(StringField_2.StringField).to.have.property("defaultValue").to.equal("");
        });
        it("provides default form validation rules which require the value to be an string", function () {
            var value = "Rich Rediker";
            expect(validate_js_24.validate({ name: value }, { name: StringField_2.StringField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow non-null non-string types", function () {
            var value = 7;
            expect(validate_js_24.validate({ name: value }, { name: StringField_2.StringField.defaultValidationRules })).to.deep.equal({
                name: ["Name must be of type string"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(StringField_2.StringField.isValidType(value)).to.be.true;
        });
        it("considers a string instance to be a valid type", function () {
            var value = "asdf";
            expect(StringField_2.StringField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-string instance to be a valid type", function () {
            var value = 7;
            expect(StringField_2.StringField.isValidType(value)).to.be.false;
        });
        it("should be serialized", function () {
            expect(StringField_2.StringField.serialize).to.be.true;
        });
    });
});
define("Model/FieldType/TimeField.test", ["require", "exports", "date-fns", "validate.js", "Validators/index", "Model/FieldType/TimeField"], function (require, exports, date_fns_5, validate_js_25, Validators_5, TimeField_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: TimeField", function () {
        before(function () {
            Validators_5.initializeDateTimeValidator(validate_js_25.validate);
        });
        it("has correct default value", function () {
            expect(TimeField_2.TimeField).to.have.property("defaultValue").to.be.null;
        });
        it("provides default form validation rules which require the value to be a valid time", function () {
            var value = "05:06:07 am";
            expect(validate_js_25.validate({ startTime: value }, { startTime: TimeField_2.TimeField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow invalid time", function () {
            var value = "asdfasdf";
            expect(validate_js_25.validate({ startTime: value }, { startTime: TimeField_2.TimeField.defaultValidationRules })).to.deep.equal({
                startTime: ["Start time must be a valid time"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(TimeField_2.TimeField.isValidType(value)).to.be.true;
        });
        it("considers a Date to be a valid type", function () {
            var value = new Date();
            expect(TimeField_2.TimeField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-string to be a valid type", function () {
            var value = 7;
            expect(TimeField_2.TimeField.isValidType(value)).to.be.false;
        });
        it("transforms a Time into the correct Time string", function () {
            var serializedDate = "04:20:32 pm";
            var date = date_fns_5.parse(serializedDate, "hh:mm:ss a", new Date());
            expect(TimeField_2.TimeField.transform(date)).to.equal(serializedDate);
        });
        it("normalizes a Time string into its corresponding Date object", function () {
            var serializedDate = "04:20:32 pm";
            var date = date_fns_5.parse(serializedDate, "hh:mm:ss a", new Date());
            expect(TimeField_2.TimeField.normalize(serializedDate)).to.deep.equal(date);
        });
        it("should be serialized", function () {
            expect(TimeField_2.TimeField.serialize).to.be.true;
        });
    });
});
define("Model/FieldType/URLField.test", ["require", "exports", "validate.js", "Model/FieldType/URLField"], function (require, exports, validate_js_26, URLField_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("FieldType: URLField", function () {
        it("has correct default value", function () {
            expect(URLField_2.URLField).to.have.property("defaultValue").to.equal("");
        });
        it("provides default form validation rules which require the value to be a valid url", function () {
            var value = "http://example.com";
            expect(validate_js_26.validate({ website: value }, { website: URLField_2.URLField.defaultValidationRules })).to.be.undefined;
        });
        it("provides default form validation rules which do not allow invalid url", function () {
            var value = "asdfasdf";
            expect(validate_js_26.validate({ website: value }, { website: URLField_2.URLField.defaultValidationRules })).to.deep.equal({
                website: ["Website is not a valid url"],
            });
        });
        it("considers null to be a valid type", function () {
            var value = null;
            expect(URLField_2.URLField.isValidType(value)).to.be.true;
        });
        it("considers a string to be a valid type", function () {
            var value = "asdf";
            expect(URLField_2.URLField.isValidType(value)).to.be.true;
        });
        it("does not consider a non-null non-url instance to be a valid type", function () {
            var value = 7;
            expect(URLField_2.URLField.isValidType(value)).to.be.false;
        });
        it("should be serialized", function () {
            expect(URLField_2.URLField.serialize).to.be.true;
        });
    });
});
define("Serializers/BaseSerializer.test", ["require", "exports", "rxjs/Observable", "sinon", "faker", "date-fns", "Services/index", "Model/index", "Adapters/index", "Serializers/RestSerializer", "rxjs/add/observable/of"], function (require, exports, Observable_1, sinon_14, faker_4, date_fns_6, Services_7, Model_6, Adapters_3, RestSerializer_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach, afterEach = _a.afterEach;
    var expect = intern.getPlugin("chai").expect;
    var MockModel = (function (_super) {
        __extends(MockModel, _super);
        function MockModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.serviceName = "fakeModel";
            return _this;
        }
        __decorate([
            Model_6.attr(Model_6.StringField),
            __metadata("design:type", String)
        ], MockModel.prototype, "fullText", void 0);
        __decorate([
            Model_6.attr(Model_6.DateField),
            __metadata("design:type", Date)
        ], MockModel.prototype, "startDate", void 0);
        __decorate([
            Model_6.attr(Model_6.TimeField),
            __metadata("design:type", Date)
        ], MockModel.prototype, "startTime", void 0);
        __decorate([
            Model_6.attr(Model_6.NumberField),
            __metadata("design:type", Number)
        ], MockModel.prototype, "age", void 0);
        __decorate([
            Model_6.attr(Model_6.StringField),
            __metadata("design:type", String)
        ], MockModel.prototype, "organizationId", void 0);
        __decorate([
            Model_6.belongsTo({ serviceName: "fakeRelatedModel" }),
            __metadata("design:type", Object)
        ], MockModel.prototype, "organization", void 0);
        return MockModel;
    }(Model_6.Model));
    var FakeService = (function (_super) {
        __extends(FakeService, _super);
        function FakeService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = "fakeModel";
            _this.ModelClass = MockModel;
            _this._adapter = new Adapters_3.MockAdapter();
            _this._serializer = new RestSerializer_2.RestSerializer(MockModel);
            return _this;
        }
        return FakeService;
    }(Services_7.DataService));
    var FakeRelatedModel = (function (_super) {
        __extends(FakeRelatedModel, _super);
        function FakeRelatedModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.serviceName = "fakeRelatedModel";
            return _this;
        }
        __decorate([
            Model_6.attr(Model_6.StringField),
            __metadata("design:type", String)
        ], FakeRelatedModel.prototype, "fullText", void 0);
        return FakeRelatedModel;
    }(Model_6.Model));
    var FakeRelatedService = (function (_super) {
        __extends(FakeRelatedService, _super);
        function FakeRelatedService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = "fakeRelatedModel";
            _this.ModelClass = FakeRelatedModel;
            _this._adapter = new Adapters_3.MockAdapter();
            _this._serializer = new RestSerializer_2.RestSerializer(FakeRelatedModel);
            return _this;
        }
        return FakeRelatedService;
    }(Services_7.DataService));
    describe("BaseSerializer", function () {
        describe("transform", function () {
            var mockModelData;
            var fakeService;
            var fakeRelatedService;
            var fakeRelatedModel;
            var stubRelatedSerializerTransform;
            var fakeModel;
            var mockSerializer;
            var fakeRelatedModelId;
            var age;
            var fullText;
            var startDateString;
            var startTimeString;
            beforeEach(function () {
                age = faker_4.default.random.number();
                fullText = faker_4.default.lorem.word();
                startDateString = date_fns_6.format(faker_4.default.date.recent(), "YYYY-MM-DD");
                startTimeString = date_fns_6.format(faker_4.default.date.recent(), "hh:mm:ss a");
                fakeRelatedModelId = faker_4.default.random.number().toString();
                var modelId = faker_4.default.random.number().toString();
                fakeRelatedModel = new FakeRelatedModel({
                    id: fakeRelatedModelId,
                    fullText: faker_4.default.lorem.word(),
                });
                mockModelData = {
                    id: modelId,
                    fullText: fullText,
                    age: age,
                    startDate: date_fns_6.parse(startDateString, "YYYY-MM-DD", new Date()),
                    startTime: date_fns_6.parse(startTimeString, "hh:mm:ss a", new Date()),
                    organizationId: fakeRelatedModelId,
                };
                fakeModel = new MockModel(mockModelData);
                mockSerializer = new RestSerializer_2.RestSerializer(MockModel);
                fakeService = new FakeService();
                fakeRelatedService = new FakeRelatedService();
                sinon_14.stub(fakeRelatedService, "getById").returns(Observable_1.Observable.of(fakeRelatedModel));
                stubRelatedSerializerTransform = sinon_14.stub(fakeRelatedService.serializer, "transform").callThrough();
                Services_7.registerService(fakeService);
                Services_7.registerService(fakeRelatedService);
            });
            it("transforms the model into a plain javascript object based on each field's FieldType", function () {
                var transformedModelData = mockSerializer.transform(fakeModel);
                expect(transformedModelData).to.deep.equal({
                    age: age,
                    fullText: fullText,
                    startDate: startDateString,
                    startTime: startTimeString,
                    organizationId: fakeRelatedModelId,
                });
            });
            it("excludes transforming fields from the model using the model's fields property", function () {
                fakeModel.fields.age.serialize = false;
                var transformedModelData = mockSerializer.transform(fakeModel);
                expect(transformedModelData).to.not.have.property("age");
            });
            it("excludes transforming relationships from the model by default", function () {
                var transformedModelData = mockSerializer.transform(fakeModel);
                expect(fakeModel).to.have.property("organization");
                expect(transformedModelData).to.not.have.property("organization");
            });
            it("transforms relationships on the model when serialize = true", function () {
                fakeModel.fields.organization.serialize = true;
                var transformedModelData = mockSerializer.transform(fakeModel);
                expect(fakeModel).to.have.property("organization");
                expect(transformedModelData).to.have.property("organization");
            });
            it("uses the relationship's own data service to transform it when serialize = true", function () {
                fakeModel.fields.organization.serialize = true;
                mockSerializer.transform(fakeModel);
                expect(stubRelatedSerializerTransform.firstCall.args[0]).to.equal(fakeRelatedModel);
            });
        });
        describe("normalize", function () {
            var fakeService;
            var fakeRelatedService;
            var fakeRelatedModel;
            var mockSerializer;
            var fakeRelatedModelId;
            var modelId;
            beforeEach(function () {
                modelId = faker_4.default.random.number().toString();
                fakeRelatedModelId = faker_4.default.random.number().toString();
                fakeRelatedModel = new FakeRelatedModel({
                    id: fakeRelatedModelId,
                    fullText: faker_4.default.lorem.word(),
                });
                mockSerializer = new RestSerializer_2.RestSerializer(MockModel);
                fakeService = new FakeService();
                fakeRelatedService = new FakeRelatedService();
                sinon_14.stub(fakeRelatedService, "getById").returns(Observable_1.Observable.of(fakeRelatedModel));
                Services_7.registerService(fakeService);
                Services_7.registerService(fakeRelatedService);
            });
            it("normalizes raw data to create an instance of the model", function () {
                var age = faker_4.default.random.number();
                var fullText = faker_4.default.lorem.word();
                var startDateString = date_fns_6.format(faker_4.default.date.recent(), "YYYY-MM-DD");
                var startTimeString = date_fns_6.format(faker_4.default.date.recent(), "hh:mm:ss a");
                var rawModelData = {
                    id: modelId,
                    fullText: fullText,
                    age: age,
                    startDate: startDateString,
                    startTime: startTimeString,
                    organizationId: fakeRelatedModelId,
                };
                var model = mockSerializer.normalize(rawModelData);
                expect(model).to.deep.contain({
                    age: age,
                    fullText: fullText,
                    startDate: date_fns_6.parse(startDateString, "YYYY-MM-DD", new Date()),
                    startTime: date_fns_6.parse(startTimeString, "hh:mm:ss a", new Date()),
                    organizationId: fakeRelatedModelId,
                    organization: fakeRelatedModel,
                });
            });
            describe("side loads nested related models", function () {
                var relatedModelData;
                var rawModelData;
                var invokeSpy;
                var pushRecordStub;
                beforeEach(function () {
                    relatedModelData = {
                        id: fakeRelatedModelId,
                        fullText: fakeRelatedModel.fullText,
                    };
                    rawModelData = {
                        id: modelId,
                        organizationId: fakeRelatedModelId,
                        organization: relatedModelData,
                    };
                    invokeSpy = sinon_14.spy();
                    pushRecordStub = sinon_14.stub(fakeRelatedService.actions, "pushRecord").returns({ invoke: invokeSpy });
                });
                afterEach(function () {
                    pushRecordStub.restore();
                });
                it("normalizes nested related data", function () {
                    var normalizeStub = sinon_14.stub(fakeRelatedService.serializer, "normalize");
                    mockSerializer.normalize(rawModelData);
                    expect(normalizeStub.firstCall.args[0]).to.equal(relatedModelData);
                });
                it("creates a pushRecord action with related data", function () {
                    mockSerializer.normalize(rawModelData);
                    expect(pushRecordStub.firstCall.args[0]).to.deep.equal(fakeRelatedModel);
                });
                it("invokes a pushRecord action with related data", function () {
                    mockSerializer.normalize(rawModelData);
                    expect(invokeSpy.calledOnce).to.be.true;
                });
            });
        });
    });
});
define("Serializers/RestSerializer.test", ["require", "exports", "sinon", "Serializers/RestSerializer", "Model/Model.mock", "faker"], function (require, exports, sinon_15, RestSerializer_3, Model_mock_3, faker_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("RestSerializer", function () {
        describe("serialize", function () {
            it("first transforms the model before serializing it", function () {
                var fakeModel = new Model_mock_3.FakeModel({ id: faker_5.default.random.number().toString() });
                var restSerializer = new RestSerializer_3.RestSerializer(Model_mock_3.FakeModel);
                var stubTransform = sinon_15.stub(restSerializer, "transform");
                restSerializer.serialize(fakeModel);
                expect(stubTransform.firstCall.args[0]).to.equal(fakeModel);
            });
            it("converts the model into a JSON string", function () {
                var fullText = faker_5.default.lorem.word().toString();
                var fakeModel = new Model_mock_3.FakeModel({
                    id: faker_5.default.random.number().toString(),
                    fullText: fullText,
                });
                var restSerializer = new RestSerializer_3.RestSerializer(Model_mock_3.FakeModel);
                var serializedModel = restSerializer.serialize(fakeModel);
                expect(serializedModel).to.equal(JSON.stringify({ fullText: fullText }));
            });
        });
        describe("deserialize", function () {
            it("converts the deserialized raw data into a Model by normalizing it", function () {
                var fakeModelData = {
                    id: faker_5.default.random.number().toString(),
                    fullText: faker_5.default.lorem.word().toString(),
                };
                var serializedModel = JSON.stringify(fakeModelData);
                var restSerializer = new RestSerializer_3.RestSerializer(Model_mock_3.FakeModel);
                var stubNormalize = sinon_15.stub(restSerializer, "normalize");
                restSerializer.deserialize(serializedModel);
                expect(stubNormalize.firstCall.args[0]).to.deep.equal(fakeModelData);
            });
            it("converts the JSON string into a model", function () {
                var fakeModelData = {
                    id: faker_5.default.random.number().toString(),
                    fullText: faker_5.default.lorem.word().toString(),
                };
                var fakeModel = new Model_mock_3.FakeModel(fakeModelData);
                var serializedModel = JSON.stringify(fakeModelData);
                var restSerializer = new RestSerializer_3.RestSerializer(Model_mock_3.FakeModel);
                var deserializedModel = restSerializer.deserialize(serializedModel);
                expect(deserializedModel).to.deep.equal(fakeModel);
            });
        });
    });
});
define("Services/BaseService.mock", ["require", "exports", "immutable", "Services/BaseService", "Adapters/index"], function (require, exports, immutable_2, BaseService_3, Adapters_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MockTestService = (function (_super) {
        __extends(MockTestService, _super);
        function MockTestService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = "mockTestService";
            return _this;
        }
        Object.defineProperty(MockTestService.prototype, "adapter", {
            get: function () {
                if (!this._adapter) {
                    this._adapter = new Adapters_4.MockAdapter();
                }
                return this._adapter;
            },
            enumerable: true,
            configurable: true
        });
        MockTestService.prototype.getDefaultState = function () {
            return immutable_2.Record({ items: immutable_2.List() })();
        };
        MockTestService.prototype.createTypes = function () {
            return __assign({}, (_super.prototype.createTypes.call(this)), { BAKE_BAGUETTES: this.makeActionType("BAKE_BAGUETTES"), EAT_BAGUETTES: this.makeActionType("EAT_BAGUETTES") });
        };
        MockTestService.prototype.createActions = function () {
            return __assign({}, (_super.prototype.createActions.call(this)), { bakeBaguettes: this.makeActionCreator(this.types.BAKE_BAGUETTES), eatBaguettes: this.makeActionCreator(this.types.EAT_BAGUETTES) });
        };
        MockTestService.prototype.createSelectors = function () {
            var baseSelectors = _super.prototype.createSelectors.call(this);
            var getServiceState = baseSelectors.getServiceState;
            return __assign({}, baseSelectors, { eatBaguettes: function (state, baguetteFilter) {
                    return getServiceState(state).items.filter(baguetteFilter);
                } });
        };
        MockTestService.prototype.createReducers = function () {
            var _a;
            return __assign({}, (_super.prototype.createReducers.call(this)), (_a = {}, _a[this.types.BAKE_BAGUETTES] = this.bakeBaguettesReducer, _a[this.types.EAT_BAGUETTES] = this.eatBaguettesReducer, _a));
        };
        MockTestService.prototype.bakeBaguettesReducer = function (state, action) {
            state.update("items", function (items) {
                return items.push(action.payload.item);
            });
        };
        MockTestService.prototype.eatBaguettesReducer = function (state) {
            state.update("items", function (items) {
                return items.pop();
            });
        };
        MockTestService.prototype.createEpics = function () {
            return (_super.prototype.createEpics.call(this)).concat([
                this.bakeBaguettesEpic.bind(this),
                this.eatBaguettesEpic.bind(this),
            ]);
        };
        MockTestService.prototype.bakeBaguettesEpic = function (action$) {
            var _this = this;
            return action$.ofType(this.types.BAKE_BAGUETTES)
                .mergeMap(function (action) {
                return _this.adapter.createItem("")
                    .do(action.meta.onSuccess, action.meta.onError)
                    .map(function (item) { return _this.actions.pushRecord(item); });
            });
        };
        MockTestService.prototype.eatBaguettesEpic = function (action$) {
            var _this = this;
            return action$.ofType(this.types.EAT_BAGUETTES)
                .mergeMap(function (action) {
                return _this.adapter.deleteItem("0")
                    .do(action.meta.onSuccess, action.meta.onError)
                    .map(function (item) { return _this.actions.pushRecord(item); });
            });
        };
        return MockTestService;
    }(BaseService_3.BaseService));
    exports.MockTestService = MockTestService;
    function createMockTestService() {
        return new MockTestService();
    }
    exports.createMockTestService = createMockTestService;
});
define("Services/BaseService.test", ["require", "exports", "rxjs/observable/of", "sinon", "Adapters/index", "Services/BaseService", "Services/BaseService.mock", "Services/ServiceProvider", "redux-test-utils", "TestUtils/index", "rxjs/add/operator/take"], function (require, exports, of_4, sinon_16, Adapters_5, BaseService_4, BaseService_mock_1, ServiceProvider_2, redux_test_utils_1, TestUtils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), beforeEach = _a.beforeEach, it = _a.it, describe = _a.describe;
    var expect = intern.getPlugin("chai").expect;
    describe("BaseService", function () {
        var mockTestService;
        var mockAdapter;
        var store;
        var state;
        beforeEach(function () {
            mockAdapter = new Adapters_5.MockAdapter();
            mockTestService = BaseService_mock_1.createMockTestService();
            ServiceProvider_2.registerService(mockTestService);
            state = TestUtils_2.createMockServiceState(mockTestService, []);
            store = redux_test_utils_1.createMockStore(state);
        });
        it("allows registration of a dispatch", function () {
            var dispatchSpy = sinon_16.spy();
            BaseService_4.BaseService.registerDispatch(dispatchSpy);
            mockTestService.actions.bakeBaguettes({}, {}).invoke();
            expect(dispatchSpy.calledOnce).to.be.true;
        });
        it("allows setting the state observable", function () {
            var expectedValue = "hello world";
            var observable = of_4.of(expectedValue);
            BaseService_4.BaseService.setStateObservable(observable);
            BaseService_4.BaseService
                .getStateObservable()
                .take(1)
                .subscribe(function (value) { return expect(value).to.equal(expectedValue); });
        });
        describe("epics", function () {
            it("exposes the epics through a getter", function () {
                var stubBakeBaguettesEpic = sinon_16.stub(mockTestService, "bakeBaguettesEpic");
                var stubEatBaguettesEpic = sinon_16.stub(mockTestService, "eatBaguettesEpic");
                mockTestService.epics.forEach(function (epic) { return epic(); });
                expect(stubBakeBaguettesEpic.callCount).to.equal(1);
                expect(stubEatBaguettesEpic.callCount).to.equal(1);
            });
        });
        describe("actions", function () {
            it("exposes the actions", function () {
                expect(mockTestService.actions).to.have.all.keys(["bakeBaguettes", "eatBaguettes"]);
            });
            describe("exposes a method to make action creators", function () {
                var actionType;
                var action;
                var defaultMeta = { favoriteBread: "baguette" };
                beforeEach(function () {
                    actionType = mockTestService.makeActionType("TEST");
                    action = mockTestService
                        .makeActionCreator(actionType, defaultMeta);
                });
                it("publishes the default meta, type and payload when the action is created", function () {
                    expect(action()).to.deep.include({ type: actionType, payload: undefined, meta: defaultMeta });
                });
                it("provides an invoke method", function () {
                    expect(action()).to.have.property("invoke").that.is.a("function");
                });
                it("allows overriding meta completely", function () {
                    var updatedMeta = { favoriteBread: "tortilla", secondFavoriteBread: "baguette" };
                    expect(action(undefined, updatedMeta)).to.deep.include({ meta: updatedMeta });
                });
                it("provides the ability to merge the meta", function () {
                    var updatedMeta = { secondFavoriteBread: "tortilla" };
                    expect(action(undefined, updatedMeta)).to.deep.include({ meta: __assign({}, defaultMeta, updatedMeta) });
                });
                it("passes on the payload", function () {
                    var payload = { bread: "cooked" };
                    expect(action(payload)).to.deep.include({ payload: payload });
                });
            });
        });
        describe("selectors", function () {
            describe("serviceStateSelector", function () {
                it("returns the service specific state if exists", function () {
                    var mockTestServiceState = mockTestService.selectors.getServiceState(store.getState());
                    expect(mockTestServiceState).to.equal(state.mockTestService);
                });
                it("returns the root state in the absence of the service specific state", function () {
                    var emptyStore = redux_test_utils_1.createMockStore();
                    var probablyRootState = mockTestService.selectors.getServiceState(emptyStore.getState());
                    expect(probablyRootState).to.equal(emptyStore.getState());
                });
            });
            it("exposes the selectors", function () {
                expect(mockTestService.selectors).to.have.all.keys(["getServiceState", "eatBaguettes"]);
            });
        });
        describe("reducers", function () {
            var returnValue = "I like baguettes";
            var bakeBaguetteReducerStub;
            var output;
            var action;
            beforeEach(function () {
                bakeBaguetteReducerStub = sinon_16.stub(mockTestService, "bakeBaguettesReducer").returns(returnValue);
                action = mockTestService.actions.bakeBaguettes();
                output = mockTestService.reducer(state.mockTestService, action);
            });
            it("exposes the reducers output", function () {
                expect(output).to.equal(returnValue);
            });
            it("calls the reducer related to the action type", function () {
                expect(bakeBaguetteReducerStub.calledWithExactly(state.mockTestService, action)).to.be.true;
            });
            it("provides a the default state if not provided", function () {
                output = mockTestService.reducer(undefined, action);
                expect(bakeBaguetteReducerStub.calledWithExactly(mockTestService.getDefaultState(), action)).to.be.true;
            });
        });
        describe("types", function () {
            it("creates an action type name", function () {
                var actionTypeName = mockTestService.makeActionType("bakeBaguettes");
                expect(actionTypeName).to.equal(mockTestService.name + "/bakeBaguettes");
            });
            it("exposes the types", function () {
                expect(mockTestService.types).to.have.all.keys(["BAKE_BAGUETTES", "EAT_BAGUETTES"]);
            });
        });
    });
});
define("Services/DataService.test", ["require", "exports", "sinon", "redux-observable", "rxjs/Observable", "rxjs/Subject", "immutable", "redux-test-utils", "TestUtils/Service", "Model/Model.mock", "Adapters/MockAdapter", "Services/DataService", "Services/BaseService", "object-hash", "Services/ServiceProvider", "rxjs/add/observable/of"], function (require, exports, sinon_17, redux_observable_2, Observable_2, Subject_3, immutable_3, redux_test_utils_2, Service_2, Model_mock_4, MockAdapter_2, DataService_3, BaseService_5, object_hash_1, ServiceProvider_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach, afterEach = _a.afterEach;
    var _b = intern.getPlugin("chai"), assert = _b.assert, expect = _b.expect;
    var noop = function () { return null; };
    describe("DataService", function () {
        var fakeService;
        var mockAdapter;
        var store;
        var fakeModels;
        var state;
        var serviceName = "fakeModel";
        beforeEach(function () {
            mockAdapter = new MockAdapter_2.MockAdapter();
            var FakeService = (function (_super) {
                __extends(FakeService, _super);
                function FakeService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = serviceName;
                    _this.ModelClass = Model_mock_4.FakeModel;
                    _this._adapter = mockAdapter;
                    return _this;
                }
                return FakeService;
            }(DataService_3.DataService));
            fakeService = new FakeService();
            ServiceProvider_3.registerService(fakeService);
            fakeModels = Model_mock_4.createMockFakeModels();
            state = Service_2.createMockServiceState(fakeService, [
                fakeService.actions.pushAll({ items: fakeModels }),
            ]);
            store = redux_test_utils_2.createMockStore(state);
        });
        it("has an action creator for triggering a fetchAll query", function () {
            assert.isFunction(fakeService.actions.fetchAll);
        });
        describe("fetchAll action creator", function () {
            it("should create the correct action to trigger a fetchAll query to the api with the query params", function () {
                var expected = {
                    type: serviceName + "/FETCH_ALL",
                    payload: { filter: "all" },
                    meta: {},
                };
                var actual = fakeService.actions.fetchAll({ filter: "all" });
                delete actual.invoke;
                assert.deepEqual(actual, expected);
            });
            it("should trigger query with the query params and an onSuccess callback", function () {
                var onSuccess = noop;
                var expected = {
                    type: serviceName + "/FETCH_ALL",
                    payload: { filter: "all" },
                    meta: { onSuccess: onSuccess },
                };
                var actual = fakeService.actions.fetchAll({ filter: "all" }, { onSuccess: onSuccess });
                delete actual.invoke;
                assert.deepEqual(actual, expected);
            });
        });
        it("has an action creator for triggering a GET request to the API", function () {
            assert.isFunction(fakeService.actions.fetchRecord);
        });
        describe("fetchRecord action creator", function () {
            it("should create the correct action to trigger a GET request", function () {
                var expected = {
                    type: serviceName + "/FETCH_RECORD",
                    payload: { id: 123 },
                    meta: {},
                };
                var actual = fakeService.actions.fetchRecord({ id: 123 });
                delete actual.invoke;
                assert.deepEqual(actual, expected);
            });
            it("should trigger a GET request to the API and accepting an onSuccess callback", function () {
                var cachedItemId = fakeModels[0].id;
                var onSuccess = sinon_17.spy();
                var expected = {
                    type: serviceName + "/FETCH_RECORD",
                    payload: { id: cachedItemId },
                    meta: { onSuccess: onSuccess },
                };
                var actual = fakeService.actions.fetchRecord({ id: cachedItemId }, { onSuccess: onSuccess });
                delete actual.invoke;
                assert.deepEqual(actual, expected);
            });
        });
        it("has an action creator for triggering a CREATE request to the API", function () {
            assert.isFunction(fakeService.actions.createRecord);
        });
        describe("createRecord action creator", function () {
            it("creates the correct action to trigger a CREATE request with an onSuccess callback", function () {
                var onSuccess = sinon_17.spy();
                var expected = {
                    type: serviceName + "/CREATE_RECORD",
                    payload: { fakeField: "rabbit" },
                    meta: { onSuccess: onSuccess },
                };
                var actual = fakeService.actions.createRecord({ fakeField: "rabbit" }, { onSuccess: onSuccess });
                delete actual.invoke;
                assert.deepEqual(actual, expected);
            });
        });
        it("has an action creator for triggering a PUT request to the API", function () {
            assert.isFunction(fakeService.actions.updateRecord);
        });
        describe("updateRecord action creator", function () {
            it("creates the correct action to trigger a PUT request with an onSuccess callback", function () {
                var onSuccess = sinon_17.spy();
                var expected = {
                    type: serviceName + "/UPDATE_RECORD",
                    payload: { fakeField: "rabbit" },
                    meta: { onSuccess: onSuccess },
                };
                var actual = fakeService.actions.updateRecord({ fakeField: "rabbit" }, { onSuccess: onSuccess });
                delete actual.invoke;
                assert.deepEqual(actual, expected);
            });
        });
        it("has an action creator for triggering a PATCH request to the API", function () {
            assert.isFunction(fakeService.actions.patchRecord);
        });
        describe("patchRecord action creator", function () {
            it("creates the correct action to trigger a PATCH request with an onSuccess callback", function () {
                var onSuccess = sinon_17.spy();
                var expected = {
                    type: serviceName + "/PATCH_RECORD",
                    payload: { fakeField: "rabbit" },
                    meta: { onSuccess: onSuccess },
                };
                var actual = fakeService.actions.patchRecord({ fakeField: "rabbit" }, { onSuccess: onSuccess });
                delete actual.invoke;
                assert.deepEqual(actual, expected);
            });
        });
        it("has an action creator for triggering a DELETE_RECORD request to the API", function () {
            assert.isFunction(fakeService.actions.deleteRecord);
        });
        describe("deleteRecord action creator", function () {
            it("creates the correct action to trigger a DELETE request with an onSuccess callback", function () {
                var onSuccess = sinon_17.spy();
                var expected = {
                    type: serviceName + "/DELETE_RECORD",
                    payload: { id: 123 },
                    meta: { onSuccess: onSuccess },
                };
                var actual = fakeService.actions.deleteRecord({ id: 123 }, { onSuccess: onSuccess });
                delete actual.invoke;
                assert.deepEqual(actual, expected);
            });
        });
        it("has an action creator for triggering a SET_FIELD request", function () {
            assert.isFunction(fakeService.actions.setField);
        });
        describe("setField action creator", function () {
            it("creates the correct action to trigger a setField request", function () {
                var onSuccess = sinon_17.spy();
                var expected = {
                    type: serviceName + "/SET_FIELD",
                    payload: { id: 123, fieldName: "firstName", value: "Hank" },
                    meta: {},
                };
                var actual = fakeService.actions.setField({ id: 123, fieldName: "firstName", value: "Hank" });
                delete actual.invoke;
                assert.deepEqual(actual, expected);
            });
        });
        it("has a reducer for setting the field of a record", function () {
            assert.isFunction(fakeService.setFieldReducer);
        });
        describe("setFieldReducer", function () {
            var setRecordSpy;
            beforeEach(function () {
                setRecordSpy = sinon_17.spy(immutable_3.Record.prototype, "set");
            });
            afterEach(function () {
                setRecordSpy.restore();
            });
            it("should set the field on the item with the new value", function () {
                var modelData = {
                    id: "1",
                    fullText: "Egg",
                };
                var modelMeta = { original: null };
                var model = new Model_mock_4.FakeModel(modelData, modelMeta);
                var items = immutable_3.Map()
                    .set(modelData.id, model);
                var stateRecord = immutable_3.Record({ items: items })();
                var action = {
                    type: serviceName + "/SET_FIELD",
                    payload: {
                        id: modelData.id,
                        fieldName: "fullText",
                        value: "Chicken",
                    },
                    meta: {},
                };
                var sut = fakeService.setFieldReducer(stateRecord, action);
                var updatedItem = sut
                    .get("items")
                    .get(modelData.id);
                assert.equal(updatedItem.fullText, action.payload.value);
            });
            it("should not set the items on the record when id not found in items", function () {
                var modelData = {
                    id: "1",
                    firstName: "Elton",
                };
                var modelMeta = { original: null };
                var model = new Model_mock_4.FakeModel(modelData, modelMeta);
                var items = immutable_3.Map()
                    .set(modelData.id, model);
                var stateRecord = immutable_3.Record({ items: items })();
                var action = {
                    type: serviceName + "/SET_FIELD",
                    payload: {
                        id: "not likely to exist",
                        fieldName: "firstName",
                        value: "Sir Elton",
                    },
                    meta: {},
                };
                var sut = fakeService.setFieldReducer(stateRecord, action);
                assert.isFalse(setRecordSpy.calledWith("items"));
            });
            it("should update items with updated record when id found in items", function () {
                var modelData = {
                    id: "1",
                    fullText: "Anakin",
                };
                var modelMeta = { original: null };
                var model = new Model_mock_4.FakeModel(modelData, modelMeta);
                var items = immutable_3.Map()
                    .set(modelData.id, model);
                var stateRecord = immutable_3.Record({ items: items })();
                var action = {
                    type: serviceName + "/SET_FIELD",
                    payload: {
                        id: modelData.id,
                        fieldName: "fullText",
                        value: "Darth",
                    },
                    meta: {},
                };
                var sut = fakeService.setFieldReducer(stateRecord, action);
                assert.isTrue(setRecordSpy.calledWith("items", sinon_17.match(function (updatedItems) {
                    var updatedModel = updatedItems.get(modelData.id);
                    return updatedModel.modelData.fullText === action.payload.value;
                })));
            });
        });
        it("has an epic for performing a fetchAll request with the query params", function () {
            assert.isFunction(fakeService.fetchAllEpic);
        });
        describe("fetchAll caching", function () {
            it("should call fetchAll on adapter with payload", function () {
                var expectedResult = { hello: "world" };
                var payload = { filter: "all" };
                var fetchAllAction = fakeService.actions.fetchAll(payload);
                var pushAllAction = sinon_17.stub(fakeService.actions, "pushAll");
                mockAdapter.fetchAll.returns(Observable_2.Observable.of(expectedResult));
                fakeService.fetchAllEpic(redux_observable_2.ActionsObservable.of(fetchAllAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(mockAdapter.fetchAll.calledWithMatch(payload));
                });
            });
            it("should call pushAll action with result from call to adapter", function () {
                var expectedResult = { hello: "world" };
                var payload = { filter: "all" };
                var fetchAllAction = fakeService.actions.fetchAll(payload);
                var pushAllAction = sinon_17.stub(fakeService.actions, "pushAll");
                mockAdapter.fetchAll.returns(Observable_2.Observable.of(expectedResult));
                fakeService.fetchAllEpic(redux_observable_2.ActionsObservable.of(fetchAllAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(pushAllAction.calledWithMatch(expectedResult));
                });
            });
        });
        describe("pushAllReducer", function () {
            it("updates the state's requestCache, after the pushAllReducer fires", function () {
                var queryParams = { fakeField: "fakeVal" };
                var updatedState = fakeService.pushAllReducer(state.fakeModel, fakeService.actions.pushAll({ items: fakeModels }, { queryParams: queryParams }));
                var cachedRequest = updatedState.requestCache.get(object_hash_1.default(queryParams || {}));
                expect(cachedRequest.toJS()).to.deep.equal({ ids: fakeModels.map(function (x) { return x.id; }), isLoading: false, errors: null }, "cached request value is properly initilized");
            });
        });
        describe("getItems selector", function () {
            it("should only select the items returned from a fetchall request, given the same obj to make the request", function () {
                var queryParams = { fakeField: "fakeVal" };
                var expectedValues = Model_mock_4.createMockFakeModels(2);
                var extraValues = [Model_mock_4.createMockFakeModel(), Model_mock_4.createMockFakeModel()];
                state = Service_2.createMockServiceState(fakeService, [
                    fakeService.actions.pushAll({ items: expectedValues }, { queryParams: queryParams }),
                    fakeService.actions.pushAll({ items: extraValues }, { queryParams: { fakeField2: "fakeVal" } }),
                ]);
                var items = fakeService.selectors.getItems(state, queryParams);
                var itemsData = items.toJS();
                expect(expectedValues).to.deep.equal(itemsData);
            });
        });
        describe("setErrors reducer", function () {
            it("updates the state adding errors that occurred during the fetchAllEpic", function () {
                var queryParams = { fakeField: "fakeVal" };
                state = Service_2.createMockServiceState(fakeService, [
                    fakeService.actions.pushAll({ items: [] }, { queryParams: queryParams }),
                ]);
                var errors = ["test error"];
                var updatedState = fakeService.setErrorsReducer(state.fakeModel, fakeService.actions.setErrors({ errors: errors }, { queryParams: queryParams }));
                var cachedRequest = updatedState.requestCache.get(object_hash_1.default(queryParams || {}));
                expect(cachedRequest.toJS()).to.deep.include({
                    ids: [],
                    isLoading: false,
                    errors: errors,
                }, "cached request value is properly initilized");
            });
            it("preserves the ids", function () {
                var expectedValues = Model_mock_4.createMockFakeModels(2);
                var existingIds = expectedValues.map(function (val) { return val.id; });
                var queryParams = { fakeField: "fakeVal" };
                state = Service_2.createMockServiceState(fakeService, [
                    fakeService.actions.pushAll({ items: expectedValues }, { queryParams: queryParams }),
                ]);
                var errors = ["test error"];
                var updatedState = fakeService.setErrorsReducer(state.fakeModel, fakeService.actions.setErrors({ errors: errors }, { queryParams: queryParams }));
                var cachedRequest = updatedState.requestCache.get(object_hash_1.default(queryParams || {}));
                expect(cachedRequest.toJS()).to.deep.include({
                    ids: existingIds,
                    isLoading: false,
                    errors: errors,
                }, "cached request value is properly initialized");
            });
        });
        it("has an epic for performing a GET request", function () {
            assert.isFunction(fakeService.fetchRecordEpic);
        });
        describe("fetchRecordEpic", function () {
            it("should fire the onSuccess callback with the response", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { id: "123", fullText: "puppy" };
                var fetchRecordAction = fakeService.actions.fetchRecord(expectedResult, { onSuccess: onSuccess });
                var pushRecordAction = sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.fetchItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.fetchRecordEpic(redux_observable_2.ActionsObservable.of(fetchRecordAction), store)
                    .subscribe(noop, noop, function () { return expect(onSuccess.firstCall.args[0]).to.deep.equal(new Model_mock_4.FakeModel(expectedResult)); });
            });
            it("should fire The pushRecord action with the response", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { id: "123", fullText: "puppy" };
                var fetchRecordAction = fakeService.actions.fetchRecord(expectedResult, { onSuccess: onSuccess });
                var pushRecordAction = sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.fetchItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.fetchRecordEpic(redux_observable_2.ActionsObservable.of(fetchRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(pushRecordAction.calledWithMatch(new fakeService.ModelClass(expectedResult)));
                });
            });
            it("should not fire fetchItem if item exists in store when forceReload omitted", function () {
                var cachedItemId = fakeModels[0].id;
                var fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, null);
                fakeService.fetchRecordEpic(redux_observable_2.ActionsObservable.of(fetchRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isFalse(mockAdapter.fetchItem.called);
                });
            });
            it("should fire fetchItem if item does not exist in store when forceReload omitted", function () {
                var fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, null);
                fakeService.fetchRecordEpic(redux_observable_2.ActionsObservable.of(fetchRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(mockAdapter.fetchItem.called);
                });
            });
            it("should not fire fetchItem if item exists in store when forceReload false", function () {
                var cachedItemId = fakeModels[0].id;
                var fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, { forceReload: false });
                fakeService.fetchRecordEpic(redux_observable_2.ActionsObservable.of(fetchRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isFalse(mockAdapter.fetchItem.called);
                });
            });
            it("should fire fetchItem if item does not exist in store when forceReload false", function () {
                var fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, { forceReload: false });
                fakeService.fetchRecordEpic(redux_observable_2.ActionsObservable.of(fetchRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(mockAdapter.fetchItem.called);
                });
            });
            it("should fire fetchItem if item exists in store when forceReload true", function () {
                var cachedItemId = fakeModels[0].id;
                var fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, { forceReload: true });
                fakeService.fetchRecordEpic(redux_observable_2.ActionsObservable.of(fetchRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(mockAdapter.fetchItem.called);
                });
            });
            it("should fire fetchItem if item does not exist in store when forceReload true", function () {
                var fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, { forceReload: true });
                fakeService.fetchRecordEpic(redux_observable_2.ActionsObservable.of(fetchRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(mockAdapter.fetchItem.called);
                });
            });
        });
        it("has an epic for performing a CREATE request", function () {
            assert.isFunction(fakeService.createRecordEpic);
        });
        describe("createRecordEpic", function () {
            it("should call adapter with expected result", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { fullText: "puppy" };
                var createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess: onSuccess });
                var pushRecordAction = sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.createItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.createRecordEpic(redux_observable_2.ActionsObservable.of(createRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(mockAdapter.createItem.calledWithMatch(JSON.stringify(expectedResult)));
                });
            });
            it("should fire the onSuccess callback with response", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { fullText: "puppy" };
                var createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess: onSuccess });
                var pushRecordAction = sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.createItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.createRecordEpic(redux_observable_2.ActionsObservable.of(createRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(onSuccess.calledWithMatch(expectedResult));
                });
            });
            it("should fire pushRecord with response", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { fullText: "puppy" };
                var createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess: onSuccess });
                var pushRecordAction = sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.createItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.createRecordEpic(redux_observable_2.ActionsObservable.of(createRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(pushRecordAction.calledWithMatch(expectedResult));
                });
            });
            it("should use the store's getState() method", function () {
                var expectedResult = { id: "123" };
                var createRecordAction = fakeService.actions.createRecord(expectedResult);
                sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.updateItem.returns(Observable_2.Observable.of(expectedResult));
                var stubGetState = sinon_17.stub(store, "getState");
                fakeService.createRecordEpic(redux_observable_2.ActionsObservable.of(createRecordAction), store)
                    .subscribe(noop, noop, function () {
                    expect(stubGetState.callCount).to.equal(1);
                });
            });
        });
        it("has an epic for performing a PUT request", function () {
            assert.isFunction(fakeService.updateRecordEpic);
        });
        describe("updateRecordEpic", function () {
            it("should call updateItem with id and result", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { id: "123", fullText: "puppy" };
                var updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess: onSuccess });
                var pushRecordAction = sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.updateItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.updateRecordEpic(redux_observable_2.ActionsObservable.of(updateRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(mockAdapter.updateItem.calledWithMatch(expectedResult.id, JSON.stringify({ fullText: "puppy" })));
                });
            });
            it("should call onSuccess callback with result", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { id: 123, fullText: "puppy" };
                var updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess: onSuccess });
                var pushRecordAction = sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.updateItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.updateRecordEpic(redux_observable_2.ActionsObservable.of(updateRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(onSuccess.calledWithMatch(expectedResult));
                });
            });
            it("should call pushRecord with result", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { id: "123", fullText: "puppy" };
                var updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess: onSuccess });
                var pushRecordAction = sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.updateItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.updateRecordEpic(redux_observable_2.ActionsObservable.of(updateRecordAction), store)
                    .subscribe(noop, noop, function () {
                    expect(pushRecordAction.firstCall.args[0]).to.deep.equal(new Model_mock_4.FakeModel(expectedResult));
                });
            });
            it("should use the store's getState() method", function () {
                var expectedResult = { id: "123" };
                var updateRecordAction = fakeService.actions.updateRecord(expectedResult);
                sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.updateItem.returns(Observable_2.Observable.of(expectedResult));
                var stubGetState = sinon_17.stub(store, "getState");
                fakeService.updateRecordEpic(redux_observable_2.ActionsObservable.of(updateRecordAction), store)
                    .subscribe(noop, noop, function () {
                    expect(stubGetState.callCount).to.equal(1);
                });
            });
        });
        it("has an epic for performing a PATCH request", function () {
            assert.isFunction(fakeService.patchRecordEpic);
        });
        describe("patchRecordEpic", function () {
            it("should call patchItem with id and expected result", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { id: "123", fullText: "puppy" };
                var patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess: onSuccess });
                mockAdapter.patchItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.patchRecordEpic(redux_observable_2.ActionsObservable.of(patchRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(mockAdapter.patchItem.calledWithMatch(expectedResult.id, JSON.stringify({ fullText: "puppy" })));
                });
            });
            it("should call onSuccess with expected result", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { id: "123", fullText: "puppy" };
                var patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess: onSuccess });
                mockAdapter.patchItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.patchRecordEpic(redux_observable_2.ActionsObservable.of(patchRecordAction), store)
                    .subscribe(noop, noop, function () { return expect(onSuccess.firstCall.args[0]).to.deep.equal(new Model_mock_4.FakeModel(expectedResult)); });
            });
            it("should call pushRecord with expected result", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { id: "123", fullText: "puppy" };
                var patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess: onSuccess });
                var pushRecordAction = sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.patchItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.patchRecordEpic(redux_observable_2.ActionsObservable.of(patchRecordAction), store)
                    .subscribe(noop, noop, function () {
                    expect(pushRecordAction.firstCall.args[0]).to.deep.equal(new Model_mock_4.FakeModel(expectedResult));
                });
            });
        });
        it("has an epic for performing a DELETE request", function () {
            assert.isFunction(fakeService.deleteRecordEpic);
        });
        describe("deleteRecordEpic", function () {
            it("should call deleteItem with id", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { id: 123, fullText: "puppy" };
                var deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess: onSuccess });
                mockAdapter.deleteItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.deleteRecordEpic(redux_observable_2.ActionsObservable.of(deleteRecordAction), store)
                    .subscribe(noop, noop, function () {
                    assert.isTrue(mockAdapter.deleteItem.calledOnceWith(expectedResult.id));
                });
            });
            it("should call onSuccess callback with result", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { id: "123", fullText: "puppy" };
                var deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess: onSuccess });
                mockAdapter.deleteItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.deleteRecordEpic(redux_observable_2.ActionsObservable.of(deleteRecordAction), store)
                    .subscribe(noop, noop, function () { return expect(onSuccess.firstCall.args[0]).to.deep.equal(new Model_mock_4.FakeModel(expectedResult)); });
            });
            it("should call pushRecord with resopnse", function () {
                var onSuccess = sinon_17.spy();
                var expectedResult = { id: "123", fullText: "puppy" };
                var deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess: onSuccess });
                var pushRecordAction = sinon_17.stub(fakeService.actions, "pushRecord");
                mockAdapter.deleteItem.returns(Observable_2.Observable.of(expectedResult));
                fakeService.deleteRecordEpic(redux_observable_2.ActionsObservable.of(deleteRecordAction), store)
                    .subscribe(noop, noop, function () {
                    expect(pushRecordAction.firstCall.args[0]).to.deep.equal(new Model_mock_4.FakeModel(expectedResult));
                });
            });
        });
        describe("GetBy methods", function () {
            describe("getById", function () {
                var state$;
                var stubGetStateObservable;
                var stubFetchRecord;
                var dispatch = sinon_17.spy();
                beforeEach(function () {
                    state$ = Observable_2.Observable.of(state);
                    BaseService_5.BaseService.setStateObservable(state$);
                    BaseService_5.BaseService.registerDispatch(dispatch);
                });
                afterEach(function () {
                    if (stubGetStateObservable) {
                        stubGetStateObservable.restore();
                    }
                    if (stubFetchRecord) {
                        stubFetchRecord.restore();
                    }
                });
                it("should get the correct item by Id", function () {
                    var item = fakeModels[2];
                    var itemObservable = fakeService.getById(item.id);
                    itemObservable.subscribe((function (itemModel) {
                        expect(itemModel).to.deep.equal(item);
                    }));
                });
                it("should get new copies of the item when the state changes", function () {
                    state$ = new Subject_3.Subject();
                    state$.next(state);
                    BaseService_5.BaseService.setStateObservable(state$);
                    var itemData = fakeModels[2];
                    var itemObservable = fakeService.getById(itemData.id);
                    var newItemData = __assign({}, itemData, { fullText: "asdfasdf" });
                    var newState = fakeService.pushRecordReducer(state[serviceName], fakeService.actions.pushRecord(newItemData));
                    var previouslyUpdated = false;
                    itemObservable.subscribe(function (itemModel) {
                        var expectedData;
                        if (!previouslyUpdated) {
                            previouslyUpdated = true;
                            expectedData = itemData;
                            state$.next(newState);
                        }
                        else {
                            expectedData = newItemData;
                        }
                        expect(itemModel.getData()).to.deep.equal(expectedData);
                    });
                });
                it("should get the correct item by Id and cache it for future requests by that Id", function () {
                    var itemData = fakeModels[2];
                    var itemObservable = fakeService.getById(itemData.id);
                    var itemObservable2 = fakeService.getById(itemData.id);
                    expect(itemObservable).to.equal(itemObservable2);
                });
                it("should not call BaseService.getStateObservable when using a cached Observable", function () {
                    stubGetStateObservable = sinon_17.stub(BaseService_5.BaseService, "getStateObservable").returns(state$);
                    var itemData = fakeModels[2];
                    fakeService.getById(itemData.id);
                    fakeService.getById(itemData.id);
                    expect(stubGetStateObservable).to.have.property("callCount").to.equal(1);
                });
                it("should support multiple subscriptions by Id", function () {
                    var item = fakeModels[2];
                    var item2 = fakeModels[4];
                    var itemObservable = fakeService.getById(item.id);
                    var itemObservable2 = fakeService.getById(item2.id);
                    itemObservable.subscribe((function (itemModel) {
                        expect(itemModel).to.deep.equal(item);
                    }));
                    itemObservable2.subscribe((function (itemModel2) {
                        expect(itemModel2).to.deep.equal(item2);
                    }));
                });
                it("should return a shadow object if the requested Id is not in the state", function () {
                    stubFetchRecord = sinon_17.stub(fakeService.actions, "fetchRecord").returns({ invoke: sinon_17.spy() });
                    var itemObservable = fakeService.getById("9999");
                    itemObservable.subscribe((function (itemModel) {
                        expect(itemModel.isShadow).to.be.true;
                    }));
                });
                it("should create a fetchRecord action if the requested Id is not in the state", function () {
                    stubFetchRecord = sinon_17.stub(fakeService.actions, "fetchRecord").returns({ invoke: sinon_17.spy() });
                    fakeService.getById("9999");
                    expect(stubFetchRecord.firstCall.args[0]).to.deep.equal({ id: "9999" });
                });
                it("should invoke a fetchRecord action if the requested Id is not in the state", function () {
                    var invokeSpy = sinon_17.spy();
                    stubFetchRecord = sinon_17.stub(fakeService.actions, "fetchRecord").returns({ invoke: invokeSpy });
                    fakeService.getById("9999");
                    expect(invokeSpy).to.have.property("callCount").to.equal(1);
                });
            });
            describe("getByIds", function () {
                var state$;
                var stubGetStateObservable;
                var stubFetchRecord;
                beforeEach(function () {
                    state$ = Observable_2.Observable.of(state);
                    BaseService_5.BaseService.setStateObservable(state$);
                });
                afterEach(function () {
                    if (stubGetStateObservable) {
                        stubGetStateObservable.restore();
                    }
                    if (stubFetchRecord) {
                        stubFetchRecord.restore();
                    }
                });
                it("should get the correct items by their Ids", function () {
                    var itemData = fakeModels;
                    var itemsObservable = fakeService.getByIds(itemData.map(function (item) { return item.id; }));
                    itemsObservable.subscribe(function (items) {
                        return items.forEach(function (itemModel, i) { return expect(itemModel).to.equal(itemData[i]); });
                    });
                });
                it("should get the correct items by their Ids and cache them for future requests by those Ids", function () {
                    var itemData = fakeModels;
                    var indexes = itemData.map(function (item) { return item.id; });
                    var itemObservable = fakeService.getByIds(indexes);
                    var itemObservable2 = fakeService.getByIds(indexes);
                    expect(itemObservable).to.equal(itemObservable2);
                });
                it("should not call BaseService.getStateObservable when using cached Observable by Ids", function () {
                    stubGetStateObservable = sinon_17.stub(BaseService_5.BaseService, "getStateObservable").returns(state$);
                    var itemData = fakeModels;
                    var indexes = itemData.map(function (item) { return item.id; });
                    fakeService.getByIds(indexes);
                    fakeService.getByIds(indexes);
                    expect(stubGetStateObservable).to.have.property("callCount").to.equal(1);
                });
                it("should create a fetchRecord action if the requested Ids are not in the state already", function () {
                    stubFetchRecord = sinon_17.stub(fakeService.actions, "fetchRecord").returns({ invoke: sinon_17.spy() });
                    fakeService.getByIds(["9998", "9999"]);
                    expect(stubFetchRecord.firstCall.args[0]).to.deep.equal({ id: "9998" });
                    expect(stubFetchRecord.secondCall.args[0]).to.deep.equal({ id: "9999" });
                });
                it("should invoke a fetchRecord action if the requested Ids are not in the state", function () {
                    var invokeSpy = sinon_17.spy();
                    stubFetchRecord = sinon_17.stub(fakeService.actions, "fetchRecord").returns({ invoke: invokeSpy });
                    fakeService.getByIds(["9998", "9999"]);
                    expect(invokeSpy).to.have.property("callCount").to.equal(2);
                });
                it("should not create a fetchRecord action if a permutation of the requested Ids is in the state already", function () {
                    var invokeSpy = sinon_17.spy();
                    stubFetchRecord = sinon_17.stub(fakeService.actions, "fetchRecord").returns({ invoke: invokeSpy });
                    fakeService.getByIds(["9997", "9998", "9999"]);
                    fakeService.getByIds(["9999", "9997", "9998"]);
                    expect(invokeSpy).to.have.property("callCount").to.equal(3);
                });
            });
            describe("getByQuery", function () {
                var state$;
                var stubGetStateObservable;
                var stubFetchAll;
                var stubGetItemsSelector;
                var query = { page: 1, total: 1, organizationId: 2 };
                beforeEach(function () {
                    state$ = Observable_2.Observable.of(state);
                    BaseService_5.BaseService.setStateObservable(state$);
                });
                afterEach(function () {
                    if (stubGetStateObservable) {
                        stubGetStateObservable.restore();
                    }
                    if (stubFetchAll) {
                        stubFetchAll.restore();
                    }
                    if (stubGetItemsSelector) {
                        stubGetItemsSelector.restore();
                    }
                });
                it("should get the correct items by query", function () {
                    stubGetItemsSelector = sinon_17.stub(fakeService.selectors, "getItems")
                        .returns([fakeModels[0], fakeModels[1]]);
                    var itemsObservable = fakeService.getByQuery(query);
                    itemsObservable.subscribe(function (items) {
                        expect(items[0]).to.deep.equal(fakeModels[0]);
                        expect(items[1]).to.deep.equal(fakeModels[1]);
                    });
                });
                it("should get the correct items by their Ids and cache them for future requests by those Ids", function () {
                    var itemObservable = fakeService.getByQuery(query);
                    var itemObservable2 = fakeService.getByQuery(query);
                    expect(itemObservable).to.equal(itemObservable2);
                });
                it("should not call BaseService.getStateObservable when using cached Observable by Ids", function () {
                    stubGetStateObservable = sinon_17.stub(BaseService_5.BaseService, "getStateObservable").returns(state$);
                    var itemData = fakeModels;
                    fakeService.getByQuery(query);
                    fakeService.getByQuery(query);
                    expect(stubGetStateObservable).to.have.property("callCount").to.equal(1);
                });
                it("should create a fetchAll action with the proper payload", function () {
                    stubFetchAll = sinon_17.stub(fakeService.actions, "fetchAll").returns({ invoke: sinon_17.spy() });
                    fakeService.getByQuery(query);
                    expect(stubFetchAll.firstCall.args[0]).to.deep.equal(query);
                });
                it("should not invoke the fetchAll action with the proper parameters if the requested Ids are already in the cache", function () {
                    var invokeSpy = sinon_17.spy();
                    stubFetchAll = sinon_17.stub(fakeService.actions, "fetchAll").returns({ invoke: invokeSpy });
                    fakeService.getByQuery(query);
                    fakeService.getByQuery(query);
                    expect(invokeSpy).to.have.property("callCount").to.equal(1);
                });
                it("should invoke the fetchAll action with the proper parameters if the requested Ids are not already in the cache", function () {
                    var invokeSpy = sinon_17.spy();
                    stubFetchAll = sinon_17.stub(fakeService.actions, "fetchAll").returns({ invoke: invokeSpy });
                    var query2 = { page: 2, total: 50, organizationId: 33 };
                    fakeService.getByQuery(query);
                    fakeService.getByQuery(query2);
                    expect(invokeSpy).to.have.property("callCount").to.equal(2);
                });
            });
            describe("getAll", function () {
                var state$;
                var stubGetStateObservable;
                var stubFetchAll;
                beforeEach(function () {
                    state$ = Observable_2.Observable.of(state);
                    BaseService_5.BaseService.setStateObservable(state$);
                });
                afterEach(function () {
                    if (stubGetStateObservable) {
                        stubGetStateObservable.restore();
                    }
                    if (stubFetchAll) {
                        stubFetchAll.restore();
                    }
                });
                it("should get all of the items with getAll", function () {
                    var itemData = fakeModels;
                    var itemsObservable = fakeService.getAll();
                    itemsObservable.subscribe(function (items) {
                        return items.forEach(function (itemModel, i) { return expect(itemModel).to.deep.equal(itemData[i]); });
                    });
                });
                it("should call BaseService.getStateObservable", function () {
                    stubGetStateObservable = sinon_17.stub(BaseService_5.BaseService, "getStateObservable").returns(state$);
                    fakeService.getAll();
                    expect(stubGetStateObservable).to.have.property("callCount").to.equal(1);
                });
                it("should create a fetchAll action", function () {
                    stubFetchAll = sinon_17.stub(fakeService.actions, "fetchAll").returns({ invoke: sinon_17.spy() });
                    var allItems = fakeService.getAll();
                    expect(stubFetchAll.firstCall).to.be.not.null;
                });
            });
        });
    });
});
define("Services/ServiceProvider.test", ["require", "exports", "sinon", "Services/ServiceProvider", "rxjs/Subject", "Initialize", "redux-observable"], function (require, exports, sinon_18, ServiceProvider_4, Subject_4, Initialize_4, redux_observable_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach, afterEach = _a.afterEach;
    var expect = intern.getPlugin("chai").expect;
    describe("ServiceProvider", function () {
        describe("dependency injection", function () {
            var fakeService;
            beforeEach(function () {
                fakeService = {
                    name: "fake",
                    types: {},
                    actions: {},
                    reducer: sinon_18.spy(),
                    epics: [],
                    selectors: {},
                    getDefaultState: function () { return ({
                        hello: "world",
                    }); },
                };
                ServiceProvider_4.registerService(fakeService);
            });
            it("enables dependency injection by returning the requested service by its name", function () {
                var injectedService = ServiceProvider_4.getService("fake");
                expect(injectedService).to.equal(fakeService);
            });
            it("supports replacing a registered service with a mock version of it", function () {
                var mockFakeService = {
                    name: "fake",
                    types: {},
                    actions: {},
                    reducer: sinon_18.spy(),
                    epics: [],
                    selectors: {},
                    getDefaultState: function () { return ({
                        hello: "mock",
                    }); },
                };
                ServiceProvider_4.registerService(mockFakeService);
                var injectedService = ServiceProvider_4.getService("fake");
                expect(injectedService).to.equal(mockFakeService).but.to.not.equal(fakeService);
            });
        });
        describe("initializing services from modules", function () {
            it("registers services from modules whose service class name is the module name + \"Service\"", function () {
                var OrganizationTypeService = (function () {
                    function OrganizationTypeService() {
                        this.name = "organizationType";
                    }
                    return OrganizationTypeService;
                }());
                var modules = {
                    organizationType: {
                        OrganizationTypeService: OrganizationTypeService,
                    },
                };
                ServiceProvider_4.initializeServices(modules);
                var service = ServiceProvider_4.getService("organizationType");
                expect(service).to.be.an.instanceOf(OrganizationTypeService);
            });
            it("does not register classes which do not end in \"Service\"", function () {
                var Model = (function () {
                    function Model() {
                        this.name = "organizationType";
                    }
                    return Model;
                }());
                var modules = {
                    organizationType: {
                        Model: Model,
                    },
                };
                ServiceProvider_4.initializeServices(modules);
                Initialize_4.initialize();
                expect(function () { return ServiceProvider_4.getService("organizationType"); }).to.throw(ReferenceError, "not found");
            });
            it("does not throw if the application is still initializing", function () {
                Initialize_4.resetInitializationStatus();
                expect(function () { return ServiceProvider_4.getService("lolCoolServiceBrah"); }).to.not.throw();
            });
            it("registers services from multiple modules", function () {
                var OrganizationTypeService = (function () {
                    function OrganizationTypeService() {
                        this.name = "organizationType";
                    }
                    return OrganizationTypeService;
                }());
                var StudentService = (function () {
                    function StudentService() {
                        this.name = "student";
                    }
                    return StudentService;
                }());
                var modules = {
                    organizationType: {
                        OrganizationTypeService: OrganizationTypeService,
                    },
                    student: {
                        StudentService: StudentService,
                    },
                };
                ServiceProvider_4.initializeServices(modules);
                var service = ServiceProvider_4.getService("student");
                expect(service).to.be.an.instanceOf(StudentService);
            });
            it("registers services from modules even if some modules do not have Services", function () {
                var OrganizationTypeService = (function () {
                    function OrganizationTypeService() {
                        this.name = "organizationType";
                    }
                    return OrganizationTypeService;
                }());
                var StudentService = (function () {
                    function StudentService() {
                        this.name = "student";
                    }
                    return StudentService;
                }());
                var modules = {
                    organization: {},
                    organizationType: {
                        OrganizationTypeService: OrganizationTypeService,
                    },
                    student: {
                        StudentService: StudentService,
                    },
                };
                ServiceProvider_4.initializeServices(modules);
                var service = ServiceProvider_4.getService("student");
                expect(service).to.be.an.instanceOf(StudentService);
            });
        });
        describe("getReducers", function () {
            it("combines the reducers from each service to create a root reducer which can be passed into Redux", function () {
                var studentReducerStub = sinon_18.stub().returns({
                    hello: "world",
                });
                var studentService = {
                    name: "student",
                    types: {},
                    actions: {},
                    reducer: studentReducerStub,
                    epics: [],
                    selectors: {},
                    getDefaultState: function () { return ({}); },
                };
                var organizationTypeReducerStub = sinon_18.stub().returns({
                    types: [],
                });
                var organizationTypeService = {
                    name: "organizationType",
                    types: {},
                    actions: {},
                    reducer: organizationTypeReducerStub,
                    epics: [],
                    selectors: {},
                    getDefaultState: function () { return ({}); },
                };
                ServiceProvider_4.registerService(studentService);
                ServiceProvider_4.registerService(organizationTypeService);
                var reducers = ServiceProvider_4.getReducers();
                expect(reducers).to.deep.equal({
                    student: studentReducerStub,
                    organizationType: organizationTypeReducerStub,
                });
            });
        });
        describe("getEpics", function () {
            it("combines the epics from each service to create a root epic which can be passed into redux-observable", function () {
                var studentEpicStub = sinon_18.stub().returns(new Subject_4.Subject());
                var studentService = {
                    name: "student",
                    types: {},
                    actions: {},
                    reducer: function () { return ({}); },
                    epics: [studentEpicStub],
                    selectors: {},
                    getDefaultState: function () { return ({}); },
                };
                var organizationTypeEpicStub = sinon_18.stub().returns(new Subject_4.Subject());
                var organizationTypeService = {
                    name: "organizationType",
                    types: {},
                    actions: {},
                    reducer: function () { return ({}); },
                    epics: [organizationTypeEpicStub],
                    selectors: {},
                    getDefaultState: function () { return ({}); },
                };
                ServiceProvider_4.registerService(studentService);
                ServiceProvider_4.registerService(organizationTypeService);
                var rootEpic = redux_observable_3.combineEpics.apply(void 0, ServiceProvider_4.getEpics());
                rootEpic.call(rootEpic);
                expect(studentEpicStub.callCount).to.equal(1);
                expect(organizationTypeEpicStub.callCount).to.equal(1);
            });
        });
    });
});
define("TestUtils/Service.test", ["require", "exports", "Services/index", "TestUtils/Modules", "TestUtils/Service"], function (require, exports, Services_8, Modules_2, Service_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
    var expect = intern.getPlugin("chai").expect;
    describe("initializeServices", function () {
        it("builds all services", function () {
            var store = Service_3.initializeTestServices(Modules_2.modules);
            var returnedKeys = Object.keys(store.getState());
            var moduleKeys = Object.keys(Modules_2.modules);
            expect(moduleKeys).to.have.all.members(returnedKeys, "actual modules and returned modules are same");
        });
        describe("stubbed xhr actions", function () {
            it("has a working spy on the invoke method", function () {
                Service_3.initializeTestServices(Modules_2.modules);
                var service = Services_8.getService("fakeModel");
                service.actions.fetchAll({}).invoke();
                expect(Service_3.getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;
                expect(Service_3.getActionStubMap().fakeModel.fetchAll.invokeSpy.calledOnce).to.be.true;
            });
            it("has a working base stub", function () {
                Service_3.initializeTestServices(Modules_2.modules);
                var service = Services_8.getService("fakeModel");
                service.actions.fetchAll({});
                expect(Service_3.getActionStubMap().fakeModel.fetchAll.base.called).to.be.true;
                expect(Service_3.getActionStubMap().fakeModel.fetchAll.invokeSpy.called).to.be.false;
            });
            it("returns a valid IAction", function () {
                Service_3.initializeTestServices(Modules_2.modules);
                var service = Services_8.getService("fakeModel");
                var suspectedIAction = service.actions.fetchAll({});
                expect(suspectedIAction).to.have.all.keys(["invoke", "meta", "payload", "type"]);
            });
            it("resets the stubs when initializeTestServices is called again", function () {
                Service_3.initializeTestServices(Modules_2.modules);
                var service = Services_8.getService("fakeModel");
                service.actions.fetchAll({});
                expect(Service_3.getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;
                Service_3.initializeTestServices(Modules_2.modules);
                var newService = Services_8.getService("fakeModel");
                newService.actions.fetchAll({});
                expect(Service_3.getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;
            });
            it("takes an optional argument to bypass stubbing methods", function () {
                Service_3.initializeTestServices(Modules_2.modules, false);
                expect(Service_3.getActionStubMap()).to.be.empty;
            });
            it("uses fake xhr when stubs are not in use", function () {
                Service_3.initializeTestServices(Modules_2.modules, false);
                var service = Services_8.getService("fakeModel");
                var initHistorySize = Service_3.getFakedXHRHistory().length;
                service.actions.fetchAll({}).invoke();
                expect(Service_3.getFakedXHRHistory().length).to.be.above(initHistorySize, "calling an action changes faked xhr history stack");
            });
        });
        describe("mock data", function () {
            var store;
            beforeEach(function () {
                store = Service_3.initializeTestServices(Modules_2.modules);
            });
            it("doesn't give mock data when not requested", function () {
                var state = store.getState();
                Object.keys(state).forEach(function (stateKey) {
                    expect(state[stateKey].items).to.have.property("size")
                        .that.is.equal(0, "does not prepopulate");
                });
            });
            var fakeModelDataKeys = ["fullText", "dateUpdated", "dateDeleted", "id"];
            describe("seedService", function () {
                it("returns the seeded data", function () {
                    var mockFakeModel = Service_3.seedService("fakeModel");
                    var state = store.getState();
                    expect(state.fakeModel.items.valueSeq().first()).to.deep.equal(mockFakeModel);
                });
                it("can completely override the data", function () {
                    var mockFakeModelData = {
                        id: "1",
                        fullText: "test",
                        dateUpdated: null,
                        dateDeleted: null,
                    };
                    var mockFakeModel = Service_3.seedService("fakeModel", mockFakeModelData);
                    var state = store.getState();
                    expect(state.fakeModel.items.valueSeq().first()).to.deep.equal(mockFakeModel);
                });
                it("can partially override the data", function () {
                    var mockFakeModelData = {
                        fullText: "test",
                    };
                    var mockFakeModel = Service_3.seedService("fakeModel", mockFakeModelData);
                    var state = store.getState();
                    expect(state.fakeModel.items.valueSeq().first()).to.deep.include(mockFakeModel);
                });
                it("can create an instance without an input data", function () {
                    Service_3.seedService("fakeModel");
                    var state = store.getState();
                    expect(state.fakeModel.items.valueSeq().first().getData()).to.have.all.keys(fakeModelDataKeys);
                });
            });
            describe("seedServiceList", function () {
                it("returns an array of the seeded data", function () {
                    var seededData = Service_3.seedServiceList("fakeModel");
                    var state = store.getState();
                    expect(state.fakeModel.items.valueSeq().toJS()).to.deep.equal(seededData);
                });
                it("takes an optional count param", function () {
                    Service_3.seedServiceList("fakeModel", 25);
                    var state = store.getState();
                    expect(state.fakeModel.items.valueSeq().size).to.equal(25, "seeds as many as requested");
                });
                it("overrides with supplied overrides", function () {
                    var overridenValues = { fullText: "Jon can't handle the salsa" };
                    Service_3.seedServiceList("fakeModel", 5, overridenValues);
                    store.getState().fakeModel.items.valueSeq().toJS().forEach(function (itemModelData) {
                        expect(itemModelData).to.have.include(overridenValues);
                    });
                });
                it("can create instances without any input data", function () {
                    Service_3.seedServiceList("fakeModel");
                    var state = store.getState();
                    state.fakeModel.items.valueSeq().forEach(function (itemModel) {
                        expect(itemModel.getData()).to.have.all.keys(fakeModelDataKeys);
                    });
                });
            });
            describe("seedServices", function () {
                it("seeds all registered services", function () {
                    store = Service_3.initializeTestServices(Modules_2.modules);
                    Service_3.seedServices();
                    var state = store.getState();
                    Object.keys(state).forEach(function (moduleName) {
                        expect(state[moduleName].items.valueSeq().size).to.be.above(0, "seeded service in state");
                    });
                });
                it("returns the seeded data", function () {
                    var initServiceNames = Object.keys(Modules_2.modules).slice(0, 3);
                    store = Service_3.initializeTestServices(Modules_2.modules);
                    var seededData = Service_3.seedServices(initServiceNames);
                    var state = store.getState();
                    Object.keys(seededData).forEach(function (moduleName) {
                        expect(state[moduleName].items.valueSeq().toJS())
                            .to.deep.equal(seededData[moduleName], "seeded data is same as returned data");
                    });
                });
            });
        });
    });
});
define("Utils/Lodash.test", ["require", "exports", "Utils/Lodash", "faker"], function (require, exports, Lodash_4, faker_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
    var expect = intern.getPlugin("chai").expect;
    describe("Lodash FP", function () {
        describe("mapValuesWithKeys", function () {
            it("it includes the key when mapping values using fp syntax", function () {
                var hello = faker_6.random.number();
                var world = faker_6.random.number();
                var example = { hello: hello, world: world };
                var output = Lodash_4.mapValuesWithKeys(function (value, key) { return value + key; })(example);
                expect(output).to.deep.equal({
                    hello: hello + "hello",
                    world: world + "world",
                });
            });
        });
        describe("flattenObjectKeys", function () {
            var example;
            var b;
            var c;
            var x;
            var y;
            var name;
            beforeEach(function () {
                b = faker_6.random.number();
                c = faker_6.random.number();
                x = faker_6.lorem.word();
                y = faker_6.lorem.word();
                name = faker_6.lorem.word();
                example = {
                    a: {
                        b: b,
                        c: c,
                        d: {
                            x: x,
                            y: y,
                        },
                    },
                    name: name,
                };
            });
            it("flattens the keys of an an object's children onto a copy of the parent object", function () {
                var output = Lodash_4.flattenObjectKeys(example);
                expect(output).to.deep.equal({
                    "a.b": b,
                    "a.c": c,
                    "a.d": {
                        x: x,
                        y: y,
                    },
                    name: name,
                });
            });
            it("does not mutate the parent object", function () {
                var output = Lodash_4.flattenObjectKeys(example);
                expect(example).to.not.equal(output);
            });
        });
    });
});
define("Utils/String.test", ["require", "exports", "Utils/String"], function (require, exports, String_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
    var expect = intern.getPlugin("chai").expect;
    describe("String utils", function () {
        describe("getNestedFieldName", function () {
            it("returns the last item at the end of a dot-notated string", function () {
                var example = "a.b.c";
                var output = String_2.getNestedFieldName(example);
                expect(output).to.equal("c");
            });
        });
    });
});
define("Validators/DateTime.test", ["require", "exports", "validate.js", "Validators/DateTime"], function (require, exports, validate_js_27, DateTime_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
    var expect = intern.getPlugin("chai").expect;
    describe("validator: datetime", function () {
        before(function () {
            DateTime_2.initializeDateTimeValidator(validate_js_27.validate);
        });
        it("supports ISO format by default", function () {
            var validationRule = { startDate: { datetime: true } };
            expect(validate_js_27.validate({ startDate: "2018-01-01T05:06:07" }, validationRule)).to.be.undefined;
        });
        it("validating by ISO format will return an error message with incorrect data", function () {
            var validationRule = { startDate: { datetime: true } };
            expect(validate_js_27.validate({ startDate: "01/17/2018" }, validationRule)).to.deep.equal({ startDate: ["Start date must be a valid date"] });
        });
        it("supports validating by dateOnly", function () {
            var validationRule = { startDate: { datetime: { dateOnly: true } } };
            expect(validate_js_27.validate({ startDate: "2018-01-01" }, validationRule)).to.be.undefined;
        });
        it("validating by dateOnly will return an error message with incorrect data", function () {
            var validationRule = { startDate: { datetime: { dateOnly: true } } };
            expect(validate_js_27.validate({ startDate: "2018/01/01" }, validationRule)).to.deep.equal({ startDate: ["Start date must be a valid date"] });
        });
        it("supports validating by timeOnly", function () {
            var validationRule = { startTime: { datetime: { timeOnly: true, message: "must be a valid time" } } };
            expect(validate_js_27.validate({ startTime: "10:09:08 am" }, validationRule)).to.be.undefined;
        });
        it("validating by timeOnly will return an error message with incorrect data", function () {
            var validationRule = { startTime: { datetime: { timeOnly: true, message: "must be a valid time" } } };
            expect(validate_js_27.validate({ startTime: "2018-01-01" }, validationRule)).to.deep.equal({ startTime: ["Start time must be a valid time"] });
        });
        it("supports validating by a custom pattern", function () {
            var validationRule = { startMonth: { datetime: { format: "YYYY MM", message: "must be a valid month" } } };
            expect(validate_js_27.validate({ startMonth: "2018 01" }, validationRule)).to.be.undefined;
        });
        it("validating by a custom pattern will return an error message with incorrect data", function () {
            var validationRule = { startMonth: { datetime: { format: "YYYY MM", message: "must be a valid month" } } };
            expect(validate_js_27.validate({ startMonth: "2018-12-04" }, validationRule)).to.deep.equal({ startMonth: ["Start month must be a valid month"] });
        });
        it("properly validates existing dates", function () {
            var validationRule = { startMonth: { datetime: { format: "YYYY MM", message: "must be a valid month" } } };
            expect(validate_js_27.validate({ startMonth: new Date() }, validationRule)).to.be.undefined;
        });
    });
});
define("Validators/PhoneNumber.test", ["require", "exports", "validate.js", "Validators/PhoneNumber"], function (require, exports, validate_js_28, PhoneNumber_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
    var expect = intern.getPlugin("chai").expect;
    describe("validator: phoneNumber", function () {
        before(function () {
            PhoneNumber_2.initializePhoneNumberValidator(validate_js_28.validate);
        });
        it("provides validation rules which require the value to be a phone number", function () {
            var value = "+1999999999";
            expect(validate_js_28.validate({ homePhone: value }, { homePhone: { phoneNumber: true } })).to.be.undefined;
        });
        it("provides validation rules which do not allow incorrectly formatted phone numbers", function () {
            var value = "(123) 456-7890";
            expect(validate_js_28.validate({ homePhone: value }, { homePhone: { phoneNumber: true } })).to.deep.equal({
                homePhone: ["Home phone must be a valid phone number"],
            });
        });
    });
});
//# sourceMappingURL=index.js.map