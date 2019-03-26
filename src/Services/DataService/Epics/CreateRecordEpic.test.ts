// tslint:disable no-unused-expression
import "rxjs/add/operator/mergeMap";

import { Map } from "immutable";
import { ActionsObservable } from "redux-observable";
import { createMockStore } from "redux-test-utils";
import { of as of$ } from "rxjs/observable/of";
import { interval as interval$, interval } from "rxjs/observable/interval";

import { random } from "faker";
import { spy, stub } from "sinon";

import { FakeModel } from "../../../Model";
import { createRecordEpic as CreateRecordEpic } from "./CreateRecordEpic";
import { DataServiceStateRecord } from "../DataServiceStateRecord";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("CreateRecordEpic", () => {
  let context;
  let createRecordAction;
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

    store = createMockStore({
      testModel: DataServiceStateRecord({
        items: Map({
          [newModel.id]: newModel,
        }),
      }),
    });

    context = {
      name: "testModel",
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
        createItem: stub().returns(of$(JSON.stringify(savedModel))),
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

    createRecordAction = ActionsObservable.of({
      type: context.types.CREATE_RECORD,
      payload: { id: newModel.id },
      meta: { onSuccess: stub(), onError: stub() },
    });
  });

  it("should call normalize after deserialize", () => {
    return new Promise((resolve, reject) => {
      createRecordEpic(createRecordAction, store)
        .subscribe(() => {
          try {
            expect(context.mapper.normalize.firstCall.args[0]).to.deep.equal(savedModel);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
    });
  });

  it("should prevent adapter.createItem from emitting when a cancel request is received", () => {
    const fakeAction = {
      ofType: (actionType) => {
        if (actionType === context.types.CREATE_RECORD) {
          return createRecordAction;
        } else if (actionType === context.types.CANCEL_REQUEST) {
          return of$({
            type: context.types.CANCEL_REQUEST,
            payload: { id: newModel.id },
          });
        } else {
          return of$({});
        }
      },
    };

    context.adapter.createItem = interval$(500);

    return new Promise((resolve, reject) => {
      createRecordEpic(fakeAction, store)
      .subscribe(() => {
          try {
            expect(context.serializer.deserialize.callCount).to.equal(0, "it should not call deserialize");
            resolve();
          } catch (e) {
            reject(e);
          }
        });
    });
  });

  it("should not prevent adapter.createItem from emitting when a cancel request is not received", () => {
    const fakeAction = {
      ofType: (actionType) => {
        if (actionType === context.types.CREATE_RECORD) {
          return createRecordAction;
        } else if (actionType === context.types.CANCEL_REQUEST) {
          return interval(500).mapTo({
            type: context.types.CANCEL_REQUEST,
            payload: { id: newModel.id },
          });
        } else {
          return of$({});
        }
      },
    };

    return new Promise((resolve, reject) => {
      createRecordEpic(fakeAction, store)
      .subscribe(() => {
          try {
            expect(context.serializer.deserialize.callCount).to.equal(1, "it should call deserialize");
            resolve();
          } catch (e) {
            reject(e);
          }
        });
    });
  });

  it("should serialize the result from transform", () => {
    return new Promise((resolve, reject) => {
      createRecordEpic(createRecordAction, store)
      .subscribe(() => {
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
    return new Promise((resolve, reject) => {
      createRecordEpic(createRecordAction, store)
      .subscribe(() => {
          try {
            expect(context.mapper.transform.firstCall.args[0]).to.equal(newModel);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
    });
  });

  it("should fire the onSuccess callback with response", () => {
    const onSuccess = spy();

    createRecordAction = ActionsObservable.of({
      type: context.types.CREATE_RECORD,
      payload: { id: newModel.id },
      meta: { onSuccess, onError: stub() },
    });

    return new Promise((resolve, reject) => {
      createRecordEpic(createRecordAction, store)
      .subscribe(() => {
          try {
            expect(onSuccess.calledWithMatch(savedModel)).to.be.true;
            resolve();
          } catch (e) {
            reject(e);
          }
        });
    });
  });

  it("should fire pushRecord with response", () => {
    return new Promise((resolve, reject) => {
      createRecordEpic(createRecordAction, store)
      .subscribe(() => {
          try {
            expect(context.actions.pushRecord.calledWithMatch(savedModel)).to.be.true;
            resolve();
          } catch (e) {
            reject(e);
          }
        });
    });
  });

  it("should use the store's getState method", () => {
    const getStateSpy = spy(store, "getState");

    return new Promise((resolve, reject) => {
      createRecordEpic(createRecordAction, store)
      .subscribe(() => {
          try {
            expect(getStateSpy.callCount).to.equal(1);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
    });
  });
});
