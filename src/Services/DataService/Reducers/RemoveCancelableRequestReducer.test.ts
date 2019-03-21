// tslint:disable no-unused-expression
import { Map } from "immutable";
import { Subject } from "rxjs";

import { random } from "faker";
import { spy } from "sinon";

import { DataServiceStateRecord } from "../DataServiceStateRecord";

import { removeCancelableRequestReducer } from "./RemoveCancelableRequestReducer";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("removeCancelableRequestReducer", () => {
  let state;
  let initialId;

  beforeEach(() => {
    initialId = random.number().toString();
    state = DataServiceStateRecord({
      cancelableRequests: Map({
        [initialId]: new Subject(),
      }),
    });
  });

  it("removes a subject that exists with the passed id", () => {
    const newState = removeCancelableRequestReducer(state, {
      type: random.word(),
      invoke: spy(),
      payload: { id: initialId },
    });

    expect(newState.cancelableRequests.has(initialId)).to.be.false;
  });

  it("doesn't remove a subject that doesn't exist", () => {
    const newState = removeCancelableRequestReducer(state, {
      type: random.word(),
      invoke: spy(),
      payload: { id: "-1" }, // use negative to ensure that the initialId isn't randomly generated again
    });

    expect(newState.cancelableRequests.size).to.equal(1);
    expect(newState.cancelableRequests.has(initialId)).to.be.true;
  });

});
