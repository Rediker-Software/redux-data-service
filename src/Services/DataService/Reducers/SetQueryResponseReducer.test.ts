// tslint:disable: no-unused-expression
import "rxjs/add/observable/of";

import { Map } from "immutable";

import { random } from "faker";
import { spy } from "sinon";

import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { QueryBuilder } from "../../../Query/QueryBuilder";
import { IQueryCache } from "../../../Query/IQueryCache";
import { setQueryResponseReducer } from "./SetQueryResponseReducer";
import { QueryCacheRecord } from "../../../Query/QueryCacheRecord";
import { createMockQueryResponse } from "../../../Query/IQueryCache.mock";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("setQueryResponseReducer", () => {

  it("creates a new QueryCacheRecord with the given queryCache", () => {
    const state = DataServiceStateRecord();
    const query = new QueryBuilder(random.word());
    const queryCache: IQueryCache = { query };

    const action = {
      type: random.word(),
      invoke: spy(),
      payload: queryCache,
    };

    const updatedState = setQueryResponseReducer(state, action);

    expect(
      updatedState.requestCache.get(query.getHashCode()).toJS(),
    ).to.have.property("query").to.equal(query);
  });

  it("updates an existing QueryCacheRecord with the given queryCache", () => {
    const response = spy();
    const isLoading = random.boolean();
    const query = new QueryBuilder(random.word());

    const queryCache: IQueryCache = {
      query,
      response,
    };

    const state = DataServiceStateRecord({
      requestCache: Map({
        [query.getHashCode()]: QueryCacheRecord(queryCache),
      }),
    });

    const action = {
      type: random.word(),
      invoke: spy(),
      payload: {
        query,
        isLoading,
      },
    };

    const updatedState = setQueryResponseReducer(state, action);
    const recordObject = updatedState.requestCache.get(query.getHashCode()).toJS();

    expect(recordObject).to.deep.equal({
      query,
      response,
      isLoading,
      errors: undefined,
    });
  });

  it("replaces the old response ids with the new response ids for an existing QueryCacheRecord", () => {
    const response = createMockQueryResponse();
    const newResponse = createMockQueryResponse();
    const query = new QueryBuilder(random.word());

    const queryCache: IQueryCache = {
      query,
      response,
    };

    const state = DataServiceStateRecord({
      requestCache: Map({
        [query.getHashCode()]: QueryCacheRecord(queryCache),
      }),
    });

    const action = {
      type: random.word(),
      invoke: spy(),
      payload: {
        query,
        response: newResponse,
      },
    };

    const updatedState = setQueryResponseReducer(state, action);
    const recordObject = updatedState.requestCache.get(query.getHashCode()).toJS();

    expect(recordObject)
      .to.have.property("response")
      .to.have.property("ids")
      .to.deep.equal(newResponse.ids);
  });

});
