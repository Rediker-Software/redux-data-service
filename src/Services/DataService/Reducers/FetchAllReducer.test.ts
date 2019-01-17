// tslint:disable no-unused-expression

import { Map } from "immutable";

import { spy } from "sinon";
import { random } from "faker";

import { createMockQueryResponse, QueryBuilder, QueryCacheRecord } from "../../../Query";
import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { fetchAllReducer } from "./FetchAllReducer";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("fetchAllReducer", () => {

  describe("when the query is not cached", () => {
    let state;
    let query;

    beforeEach(() => {
      state = DataServiceStateRecord();
      query = new QueryBuilder(random.word());
    });

    it("adds a new QueryCacheRecord with isLoading = true to the state", () => {
      const newState = fetchAllReducer(state, {
        type: random.word(),
        invoke: spy(),
        payload: query,
      });

      expect(
        newState.requestCache.get(query.getHashCode()).toJS(),
      ).to.deep.equal({
        isLoading: true,
        query,
        response: undefined,
        errors: undefined,
      });
    });

  });

  describe("when the query is cached", () => {
    let query;
    let state;
    let response;
    let errors;

    beforeEach(() => {
      query = new QueryBuilder(random.word());
      response = createMockQueryResponse();
      errors = [
        random.word(),
      ];

      state = DataServiceStateRecord({
        requestCache: Map({
          [query.getHashCode()]: QueryCacheRecord({
            query,
            response,
            errors,
            isLoading: false,
          }),
        }),
      });
    });

    it("updates the existing QueryCacheRecord to set isLoading = true when meta.forceReload = true", () => {
      const newState = fetchAllReducer(state, {
        type: random.word(),
        invoke: spy(),
        payload: query,
        meta: { forceReload: true },
      });

      expect(
        newState.requestCache.get(query.getHashCode()).toJS(),
      ).to.deep.equal({
        response,
        query,
        errors,
        isLoading: true,
      });
    });

    it("does not modify the state when the query exists and no meta is given", () => {
      const newState = fetchAllReducer(state, {
        type: random.word(),
        invoke: spy(),
        payload: query,
      });

      expect(newState).to.equal(state);
    });

    it("does not modify the state when the query exists and meta.forceReload is falsey", () => {
      const newState = fetchAllReducer(state, {
        type: random.word(),
        invoke: spy(),
        payload: query,
        meta: { forceReload: false },
      });

      expect(newState).to.equal(state);
    });
  });

});
