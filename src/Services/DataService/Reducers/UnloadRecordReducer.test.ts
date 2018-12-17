// tslint:disable no-unused-expression

import { Map } from "immutable";

import { stub, spy } from "sinon";
import { random } from "faker";

import { createMockFakeModel } from "../../../Model/Model.mock";
import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { unloadRecordReducer } from "./UnloadRecordReducer";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("unloadRecordReducer", () => {

  describe("when the item to be removed exists in the state", () => {
    let item;
    let action;
    let state;

    beforeEach(() => {
      item = createMockFakeModel();
      action = {
        type: random.word(),
        invoke: spy(),
        payload: {
          id: item.id,
        },
      };
      state = DataServiceStateRecord({
        items: Map({
          [item.id]: item,
        }),
      });
    });

    it("removes the given item from the state", () => {
      const newState = unloadRecordReducer(state, action);

      expect(
        newState.items.has(item.id),
      ).to.be.false;
    });

    it(`calls "markForDestruction" on the model to be removed`, () => {
      const markForDestructionStub = stub(item, "markForDestruction");

      unloadRecordReducer(state, action);

      expect(
        markForDestructionStub.calledOnce,
      ).to.be.true;
    });

  });

  describe("when the item to be removed does not exist in the state", () => {

    it("removing a nonexistent item id from the state returns the same state", () => {
      const item = createMockFakeModel();
      const state = DataServiceStateRecord();

      const action = {
        type: random.word(),
        invoke: spy(),
        payload: {
          id: item.id,
        },
      };

      const newState = unloadRecordReducer(state, action);

      expect(newState).to.equal(state);
    });

  });

});
