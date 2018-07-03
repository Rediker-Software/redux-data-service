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
require("rxjs/add/operator/take");
var of_1 = require("rxjs/observable/of");
var sinon_1 = require("sinon");
var redux_test_utils_1 = require("redux-test-utils");
var Adapters_1 = require("../Adapters");
var TestUtils_1 = require("../TestUtils");
var BaseService_1 = require("./BaseService");
var BaseService_mock_1 = require("./BaseService.mock");
var ServiceProvider_1 = require("./ServiceProvider");
var _a = intern.getPlugin("interface.bdd"), beforeEach = _a.beforeEach, it = _a.it, describe = _a.describe;
var expect = intern.getPlugin("chai").expect;
describe("BaseService", function () {
    var mockTestService;
    var mockAdapter;
    var store;
    var state;
    beforeEach(function () {
        mockAdapter = new Adapters_1.MockAdapter();
        mockTestService = BaseService_mock_1.createMockTestService();
        ServiceProvider_1.registerService(mockTestService);
        state = TestUtils_1.createMockServiceState(mockTestService, []);
        store = redux_test_utils_1.createMockStore(state);
    });
    it("allows registration of a dispatch", function () {
        var dispatchSpy = sinon_1.spy();
        BaseService_1.BaseService.registerDispatch(dispatchSpy);
        mockTestService.actions.bakeBaguettes({}, {}).invoke();
        expect(dispatchSpy.calledOnce).to.be.true;
    });
    it("allows setting the state observable", function () {
        var expectedValue = "hello world";
        var observable = of_1.of(expectedValue);
        BaseService_1.BaseService.setStateObservable(observable);
        BaseService_1.BaseService
            .getStateObservable()
            .take(1)
            .subscribe(function (value) { return expect(value).to.equal(expectedValue); });
    });
    describe("epics", function () {
        it("exposes the epics through a getter", function () {
            var stubBakeBaguettesEpic = sinon_1.stub(mockTestService, "bakeBaguettesEpic");
            var stubEatBaguettesEpic = sinon_1.stub(mockTestService, "eatBaguettesEpic");
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
            bakeBaguetteReducerStub = sinon_1.stub(mockTestService, "bakeBaguettesReducer").returns(returnValue);
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
