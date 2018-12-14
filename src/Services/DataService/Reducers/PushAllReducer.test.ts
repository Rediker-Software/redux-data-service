// tslint:disable:no-empty max-classes-per-file no-unused-expression
import "rxjs/add/observable/of";

import { random } from "faker";
import { spy } from "sinon";

import { initializeTestServices, seedServiceList } from "../../../TestUtils/Service";
import { fakeModelModule } from "../../../TestUtils/FakeModelModule";

import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { pushAllReducer } from "./PushAllReducer";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("pushAllReducer", () => {
  let state;

  beforeEach(() => {
    initializeTestServices(fakeModelModule);
    state = DataServiceStateRecord();
  });

  it("adds the given array of items to the state", () => {
    const items = seedServiceList("fakeModel");

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

});
