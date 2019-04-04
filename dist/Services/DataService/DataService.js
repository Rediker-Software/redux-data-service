"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
require("rxjs/add/operator/catch");
require("rxjs/add/operator/concat");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/do");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/shareReplay");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/take");
var of_1 = require("rxjs/observable/of");
var combineLatest_1 = require("rxjs/observable/combineLatest");
var lodash_1 = require("lodash");
var hash = require("object-hash");
var re_reselect_1 = require("re-reselect");
var reselect_1 = require("reselect");
var Configure_1 = require("../../Configure");
var Query_1 = require("../../Query");
var BaseService_1 = require("../BaseService");
var Reducers_1 = require("./Reducers");
var DataServiceStateRecord_1 = require("./DataServiceStateRecord");
var ShouldFetchAll_1 = require("./ShouldFetchAll");
var Epics_1 = require("./Epics");
var DataService = (function (_super) {
    __extends(DataService, _super);
    function DataService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shadowObject = null;
        _this.observablesByIdCache = {};
        _this.observablesByIdsCache = {};
        _this.observablesByQueryCache = {};
        return _this;
    }
    Object.defineProperty(DataService.prototype, "adapter", {
        get: function () {
            if (!this._adapter) {
                var AdapterClass = this.AdapterClass || Configure_1.getConfiguration().adapter;
                this._adapter = new AdapterClass(this.name);
            }
            return this._adapter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataService.prototype, "mapper", {
        get: function () {
            if (!this._mapper) {
                var MapperClass = this.MapperClass || Configure_1.getConfiguration().mapper;
                this._mapper = new MapperClass(this.ModelClass);
            }
            return this._mapper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataService.prototype, "serializer", {
        get: function () {
            if (!this._serializer) {
                var SerializerClass = this.SerializerClass || Configure_1.getConfiguration().serializer;
                this._serializer = new SerializerClass(this.ModelClass);
            }
            return this._serializer;
        },
        enumerable: true,
        configurable: true
    });
    DataService.prototype.getDefaultState = function () {
        return DataServiceStateRecord_1.DataServiceStateRecord();
    };
    DataService.prototype.getShadowObject = function () {
        if (!this.shadowObject) {
            this.shadowObject = new this.ModelClass({}, { isLoading: true, isShadow: true });
        }
        return this.shadowObject;
    };
    DataService.prototype.createNew = function (initialData) {
        if (initialData === void 0) { initialData = {}; }
        var data = "id" in initialData ? initialData : __assign({ id: lodash_1.uniqueId("new-") }, initialData);
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
            .distinctUntilChanged()
            .shareReplay(1);
        observable
            .take(1)
            .filter(function (item) { return item.isShadow; })
            .subscribe(function () { return _this.actions.fetchRecord({ id: id }).invoke(); });
        this.observablesByIdCache[id] = observable;
        return observable;
    };
    DataService.prototype.getByIds = function (ids) {
        var _this = this;
        var cacheKey = hash(ids);
        if (cacheKey in this.observablesByIdsCache) {
            return this.observablesByIdsCache[cacheKey];
        }
        var itemObservables = ids.map(function (id) { return _this.getById(id); });
        var observable = combineLatest_1.combineLatest.apply(void 0, itemObservables).shareReplay(1);
        this.observablesByIdsCache[cacheKey] = observable;
        return observable;
    };
    DataService.prototype.getByQuery = function (queryBuilder) {
        var _this = this;
        var hashParams = queryBuilder.getHashCode();
        if (hashParams in this.observablesByQueryCache) {
            return this.observablesByQueryCache[hashParams];
        }
        var observable = BaseService_1.BaseService
            .getStateObservable()
            .map(function (state) { return state[_this.name].requestCache.get(hashParams); })
            .distinctUntilChanged()
            .shareReplay(1);
        observable
            .take(1)
            .filter(function (queryCache) { return queryCache == null; })
            .subscribe(function () { return queryBuilder.invoke(); });
        var queryManagerObservable = observable
            .filter(function (queryCache) { return queryCache != null; })
            .switchMap(function (_a) {
            var response = _a.response;
            return response && response.ids.length ? _this.getByIds(response.ids) : of_1.of([]);
        }, function (_a, items) {
            var query = _a.query, response = _a.response, isLoading = _a.isLoading, errors = _a.errors;
            return new Query_1.QueryManager(query, items, response, {
                isLoading: isLoading,
                errors: errors,
            });
        })
            .shareReplay(1);
        this.observablesByQueryCache[hashParams] = queryManagerObservable;
        return queryManagerObservable;
    };
    DataService.prototype.getAll = function () {
        var _this = this;
        var observable = BaseService_1.BaseService
            .getStateObservable()
            .map(function (state) { return _this.selectors.getAllItems(state).valueSeq().toArray(); })
            .distinctUntilChanged()
            .shareReplay(1);
        observable
            .take(1)
            .subscribe(function () { return _this.actions.fetchAll(); });
        return observable;
    };
    DataService.prototype.getDefaultQueryParams = function () {
        return of_1.of({});
    };
    DataService.prototype.createTypes = function () {
        var types = _super.prototype.createTypes.call(this);
        return __assign({}, types, { CANCEL_REQUEST: this.makeActionType("CANCEL_REQUEST"), CREATE_RECORD: this.makeActionType("CREATE_RECORD"), DELETE_RECORD: this.makeActionType("DELETE_RECORD"), FETCH_ALL: this.makeActionType("FETCH_ALL"), FETCH_RECORD: this.makeActionType("FETCH_RECORD"), PATCH_RECORD: this.makeActionType("PATCH_RECORD"), PUSH_ALL: this.makeActionType("PUSH_ALL"), PUSH_RECORD: this.makeActionType("PUSH_RECORD"), UNLOAD_ALL: this.makeActionType("UNLOAD_ALL"), UNLOAD_RECORD: this.makeActionType("UNLOAD_RECORD"), UPDATE_RECORD: this.makeActionType("UPDATE_RECORD"), SET_FIELD: this.makeActionType("SET_FIELD"), SET_META_FIELD: this.makeActionType("SET_META_FIELD"), SET_RELATIONSHIP: this.makeActionType("SET_RELATIONSHIP"), SET_QUERY_RESPONSE: this.makeActionType("SET_QUERY_RESPONSE") });
    };
    DataService.prototype.createActions = function () {
        var actions = _super.prototype.createActions.call(this);
        return __assign({}, actions, { cancelRequest: this.makeActionCreator(this.types.CANCEL_REQUEST), createRecord: this.makeActionCreator(this.types.CREATE_RECORD), deleteRecord: this.makeActionCreator(this.types.DELETE_RECORD), fetchAll: this.makeActionCreator(this.types.FETCH_ALL), fetchRecord: this.makeActionCreator(this.types.FETCH_RECORD), patchRecord: this.makeActionCreator(this.types.PATCH_RECORD), pushAll: this.makeActionCreator(this.types.PUSH_ALL), pushRecord: this.makeActionCreator(this.types.PUSH_RECORD), unloadAll: this.makeActionCreator(this.types.UNLOAD_ALL), unloadRecord: this.makeActionCreator(this.types.UNLOAD_RECORD), updateRecord: this.makeActionCreator(this.types.UPDATE_RECORD), setField: this.makeActionCreator(this.types.SET_FIELD), setMetaField: this.makeActionCreator(this.types.SET_META_FIELD), setRelationship: this.makeActionCreator(this.types.SET_RELATIONSHIP), setQueryResponse: this.makeActionCreator(this.types.SET_QUERY_RESPONSE) });
    };
    DataService.prototype.createSelectors = function () {
        var selectors = _super.prototype.createSelectors.call(this);
        var getServiceState = selectors.getServiceState;
        var getAllItems = reselect_1.createSelector(getServiceState, function (store) { return store.items; });
        var getRequestCache = re_reselect_1.default(getServiceState, function (state, query) { return query; }, function (store, query) { return store.requestCache.get(query.getHashCode()); })(function (state, query) { return query.getHashCode(); });
        var getItems = re_reselect_1.default(getAllItems, function (state, query) { return getRequestCache(state, query); }, function (items, requestCache) { return requestCache ? requestCache.response.ids.map(function (id) { return items.get(id); }) : null; })(function (state, query) { return query.getHashCode(); });
        var getItemsByIds = re_reselect_1.default(function (state, ids) { return ids; }, getAllItems, function (ids, items) {
            return ids
                .map(function (id) { return items.get(id); })
                .filter(function (item) { return item != null; });
        })(function (state, ids) { return hash(ids); });
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
        return __assign({}, reducers, (_a = {}, _a[this.types.FETCH_ALL] = Reducers_1.fetchAllReducer, _a[this.types.PUSH_ALL] = Reducers_1.pushAllReducer, _a[this.types.PUSH_RECORD] = Reducers_1.pushRecordReducer, _a[this.types.UNLOAD_ALL] = Reducers_1.unloadAllReducer, _a[this.types.UNLOAD_RECORD] = Reducers_1.unloadRecordReducer, _a[this.types.SET_FIELD] = Reducers_1.setFieldReducer, _a[this.types.SET_META_FIELD] = Reducers_1.setMetaFieldReducer, _a[this.types.SET_RELATIONSHIP] = Reducers_1.setRelationshipReducer, _a[this.types.SET_QUERY_RESPONSE] = Reducers_1.setQueryResponseReducer, _a));
    };
    DataService.prototype.createEpics = function () {
        var epics = _super.prototype.createEpics.call(this);
        var fetchRecordEpic = new Epics_1.FetchRecordEpic(this);
        epics.push(Epics_1.createRecordEpic(this).bind(this), fetchRecordEpic.execute.bind(fetchRecordEpic), this.fetchAllEpic.bind(this), this.updateRecordEpic.bind(this), this.patchRecordEpic.bind(this), this.deleteRecordEpic.bind(this));
        return epics;
    };
    DataService.prototype.fetchAllEpic = function (action$, store) {
        var _this = this;
        return action$.ofType(this.types.FETCH_ALL)
            .filter(function (action) { return ShouldFetchAll_1.shouldFetchAll(_this.selectors.getServiceState(store.getState()), action); })
            .mergeMap(function (action) {
            return _this.adapter.fetchAll(_this.serializer.serializeQueryParams(action.payload.queryParams))
                .mergeMap(function (response) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.mapper.normalizeQueryResponse(response)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .do(action.meta.onSuccess, action.meta.onError)
                .mergeMap(function (_a) {
                var items = _a.items, response = __rest(_a, ["items"]);
                return of_1.of(_this.actions.pushAll({ items: items }), _this.actions.setQueryResponse({
                    response: response,
                    query: action.payload,
                    isLoading: false,
                    errors: undefined,
                }));
            })
                .catch(function (e) { return of_1.of(_this.actions.setQueryResponse({
                query: action.payload,
                errors: e && "xhr" in e ? e.xhr.response : e,
                isLoading: false,
            })); });
        });
    };
    DataService.prototype.updateRecordEpic = function (action$, store) {
        var _this = this;
        return action$.ofType(this.types.UPDATE_RECORD)
            .mergeMap(function (action) {
            return of_1.of(_this.selectors.getItem(store.getState(), action.payload.id))
                .mergeMap(function (model) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.mapper.transform(model)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .mergeMap(function (mappedModel) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.serializer.serialize(mappedModel)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .mergeMap(function (model) { return _this.adapter.updateItem(action.payload.id, model, action.meta.progressSubscriber); })
                .mergeMap(function (response) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.serializer.deserialize(response)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .mergeMap(function (normalizedResponse) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.mapper.normalize(normalizedResponse)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .do(action.meta.onSuccess, action.meta.onError)
                .map(_this.actions.pushRecord)
                .catch(function (e) { return of_1.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response })); });
        });
    };
    DataService.prototype.patchRecordEpic = function (action$, store) {
        var _this = this;
        return action$.ofType(this.types.PATCH_RECORD)
            .mergeMap(function (action) {
            return of_1.of(_this.selectors.getItem(store.getState(), action.payload.id))
                .mergeMap(function (model) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.mapper.transformPatch(model)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .mergeMap(function (mappedModel) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.serializer.serialize(mappedModel)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .mergeMap(function (serializedModel) { return _this.adapter.patchItem(action.payload.id, serializedModel, action.meta.progressSubscriber); })
                .mergeMap(function (response) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.serializer.deserialize(response)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .mergeMap(function (normalizedResponse) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.mapper.normalize(normalizedResponse)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .do(action.meta.onSuccess, action.meta.onError)
                .map(_this.actions.pushRecord)
                .catch(function (e) { return of_1.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response })); });
        });
    };
    DataService.prototype.deleteRecordEpic = function (action$) {
        var _this = this;
        return action$.ofType(this.types.DELETE_RECORD)
            .mergeMap(function (action) { return (_this.adapter.deleteItem(action.payload.id, action.meta.progressSubscriber)
            .mergeMap(function (response) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.serializer.deserialize(response)];
                case 1: return [2, _a.sent()];
            }
        }); }); })
            .mergeMap(function (normalizedResponse) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.mapper.normalize(normalizedResponse)];
                case 1: return [2, _a.sent()];
            }
        }); }); })
            .do(action.meta.onSuccess, action.meta.onError)
            .map(_this.actions.pushRecord)
            .catch(function (e) { return of_1.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response })); })); });
    };
    return DataService;
}(BaseService_1.BaseService));
exports.DataService = DataService;
