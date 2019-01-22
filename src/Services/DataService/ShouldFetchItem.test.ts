// tslint:disable no-unused-expression

import { random } from "faker";
import { spy } from "sinon";
import { Map } from "immutable";

import { FetchItemAction, shouldFetchItem } from "./ShouldFetchItem";
import { DataServiceStateRecord } from "./DataServiceStateRecord";
import { createMockFakeModel } from "../../Model";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("ShouldFetchItem", () => {
  let item;
  let state;

  beforeEach(() => {
    item = createMockFakeModel();

    state = DataServiceStateRecord({
      items: Map({
        [item.id]: item,
      }),
    });
  });

  it("returns false when the item exists in the store and meta is not present", () => {
    const action: FetchItemAction = {
      type: "FETCH_ITEM",
      payload: { id: item.id },
      invoke: spy(),
    };
    const shouldFetch = shouldFetchItem(state, action);

    expect(shouldFetch).to.be.false;
  });

  it("returns false when the item exists in the store and forceReload is false", () => {
    const action: FetchItemAction = {
      type: "FETCH_ITEM",
      meta: { forceReload: false },
      payload: { id: item.id },
      invoke: spy(),
    };
    const shouldFetch = shouldFetchItem(state, action);

    expect(shouldFetch).to.be.false;
  });

  it("returns true when the item does not exist in the store and meta is null", () => {
    const id = random.number().toString();
    const action: FetchItemAction = {
      type: "FETCH_ITEM",
      payload: { id },
      invoke: spy(),
    };
    const shouldFetch = shouldFetchItem(state, action);

    expect(shouldFetch).to.be.true;
  });

  it("returns true when the item does not exist in the store and forceReload is false", () => {
    const id = random.number().toString();
    const action: FetchItemAction = {
      type: "FETCH_ITEM",
      meta: { forceReload: false },
      payload: { id },
      invoke: spy(),
    };
    const shouldFetch = shouldFetchItem(state, action);

    expect(shouldFetch).to.be.true;
  });

  it("returns true when the item exists in the store but forceReload is true", () => {
    const action: FetchItemAction = {
      type: "FETCH_ITEM",
      meta: { forceReload: true },
      payload: { id: item.id },
      invoke: spy(),
    };
    const shouldFetch = shouldFetchItem(state, action);

    expect(shouldFetch).to.be.true;
  });

});
