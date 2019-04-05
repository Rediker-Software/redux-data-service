// tslint:disable:no-empty max-classes-per-file no-unused-expression

import { Map } from "immutable";

import { random } from "faker";
import { spy, stub } from "sinon";

import { createMockFakeModel } from "../../../Model/Model.mock";
import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { pushRecordReducer } from "./PushRecordReducer";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("pushRecordReducer", () => {
  let item;

  beforeEach(() => {
    item = createMockFakeModel();
  });

  it("adds the given item to the state if one does not exist with its id", () => {
    const state = DataServiceStateRecord();
    const newState = pushRecordReducer(state, {
      type: random.word(),
      invoke: spy(),
      payload: item,
    });

    expect(
      newState.items.get(item.id),
    ).to.equal(item);
  });

  it("replaces the existing item in the state if one exists with its id", () => {
    const state = DataServiceStateRecord({
      items: Map({
        [item.id]: item,
      }),
    });

    const newItem = createMockFakeModel({
      id: item.id,
    });

    const newState = pushRecordReducer(state, {
      type: random.word(),
      invoke: spy(),
      payload: newItem,
    });

    expect(
      newState.items.get(item.id),
    ).to.equal(newItem);
  });

  it("calls markForDestruction on the old item when it is being replaced with a new one", () => {
    const markForDestructionStub = stub(item, "markForDestruction");

    const state = DataServiceStateRecord({
      items: Map({
        [item.id]: item,
      }),
    });

    const newItem = createMockFakeModel({
      id: item.id,
    });

    pushRecordReducer(state, {
      type: random.word(),
      invoke: spy(),
      payload: newItem,
    });

    expect(markForDestructionStub.calledOnce).to.be.true;
  });

});
