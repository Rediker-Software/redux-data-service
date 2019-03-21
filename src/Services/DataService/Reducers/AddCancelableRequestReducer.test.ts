// tslint:disable no-unused-expression
import { random } from "faker";
import { spy } from "sinon";

import { DataServiceStateRecord } from "../DataServiceStateRecord";

import { addCancelableRequestReducer } from "./AddCancelableRequestReducer";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("addCancelableRequestReducer", () => {
  let state;

  beforeEach(() => {
    state = DataServiceStateRecord();
  });

  it("adds a Subject to the state with the given id as a key", () => {
    const idToAdd = random.number();
    const newState = addCancelableRequestReducer(state, {
      type: random.word(),
      invoke: spy(),
      payload: { id: idToAdd },
    });

    expect(newState.cancelableRequests.has(idToAdd)).to.be.true;
  });

  it("replaces the existing item in the state if one exists with its id", () => {
    const idToAdd = random.number();
    let newState = addCancelableRequestReducer(state, {
      type: random.word(),
      invoke: spy(),
      payload: { id: idToAdd },
    });

    newState.cancelableRequests.get(idToAdd).subscribe();

    newState = addCancelableRequestReducer(newState, {
      type: random.word(),
      invoke: spy(),
      payload: { id: idToAdd },
    });

    expect(newState.cancelableRequests.get(idToAdd).observers).to.have.lengthOf(0);
  });

});
