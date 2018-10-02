// tslint:disable:no-empty max-classes-per-file no-unused-expression
import { match, spy, stub } from "sinon";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { Subject } from "rxjs/Subject";

import { Map, Record } from "immutable";
import { createMockStore } from "redux-test-utils";
import hash from "object-hash";

import { createMockServiceState } from "../TestUtils";
import { IModelMeta } from "../Model";
import { createMockFakeModel, createMockFakeModels, FakeModel, IFakeModelData } from "../Model/Model.mock";
import { MockAdapter } from "../Adapters/MockAdapter";
import { MockSerializer } from "../Serializers";
import { configure } from "../Configure";

import { DataService, IDataServiceState, IRequestCacheKey } from "./DataService";
import { BaseService } from "./BaseService";
import { registerService } from "./ServiceProvider";

declare var intern;
const { describe, it, beforeEach, afterEach } = intern.getPlugin("interface.bdd");
const { assert, expect } = intern.getPlugin("chai");

const noop = () => null;

describe("DataService", () => {
  let fakeService;
  let mockAdapter;
  let store;
  let fakeModels;
  let state;
  const serviceName = "fakeModel";

  beforeEach(() => {
    configure({ modules: null });
    mockAdapter = new MockAdapter();

    class FakeService extends DataService<IFakeModelData> {
      public name = serviceName;
      public ModelClass = FakeModel;
      protected _adapter = mockAdapter;
    }

    fakeService = new FakeService();
    registerService(fakeService);

    fakeModels = createMockFakeModels();

    state = createMockServiceState<IFakeModelData>(fakeService, [
      fakeService.actions.pushAll({ items: fakeModels }),
    ]);
    store = createMockStore(state);
  });

  it("has an action creator for triggering a fetchAll query", () => {
    assert.isFunction(fakeService.actions.fetchAll);
  });

  describe("adapter", () => {
    it("uses the adapter from the config if one was not defined in the child class", () => {
      class MockService extends DataService<IFakeModelData> {
        public name = "";
        public ModelClass = null;
      }

      configure({ modules: null, adapter: MockAdapter });
      const mockService = new MockService();

      expect(mockService.adapter).to.be.an.instanceOf(MockAdapter);
    });
  });

  describe("serializer", () => {
    it("uses the serializer from the config if one was not defined in the child class", () => {
      class MockService extends DataService<IFakeModelData> {
        public name = "";
        public ModelClass = null;
      }

      configure({ modules: null, serializer: MockSerializer });
      const mockService = new MockService();

      expect(mockService.serializer).to.be.an.instanceOf(MockSerializer);
    });
  });

  describe("fetchAll action creator", () => {
    it("should create the correct action to trigger a fetchAll query to the api with the query params", () => {
      const expected = {
        type: `${serviceName}/FETCH_ALL`,
        payload: { filter: "all" },
        meta: {},
      };
      const actual = fakeService.actions.fetchAll({ filter: "all" });

      delete actual.invoke;
      assert.deepEqual(actual, expected);
    });

    it("should trigger query with the query params and an onSuccess callback", () => {
      const onSuccess = noop;
      const expected = {
        type: `${serviceName}/FETCH_ALL`,
        payload: { filter: "all" },
        meta: { onSuccess },
      };
      const actual = fakeService.actions.fetchAll({ filter: "all" }, { onSuccess });

      delete actual.invoke;
      assert.deepEqual(actual, expected);
    });
  });

  it("has an action creator for triggering a GET request to the API", () => {
    assert.isFunction(fakeService.actions.fetchRecord);
  });

  describe("fetchRecord action creator", () => {
    it("should create the correct action to trigger a GET request", () => {
      const expected = {
        type: `${serviceName}/FETCH_RECORD`,
        payload: { id: 123 },
        meta: {},
      };
      const actual = fakeService.actions.fetchRecord({ id: 123 });

      delete actual.invoke;
      assert.deepEqual(actual, expected);
    });

    it("should trigger a GET request to the API and accepting an onSuccess callback", () => {
      const cachedItemId = fakeModels[0].id;
      const onSuccess = spy();
      const expected = {
        type: `${serviceName}/FETCH_RECORD`,
        payload: { id: cachedItemId },
        meta: { onSuccess },
      };
      const actual = fakeService.actions.fetchRecord({ id: cachedItemId }, { onSuccess });

      delete actual.invoke;
      assert.deepEqual(actual, expected);
    });
  });

  it("has an action creator for triggering a CREATE request to the API", () => {
    assert.isFunction(fakeService.actions.createRecord);
  });

  describe("createRecord action creator", () => {
    it("creates the correct action to trigger a CREATE request with an onSuccess callback", () => {
      const onSuccess = spy();
      const expected = {
        type: `${serviceName}/CREATE_RECORD`,
        payload: { fakeField: "rabbit" },
        meta: { onSuccess },
      };
      const actual = fakeService.actions.createRecord({ fakeField: "rabbit" }, { onSuccess });

      delete actual.invoke;
      assert.deepEqual(actual, expected);
    });
  });

  it("has an action creator for triggering a PUT request to the API", () => {
    assert.isFunction(fakeService.actions.updateRecord);
  });

  describe("updateRecord action creator", () => {
    it("creates the correct action to trigger a PUT request with an onSuccess callback", () => {
      const onSuccess = spy();
      const expected = {
        type: `${serviceName}/UPDATE_RECORD`,
        payload: { fakeField: "rabbit" },
        meta: { onSuccess },
      };
      const actual = fakeService.actions.updateRecord({ fakeField: "rabbit" }, { onSuccess });

      delete actual.invoke;
      assert.deepEqual(actual, expected);
    });
  });

  it("has an action creator for triggering a PATCH request to the API", () => {
    assert.isFunction(fakeService.actions.patchRecord);
  });

  describe("patchRecord action creator", () => {
    it("creates the correct action to trigger a PATCH request with an onSuccess callback", () => {
      const onSuccess = spy();
      const expected = {
        type: `${serviceName}/PATCH_RECORD`,
        payload: { fakeField: "rabbit" },
        meta: { onSuccess },
      };
      const actual = fakeService.actions.patchRecord({ fakeField: "rabbit" }, { onSuccess });

      delete actual.invoke;
      assert.deepEqual(actual, expected);
    });
  });

  it("has an action creator for triggering a DELETE_RECORD request to the API", () => {
    assert.isFunction(fakeService.actions.deleteRecord);
  });

  describe("deleteRecord action creator", () => {
    it("creates the correct action to trigger a DELETE request with an onSuccess callback", () => {
      const onSuccess = spy();
      const expected = {
        type: `${serviceName}/DELETE_RECORD`,
        payload: { id: 123 },
        meta: { onSuccess },
      };
      const actual = fakeService.actions.deleteRecord({ id: 123 }, { onSuccess });

      delete actual.invoke;
      assert.deepEqual(actual, expected);
    });
  });

  it("has an action creator for triggering a SET_FIELD request", () => {
    assert.isFunction(fakeService.actions.setField);
  });

  describe("setField action creator", () => {
    it("creates the correct action to trigger a setField request", () => {
      const onSuccess = spy();
      const expected = {
        type: `${serviceName}/SET_FIELD`,
        payload: { id: 123, fieldName: "firstName", value: "Hank" },
        meta: {},
      };
      const actual = fakeService.actions.setField({ id: 123, fieldName: "firstName", value: "Hank" });

      delete actual.invoke;
      assert.deepEqual(actual, expected);
    });
  });

  it("has a reducer for setting the field of a record", () => {
    assert.isFunction(fakeService.setFieldReducer);
  });

  describe("setFieldReducer", () => {
    let setRecordSpy;

    beforeEach(() => {
      setRecordSpy = spy(Record.prototype, "set");
    });

    afterEach(() => {
      setRecordSpy.restore();
    });

    it("should set the field on the item with the new value", () => {
      const modelData = {
        id: "1",
        fullText: "Egg",
      };
      const modelMeta = { original: null } as IModelMeta<IFakeModelData>;
      const model = new FakeModel(modelData, modelMeta);

      const items = Map()
        .set(modelData.id, model);

      const stateRecord = Record({ items })();

      const action = {
        type: `${serviceName}/SET_FIELD`,
        payload: {
          id: modelData.id,
          fieldName: "fullText",
          value: "Chicken",
        },
        meta: {},
      };

      const sut = fakeService.setFieldReducer(stateRecord, action);
      const updatedItem = sut
        .get("items")
        .get(modelData.id);

      assert.equal(updatedItem.fullText, action.payload.value);
    });

    it("should not set the items on the record when id not found in items", () => {
      const modelData = {
        id: "1",
        firstName: "Elton",
      };
      const modelMeta = { original: null } as IModelMeta<IFakeModelData>;
      const model = new FakeModel(modelData, modelMeta);

      const items = Map()
        .set(modelData.id, model);

      const stateRecord = Record({ items })();

      const action = {
        type: `${serviceName}/SET_FIELD`,
        payload: {
          id: "not likely to exist",
          fieldName: "firstName",
          value: "Sir Elton",
        },
        meta: {},
      };

      const sut = fakeService.setFieldReducer(stateRecord, action);

      assert.isFalse(setRecordSpy.calledWith("items"));
    });

    it("should update items with updated record when id found in items", () => {
      const modelData = {
        id: "1",
        fullText: "Anakin",
      };
      const modelMeta = { original: null } as IModelMeta<IFakeModelData>;
      const model = new FakeModel(modelData, modelMeta);

      const items = Map()
        .set(modelData.id, model);

      const stateRecord = Record({ items })();

      const action = {
        type: `${serviceName}/SET_FIELD`,
        payload: {
          id: modelData.id,
          fieldName: "fullText",
          value: "Darth",
        },
        meta: {},
      };

      const sut = fakeService.setFieldReducer(stateRecord, action);

      assert.isTrue(setRecordSpy.calledWith("items",
        match((updatedItems) => {
          const updatedModel = updatedItems.get(modelData.id);
          return updatedModel.modelData.fullText === action.payload.value;
        })));
    });
  });

  it("has an epic for performing a fetchAll request with the query params", () => {
    assert.isFunction(fakeService.fetchAllEpic);
  });

  describe("fetchAll caching", () => {
    it("should call fetchAll on adapter with payload", () => {
      const expectedResult = { hello: "world" };
      const payload = { filter: "all" };
      const fetchAllAction = fakeService.actions.fetchAll(payload);
      const pushAllAction = stub(fakeService.actions, "pushAll");

      mockAdapter.fetchAll.returns(Observable.of(expectedResult));

      fakeService.fetchAllEpic(ActionsObservable.of(fetchAllAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(mockAdapter.fetchAll.calledWithMatch(payload));
          });
    });

    it("should call pushAll action with result from call to adapter", () => {
      const expectedResult = { hello: "world" };
      const payload = { filter: "all" };
      const fetchAllAction = fakeService.actions.fetchAll(payload);
      const pushAllAction = stub(fakeService.actions, "pushAll");

      mockAdapter.fetchAll.returns(Observable.of(expectedResult));

      fakeService.fetchAllEpic(ActionsObservable.of(fetchAllAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(pushAllAction.calledWithMatch(expectedResult));
          });
    });
  });

  describe("pushAllReducer", () => {
    it("updates the state's requestCache, after the pushAllReducer fires", () => {
      const queryParams = { fakeField: "fakeVal" };

      const updatedState: IDataServiceState<any> =
        fakeService.pushAllReducer(state.fakeModel, fakeService.actions.pushAll({ items: fakeModels }, { queryParams }));

      const cachedRequest = updatedState.requestCache.get(hash(queryParams || {}) as IRequestCacheKey);
      expect(cachedRequest.toJS()).to.deep.equal(
        { ids: fakeModels.map((x) => x.id), isLoading: false, errors: null },
        "cached request value is properly initilized");
    });
  });

  describe("getItems selector", () => {
    it("should only select the items returned from a fetchall request, given the same obj to make the request", () => {
      const queryParams = { fakeField: "fakeVal" };
      const expectedValues = createMockFakeModels(2);
      const extraValues = [createMockFakeModel(), createMockFakeModel()];

      state = createMockServiceState<IFakeModelData>(fakeService, [
        fakeService.actions.pushAll({ items: expectedValues }, { queryParams }),
        fakeService.actions.pushAll({ items: extraValues }, { queryParams: { fakeField2: "fakeVal" } }),
      ]);

      const items = fakeService.selectors.getItems(state, queryParams);
      const itemsData = items.toJS();
      expect(expectedValues).to.deep.equal(itemsData);
    });
  });

  describe("setErrors reducer", () => {
    it("updates the state adding errors that occurred during the fetchAllEpic", () => {
      const queryParams = { fakeField: "fakeVal" };

      state = createMockServiceState<IFakeModelData>(fakeService, [
        fakeService.actions.pushAll({ items: [] }, { queryParams }),
      ]);

      const errors = ["test error"];
      const updatedState: IDataServiceState<any> =
        fakeService.setErrorsReducer(state.fakeModel, fakeService.actions.setErrors({ errors }, { queryParams }));

      const cachedRequest = updatedState.requestCache.get(hash(queryParams || {}) as IRequestCacheKey);
      expect(cachedRequest.toJS()).to.deep.include({
        ids: [],
        isLoading: false,
        errors,
      }, "cached request value is properly initilized");
    });

    it("preserves the ids", () => {
      const expectedValues = createMockFakeModels(2);
      const existingIds = expectedValues.map((val) => val.id);
      const queryParams = { fakeField: "fakeVal" };

      state = createMockServiceState<IFakeModelData>(fakeService, [
        fakeService.actions.pushAll({ items: expectedValues }, { queryParams }),
      ]);

      const errors = ["test error"];
      const updatedState: IDataServiceState<any> =
        fakeService.setErrorsReducer(state.fakeModel, fakeService.actions.setErrors({ errors }, { queryParams }));

      const cachedRequest = updatedState.requestCache.get(hash(queryParams || {}) as IRequestCacheKey);
      expect(cachedRequest.toJS()).to.deep.include({
        ids: existingIds,
        isLoading: false,
        errors,
      }, "cached request value is properly initialized");
    });
  });

  it("has an epic for performing a GET request", () => {
    assert.isFunction(fakeService.fetchRecordEpic);
  });

  describe("fetchRecordEpic", () => {
    it("should fire the onSuccess callback with the response", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const fetchRecordAction = fakeService.actions.fetchRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");

      mockAdapter.fetchItem.returns(Observable.of(expectedResult));

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => expect(onSuccess.firstCall.args[0]).to.deep.equal(new FakeModel(expectedResult)),
        );
    });

    it("should fire The pushRecord action with the response", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const fetchRecordAction = fakeService.actions.fetchRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");

      mockAdapter.fetchItem.returns(Observable.of(expectedResult));

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(pushRecordAction.calledWithMatch(new fakeService.ModelClass(expectedResult)));
          });
    });

    it("should not fire fetchItem if item exists in store when forceReload omitted", () => {
      const cachedItemId = fakeModels[0].id;
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, null);

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isFalse(mockAdapter.fetchItem.called);
          });
    });

    it("should fire fetchItem if item does not exist in store when forceReload omitted", () => {
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, null);

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(mockAdapter.fetchItem.called);
          });
    });

    it("should not fire fetchItem if item exists in store when forceReload false", () => {
      const cachedItemId = fakeModels[0].id;
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, { forceReload: false });

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isFalse(mockAdapter.fetchItem.called);
          });
    });

    it("should fire fetchItem if item does not exist in store when forceReload false", () => {
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, { forceReload: false });

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(mockAdapter.fetchItem.called);
          });
    });

    it("should fire fetchItem if item exists in store when forceReload true", () => {
      const cachedItemId = fakeModels[0].id;
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, { forceReload: true });

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(mockAdapter.fetchItem.called);
          });
    });

    it("should fire fetchItem if item does not exist in store when forceReload true", () => {
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, { forceReload: true });

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(mockAdapter.fetchItem.called);
          });
    });
  });

  it("has an epic for performing a CREATE request", () => {
    assert.isFunction(fakeService.createRecordEpic);
  });

  describe("createRecordEpic", () => {
    it("should call adapter with expected result", () => {
      const onSuccess = spy();
      const expectedResult = { fullText: "puppy" };
      const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");

      mockAdapter.createItem.returns(Observable.of(expectedResult));

      fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(mockAdapter.createItem.calledWithMatch(JSON.stringify(expectedResult)));
          });
    });

    it("should fire the onSuccess callback with response", () => {
      const onSuccess = spy();
      const expectedResult = { fullText: "puppy" };
      const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");

      mockAdapter.createItem.returns(Observable.of(expectedResult));

      fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(onSuccess.calledWithMatch(expectedResult));
          });
    });

    it("should fire pushRecord with response", () => {
      const onSuccess = spy();
      const expectedResult = { fullText: "puppy" };
      const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");

      mockAdapter.createItem.returns(Observable.of(expectedResult));

      fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(pushRecordAction.calledWithMatch(expectedResult));
          });
    });

    it("should use the store's getState() method", () => {
      const expectedResult = { id: "123" };
      const createRecordAction = fakeService.actions.createRecord(expectedResult);
      stub(fakeService.actions, "pushRecord");
      mockAdapter.updateItem.returns(Observable.of(expectedResult));

      const stubGetState = stub(store, "getState");

      fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(stubGetState.callCount).to.equal(1);
          });
    });
  });

  it("has an epic for performing a PUT request", () => {
    assert.isFunction(fakeService.updateRecordEpic);
  });

  describe("updateRecordEpic", () => {
    it("should call updateItem with id and result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");
      mockAdapter.updateItem.returns(Observable.of(expectedResult));

      fakeService.updateRecordEpic(ActionsObservable.of(updateRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(mockAdapter.updateItem.calledWithMatch(expectedResult.id, JSON.stringify({ fullText: "puppy" })));
          });
    });

    it("should call onSuccess callback with result", () => {
      const onSuccess = spy();
      const expectedResult = { id: 123, fullText: "puppy" };
      const updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");
      mockAdapter.updateItem.returns(Observable.of(expectedResult));

      fakeService.updateRecordEpic(ActionsObservable.of(updateRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(onSuccess.calledWithMatch(expectedResult));
          });
    });

    it("should call pushRecord with result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");
      mockAdapter.updateItem.returns(Observable.of(expectedResult));

      fakeService.updateRecordEpic(ActionsObservable.of(updateRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(pushRecordAction.firstCall.args[0]).to.deep.equal(new FakeModel(expectedResult));
          });
    });

    it("should use the store's getState() method", () => {
      const expectedResult = { id: "123" };
      const updateRecordAction = fakeService.actions.updateRecord(expectedResult);
      stub(fakeService.actions, "pushRecord");
      mockAdapter.updateItem.returns(Observable.of(expectedResult));

      const stubGetState = stub(store, "getState");

      fakeService.updateRecordEpic(ActionsObservable.of(updateRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(stubGetState.callCount).to.equal(1);
          });
    });
  });

  it("has an epic for performing a PATCH request", () => {
    assert.isFunction(fakeService.patchRecordEpic);
  });

  describe("patchRecordEpic", () => {
    it("should call patchItem with id and expected result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess });
      mockAdapter.patchItem.returns(Observable.of(expectedResult));

      fakeService.patchRecordEpic(ActionsObservable.of(patchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(mockAdapter.patchItem.calledWithMatch(expectedResult.id, JSON.stringify({ fullText: "puppy" })));
          });
    });

    it("should call onSuccess with expected result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess });
      mockAdapter.patchItem.returns(Observable.of(expectedResult));

      fakeService.patchRecordEpic(ActionsObservable.of(patchRecordAction), store)
        .subscribe(noop, noop,
          () => expect(onSuccess.firstCall.args[0]).to.deep.equal(new FakeModel(expectedResult)),
        );
    });

    it("should call pushRecord with expected result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");
      mockAdapter.patchItem.returns(Observable.of(expectedResult));

      fakeService.patchRecordEpic(ActionsObservable.of(patchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(pushRecordAction.firstCall.args[0]).to.deep.equal(new FakeModel(expectedResult));
          });
    });
  });

  it("has an epic for performing a DELETE request", () => {
    assert.isFunction(fakeService.deleteRecordEpic);
  });

  describe("deleteRecordEpic", () => {
    it("should call deleteItem with id", () => {
      const onSuccess = spy();
      const expectedResult = { id: 123, fullText: "puppy" };
      const deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess });
      mockAdapter.deleteItem.returns(Observable.of(expectedResult));

      fakeService.deleteRecordEpic(ActionsObservable.of(deleteRecordAction), store)
        .subscribe(noop, noop,
          () => {
            assert.isTrue(mockAdapter.deleteItem.calledOnceWith(expectedResult.id));
          });
    });

    it("should call onSuccess callback with result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess });
      mockAdapter.deleteItem.returns(Observable.of(expectedResult));

      fakeService.deleteRecordEpic(ActionsObservable.of(deleteRecordAction), store)
        .subscribe(noop, noop,
          () => expect(onSuccess.firstCall.args[0]).to.deep.equal(new FakeModel(expectedResult)),
        );
    });

    it("should call pushRecord with resopnse", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");
      mockAdapter.deleteItem.returns(Observable.of(expectedResult));

      fakeService.deleteRecordEpic(ActionsObservable.of(deleteRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(pushRecordAction.firstCall.args[0]).to.deep.equal(new FakeModel(expectedResult));
          });
    });
  });

  describe("GetBy methods", () => {
    describe("getById", () => {
      let state$;
      let stubGetStateObservable;
      let stubFetchRecord;
      const dispatch = spy();

      beforeEach(() => {
        state$ = Observable.of(state);
        BaseService.setStateObservable(state$);
        BaseService.registerDispatch(dispatch);
      });

      afterEach(() => {
        if (stubGetStateObservable) {
          stubGetStateObservable.restore();
        }

        if (stubFetchRecord) {
          stubFetchRecord.restore();
        }
      });

      it("should get the correct item by Id", () => {
        const item = fakeModels[2];
        const itemObservable = fakeService.getById(item.id);

        itemObservable.subscribe(((itemModel) => {
          expect(itemModel).to.deep.equal(item);
        }));
      });

      it("should get new copies of the item when the state changes", () => {
        state$ = new Subject();
        state$.next(state);
        BaseService.setStateObservable(state$);

        const itemData = fakeModels[2];
        const itemObservable = fakeService.getById(itemData.id);
        const newItemData = {
          ...itemData,
          fullText: "asdfasdf",
        };
        const newState = fakeService.pushRecordReducer(state[serviceName], fakeService.actions.pushRecord(newItemData));
        let previouslyUpdated = false;

        itemObservable.subscribe((itemModel) => {
          let expectedData;
          if (!previouslyUpdated) {
            previouslyUpdated = true;
            expectedData = itemData;
            state$.next(newState);
          } else {
            expectedData = newItemData;
          }
          expect(itemModel.getData()).to.deep.equal(expectedData);
        });
      });

      it("should get the correct item by Id and cache it for future requests by that Id", () => {
        const itemData = fakeModels[2];

        const itemObservable = fakeService.getById(itemData.id);
        const itemObservable2 = fakeService.getById(itemData.id);

        expect(itemObservable).to.equal(itemObservable2);
      });

      it("should not call BaseService.getStateObservable when using a cached Observable", () => {
        stubGetStateObservable = stub(BaseService, "getStateObservable").returns(state$);

        const itemData = fakeModels[2];

        fakeService.getById(itemData.id);
        fakeService.getById(itemData.id);

        expect(stubGetStateObservable).to.have.property("callCount").to.equal(1);
      });

      it("should support multiple subscriptions by Id", () => {
        const item = fakeModels[2];
        const item2 = fakeModels[4];

        const itemObservable = fakeService.getById(item.id);
        const itemObservable2 = fakeService.getById(item2.id);

        itemObservable.subscribe(((itemModel) => {
          expect(itemModel).to.deep.equal(item);
        }));

        itemObservable2.subscribe(((itemModel2) => {
          expect(itemModel2).to.deep.equal(item2);
        }));
      });

      it("should return a shadow object if the requested Id is not in the state", () => {
        stubFetchRecord = stub(fakeService.actions, "fetchRecord").returns({ invoke: spy() });

        const itemObservable = fakeService.getById("9999");

        itemObservable.subscribe(((itemModel) => {
          expect(itemModel.isShadow).to.be.true;
        }));
      });

      it("should create a fetchRecord action if the requested Id is not in the state", () => {
        stubFetchRecord = stub(fakeService.actions, "fetchRecord").returns({ invoke: spy() });

        fakeService.getById("9999");

        expect(stubFetchRecord.firstCall.args[0]).to.deep.equal({ id: "9999" });
      });

      it("should invoke a fetchRecord action if the requested Id is not in the state", () => {
        const invokeSpy = spy();
        stubFetchRecord = stub(fakeService.actions, "fetchRecord").returns({ invoke: invokeSpy });

        fakeService.getById("9999");

        expect(invokeSpy).to.have.property("callCount").to.equal(1);
      });
    });

    describe("getByIds", () => {
      let state$;
      let stubGetStateObservable;
      let stubFetchRecord;

      beforeEach(() => {
        state$ = Observable.of(state);
        BaseService.setStateObservable(state$);
      });

      afterEach(() => {
        if (stubGetStateObservable) {
          stubGetStateObservable.restore();
        }

        if (stubFetchRecord) {
          stubFetchRecord.restore();
        }
      });

      it("should get the correct items by their Ids", () => {
        const itemData = fakeModels;

        const itemsObservable = fakeService.getByIds(itemData.map((item) => item.id));

        itemsObservable.subscribe((items) =>
          items.forEach((itemModel, i) => expect(itemModel).to.equal(itemData[i])));
      });

      it("should get the correct items by their Ids and cache them for future requests by those Ids", () => {
        const itemData = fakeModels;
        const indexes = itemData.map((item) => item.id);

        const itemObservable = fakeService.getByIds(indexes);
        const itemObservable2 = fakeService.getByIds(indexes);

        expect(itemObservable).to.equal(itemObservable2);
      });

      it("should not call BaseService.getStateObservable when using cached Observable by Ids", () => {
        stubGetStateObservable = stub(BaseService, "getStateObservable").returns(state$);
        const itemData = fakeModels;
        const indexes = itemData.map((item) => item.id);

        fakeService.getByIds(indexes);
        fakeService.getByIds(indexes);

        expect(stubGetStateObservable).to.have.property("callCount").to.equal(fakeModels.length);
      });

      it("should create a fetchRecord action if the requested Ids are not in the state already", () => {
        stubFetchRecord = stub(fakeService.actions, "fetchRecord").returns({ invoke: spy() });

        fakeService.getByIds(["9998", "9999"]);

        expect(stubFetchRecord.firstCall.args[0]).to.deep.equal({ id: "9998" });
        expect(stubFetchRecord.secondCall.args[0]).to.deep.equal({ id: "9999" });
      });

      it("should invoke a fetchRecord action if the requested Ids are not in the state", () => {
        const invokeSpy = spy();
        stubFetchRecord = stub(fakeService.actions, "fetchRecord").returns({ invoke: invokeSpy });

        fakeService.getByIds(["9998", "9999"]);

        expect(invokeSpy).to.have.property("callCount").to.equal(2);
      });

      it("should not create a fetchRecord action if a permutation of the requested Ids is in the state already", () => {
        const invokeSpy = spy();
        stubFetchRecord = stub(fakeService.actions, "fetchRecord").returns({ invoke: invokeSpy });

        fakeService.getByIds(["9997", "9998", "9999"]);
        fakeService.getByIds(["9999", "9997", "9998"]);

        expect(invokeSpy).to.have.property("callCount").to.equal(3);
      });
    });

    describe("getByQuery", () => {
      let state$;
      let stubGetStateObservable;
      let stubFetchAll;
      let stubGetItemsSelector;
      const query = { page: 1, total: 1, organizationId: 2 };

      beforeEach(() => {
        state$ = Observable.of(state);
        BaseService.setStateObservable(state$);
      });

      afterEach(() => {
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

      it("should get the correct items by query", () => {
        stubGetItemsSelector = stub(fakeService.selectors, "getItems")
          .returns([fakeModels[0], fakeModels[1]]);

        const itemsObservable = fakeService.getByQuery(query);

        itemsObservable.subscribe((items) => {
          expect(items[0]).to.deep.equal(fakeModels[0]);
          expect(items[1]).to.deep.equal(fakeModels[1]);
        });
      });

      it("should get the correct items by their Ids and cache them for future requests by those Ids", () => {
        const itemObservable = fakeService.getByQuery(query);
        const itemObservable2 = fakeService.getByQuery(query);

        expect(itemObservable).to.equal(itemObservable2);
      });

      it("should not call BaseService.getStateObservable when using cached Observable by Ids", () => {
        stubGetStateObservable = stub(BaseService, "getStateObservable").returns(state$);
        const itemData = fakeModels;

        fakeService.getByQuery(query);
        fakeService.getByQuery(query);

        expect(stubGetStateObservable).to.have.property("callCount").to.equal(1);
      });

      it("should create a fetchAll action with the proper payload", () => {
        stubFetchAll = stub(fakeService.actions, "fetchAll").returns({ invoke: spy() });

        fakeService.getByQuery(query);

        expect(stubFetchAll.firstCall.args[0]).to.deep.equal(query);
      });

      it("should not invoke the fetchAll action with the proper parameters if the requested Ids are already in the cache", () => {
        const invokeSpy = spy();
        stubFetchAll = stub(fakeService.actions, "fetchAll").returns({ invoke: invokeSpy });

        fakeService.getByQuery(query);
        fakeService.getByQuery(query);

        expect(invokeSpy).to.have.property("callCount").to.equal(1);
      });

      it("should invoke the fetchAll action with the proper parameters if the requested Ids are not already in the cache", () => {
        const invokeSpy = spy();
        stubFetchAll = stub(fakeService.actions, "fetchAll").returns({ invoke: invokeSpy });
        const query2 = { page: 2, total: 50, organizationId: 33 };
        fakeService.getByQuery(query);
        fakeService.getByQuery(query2);

        expect(invokeSpy).to.have.property("callCount").to.equal(2);
      });
    });

    describe("getAll", () => {
      let state$;
      let stubGetStateObservable;
      let stubFetchAll;

      beforeEach(() => {
        state$ = Observable.of(state);
        BaseService.setStateObservable(state$);
      });

      afterEach(() => {
        if (stubGetStateObservable) {
          stubGetStateObservable.restore();
        }
        if (stubFetchAll) {
          stubFetchAll.restore();
        }
      });

      it("should get all of the items with getAll", () => {
        const itemData = fakeModels;

        const itemsObservable = fakeService.getAll();

        itemsObservable.subscribe((items) =>
          items.forEach((itemModel, i) => expect(itemModel).to.deep.equal(itemData[i])));
      });

      it("should call BaseService.getStateObservable", () => {
        stubGetStateObservable = stub(BaseService, "getStateObservable").returns(state$);

        fakeService.getAll();

        expect(stubGetStateObservable).to.have.property("callCount").to.equal(1);
      });

      it("should create a fetchAll action", () => {
        stubFetchAll = stub(fakeService.actions, "fetchAll").returns({ invoke: spy() });

        const allItems = fakeService.getAll();

        expect(stubFetchAll.firstCall).to.be.not.null;
      });
    });
  });
});
