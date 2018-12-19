// tslint:disable no-unused-expression

import { Map } from "immutable";

import { spy } from "sinon";
import { random } from "faker";

import { createMockQueryResponse, QueryBuilder, QueryCacheRecord } from "../../Query";
import { DataServiceStateRecord } from "./DataServiceStateRecord";
import { shouldFetchAll } from "./ShouldFetchAll";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("shouldFetchAll", () => {

  describe("when the query is not cached", () => {
    let state;
    let query;

    beforeEach(() => {
      state = DataServiceStateRecord();
      query = new QueryBuilder(random.word());
    });

    it("returns true if the requested query is not cached in the state", () => {
      expect(
        shouldFetchAll(state, {
          type: random.word(),
          invoke: spy(),
          payload: query,
        }),
      ).to.be.true;
    });

    it("returns true if the query is cached but the response is undefined", () => {
      state = DataServiceStateRecord({
        requestCache: Map({
          [query.getHashCode()]: QueryCacheRecord({
            query,
           }),
        }),
      });
      
      expect(
        shouldFetchAll(state, {
          type: random.word(),
          invoke: spy(),
          payload: query,
        }),
      ).to.be.true;
    });

    it("returns true if the requested query is not cached in the state even when forceReload = false", () => {
      expect(
        shouldFetchAll(state, {
          type: random.word(),
          invoke: spy(),
          payload: query,
          meta: { forceReload: false },
        }),
      ).to.be.true;
    });
  });

  describe("when the query is cached", () => {
    let query;
    let state;

    beforeEach(() => {
      query = new QueryBuilder(random.word());
      state = DataServiceStateRecord({
        requestCache: Map({
          [query.getHashCode()]: QueryCacheRecord({
            query,
            response: createMockQueryResponse(),
           }),
        }),
      });
    });

    it("returns true if the action.meta.forceReload is true", () => {
      expect(
        shouldFetchAll(state, {
          type: random.word(),
          invoke: spy(),
          payload: query,
          meta: { forceReload: true },
        }),
      ).to.be.true;
    });

    it("returns false if the action.meta is falsey and the requested query is cached in the state", () => {
      expect(
        shouldFetchAll(state, {
          type: random.word(),
          invoke: spy(),
          payload: query,
        }),
      ).to.be.false;
    });

    it("returns false if the action.meta.forceReload is falsey and the requested query is cached in the state", () => {
      expect(
        shouldFetchAll(state, {
          type: random.word(),
          invoke: spy(),
          payload: query,
          meta: { forceReload: false },
        }),
      ).to.be.false;
    });
  });

});
