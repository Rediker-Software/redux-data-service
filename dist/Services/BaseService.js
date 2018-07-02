"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/publishReplay");
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
//# sourceMappingURL=BaseService.js.map