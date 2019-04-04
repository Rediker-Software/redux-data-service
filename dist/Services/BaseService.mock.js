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
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var Adapters_1 = require("../Adapters");
var BaseService_1 = require("./BaseService");
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
                this._adapter = new Adapters_1.MockAdapter();
            }
            return this._adapter;
        },
        enumerable: true,
        configurable: true
    });
    MockTestService.prototype.getDefaultState = function () {
        return immutable_1.Record({ items: immutable_1.List() })();
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
}(BaseService_1.BaseService));
exports.MockTestService = MockTestService;
function createMockTestService() {
    return new MockTestService();
}
exports.createMockTestService = createMockTestService;
