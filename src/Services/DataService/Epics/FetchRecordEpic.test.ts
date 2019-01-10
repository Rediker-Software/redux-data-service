// tslint:disable no-unused-expression
import { of as of$ } from "rxjs/observable/of";
import { _throw as throw$ } from "rxjs/observable/throw";

import { stub, spy } from "sinon";
import { lorem, random } from "faker";

import { loadRecord, createBufferObservable, fetchRecordEpic } from "./FetchRecordEpic";
import { ActionsObservable } from "redux-observable";

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

    observable = of$(expectedResult);

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
      },
      adapter: {
        fetchItem: stub().returns(observable),
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
      const error = { xhr: { response: errors }};
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
      const error = { xhr: { response: errors }};
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

    it("should emit a FETCH_ALL action if multiple items are requested within the given period", () => {
      expect(false).to.be.true;
    });

    it("should emit a PUSH_RECORD action after loading the requested item if only one is requested within the given period", () => {
      expect(false).to.be.true;
    });

    it("should emit separate actions if called again after the given timeout period", () => {
      expect(false).to.be.true;
    });

  });

  describe("performBufferedRequest", () => {

    it("should return a buffered observable the first time it is called", () => {
      expect(false).to.be.true;
    });

    it("should return an empty observable subsequent times it is called with the same context name within the timeout period", () => {
      expect(false).to.be.true;
    });

    it("should return separate buffered observables for contexts of different names", () => {
      expect(false).to.be.true;
    });

    it("should subscribe to the same buffered observable for contexts of the same name when requested within the timeout period", () => {
      expect(false).to.be.true;
    });

    it("should subscribe to a new buffered observable for contexts of the same name when requested after the timeout period", () => {
      expect(false).to.be.true;
    });

    it("should complete the buffered observable after it emits once to prevent memory leaks", () => {
      expect(false).to.be.true;
    });

  });

  describe("fetchRecordEpic", () => {

    describe("when coalesceFindRequests is true", () => {

      it("should buffer the request", () => {
        expect(false).to.be.true;
      });

      it("should emit a FETCH_ALL action from the first observable when called multiple times within the timeout period", () => {
        expect(false).to.be.true;
      });

      it("should emit a PUSH_RECORD action from the observable when called once", () => {
        expect(false).to.be.true;
      });

    });

    describe("when coalesceFindRequests is false", () => {

      it("should not buffer the request", () => {
        expect(false).to.be.true;
      });

      it("should emit a PUSH_RECORD action for the requested item", () => {
        expect(false).to.be.true;
      });

    });

    describe("caching", () => {

      it("should fire fetchItem if item does not exist in store", () => {
        expect(false).to.be.true;
      });

      it("should not fire fetchItem if item exists in store when forceReload omitted", () => {
        expect(false).to.be.true;
      });

      it("should not fire fetchItem if item exists in store when forceReload false", () => {
        expect(false).to.be.true;
      });

      it("should fire fetchItem if item exists in store when forceReload true", () => {
        expect(false).to.be.true;
      });

    });

  });

});
