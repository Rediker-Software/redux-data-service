// tslint:disable no-unused-expression

import { Map } from "immutable";

import { spy, stub } from "sinon";
import { random } from "faker";

import { createMockFakeModels } from "../../../Model/Model.mock";
import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { unloadAllReducer } from "./UnloadAllReducer";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("unloadAllReducer", () => {

  describe("when the item to be removed exists in the state", () => {
    let items;
    let action;
    let state;

    beforeEach(() => {
      items = createMockFakeModels(3);
      action = {
        type: random.word(),
        invoke: spy(),
      };
      state = DataServiceStateRecord({
        items: Map({
          [items[0].id]: items[0],
          [items[1].id]: items[1],
          [items[2].id]: items[2],
        }),
      });
    });

    it("returns a new state with no items", () => {
      const newState = unloadAllReducer(state, action);

      expect(
        newState.items.isEmpty(),
      ).to.be.true;
    });

    it(`calls "markForDestruction" on each existing model in the state`, () => {
      items.forEach(item => {
        stub(item, "markForDestruction");
      });

      unloadAllReducer(state, action);

      items.forEach(item => {
        expect(
          item.markForDestruction.calledOnce,
        ).to.be.true;
      });
    });

  });

});
