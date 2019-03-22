// tslint:disable no-unused-expression
import "rxjs/add/operator/mergeMap";

import { Map } from "immutable";
import { ActionsObservable } from "redux-observable";
import { createMockStore } from "redux-test-utils";
import { of as of$ } from "rxjs/observable/of";
import { interval as interval$, interval } from "rxjs/observable/interval";

import { random } from "faker";
import { stub } from "sinon";

import { FakeModel } from "../../../Model";
import { createRecordEpic as CreateRecordEpic } from "./CreateRecordEpic";
import { DataServiceStateRecord } from "../DataServiceStateRecord";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

const noop = () => null;

describe("CreateRecordEpic", () => {
  let context;
  let createRecordEpic;
  let newModel;
  let savedModel;
  let store;

  beforeEach(() => {
    newModel = {
      id: "new-1",
      fullText: random.word(),
    };

    savedModel = {
      id: "1",
      fullText: newModel.fullText,
    };

    store = createMockStore(DataServiceStateRecord({
      items: Map({
        [newModel.id]: newModel,
      }),
      cancelableRequests: Map(),
    }));

    context = {
      types: {
        CREATE_RECORD: "CREATE_RECORD",
        CANCEL_REQUEST: "CANCEL_REQUEST",
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
        unloadRecord: stub().callsFake(payload => ({
          type: "UNLOAD_RECORD",
          payload,
        })),
      },
      adapter: {
        createItem: stub().callsFake(serializedModel => {
          return of$(JSON.stringify(newModel));
        }),
      },
      mapper: {
        normalize: stub().callsFake(modelData => new FakeModel(modelData)),
        transform: stub().callsFake(model => model),
      },
      serializer: {
        deserialize: stub().callsFake(payload => JSON.parse(payload)),
        serialize: stub().callsFake(transformedModel => JSON.stringify(transformedModel)),
      },
    };

    createRecordEpic = CreateRecordEpic(context);
  });

  // it("should call normalize after deserialize", () => {
  //   const createRecordAction = ActionsObservable.of({
  //     type: context.types.CREATE_RECORD,
  //     payload: { id: newModel.id },
  //     meta: { onSuccess: stub(), onError: stub() },
  //   });
  //   return new Promise((resolve, reject) => {
  //     createRecordEpic(createRecordAction, store)
  //       .subscribe(() => {
  //         try {
  //           expect(context.mapper.normalize.firstCall.args[0]).to.equal(savedModel);
  //           resolve();
  //         } catch (e) {
  //           reject(e);
  //         }
  //       });
  //   });
  // });

  // it("should prevent adapter.createItem from emitting when a cancel request is received", () => {
  //   const createRecordAction = of$({
  //     type: context.types.CREATE_RECORD,
  //     payload: { id: newModel.id },
  //     meta: { onSuccess: stub(), onError: stub() },
  //   });

  //   const fakeAction = {
  //     ofType: (actionType) => {
  //       if (actionType === context.types.CREATE_RECORD) {
  //         return createRecordAction;
  //       } else if (actionType === context.types.CANCEL_REQUEST) {
  //         return of$({
  //           type: context.types.CANCEL_REQUEST,
  //           payload: { id: newModel.id },
  //         });
  //       } else {
  //         return of$({});
  //       }
  //     },
  //   };

  //   context.adapter.createItem = interval$(500);

  //   return new Promise((resolve, reject) => {
  //     createRecordEpic(fakeAction, store)
  //     .subscribe(noop, noop,
  //       () => {
  //         try {
  //           expect(context.serializer.deserialize.callCount).to.equal(0, "it should not call deserialize");
  //           resolve();
  //         } catch (e) {
  //           reject(e);
  //         }
  //       });
  //   });
  // });

  // it("should not prevent adapter.createItem from emitting when a cancel request is not received", () => {
  //   const createRecordAction = of$({
  //     type: context.types.CREATE_RECORD,
  //     payload: { id: newModel.id },
  //     meta: { onSuccess: stub(), onError: stub() },
  //   });

  //   const fakeAction = {
  //     ofType: (actionType) => {
  //       if (actionType === context.types.CREATE_RECORD) {
  //         return createRecordAction;
  //       } else if (actionType === context.types.CANCEL_REQUEST) {
  //         return interval(500).mapTo({
  //           type: context.types.CANCEL_REQUEST,
  //           payload: { id: newModel.id },
  //         });
  //       } else {
  //         return of$({});
  //       }
  //     },
  //   };

  //   return new Promise((resolve, reject) => {
  //     createRecordEpic(fakeAction, store)
  //     .subscribe(noop, noop,
  //       () => {
  //         try {
  //           expect(context.serializer.deserialize.callCount).to.equal(1, "it should call deserialize");
  //           resolve();
  //         } catch (e) {
  //           reject(e);
  //         }
  //       });
  //   });
  // });

  it("should serialize the result from transform", () => {
    const createRecordAction = ActionsObservable.of({
      type: context.types.CREATE_RECORD,
      payload: { id: newModel.id },
      meta: { onSuccess: stub(), onError: stub() },
    });
    return new Promise((resolve, reject) => {
      createRecordEpic(createRecordAction, store)
      .subscribe(noop, noop,
        () => {
          try {
            expect(context.serializer.serialize.firstCall.args[0]).to.equal(newModel);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
    });
  });

  it("should call transform before serialize", () => {
    const createRecordAction = ActionsObservable.of({
      type: context.types.CREATE_RECORD,
      payload: { id: newModel.id },
      meta: { onSuccess: stub(), onError: stub() },
    });
    return new Promise((resolve, reject) => {
      createRecordEpic(createRecordAction, store)
      .subscribe(noop, noop,
        () => {
          try {
            expect(context.mapper.transform.firstCall.args[0]).to.equal(newModel);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
    });
  });

  // it("should fire the onSuccess callback with response", () => {
  //   const onSuccess = spy();

  //   const createRecordAction = ActionsObservable.of({
  //     type: context.types.CREATE_RECORD,
  //     payload: { id: expectedResult.id },
  //     meta: { onSuccess },
  //   });

  //   createRecordEpic(createRecordAction, store)
  //     .subscribe(noop, noop,
  //       () => {
  //         expect(onSuccess.calledWithMatch(expectedResult)).to.be.true;
  //       });
  // });

  // it("should fire pushRecord with response", () => {
  //   const createRecordAction = ActionsObservable.of({
  //     type: context.types.CREATE_RECORD,
  //     payload: { id: expectedResult.id },
  //   });

  //   const pushRecordStub = context.actions.pushRecord;

  //   createRecordEpic(createRecordAction, store)
  //     .subscribe(noop, noop,
  //       () => {
  //         expect(pushRecordStub.calledWithMatch(expectedResult)).to.be.true;
  //       });
  // });

  // it("should use the store's getState method", () => {
  //   const createRecordAction = ActionsObservable.of({
  //     type: context.types.CREATE_RECORD,
  //     payload: { id: expectedResult.id },
  //   });

  //   const getStateStub = stub(store, "getState");

  //   createRecordEpic(createRecordAction, store)
  //     .subscribe(noop, noop,
  //       () => {
  //         expect(getStateStub.callCount).to.equal(1);
  //       });
  // });

});
