// tslint:disable no-unused-expression
import { of as of$ } from "rxjs/observable/of";
import { _throw as throw$ } from "rxjs/observable/throw";

import { stub, spy } from "sinon";
import { random } from "faker";
import { createMockStore } from "redux-test-utils";

import { Map } from "immutable";
import { ActionsObservable } from "redux-observable";

import { QueryBuilder } from "../../../Query";
import { createMockFakeModel } from "../../../Model";
import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { initializeTestServices } from "../../../TestUtils";
import { DEFAULT_COALESCE_BUFFER_TIME } from "../../../Configure";

import { 
  loadRecord, 
  createBufferObservable, 
  fetchRecordEpic, 
  performBufferedRequest, 
} from "./FetchRecordEpic";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FetchRecordEpic", () => {
  let expectedResult;
  let context;
  let observable;

  beforeEach(() => {
    expectedResult = {
      id: random.number().toString(),
      fullText: random.word(),
    };

    context = {
      name: random.word(),
      types: {
        FETCH_RECORD: "FETCH_RECORD",
      },
      actions: {
        pushRecord: stub().callsFake(payload => ({
          type: "PUSH_RECORD",
          payload,
        })),
        setMetaField: stub().callsFake(payload => ({
          type: "SET_META_FIELD",
          payload,
        })),
        fetchAll: stub().callsFake(payload => ({
          type: "FETCH_ALL",
          payload,
        })),
        pushAll: stub().callsFake(payload => ({
          type: "PUSH_ALL",
          payload,
        })),
      },
      adapter: {
        fetchItem: stub().callsFake(id => {
          expectedResult.id = id;
          observable = of$(expectedResult);
          return observable;
        }),
      },
      serializer: {
        deserialize: stub().resolves(expectedResult),
      },
      mapper: {
        normalize: stub().resolves(expectedResult),
      },
    };
  });

  describe("loadRecord", () => {

    it("should pass the given id into the adapter.fetchItem", () => {
      return new Promise((resolve, reject) => {
        loadRecord(context)(expectedResult.id)
          .subscribe(() => {
            try {
              expect(
                context.adapter.fetchItem.firstCall.args[0],
              ).to.deep.equal(expectedResult.id);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it("should call serializer.deserialize with the response from adapter.fetchItem", () => {
      return new Promise((resolve, reject) => {
        loadRecord(context)(expectedResult.id)
          .subscribe(() => {
            try {
              expect(
                context.mapper.normalize.firstCall.args[0],
              ).to.deep.equal(expectedResult);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it("should call mapper.normalize with the response from serializer.deserialize", () => {
      return new Promise((resolve, reject) => {
        loadRecord(context)(expectedResult.id)
          .subscribe(() => {
            try {
              expect(
                context.mapper.normalize.firstCall.args[0],
              ).to.deep.equal(expectedResult);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it("should call actions.pushRecord with the deserialized response", () => {
      return new Promise((resolve, reject) => {
        loadRecord(context)(expectedResult.id)
          .subscribe(() => {
            try {
              expect(
                context.actions.pushRecord.firstCall.args[0],
              ).to.deep.equal(expectedResult);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it("should resolve with the output from creating a pushRecord action", () => {
      return new Promise((resolve, reject) => {
        loadRecord(context)(expectedResult.id)
          .subscribe((action) => {
            try {
              expect(action).to.deep.equal({
                type: "PUSH_RECORD",
                payload: expectedResult,
              });
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it("should call actions.setMetaField with the given errors if the adapter.fetchItem observable throws", () => {
      const errors = random.words();
      const error = { xhr: { response: errors } };
      context.adapter.fetchItem = stub().returns(throw$(error));

      return new Promise((resolve, reject) => {
        loadRecord(context)(expectedResult.id)
          .subscribe(() => {
            try {
              expect(
                context.actions.setMetaField.firstCall.args[0],
              ).to.deep.equal({
                id: expectedResult.id,
                errors,
              });
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });

    it("should resolve with the output from creating a setMetaField action when the adapter.fetchItem observable throws", () => {
      const errors = random.words();
      const error = { xhr: { response: errors } };
      context.adapter.fetchItem = stub().returns(throw$(error));

      return new Promise((resolve, reject) => {
        loadRecord(context)(expectedResult.id)
          .subscribe((action) => {
            try {
              expect(action).to.deep.equal({
                type: "SET_META_FIELD",
                payload: {
                  id: expectedResult.id,
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

  describe("createBufferObservable", () => {
    const firstTimeOutPeriod = DEFAULT_COALESCE_BUFFER_TIME + 1;

    it("should emit a FETCH_ALL action if multiple items are requested within the given period", () => {
      const firstId = random.number().toString();
      const secondId = random.number().toString();
      const thirdId = random.number().toString();
      
      const secondTimeOutPeriod = firstTimeOutPeriod + 1;
      
      const bufferObservable = createBufferObservable(context)(firstId);

      let action;
      bufferObservable
        .take(1)
        .subscribe(a => action = a);

      bufferObservable.next(secondId);

      setTimeout(() => {
        bufferObservable.next(thirdId);
      }, firstTimeOutPeriod);

      const queryBuilder = new QueryBuilder(context.name, { ids: [firstId, secondId] });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            expect(action).to.deep.equal({
              type: "FETCH_ALL",
              payload: queryBuilder,
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        }, secondTimeOutPeriod);
      });
    });

    it("should emit a PUSH_RECORD action after loading the requested item if only one is requested within the given period", () => {
      const firstId = random.number().toString();
      const secondId = random.number().toString();
      const secondTimeOutPeriod = firstTimeOutPeriod + 1;
      
      const bufferObservable = createBufferObservable(context)(firstId);

      let action;
      bufferObservable
        .take(1)
        .subscribe(a => action = a);

      setTimeout(() => {
        bufferObservable.next(secondId);
      }, firstTimeOutPeriod);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            expect(action).to.deep.equal({
              type: "PUSH_RECORD",
              payload: {
                id: firstId,
                fullText: expectedResult.fullText,
              },
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        }, secondTimeOutPeriod);
      });
    });

    it("should emit separate actions if called again after the given timeout period", () => {
      const firstId = random.number().toString();
      const secondId = random.number().toString();      
      const secondTimeOutPeriod = firstTimeOutPeriod * 2;

      const bufferObservable = createBufferObservable(context)(firstId);
      
      let action;
      setTimeout(() => {
        bufferObservable.next(secondId);
        bufferObservable
          .take(1)
          .subscribe(a => action = a);
      }, firstTimeOutPeriod);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            expect(action).to.deep.equal({
              type: "PUSH_RECORD",
              payload: {
                id: secondId,
                fullText: expectedResult.fullText,
              },
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        }, secondTimeOutPeriod);
      });
    });

    it("should emit a single action if not called with another buffer", () => {
      const id = random.number().toString();

      const bufferObservable = createBufferObservable(context)(id);

      let action;
      bufferObservable
        .take(1)
        .subscribe(a => action = a);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            expect(action).to.deep.equal({
              type: "PUSH_RECORD",
              payload: {
                id,
                fullText: expectedResult.fullText,
              },
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        }, DEFAULT_COALESCE_BUFFER_TIME + 1);
      });
    });

  });

  describe("performBufferedRequest", () => {

    it("should emit a FETCH_ALL action if multiple items are requested within the given period", () => {
      const firstId = random.number().toString();
      const secondId = random.number().toString();
      const thirdId = random.number().toString();
      const fourthId = random.number().toString();
      const firstTimeOutPeriod = DEFAULT_COALESCE_BUFFER_TIME + 1;
      const secondTimeOutPeriod = DEFAULT_COALESCE_BUFFER_TIME + 2;

      const performRequest = performBufferedRequest(context);
      
      const sut = performRequest(firstId);

      let action;
      sut
        .take(1)
        .subscribe(a => action = a);

      performRequest(secondId);
      performRequest(thirdId);

      setTimeout(() => {
        performRequest(fourthId);
      }, firstTimeOutPeriod);

      const queryBuilder = new QueryBuilder(context.name, { ids: [firstId, secondId, thirdId] });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            expect(action).to.deep.equal({
              type: "FETCH_ALL",
              payload: queryBuilder,
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        }, secondTimeOutPeriod);
      });
    });

    it("should return an empty observable when it's called subsequent times with the same context name within the timeout period", () => {
      const id = random.number().toString();
      const secondId = random.number().toString();

      const performRequest = performBufferedRequest(context);
      performRequest(id);

      const spies = {
        next: spy(),
        complete: spy(),
      };

      performRequest(secondId)
        .subscribe(spies);

      expect(spies.next.callCount).to.equal(0, "it should not call next method when subscribing");
      expect(spies.complete.callCount).to.equal(1, "it should complete immediately");
    });

    it("should return separate buffered observables for contexts of different names", () => {
      const firstId = random.number().toString();
      const secondId = random.number().toString();      
      const timeoutPeriod = DEFAULT_COALESCE_BUFFER_TIME + 2;

      const firstPerformRequest = performBufferedRequest(context);
      const newContext = {
        ...context,
        name: random.word(),
      };
      const secondPerformRequest = performBufferedRequest(newContext);
      
      firstPerformRequest(firstId);
      const sut = secondPerformRequest(secondId);
      let action;
      sut
        .take(1)
        .subscribe(a => action = a);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            expect(action).to.deep.equal({
              type: "PUSH_RECORD",
              payload: {
                fullText: expectedResult.fullText,
                id: secondId,
              },
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        }, timeoutPeriod);
      });
    });

    it("should subscribe to a new buffered observable for contexts of the same name when requested after the timeout period", () => {
      const id = random.number().toString();
      const secondId = random.number().toString();
      const firstTimeOutPeriod = DEFAULT_COALESCE_BUFFER_TIME + 1;
      const secondTimeOutPeriod = firstTimeOutPeriod * 2;

      const performRequest = performBufferedRequest(context);

      performRequest(id)
        .take(1)
        .subscribe();

      let action;
      setTimeout(() => {
        performRequest(secondId)
          .take(1)
          .subscribe(a => action = a);
      }, firstTimeOutPeriod);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            expect(action).to.deep.equal({
              type: "PUSH_RECORD",
              payload: {
                fullText: expectedResult.fullText,
                id: secondId,
              },
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        }, secondTimeOutPeriod);
      });
    });

    it("should complete the buffered observable after it emits once to prevent memory leaks", () => {
      const id = random.number().toString();

      const spies = {
        next: spy(),
        complete: spy(),
      };

      const performRequest = performBufferedRequest(context);      

      performRequest(id)
        .subscribe(spies);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            expect(spies.complete.callCount).to.equal(1, "it should complete immediately");
            resolve();
          } catch (e) {
            reject(e);
          }
        }, DEFAULT_COALESCE_BUFFER_TIME + 1);
      });
    });

  });

  describe("fetchRecordEpic", () => {
    let item;
    let state;
    let store;

    beforeEach(() => {
      item = createMockFakeModel();

      state = DataServiceStateRecord({
        items: Map({
          [item.id]: item,
        }),
      });
      store = createMockStore(state);

      initializeTestServices({}, { coalesceFindRequests: false });
    });

    describe("when coalesceFindRequests is true", () => {

      const timeOutPeriod = DEFAULT_COALESCE_BUFFER_TIME + 1;

      beforeEach(() => {
        initializeTestServices({}, { coalesceFindRequests: true });
      });

      it("should emit a FETCH_ALL action from the first observable when called multiple times within the timeout period", () => {
        const id = random.number().toString();
        const secondId = random.number().toString();        

        const epic = fetchRecordEpic(context);
        const observableAction = ActionsObservable.of({
          type: context.types.FETCH_RECORD,
          payload: { id },
        });
        const sut = epic(observableAction, store);

        let action;
        sut
          .take(1)
          .subscribe(a => action = a);

        const secondObservableAction = ActionsObservable.of({
          type: context.types.FETCH_RECORD,
          payload: { id: secondId },
        });

        epic(secondObservableAction, store)
          .subscribe();

        const queryBuilder = new QueryBuilder(context.name, { ids: [id, secondId] });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              expect(action).to.deep.equal({
                type: "FETCH_ALL",
                payload: queryBuilder,
              });
              resolve();
            } catch (e) {
              reject(e);
            }
          }, timeOutPeriod);
        });
      });

      it("should emit a PUSH_RECORD action from the observable when called once", () => {
        const id = random.number().toString();

        const observableAction = ActionsObservable.of({
          type: context.types.FETCH_RECORD,
          payload: { id },
        });

        const epic = fetchRecordEpic(context);
        const sut = epic(observableAction, store);

        let action;
        sut
          .take(1)
          .subscribe(a => action = a);

        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              expect(action).to.deep.equal({
                type: "PUSH_RECORD",
                payload: { 
                  fullText: expectedResult.fullText,
                  id, 
                },
              });
              resolve();
            } catch (e) {
              reject(e);
            }
          }, timeOutPeriod);
        });
      });

    });

    describe("when coalesceFindRequests is false", () => {
      const shortTimeout = DEFAULT_COALESCE_BUFFER_TIME / 2.0;
      const promiseTimeout = DEFAULT_COALESCE_BUFFER_TIME + 2;

      it("should not buffer the request", () => {
        const id = random.number().toString();
        const secondId = random.number().toString();
        const sut = createBufferObservable(context);

        let action;
        sut(id)
          .subscribe(a => action = a);

        setTimeout(() => {
          sut(secondId);
        }, shortTimeout);

        const queryBuilder = new QueryBuilder(context.name, { ids: [id, secondId] });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              expect(action).to.not.equal({
                type: "FETCH_ALL",
                payload: queryBuilder,
              });
              resolve();
            } catch (e) {
              reject(e);
            }
          }, promiseTimeout);
        });
      });

      it("should emit a PUSH_RECORD action for the requested item", () => {
        const id = random.number().toString();
        const secondId = random.number().toString();
        
        const sut = createBufferObservable(context);

        let action;
        sut(id)
          .subscribe(a => action = a);

        setTimeout(() => {
          sut(secondId);
        }, shortTimeout);

        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              expect(action).to.not.equal({
                type: "PUSH_RECORD",
                payload: {
                  fullText: expectedResult.fullText,
                  id: secondId,
                },
              });
              resolve();
            } catch (e) {
              reject(e);
            }
          }, promiseTimeout);
        });
      });
    });

    describe("caching", () => {

      it("should fire fetchItem if item does not exist in store", () => {

        const id = random.number().toString();

        const epic = fetchRecordEpic(context);
        const action = {
          type: context.types.FETCH_RECORD,
          payload: { id },
        };

        const observableAction = ActionsObservable.of(action);

        epic(observableAction, store)
          .subscribe();

        expect(context.adapter.fetchItem.firstCall.args[0]).to.equal(id);
      });

      it("should not fire fetchItem if item exists in store when forceReload omitted", () => {

        initializeTestServices({}, { coalesceFindRequests: false });

        const id = item.id;

        const epic = fetchRecordEpic(context);
        const action = {
          type: context.types.FETCH_RECORD,
          payload: { id },
          meta: {},
        };

        const observableAction = ActionsObservable.of(action);

        epic(observableAction, store)
          .subscribe();

        expect(context.adapter.fetchItem.callCount).to.equal(0);
      });

      it("should not fire fetchItem if item exists in store when forceReload false", () => {
        initializeTestServices({}, { coalesceFindRequests: false });

        const id = item.id;

        const epic = fetchRecordEpic(context);
        const action = {
          type: context.types.FETCH_RECORD,
          payload: { id },
          meta: { forceReload: false },
        };

        const observableAction = ActionsObservable.of(action);

        epic(observableAction, store)
          .subscribe();

        expect(context.adapter.fetchItem.callCount).to.equal(0);
      });

      it("should fire fetchItem if item exists in store when forceReload true", () => {
        initializeTestServices({}, { coalesceFindRequests: false });

        const id = item.id;

        const epic = fetchRecordEpic(context);
        const action = {
          type: context.types.FETCH_RECORD,
          payload: { id },
          meta: { forceReload: true },
        };

        const observableAction = ActionsObservable.of(action);

        epic(observableAction, store)
          .subscribe();

        expect(context.adapter.fetchItem.firstCall.args[0]).to.equal(id);
      });

    });

  });
});
