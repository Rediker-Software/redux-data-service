"use strict";
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
require("rxjs/add/operator/auditTime");
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
var immutable_1 = require("immutable");
var lodash_1 = require("lodash");
var hash = require("object-hash");
var re_reselect_1 = require("re-reselect");
var reselect_1 = require("reselect");
var Configure_1 = require("../Configure");
var Serializers_1 = require("../Serializers");
var RestAdapter_1 = require("../Adapters/RestAdapter");
var BaseService_1 = require("./BaseService");
exports.RequestCacheRecord = immutable_1.Record({
    isLoading: false,
    errors: null,
    ids: immutable_1.List(),
});
var DataService = (function (_super) {
    __extends(DataService, _super);
    function DataService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdapterClass = RestAdapter_1.RestAdapter;
        _this.SerializerClass = Serializers_1.RestSerializer;
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
                    itemsMap.update(item.id, function () { return item; });
                    ids.push(item.id);
                });
            }); });
            record.update("requestCache", function (requestCache) {
                return requestCache.set(hash(action.meta.queryParams || {}), new exports.RequestCacheRecord({ ids: immutable_1.List(ids) }));
            });
        }); };
        _this.pushRecordReducer = function (state, action) { return state.withMutations(function (record) {
            var item = action.payload;
            record.set("items", record.items.update(item.id, function () { return item; }));
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
                        return item.applyUpdates((_a = {}, _a[fieldName] = value, _a));
                    }); });
                }
                else if (process.env.NODE_ENV !== "production") {
                    console.warn(_this.name + ": setFieldReducer - attempted to set \"" + value + "\" on field \"" + fieldName + "\" for unknown id \"" + id + "\"");
                }
            });
        };
        _this.setMetaFieldReducer = function (state, action) {
            return state.withMutations(function (record) {
                var _a = action.payload, id = _a.id, fieldName = _a.fieldName, value = _a.value;
                if (record.items.has(id)) {
                    record.update("items", function (items) { return items.update(id, function (item) {
                        var _a;
                        return item.applyUpdates(null, (_a = {}, _a[fieldName] = value, _a));
                    }); });
                }
            });
        };
        _this.setRelationshipReducer = function (state, action) {
            return state.withMutations(function (record) {
                var _a = action.payload, id = _a.id, fieldName = _a.fieldName, value = _a.value;
                if (record.items.has(id)) {
                    record.update("items", function (items) { return items.update(id, function (item) {
                        var _a;
                        return item.applyUpdates(undefined, undefined, (_a = {}, _a[fieldName] = value, _a));
                    }); });
                }
                else if (process.env.NODE_ENV !== "production") {
                    console.warn(_this.name + ": setRelationshipReducer - attempted to set \"" + value + "\" on field \"" + fieldName + "\" for unknown id \"" + id + "\"");
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
                var Adapter = Configure_1.getConfiguration().adapter || this.AdapterClass;
                this._adapter = new Adapter(this.name);
            }
            return this._adapter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataService.prototype, "serializer", {
        get: function () {
            if (!this._serializer) {
                var Serializer = Configure_1.getConfiguration().serializer || this.SerializerClass;
                this._serializer = new Serializer(this.ModelClass);
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
        var cacheKey = JSON.stringify(ids.sort());
        if (cacheKey in this.observablesByIdsCache) {
            return this.observablesByIdsCache[cacheKey];
        }
        var itemObservables = ids.map(function (id) { return _this.getById(id); });
        var observable = combineLatest_1.combineLatest.apply(void 0, itemObservables).auditTime(25)
            .startWith([]);
        this.observablesByIdsCache[cacheKey] = observable;
        return observable;
    };
    DataService.prototype.getByQuery = function (queryParams) {
        var _this = this;
        var hashParams = hash(queryParams || {});
        if (hashParams in this.observablesByQueryCache) {
            return this.observablesByQueryCache[hashParams];
        }
        this.actions.fetchAll(queryParams).invoke();
        var observable = BaseService_1.BaseService
            .getStateObservable()
            .map(function (state) { return _this.selectors.getItems(state, queryParams); })
            .distinctUntilChanged()
            .map(function (items) { return (items != null && "toJS" in items) ? items.toJS() : items; })
            .shareReplay(1);
        this.observablesByQueryCache[hashParams] = observable;
        return observable;
    };
    DataService.prototype.getAll = function () {
        var _this = this;
        var observable = BaseService_1.BaseService
            .getStateObservable()
            .map(function (state) { return _this.selectors.getAllItems(state).valueSeq(); })
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
        return __assign({}, types, { CREATE_RECORD: this.makeActionType("CREATE_RECORD"), DELETE_RECORD: this.makeActionType("DELETE_RECORD"), FETCH_ALL: this.makeActionType("FETCH_ALL"), FETCH_RECORD: this.makeActionType("FETCH_RECORD"), PATCH_RECORD: this.makeActionType("PATCH_RECORD"), PUSH_ALL: this.makeActionType("PUSH_ALL"), PUSH_RECORD: this.makeActionType("PUSH_RECORD"), SET_ERRORS: this.makeActionType("SET_ERRORS"), UNLOAD_ALL: this.makeActionType("UNLOAD_ALL"), UNLOAD_RECORD: this.makeActionType("UNLOAD_RECORD"), UPDATE_RECORD: this.makeActionType("UPDATE_RECORD"), SET_FIELD: this.makeActionType("SET_FIELD"), SET_META_FIELD: this.makeActionType("SET_META_FIELD"), SET_RELATIONSHIP: this.makeActionType("SET_RELATIONSHIP") });
    };
    DataService.prototype.createActions = function () {
        var actions = _super.prototype.createActions.call(this);
        return __assign({}, actions, { createRecord: this.makeActionCreator(this.types.CREATE_RECORD), deleteRecord: this.makeActionCreator(this.types.DELETE_RECORD), fetchAll: this.makeActionCreator(this.types.FETCH_ALL), fetchRecord: this.makeActionCreator(this.types.FETCH_RECORD), patchRecord: this.makeActionCreator(this.types.PATCH_RECORD), pushAll: this.makeActionCreator(this.types.PUSH_ALL), pushRecord: this.makeActionCreator(this.types.PUSH_RECORD), setErrors: this.makeActionCreator(this.types.SET_ERRORS), unloadAll: this.makeActionCreator(this.types.UNLOAD_ALL), unloadRecord: this.makeActionCreator(this.types.UNLOAD_RECORD), updateRecord: this.makeActionCreator(this.types.UPDATE_RECORD), setField: this.makeActionCreator(this.types.SET_FIELD), setMetaField: this.makeActionCreator(this.types.SET_META_FIELD), setRelationship: this.makeActionCreator(this.types.SET_RELATIONSHIP) });
    };
    DataService.prototype.createSelectors = function () {
        var selectors = _super.prototype.createSelectors.call(this);
        var getServiceState = selectors.getServiceState;
        var getAllItems = reselect_1.createSelector(getServiceState, function (store) { return store.items; });
        var getRequestCache = re_reselect_1.default(getServiceState, function (state, queryParams) { return queryParams; }, function (store, queryParams) { return store.requestCache.get(hash(queryParams || {})); })(function (state, queryParams) { return hash(queryParams || {}); });
        var getItems = re_reselect_1.default(getAllItems, function (state, queryParams) { return getRequestCache(state, queryParams); }, function (items, requestCache) { return requestCache ? requestCache.ids.map(function (id) { return items.get(id); }).valueSeq() : null; })(function (state, queryParams) { return hash(queryParams || {}); });
        var getItemsByIds = re_reselect_1.default(function (state, ids) { return ids; }, getAllItems, function (ids, items) {
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
        return __assign({}, reducers, (_a = {}, _a[this.types.FETCH_ALL] = this.fetchAllReducer, _a[this.types.PUSH_ALL] = this.pushAllReducer, _a[this.types.PUSH_RECORD] = this.pushRecordReducer, _a[this.types.UNLOAD_ALL] = this.unloadAllReducer, _a[this.types.UNLOAD_RECORD] = this.unloadRecordReducer, _a[this.types.SET_FIELD] = this.setFieldReducer, _a[this.types.SET_META_FIELD] = this.setMetaFieldReducer, _a[this.types.SET_RELATIONSHIP] = this.setRelationshipReducer, _a));
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
                .catch(function (e) { return of_1.of(_this.actions.setErrors({ errors: e.xhr.response }, { queryParams: action.payload })); });
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
                .catch(function (e) { return of_1.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response })); });
        });
    };
    DataService.prototype.createRecordEpic = function (action$, store) {
        var _this = this;
        return action$.ofType(this.types.CREATE_RECORD)
            .mergeMap(function (action) {
            return of_1.of(_this.selectors.getItem(store.getState(), action.payload.id))
                .map(function (model) { return _this.serializer.serialize(model); })
                .mergeMap(function (serializedModel) { return _this.adapter.createItem(serializedModel); })
                .map(function (response) { return _this.serializer.deserialize(response); })
                .do(action.meta.onSuccess, action.meta.onError)
                .map(_this.actions.pushRecord)
                .concat(of_1.of(_this.actions.unloadRecord(action.payload)))
                .catch(function (e) { return of_1.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response || e })); });
        });
    };
    DataService.prototype.updateRecordEpic = function (action$, store) {
        var _this = this;
        return action$.ofType(this.types.UPDATE_RECORD)
            .mergeMap(function (action) {
            return of_1.of(_this.selectors.getItem(store.getState(), action.payload.id))
                .map(function (model) { return _this.serializer.serialize(model); })
                .mergeMap(function (model) { return _this.adapter.updateItem(action.payload.id, model); })
                .map(function (response) { return _this.serializer.deserialize(response); })
                .do(action.meta.onSuccess, action.meta.onError)
                .map(_this.actions.pushRecord)
                .catch(function (e) { return of_1.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response })); });
        });
    };
    DataService.prototype.patchRecordEpic = function (action$) {
        var _this = this;
        return action$.ofType(this.types.PATCH_RECORD)
            .mergeMap(function (action) { return (_this.adapter.patchItem(action.payload.id, _this.serializer.serialize(action.payload))
            .map(function (response) { return _this.serializer.deserialize(response); })
            .do(action.meta.onSuccess, action.meta.onError)
            .map(_this.actions.pushRecord)
            .catch(function (e) { return of_1.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response })); })); });
    };
    DataService.prototype.deleteRecordEpic = function (action$) {
        var _this = this;
        return action$.ofType(this.types.DELETE_RECORD)
            .mergeMap(function (action) { return (_this.adapter.deleteItem(action.payload.id)
            .map(function (response) { return _this.serializer.deserialize(response); })
            .do(action.meta.onSuccess, action.meta.onError)
            .map(_this.actions.pushRecord)
            .catch(function (e) { return of_1.of(_this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response })); })); });
    };
    DataService.prototype.shouldFetchAll = function (action, state) {
        var requestCache = this.selectors.getRequestCache(state, action.payload);
        return requestCache == null || requestCache.ids.isEmpty() || (action.meta && action.meta.forceReload);
    };
    return DataService;
}(BaseService_1.BaseService));
exports.DataService = DataService;
