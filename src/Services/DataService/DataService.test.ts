// tslint:disable:no-empty max-classes-per-file no-unused-expression
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/publishReplay";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { createMockStore } from "redux-test-utils";
import { ActionsObservable } from "redux-observable";
import { match, spy, stub } from "sinon";
import { random, lorem } from "faker";

import { createMockServiceState } from "../../TestUtils";
import { createMockFakeModel, createMockFakeModels, FakeModel, IFakeModelData } from "../../Model/Model.mock";
import { MockAdapter } from "../../Adapters";
import { MockMapper } from "../../Mapper";
import { MockSerializer } from "../../Serializers";
import { configure } from "../../Configure";
import { createMockQueryResponse, QueryBuilder, QueryManager } from "../../Query";

import { DataService } from "./DataService";
import { BaseService } from "../BaseService";
import { registerService } from "../ServiceProvider";

import { pushRecordReducer, setQueryResponseReducer } from "./Reducers";

declare var intern;
const { describe, it, beforeEach, afterEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

const noop = () => null;

describe("DataService", () => {
  let fakeService;
  let mockAdapter;
  let store;
  let fakeModels;
  let state;
  const serviceName = "fakeModel";
  let mockMapper;
  let mockSerializer;
  let query;

  beforeEach(() => {
    configure({ modules: null });
    mockAdapter = new MockAdapter();
    mockMapper = new MockMapper();
    mockSerializer = new MockSerializer();
    query = new QueryBuilder(serviceName, { page: 1, total: 1, organizationId: 2 });

    class FakeService extends DataService<IFakeModelData> {
      public name = serviceName;
      public ModelClass = FakeModel;
      protected _adapter = mockAdapter;
      protected _mapper = mockMapper;
      protected _serializer = mockSerializer;
    }

    fakeService = new FakeService();
    registerService(fakeService);

    fakeModels = createMockFakeModels();

    state = createMockServiceState<IFakeModelData>(fakeService, [
      fakeService.actions.pushAll({ items: fakeModels }),
      fakeService.actions.setQueryResponse({
        query,
        isLoading: false,
        response: createMockQueryResponse({
          ids: fakeModels.map(fakeModel => fakeModel.id),
        }),
      }),
    ]);
    store = createMockStore(state);
  });

  it("has an action creator for triggering a fetchAll query", () => {
    expect(fakeService.actions.fetchAll).to.be.a("function");
  });

  describe("adapter", () => {
    it("uses the adapter from the config if one was not defined in the child class and there is no this.AdapterClass", () => {
      class MockService extends DataService<IFakeModelData> {
        public name = "";
        public ModelClass = null;
      }

      configure({ modules: null, adapter: MockAdapter });
      const mockService = new MockService();

      expect(mockService.adapter).to.be.an.instanceOf(MockAdapter);
    });

    it("uses the adapter from the this.AdapterClass if one is not defined in the child class", () => {
      class MockService extends DataService<IFakeModelData> {
        public name = "";
        public ModelClass = null;
        public AdapterClass = MockAdapter;
      }

      configure({ modules: null, adapter: null });
      const mockService = new MockService();

      expect(mockService.adapter).to.be.an.instanceOf(MockAdapter);
    });
  });

  describe("mapper", () => {
    it("uses the mapper from the config if one was not defined in the child class and there is no this.MapperClass", () => {
      class MockService extends DataService<IFakeModelData> {
        public name = "";
        public ModelClass = null;
      }

      configure({ modules: null, mapper: MockMapper });
      const mockService = new MockService();

      expect(mockService.mapper).to.be.an.instanceOf(MockMapper);
    });

    it("uses the mapper from the this.MapperClass if one is not defined in the child class", () => {
      class MockService extends DataService<IFakeModelData> {
        public name = "";
        public ModelClass = null;
        public MapperClass = MockMapper;
      }

      configure({ modules: null, mapper: null });
      const mockService = new MockService();

      expect(mockService.mapper).to.be.an.instanceOf(MockMapper);
    });
  });

  describe("serializer", () => {
    it("uses the serializer from the config if one was not defined in the child class and there is no this.SerializerClass", () => {
      class MockService extends DataService<IFakeModelData> {
        public name = "";
        public ModelClass = null;
      }

      configure({ modules: null, serializer: MockSerializer });
      const mockService = new MockService();

      expect(mockService.serializer).to.be.an.instanceOf(MockSerializer);
    });

    it("uses the serializer from the this.SerializerClass if one is not defined in the child class", () => {
      class MockService extends DataService<IFakeModelData> {
        public name = "";
        public ModelClass = null;
        public SerializerClass = MockSerializer;
      }

      configure({ modules: null, serializer: null });
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
      expect(actual).to.deep.equal(expected);
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
      expect(actual).to.deep.equal(expected);
    });
  });

  it("has an action creator for triggering a GET request to the API", () => {
    expect(fakeService.actions.fetchRecord).to.be.a("function");
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
      expect(actual).to.deep.equal(expected);
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
      expect(actual).to.deep.equal(expected);
    });
  });

  it("has an action creator for triggering a CREATE request to the API", () => {
    expect(fakeService.actions.createRecord).to.be.a("function");
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
      expect(actual).to.deep.equal(expected);
    });
  });

  it("has an action creator for triggering a PUT request to the API", () => {
    expect(fakeService.actions.updateRecord).to.be.a("function");
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
      expect(actual).to.deep.equal(expected);
    });
  });

  it("has an action creator for triggering a PATCH request to the API", () => {
    expect(fakeService.actions.patchRecord).to.be.a("function");
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
      expect(actual).to.deep.equal(expected);
    });
  });

  it("has an action creator for triggering a DELETE_RECORD request to the API", () => {
    expect(fakeService.actions.deleteRecord).to.be.a("function");
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
      expect(actual).to.deep.equal(expected);
    });
  });

  it("has an action creator for triggering a SET_FIELD request", () => {
    expect(fakeService.actions.setField).to.be.a("function");
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
      expect(actual).to.deep.equal(expected);
    });
  });

  it("has an epic for performing a fetchAll request with the query params", () => {
    expect(fakeService.fetchAllEpic).to.be.a("function");
  });

  describe("fetchAllEpic", () => {
    let queryParams;
    let payload;
    let fetchAllAction;
    let items;
    let fakeResponse;

    beforeEach(() => {
      queryParams = {
        page: 1,
        pageSize: 1,
      };

      payload = new QueryBuilder(
        serviceName,
        queryParams,
      );

      items = createMockFakeModels();
      fakeResponse = createMockQueryResponse({
        ids: items.map(item => item.id),
      });

      mockAdapter.fetchAll.returns(Observable.of({
        ...fakeResponse,
        items,
      }));

      fetchAllAction = fakeService.actions.fetchAll(payload);
    });

    it("should call adapter.fetchAll with given serialized query params", () => {
      const expectedResult = spy();

      stub(fakeService.serializer, "serializeQueryParams").returns(expectedResult);

      return new Promise((resolve, reject) => {
        fakeService
          .fetchAllEpic(ActionsObservable.of(fetchAllAction), store)
          .take(1)
          .subscribe(() => {
            try {
              expect(
                mockAdapter.fetchAll.firstCall.args[0],
              ).to.equal(expectedResult);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it("should call serializeQueryParams with the queryParams from the IQueryBuilder payload", () => {
      const serializeQueryParamsStub =
        stub(fakeService.serializer, "serializeQueryParams");

      return new Promise((resolve, reject) => {
        fakeService
          .fetchAllEpic(ActionsObservable.of(fetchAllAction), store)
          .take(1)
          .subscribe(() => {
            try {
              expect(
                serializeQueryParamsStub.firstCall.args[0],
              ).to.equal(queryParams);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it("should call normalizeQueryResponse with the fetchAll response", () => {
      const normalizeQueryResponseStub = stub(fakeService.mapper, "normalizeQueryResponse").callThrough();

      return new Promise((resolve, reject) => {
        fakeService
          .fetchAllEpic(ActionsObservable.of(fetchAllAction), store)
          .take(1)
          .subscribe(() => {
            try {
              expect(
                normalizeQueryResponseStub.firstCall.args[0],
              ).to.deep.equal({
                ...fakeResponse,
                items,
              });
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it("should emit a PUSH_ALL action with the expected items", () => {
      return new Promise((resolve, reject) => {
        fakeService
          .fetchAllEpic(ActionsObservable.of(fetchAllAction), store)
          .take(1)
          .subscribe(action => {
            try {
              expect(action).to.deep.include({
                type: "fakeModel/PUSH_ALL",
                payload: {
                  items,
                },
              });
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it("should emit a SET_QUERY_RESPONSE action with expected IQueryCache containing the expected IQueryResponse", () => {
      return new Promise((resolve, reject) => {
        fakeService
          .fetchAllEpic(ActionsObservable.of(fetchAllAction), store)
          .skip(1)
          .take(1)
          .subscribe(action => {
            try {
              expect(action).to.deep.include({
                type: "fakeModel/SET_QUERY_RESPONSE",
                payload: {
                  response: fakeResponse,
                  query: payload,
                  isLoading: false,
                  errors: undefined,
                },
              });
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it("should emit a SET_QUERY_RESPONSE action with given errors when the adapter Observable throws", () => {
      const errors = random.words();

      mockAdapter.fetchAll.returns(Observable.throw({ xhr: { response: errors } }));

      return new Promise((resolve, reject) => {
        fakeService
          .fetchAllEpic(ActionsObservable.of(fetchAllAction), store)
          .take(1)
          .subscribe(action => {
            try {
              expect(action).to.deep.include({
                type: "fakeModel/SET_QUERY_RESPONSE",
                payload: {
                  query: payload,
                  isLoading: false,
                  errors,
                },
              });
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });
  });

  describe("getItems selector", () => {
    it("should only select the items returned from a fetchall request, given the same obj to make the request", () => {
      const queryParams = { fakeField: "fakeVal" };
      const queryBuilder = new QueryBuilder(serviceName, queryParams);

      const expectedValues = createMockFakeModels(2);
      const extraValues = [createMockFakeModel(), createMockFakeModel()];
      const otherQueryBuilder = new QueryBuilder(serviceName, { fakeField2: "fakeVal" });

      state = createMockServiceState<IFakeModelData>(fakeService, [
        fakeService.actions.pushAll({ items: expectedValues }),
        fakeService.actions.setQueryResponse({
          query: queryBuilder,
          response: createMockQueryResponse({
            ids: expectedValues.map(item => item.id),
          }),
        }),
        fakeService.actions.pushAll({ items: extraValues }),
        fakeService.actions.setQueryResponse({
          query: otherQueryBuilder,
          response: createMockQueryResponse({
            ids: extraValues.map(item => item.id),
          }),
        }),
      ]);

      const items = fakeService.selectors.getItems(state, queryBuilder);
      expect(expectedValues).to.deep.equal(items);
    });
  });

  it("has an epic for performing a GET request", () => {
    expect(fakeService.fetchRecordEpic).to.be.a("function");
  });

  describe("fetchRecordEpic", () => {
    it("should fire the onSuccess callback with the response", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const fetchRecordAction = fakeService.actions.fetchRecord(expectedResult, { onSuccess });

      stub(mockMapper, "normalize").returns(expectedResult);

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(onSuccess.firstCall.args[0]).to.deep.equal(expectedResult);
          },
        );
    });

    it("should fire The pushRecord action with the response", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const fetchRecordAction = fakeService.actions.fetchRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");

      stub(mockMapper, "normalize").returns(expectedResult);

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(pushRecordAction.calledWithMatch(expectedResult)).to.be.true;
          });
    });

    it("should not fire fetchItem if item exists in store when forceReload omitted", () => {
      const cachedItemId = fakeModels[0].id;
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, null);

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(mockAdapter.fetchItem.called).to.be.false;
          });
    });

    it("should fire fetchItem if item does not exist in store when forceReload omitted", () => {
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, null);

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(mockAdapter.fetchItem.called).to.be.true;
          });
    });

    it("should not fire fetchItem if item exists in store when forceReload false", () => {
      const cachedItemId = fakeModels[0].id;
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, { forceReload: false });

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(mockAdapter.fetchItem.called).to.be.false;
          });
    });

    it("should fire fetchItem if item does not exist in store when forceReload false", () => {
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, { forceReload: false });

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(mockAdapter.fetchItem.called).to.be.true;
          });
    });

    it("should fire fetchItem if item exists in store when forceReload true", () => {
      const cachedItemId = fakeModels[0].id;
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: cachedItemId }, { forceReload: true });

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(mockAdapter.fetchItem.called).to.be.true;
          });
    });

    it("should fire fetchItem if item does not exist in store when forceReload true", () => {
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: "LJHLJB" }, { forceReload: true });

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(mockAdapter.fetchItem.called).to.be.true;
          });
    });

    it("fetchRecordEpic should call normalize after deserialize", () => {
      const nonCachedItemId = 51;
      const deserializedObject = { name: "Zella puppy" };
      const fetchRecordAction = fakeService.actions.fetchRecord({ id: nonCachedItemId }, null);
      const normalizeStub = stub(fakeService.mapper, "normalize");

      stub(fakeService.serializer, "deserialize").returns(deserializedObject);

      fakeService.fetchRecordEpic(ActionsObservable.of(fetchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(normalizeStub.firstCall.args[0]).to.equal(deserializedObject);
          });
    });
  });

  it("has an epic for performing a CREATE request", () => {
    expect(fakeService.createRecordEpic).to.be.a("function");
  });

  describe("createRecordEpic", () => {
    it("createRecordEpic should call normalize after deserialize", () => {
      const onSuccess = spy();
      const expectedResult = { fullText: "zella puppy" };
      const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });
      const normalizeStub = stub(fakeService.mapper, "normalize");

      stub(fakeService.serializer, "deserialize").returns(expectedResult);

      fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(normalizeStub.firstCall.args[0]).to.equal(expectedResult);
          });
    });

    it("createRecordEpic should serialize the result from transform", () => {
      const onSuccess = spy();
      const expectedResult = { fullText: "zella puppy transform" };
      const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });

      stub(fakeService.mapper, "transform").returns(expectedResult);
      const serialStub = stub(fakeService.serializer, "serialize");

      fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(serialStub.firstCall.args[0]).to.equal(expectedResult);
          });
    });

    it("createRecordEpic should call transform before serialize", () => {
      const onSuccess = spy();
      const expectedResult = fakeModels[0];
      const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });
      const transformStub = stub(fakeService.mapper, "transform");

      fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(transformStub.firstCall.args[0]).to.equal(expectedResult);
          });
    });

    it("should fire the onSuccess callback with response", () => {
      const onSuccess = spy();
      const expectedResult = { fullText: "puppy" };
      const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });

      stub(fakeService.mapper, "normalize").returns(expectedResult);

      fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(onSuccess.calledWithMatch(expectedResult)).to.be.true;
          });
    });

    it("should fire pushRecord with response", () => {
      const onSuccess = spy();
      const expectedResult = { fullText: "puppy" };
      const createRecordAction = fakeService.actions.createRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");

      stub(fakeService.mapper, "normalize").returns(expectedResult);

      fakeService.createRecordEpic(ActionsObservable.of(createRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(pushRecordAction.calledWithMatch(expectedResult)).to.be.true;
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
    expect(fakeService.updateRecordEpic).to.be.a("function");
  });

  describe("updateRecordEpic", () => {
    it("should call updateItem with id and result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const expectedJSONResult = JSON.stringify(expectedResult.fullText);
      const updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess });

      stub(fakeService.serializer, "serialize").returns(expectedJSONResult);

      fakeService.updateRecordEpic(ActionsObservable.of(updateRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(mockAdapter.updateItem.calledWithMatch(expectedResult.id, expectedJSONResult)).to.be.true;
          });
    });

    it("updateRecordEpic should call normalize after deserialize", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "zella puppy" };
      const updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess });
      const normalizedStub = stub(fakeService.mapper, "normalize");

      stub(fakeService.serializer, "deserialize").returns(expectedResult);

      fakeService.updateRecordEpic(ActionsObservable.of(updateRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(normalizedStub.firstCall.args[0]).to.equal(expectedResult);
          });
    });

    it("updateRecordEpic should call serialize with the results from transform", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "zella puppy transform" };
      const updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess });

      stub(fakeService.mapper, "transform").returns(expectedResult);
      const serialStub = stub(fakeService.serializer, "serialize");

      fakeService.updateRecordEpic(ActionsObservable.of(updateRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(serialStub.firstCall.args[0]).to.equal(expectedResult);
          });
    });

    it("updateRecordEpic should call transform before serialize", () => {
      const onSuccess = spy();
      const expectedResult = fakeModels[0];
      const updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess });
      const transformStub = stub(fakeService.mapper, "transform");

      fakeService.updateRecordEpic(ActionsObservable.of(updateRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(transformStub.firstCall.args[0]).to.equal(expectedResult);
          });
    });

    it("should call onSuccess callback with result", () => {
      const onSuccess = spy();
      const expectedResult = { id: 123, fullText: "puppy" };
      const updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess });

      stub(fakeService.mapper, "normalize").returns(expectedResult);

      fakeService.updateRecordEpic(ActionsObservable.of(updateRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(onSuccess.calledWithMatch(expectedResult)).to.be.true;
          });
    });

    it("should call pushRecord with result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const updateRecordAction = fakeService.actions.updateRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");

      stub(fakeService.mapper, "normalize").returns(expectedResult);

      fakeService.updateRecordEpic(ActionsObservable.of(updateRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(pushRecordAction.firstCall.args[0]).to.deep.equal(expectedResult);

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
    expect(fakeService.patchRecordEpic).to.be.a("function");
  });

  describe("patchRecordEpic", () => {
    it("should call patchItem with id and expected result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const expectedJSONResult = JSON.stringify(expectedResult.fullText);
      const patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess });

      stub(fakeService.serializer, "serialize").returns(expectedJSONResult);

      fakeService.patchRecordEpic(ActionsObservable.of(patchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(mockAdapter.patchItem.calledWithMatch(expectedResult.id, expectedJSONResult)).to.be.true;
          });
    });

    it("calls normalize after deserialize", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "zella puppy normalize" };
      const patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess });
      const normalizedStub = stub(fakeService.mapper, "normalize");

      stub(fakeService.serializer, "deserialize").returns(expectedResult);

      fakeService.patchRecordEpic(ActionsObservable.of(patchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(normalizedStub.firstCall.args[0]).to.equal(expectedResult);
          });
    });

    it("calls transformPatch before serialize", () => {
      const expectedResult = fakeModels[0];
      const patchRecordAction = fakeService.actions.patchRecord(expectedResult);
      const transformStub = stub(fakeService.mapper, "transformPatch");

      return new Promise(resolve =>
        fakeService.patchRecordEpic(ActionsObservable.of(patchRecordAction), store)
          .subscribe(noop, noop, () => {
            expect(transformStub.firstCall.args[0]).to.equal(expectedResult);
            resolve();
          }),
      );
    });

    it("calls getItem to get the updated model from the store", () => {
      const expectedResult = { id: "123", fullText: lorem.slug() };
      const patchRecordAction = fakeService.actions.patchRecord(expectedResult);
      const getItemStub = stub(fakeService.selectors, "getItem");

      stub(fakeService.serializer, "serialize").returns(expectedResult);

      return new Promise(resolve =>
        fakeService.patchRecordEpic(ActionsObservable.of(patchRecordAction), store)
          .subscribe(noop, noop, () => {
            expect(getItemStub.firstCall.args[1]).to.equal(expectedResult.id);
            resolve();
          }),
      );
    });

    it("serializes the result from transformPatch", () => {
      const expectedResult = [{ op: "replace", path: "/fullText", value: lorem.slug() }];
      const patchRecordAction = fakeService.actions.patchRecord(expectedResult);

      stub(fakeService.mapper, "transformPatch").returns(expectedResult);
      const serialStub = stub(fakeService.serializer, "serialize");

      return new Promise(resolve => {
        fakeService.patchRecordEpic(ActionsObservable.of(patchRecordAction), store)
          .subscribe(noop, noop, () => {
            expect(serialStub.firstCall.args[0]).to.equal(expectedResult);
            resolve();
          });
      });
    });

    it("should call onSuccess with expected result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess });

      stub(fakeService.mapper, "normalize").returns(expectedResult);

      fakeService.patchRecordEpic(ActionsObservable.of(patchRecordAction), store)
        .subscribe(noop, noop,
          () => expect(onSuccess.firstCall.args[0]).to.deep.equal(expectedResult),
        );
    });

    it("should call pushRecord with expected result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const patchRecordAction = fakeService.actions.patchRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");

      stub(fakeService.mapper, "normalize").returns(expectedResult);

      fakeService.patchRecordEpic(ActionsObservable.of(patchRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(pushRecordAction.firstCall.args[0]).to.deep.equal(expectedResult);
          });
    });
  });

  it("has an epic for performing a DELETE request", () => {
    expect(fakeService.deleteRecordEpic).to.be.a("function");
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
            expect(mockAdapter.deleteItem.calledOnceWith(expectedResult.id)).to.be.true;
          });
    });

    it("deleteRecordEpic should call normalize after deserialize", () => {
      const onSuccess = spy();
      const expectedResult = { id: 123, fullText: "zella puppy" };
      const deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess });
      const normalizedStub = stub(fakeService.mapper, "normalize");

      stub(fakeService.serializer, "deserialize").returns(expectedResult);

      fakeService.deleteRecordEpic(ActionsObservable.of(deleteRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(normalizedStub.firstCall.args[0]).to.equal(expectedResult);
          });
    });

    it("should call onSuccess callback with result", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess });

      stub(fakeService.mapper, "normalize").returns(expectedResult);

      fakeService.deleteRecordEpic(ActionsObservable.of(deleteRecordAction), store)
        .subscribe(noop, noop,
          () => expect(onSuccess.firstCall.args[0]).to.deep.equal(expectedResult),
        );
    });

    it("should call pushRecord with response", () => {
      const onSuccess = spy();
      const expectedResult = { id: "123", fullText: "puppy" };
      const deleteRecordAction = fakeService.actions.deleteRecord(expectedResult, { onSuccess });
      const pushRecordAction = stub(fakeService.actions, "pushRecord");

      stub(fakeService.mapper, "normalize").returns(expectedResult);

      fakeService.deleteRecordEpic(ActionsObservable.of(deleteRecordAction), store)
        .subscribe(noop, noop,
          () => {
            expect(pushRecordAction.firstCall.args[0]).to.deep.equal(expectedResult);
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
        const newState = pushRecordReducer(state[serviceName], fakeService.actions.pushRecord(newItemData));
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

      beforeEach(() => {
        state$ = Observable.of(state);
        BaseService.setStateObservable(state$);
      });

      afterEach(() => {
        if (stubGetStateObservable) {
          stubGetStateObservable.restore();
        }
      });

      it("should return a QueryManager with the correct items by query", () => {
        const observable = fakeService.getByQuery(query);

        observable.take(1).subscribe((queryManager) => {
          expect(queryManager.items[0]).to.deep.equal(fakeModels[0]);
          expect(queryManager.items[1]).to.deep.equal(fakeModels[1]);
        });
      });

      it("should store the observable and return the same observable when given the same QueryBuilder", () => {
        const itemObservable = fakeService.getByQuery(query);
        const itemObservable2 = fakeService.getByQuery(query);

        expect(itemObservable).to.equal(itemObservable2);
      });

      it("should not call BaseService.getStateObservable when using a cached Observable", () => {
        stubGetStateObservable = stub(BaseService, "getStateObservable").returns(state$);

        fakeService.getByQuery(query);
        fakeService.getByQuery(query);

        expect(stubGetStateObservable)
          .to.have.property("callCount")
          .to.equal(1);
      });

      it("should call queryBuilder.invoke() if the state does not already have an IQueryCache for the given IQueryBuilder", () => {
        const fakeQuery = new QueryBuilder(serviceName, {
          page: random.number(),
          hello: random.word(),
        });

        const invokeStub = stub(fakeQuery, "invoke");
        fakeService.getByQuery(fakeQuery);

        expect(invokeStub.callCount).to.equal(1);
      });

      it("should not call queryBuilder.invoke() if the state already has an IQueryCache for the given IQueryBuilder", () => {
        const invokeStub = stub(query, "invoke");
        fakeService.getByQuery(query);

        expect(invokeStub.callCount).to.equal(0);
      });

      it("should return an IQueryManager", () => {
        const observable = fakeService.getByQuery(query);

        observable
          .take(1)
          .subscribe(queryManager => {
            expect(queryManager).to.be.an.instanceof(QueryManager);
          });
      });

      it("should return a new IQueryManager if the items change", () => {
        state$ = new Subject();

        BaseService.setStateObservable(
          state$.publishReplay(1).refCount(),
        );

        const newState = {
          [serviceName]: pushRecordReducer(state[serviceName], {
              type: random.word(),
              invoke: spy(),
              payload: fakeModels[2].applyUpdates({
                fullText: random.words(),
              }),
            },
          ),
        };

        let previousQueryManager;

        fakeService
          .getByQuery(query)
          .subscribe((queryManager) => {
            if (!previousQueryManager) {
              previousQueryManager = queryManager;
              state$.next(newState);
            } else {
              expect(queryManager).to.not.equal(previousQueryManager);
            }
          });

        state$.next(state);
      });

      it("should return a new IQueryManager if the IQueryCache changes", () => {
        state$ = new Subject();

        BaseService.setStateObservable(
          state$.publishReplay(1).refCount(),
        );

        const newState = {
          [serviceName]: setQueryResponseReducer(state[serviceName], {
            type: random.word(),
            invoke: spy(),
            payload: {
              query,
              isLoading: true,
            },
          }),
        };

        let previousQueryManager;

        fakeService
          .getByQuery(query)
          .subscribe((queryManager) => {
            if (!previousQueryManager) {
              previousQueryManager = queryManager;
              state$.next(newState);
            } else {
              expect(queryManager).to.not.equal(previousQueryManager);
            }
          });

        state$.next(state);
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
