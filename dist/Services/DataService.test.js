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
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
var redux_observable_1 = require("redux-observable");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var Subject_1 = require("rxjs/Subject");
var immutable_1 = require("immutable");
var redux_test_utils_1 = require("redux-test-utils");
var Service_1 = require("TestUtils/Service");
var Model_mock_1 = require("Model/Model.mock");
var MockAdapter_1 = require("Adapters/MockAdapter");
var DataService_1 = require("./DataService");
var BaseService_1 = require("./BaseService");
var object_hash_1 = require("object-hash");
var ServiceProvider_1 = require("./ServiceProvider");
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
        mockAdapter = new MockAdapter_1.MockAdapter();
        var FakeService = (function (_super) {
            __extends(FakeService, _super);
            function FakeService() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.name = serviceName;
                _this.ModelClass = Model_mock_1.FakeModel;
                _this._adapter = mockAdapter;
                return _this;
            }
            return FakeService;
        }(DataService_1.DataService));
        fakeService = new FakeService();
        ServiceProvider_1.registerService(fakeService);
        fakeModels = Model_mock_1.createMockFakeModels();
        state = Service_1.createMockServiceState(fakeService, [
            fakeService.actions.pushAll({ items: fakeModels }),
        ]);
        store = redux_test_utils_1.createMockStore(state);
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
            var onSuccess = sinon_1.spy();
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
            var onSuccess = sinon_1.spy();
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
            var onSuccess = sinon_1.spy();
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
            var onSuccess = sinon_1.spy();
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
            var onSuccess = sinon_1.spy();
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
            var onSuccess = sinon_1.spy();
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
            setRecordSpy = sinon_1.spy(immutable_1.Record.prototype, "set");
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
            var model = new Model_mock_1.FakeModel(modelData, modelMeta);
            var items = immutable_1.Map()
                .set(modelData.id, model);
            var stateRecord = immutable_1.Record({ items: items })();
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
            var model = new Model_mock_1.FakeModel(modelData, modelMeta);
            var items = immutable_1.Map()
                .set(modelData.id, model);
            var stateRecord = immutable_1.Record({ items: items })();
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
            var model = new Model_mock_1.FakeModel(modelData, modelMeta);
            var items = immutable_1.Map()
                .set(modelData.id, model);
            var stateRecord = immutable_1.Record({ items: items })();
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
            assert.isTrue(setRecordSpy.calledWith("items", sinon_1.match(function (updatedItems) {
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
            var pushAllAction = sinon_1.stub(fakeService.actions, "pushAll");
            mockAdapter.fetchAll.returns(Observable_1.Observable.of(expectedResult));
            fakeService.fetchAllEpic(redux_observable_1.ActionsObservable.of(fetchAllAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(mockAdapter.fetchAll.calledWithMatch(payload));
            });
        });
        it("should call pushAll action with result from call to adapter", function () {
            var expectedResult = { hello: "world" };
            var payload = { filter: "all" };
            var fetchAllAction = fakeService.actions.fetchAll(payload);
            var pushAllAction = sinon_1.stub(fakeService.actions, "pushAll");
            mockAdapter.fetchAll.returns(Observable_1.Observable.of(expectedResult));
            fakeService.fetchAllEpic(redux_observable_1.ActionsObservable.of(fetchAllAction), store)
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
            var expectedValues = Model_mock_1.createMockFakeModels(2);
            var extraValues = [Model_mock_1.createMockFakeModel(), Model_mock_1.createMockFakeModel()];
            state = Service_1.createMockServiceState(fakeService, [
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
            state = Service_1.createMockServiceState(fakeService, [
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
            var expectedValues = Model_mock_1.createMockFakeModels(2);
            var existingIds = expectedValues.map(function (val) { return val.id; });
            var queryParams = { fakeField: "fakeVal" };
            state = Service_1.createMockServiceState(fakeService, [
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
            var onSuccess = sinon_1.spy();
            var expectedResult = { id: "123", fullText: "puppy" };
            var fetchRecordAction = fakeService.actions.fetchRecord(expectedResult, { onSuccess: onSuccess });
            var pushRecordAction = sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.fetchItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.fetchRecordEpic(redux_observable_1.ActionsObservable.of(fetchRecordAction), store)
                .subscribe(noop, noop, function () { return expect(onSuccess.firstCall.args[0]).to.deep.equal(new Model_mock_1.FakeModel(expectedResult)); });
        });
        it("should fire The pushRecord action with the response", function () {
            var onSuccess = sinon_1.spy();
            var expectedResult = { id: "123", fullText: "puppy" };
            var fetchRecordAction = fakeService.actions.fetchRecord(expectedResult, { onSuccess: onSuccess });
            var pushRecordAction = sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.fetchItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.fetchRecordEpic(redux_observable_1.ActionsObservable.of(fetchRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(pushRecordAction.calledWithMatch(new fakeService.ModelClass(expectedResult)));
            });
        });
        it("should not fire fetchItem if item exists in store when forceReload omitted", function () {
            var cachedItemId = fakeModels[0].id;
            var fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, null);
            fakeService.fetchRecordEpic(redux_observable_1.ActionsObservable.of(fetchRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isFalse(mockAdapter.fetchItem.called);
            });
        });
        it("should fire fetchItem if item does not exist in store when forceReload omitted", function () {
            var fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, null);
            fakeService.fetchRecordEpic(redux_observable_1.ActionsObservable.of(fetchRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(mockAdapter.fetchItem.called);
            });
        });
        it("should not fire fetchItem if item exists in store when forceReload false", function () {
            var cachedItemId = fakeModels[0].id;
            var fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, { forceReload: false });
            fakeService.fetchRecordEpic(redux_observable_1.ActionsObservable.of(fetchRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isFalse(mockAdapter.fetchItem.called);
            });
        });
        it("should fire fetchItem if item does not exist in store when forceReload false", function () {
            var fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, { forceReload: false });
            fakeService.fetchRecordEpic(redux_observable_1.ActionsObservable.of(fetchRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(mockAdapter.fetchItem.called);
            });
        });
        it("should fire fetchItem if item exists in store when forceReload true", function () {
            var cachedItemId = fakeModels[0].id;
            var fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, { forceReload: true });
            fakeService.fetchRecordEpic(redux_observable_1.ActionsObservable.of(fetchRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(mockAdapter.fetchItem.called);
            });
        });
        it("should fire fetchItem if item does not exist in store when forceReload true", function () {
            var fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, { forceReload: true });
            fakeService.fetchRecordEpic(redux_observable_1.ActionsObservable.of(fetchRecordAction), store)
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
            var onSuccess = sinon_1.spy();
            var expectedResult = { fullText: "puppy" };
            var createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess: onSuccess });
            var pushRecordAction = sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.createItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.createRecordEpic(redux_observable_1.ActionsObservable.of(createRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(mockAdapter.createItem.calledWithMatch(JSON.stringify(expectedResult)));
            });
        });
        it("should fire the onSuccess callback with response", function () {
            var onSuccess = sinon_1.spy();
            var expectedResult = { fullText: "puppy" };
            var createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess: onSuccess });
            var pushRecordAction = sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.createItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.createRecordEpic(redux_observable_1.ActionsObservable.of(createRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(onSuccess.calledWithMatch(expectedResult));
            });
        });
        it("should fire pushRecord with response", function () {
            var onSuccess = sinon_1.spy();
            var expectedResult = { fullText: "puppy" };
            var createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess: onSuccess });
            var pushRecordAction = sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.createItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.createRecordEpic(redux_observable_1.ActionsObservable.of(createRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(pushRecordAction.calledWithMatch(expectedResult));
            });
        });
        it("should use the store's getState() method", function () {
            var expectedResult = { id: "123" };
            var createRecordAction = fakeService.actions.createRecord(expectedResult);
            sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.updateItem.returns(Observable_1.Observable.of(expectedResult));
            var stubGetState = sinon_1.stub(store, "getState");
            fakeService.createRecordEpic(redux_observable_1.ActionsObservable.of(createRecordAction), store)
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
            var onSuccess = sinon_1.spy();
            var expectedResult = { id: "123", fullText: "puppy" };
            var updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess: onSuccess });
            var pushRecordAction = sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.updateItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.updateRecordEpic(redux_observable_1.ActionsObservable.of(updateRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(mockAdapter.updateItem.calledWithMatch(expectedResult.id, JSON.stringify({ fullText: "puppy" })));
            });
        });
        it("should call onSuccess callback with result", function () {
            var onSuccess = sinon_1.spy();
            var expectedResult = { id: 123, fullText: "puppy" };
            var updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess: onSuccess });
            var pushRecordAction = sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.updateItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.updateRecordEpic(redux_observable_1.ActionsObservable.of(updateRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(onSuccess.calledWithMatch(expectedResult));
            });
        });
        it("should call pushRecord with result", function () {
            var onSuccess = sinon_1.spy();
            var expectedResult = { id: "123", fullText: "puppy" };
            var updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess: onSuccess });
            var pushRecordAction = sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.updateItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.updateRecordEpic(redux_observable_1.ActionsObservable.of(updateRecordAction), store)
                .subscribe(noop, noop, function () {
                expect(pushRecordAction.firstCall.args[0]).to.deep.equal(new Model_mock_1.FakeModel(expectedResult));
            });
        });
        it("should use the store's getState() method", function () {
            var expectedResult = { id: "123" };
            var updateRecordAction = fakeService.actions.updateRecord(expectedResult);
            sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.updateItem.returns(Observable_1.Observable.of(expectedResult));
            var stubGetState = sinon_1.stub(store, "getState");
            fakeService.updateRecordEpic(redux_observable_1.ActionsObservable.of(updateRecordAction), store)
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
            var onSuccess = sinon_1.spy();
            var expectedResult = { id: "123", fullText: "puppy" };
            var patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess: onSuccess });
            mockAdapter.patchItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.patchRecordEpic(redux_observable_1.ActionsObservable.of(patchRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(mockAdapter.patchItem.calledWithMatch(expectedResult.id, JSON.stringify({ fullText: "puppy" })));
            });
        });
        it("should call onSuccess with expected result", function () {
            var onSuccess = sinon_1.spy();
            var expectedResult = { id: "123", fullText: "puppy" };
            var patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess: onSuccess });
            mockAdapter.patchItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.patchRecordEpic(redux_observable_1.ActionsObservable.of(patchRecordAction), store)
                .subscribe(noop, noop, function () { return expect(onSuccess.firstCall.args[0]).to.deep.equal(new Model_mock_1.FakeModel(expectedResult)); });
        });
        it("should call pushRecord with expected result", function () {
            var onSuccess = sinon_1.spy();
            var expectedResult = { id: "123", fullText: "puppy" };
            var patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess: onSuccess });
            var pushRecordAction = sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.patchItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.patchRecordEpic(redux_observable_1.ActionsObservable.of(patchRecordAction), store)
                .subscribe(noop, noop, function () {
                expect(pushRecordAction.firstCall.args[0]).to.deep.equal(new Model_mock_1.FakeModel(expectedResult));
            });
        });
    });
    it("has an epic for performing a DELETE request", function () {
        assert.isFunction(fakeService.deleteRecordEpic);
    });
    describe("deleteRecordEpic", function () {
        it("should call deleteItem with id", function () {
            var onSuccess = sinon_1.spy();
            var expectedResult = { id: 123, fullText: "puppy" };
            var deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess: onSuccess });
            mockAdapter.deleteItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.deleteRecordEpic(redux_observable_1.ActionsObservable.of(deleteRecordAction), store)
                .subscribe(noop, noop, function () {
                assert.isTrue(mockAdapter.deleteItem.calledOnceWith(expectedResult.id));
            });
        });
        it("should call onSuccess callback with result", function () {
            var onSuccess = sinon_1.spy();
            var expectedResult = { id: "123", fullText: "puppy" };
            var deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess: onSuccess });
            mockAdapter.deleteItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.deleteRecordEpic(redux_observable_1.ActionsObservable.of(deleteRecordAction), store)
                .subscribe(noop, noop, function () { return expect(onSuccess.firstCall.args[0]).to.deep.equal(new Model_mock_1.FakeModel(expectedResult)); });
        });
        it("should call pushRecord with resopnse", function () {
            var onSuccess = sinon_1.spy();
            var expectedResult = { id: "123", fullText: "puppy" };
            var deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess: onSuccess });
            var pushRecordAction = sinon_1.stub(fakeService.actions, "pushRecord");
            mockAdapter.deleteItem.returns(Observable_1.Observable.of(expectedResult));
            fakeService.deleteRecordEpic(redux_observable_1.ActionsObservable.of(deleteRecordAction), store)
                .subscribe(noop, noop, function () {
                expect(pushRecordAction.firstCall.args[0]).to.deep.equal(new Model_mock_1.FakeModel(expectedResult));
            });
        });
    });
    describe("GetBy methods", function () {
        describe("getById", function () {
            var state$;
            var stubGetStateObservable;
            var stubFetchRecord;
            var dispatch = sinon_1.spy();
            beforeEach(function () {
                state$ = Observable_1.Observable.of(state);
                BaseService_1.BaseService.setStateObservable(state$);
                BaseService_1.BaseService.registerDispatch(dispatch);
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
                state$ = new Subject_1.Subject();
                state$.next(state);
                BaseService_1.BaseService.setStateObservable(state$);
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
                stubGetStateObservable = sinon_1.stub(BaseService_1.BaseService, "getStateObservable").returns(state$);
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
                stubFetchRecord = sinon_1.stub(fakeService.actions, "fetchRecord").returns({ invoke: sinon_1.spy() });
                var itemObservable = fakeService.getById("9999");
                itemObservable.subscribe((function (itemModel) {
                    expect(itemModel.isShadow).to.be.true;
                }));
            });
            it("should create a fetchRecord action if the requested Id is not in the state", function () {
                stubFetchRecord = sinon_1.stub(fakeService.actions, "fetchRecord").returns({ invoke: sinon_1.spy() });
                fakeService.getById("9999");
                expect(stubFetchRecord.firstCall.args[0]).to.deep.equal({ id: "9999" });
            });
            it("should invoke a fetchRecord action if the requested Id is not in the state", function () {
                var invokeSpy = sinon_1.spy();
                stubFetchRecord = sinon_1.stub(fakeService.actions, "fetchRecord").returns({ invoke: invokeSpy });
                fakeService.getById("9999");
                expect(invokeSpy).to.have.property("callCount").to.equal(1);
            });
        });
        describe("getByIds", function () {
            var state$;
            var stubGetStateObservable;
            var stubFetchRecord;
            beforeEach(function () {
                state$ = Observable_1.Observable.of(state);
                BaseService_1.BaseService.setStateObservable(state$);
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
                stubGetStateObservable = sinon_1.stub(BaseService_1.BaseService, "getStateObservable").returns(state$);
                var itemData = fakeModels;
                var indexes = itemData.map(function (item) { return item.id; });
                fakeService.getByIds(indexes);
                fakeService.getByIds(indexes);
                expect(stubGetStateObservable).to.have.property("callCount").to.equal(1);
            });
            it("should create a fetchRecord action if the requested Ids are not in the state already", function () {
                stubFetchRecord = sinon_1.stub(fakeService.actions, "fetchRecord").returns({ invoke: sinon_1.spy() });
                fakeService.getByIds(["9998", "9999"]);
                expect(stubFetchRecord.firstCall.args[0]).to.deep.equal({ id: "9998" });
                expect(stubFetchRecord.secondCall.args[0]).to.deep.equal({ id: "9999" });
            });
            it("should invoke a fetchRecord action if the requested Ids are not in the state", function () {
                var invokeSpy = sinon_1.spy();
                stubFetchRecord = sinon_1.stub(fakeService.actions, "fetchRecord").returns({ invoke: invokeSpy });
                fakeService.getByIds(["9998", "9999"]);
                expect(invokeSpy).to.have.property("callCount").to.equal(2);
            });
            it("should not create a fetchRecord action if a permutation of the requested Ids is in the state already", function () {
                var invokeSpy = sinon_1.spy();
                stubFetchRecord = sinon_1.stub(fakeService.actions, "fetchRecord").returns({ invoke: invokeSpy });
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
                state$ = Observable_1.Observable.of(state);
                BaseService_1.BaseService.setStateObservable(state$);
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
                stubGetItemsSelector = sinon_1.stub(fakeService.selectors, "getItems")
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
                stubGetStateObservable = sinon_1.stub(BaseService_1.BaseService, "getStateObservable").returns(state$);
                var itemData = fakeModels;
                fakeService.getByQuery(query);
                fakeService.getByQuery(query);
                expect(stubGetStateObservable).to.have.property("callCount").to.equal(1);
            });
            it("should create a fetchAll action with the proper payload", function () {
                stubFetchAll = sinon_1.stub(fakeService.actions, "fetchAll").returns({ invoke: sinon_1.spy() });
                fakeService.getByQuery(query);
                expect(stubFetchAll.firstCall.args[0]).to.deep.equal(query);
            });
            it("should not invoke the fetchAll action with the proper parameters if the requested Ids are already in the cache", function () {
                var invokeSpy = sinon_1.spy();
                stubFetchAll = sinon_1.stub(fakeService.actions, "fetchAll").returns({ invoke: invokeSpy });
                fakeService.getByQuery(query);
                fakeService.getByQuery(query);
                expect(invokeSpy).to.have.property("callCount").to.equal(1);
            });
            it("should invoke the fetchAll action with the proper parameters if the requested Ids are not already in the cache", function () {
                var invokeSpy = sinon_1.spy();
                stubFetchAll = sinon_1.stub(fakeService.actions, "fetchAll").returns({ invoke: invokeSpy });
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
                state$ = Observable_1.Observable.of(state);
                BaseService_1.BaseService.setStateObservable(state$);
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
                stubGetStateObservable = sinon_1.stub(BaseService_1.BaseService, "getStateObservable").returns(state$);
                fakeService.getAll();
                expect(stubGetStateObservable).to.have.property("callCount").to.equal(1);
            });
            it("should create a fetchAll action", function () {
                stubFetchAll = sinon_1.stub(fakeService.actions, "fetchAll").returns({ invoke: sinon_1.spy() });
                var allItems = fakeService.getAll();
                expect(stubFetchAll.firstCall).to.be.not.null;
            });
        });
    });
});
//# sourceMappingURL=DataService.test.js.map