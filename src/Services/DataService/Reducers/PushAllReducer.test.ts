// tslint:disable:no-empty max-classes-per-file no-unused-expression
import "rxjs/add/observable/of";

import { random } from "faker";
import { spy } from "sinon";

import { IDataServiceState } from "../IDataServiceState";
import { pushAllReducer } from "./PushAllReducer";
import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { createMockFakeModelArray } from "../../../Model";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("pushAllReducer", () => {
  let state;

  beforeEach(() => {
    state = DataServiceStateRecord();
  });

  it("adds the given array of items to the state", () => {
    const items = createMockFakeModelArray();

    const action = {
      type: random.word(),
      invoke: spy(),
      items,
    };

    const updatedState: IDataServiceState<any> =
      pushAllReducer(state, action);

    expect(
      updatedState.items.toJS(),
    ).to.deep.equal(items);
  });

});
