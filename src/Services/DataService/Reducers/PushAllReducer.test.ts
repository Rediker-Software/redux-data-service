// tslint:disable:no-empty max-classes-per-file no-unused-expression
import "rxjs/add/observable/of";

import { random } from "faker";
import { Map } from "immutable";
import { spy, stub } from "sinon";

import { IModel } from "../../../Model/IModel";
import { createMockFakeModels, IFakeModelData } from "../../../Model/Model.mock";
import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { pushAllReducer } from "./PushAllReducer";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("pushAllReducer", () => {
  let items;

  beforeEach(() => {
    items = createMockFakeModels() as IModel<IFakeModelData>[];
  });

  it("adds the given array of items to the state", () => {
    const state = new DataServiceStateRecord();

    const action = {
      type: random.word(),
      invoke: spy(),
      payload: { items },
    };

    const updatedState = pushAllReducer(state, action);

    expect(
      updatedState.items.toList().toJS(),
    ).to.deep.equal(items);
  });

  it("calls markForDestruction on the old items when they are being replaced", () => {
    const markForDestructionSpies = [];
    items.forEach((item, index) => {
      markForDestructionSpies[index] = stub(item, "markForDestruction");
    });

    let itemsMap = Map<string, IModel<IFakeModelData>>();
    items.forEach(item => {
      itemsMap = itemsMap.update(item.id, itemToUpdate => item);
    });
    const state = DataServiceStateRecord({
      items: itemsMap,
    });

    const newItems = items.map(item => ({ ...item, fullText: random.word(), id: item.modelData.id }));

    const action = {
      type: random.word(),
      invoke: spy(),
      payload: { items: newItems },
    };

    pushAllReducer(state, action);

    markForDestructionSpies.forEach(destructionSpy => expect(destructionSpy.calledOnce).to.be.true);
  });

});
