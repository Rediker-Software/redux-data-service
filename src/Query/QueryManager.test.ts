// tslint:disable no-unused-expression

import { random } from "faker";

import { IQueryResponse } from ".";
import { QueryBuilder } from "./QueryBuilder";
import { QueryManager } from "./QueryManager";

import { fakeModelModule, initializeTestServices, seedServiceList } from "../TestUtils";
import { IFakeModelData } from "../Model";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("QueryManager", () => {

  let fakeItems;
  let currentPage;
  let totalPages;
  let pageSize;
  let totalCount;
  let nextPage;
  let previousPage;
  let fullQueryResponse: IQueryResponse;
  let hasPrevious;
  let hasNext;
  const serviceName = "fakeModel";

  beforeEach(() => {
    initializeTestServices(fakeModelModule);

    currentPage = random.number();
    totalPages = random.number();
    pageSize = random.number();
    totalCount = random.number();
    nextPage = random.number();
    previousPage = random.number();
    hasPrevious = random.boolean;
    hasNext = random.boolean;

    fakeItems = seedServiceList<IFakeModelData>(serviceName);

    fullQueryResponse = {
      currentPage,
      totalPages,
      pageSize,
      totalCount,
      nextPage,
      previousPage,
      hasPrevious,
      hasNext,
      ids: [],
    }; 
  });

  it("constructs a QueryManager instance", () => {
    const query = new QueryBuilder(serviceName);
    expect(new QueryManager(query)).to.deep.contain({
      query,
    });
  });

  it("returns expected isLoading on meta property", () => {
    const query = new QueryBuilder(serviceName);
    const queryMeta = {
      isLoading: true,
    };

    const queryManager = new QueryManager(query, fakeItems, fullQueryResponse, queryMeta);

    expect(queryManager.isLoading).to.equal(true);
  });

  it("isLoading is true when response is empty and there is no isLoading property on meta", () => {
    const query = new QueryBuilder(serviceName);
    const queryManager = new QueryManager(query, fakeItems);

    expect(queryManager.isLoading).to.equal(true);
  });

  it("isLoading is false when response is not empty and there is no isLoading property on meta", () => {
    const query = new QueryBuilder(serviceName);
    const queryManager = new QueryManager(query, fakeItems, fullQueryResponse);

    expect(queryManager.isLoading).to.equal(false);
  });

  it("returns expected errors on meta property", () => {
    const query = new QueryBuilder(serviceName);
    const queryMeta = {
      errors: "errors",
    };

    const queryManager = new QueryManager(query, fakeItems, fullQueryResponse, queryMeta);

    expect(queryManager.errors).to.equal(queryMeta.errors);
  });

  it("returns expected query items", () => {
    const query = new QueryBuilder(serviceName);
    const queryManager = new QueryManager(query, fakeItems);

    expect(queryManager.items).to.deep.equal(fakeItems);
  });

  it("hasNextPage returns the given hasNext value from the IQueryResponse", () => {
    const query = new QueryBuilder(serviceName);
    const queryManager = new QueryManager(query, fakeItems, fullQueryResponse);

    expect(queryManager.hasNextPage()).to.equal(hasNext);
  });

  it("hasPreviousPage returns the given hasPrevious value from the IQueryResponse", () => {
    const query = new QueryBuilder(serviceName);
    const queryManager = new QueryManager(query, fakeItems, fullQueryResponse);

    expect(queryManager.hasPreviousPage()).to.equal(hasPrevious);
  });

  it("getNextPage returns expected IQueryBuilder next page", () => {
    const query = new QueryBuilder(serviceName, { x: random.number() });
    const queryManager = new QueryManager(query, fakeItems, fullQueryResponse);
    const expectedQueryBuilder = query.page(nextPage);

    expect(queryManager.getNextPage()).to.deep.equal(expectedQueryBuilder);
  });

  it("getNextPage returns null when response is undefined", () => {
    const query = new QueryBuilder(serviceName);
    const queryManager = new QueryManager(query, fakeItems);

    expect(queryManager.getNextPage()).to.equal(null);
  });

  it("getPreviousPage returns expected IQueryBuilder for previous page", () => {
    const query = new QueryBuilder(serviceName, { x: random.number() });
    const queryManager = new QueryManager(query, fakeItems, fullQueryResponse);
    const expectedQueryBuilder = query.page(previousPage);

    expect(queryManager.getPreviousPage()).to.deep.equal(expectedQueryBuilder);
  });

  it("getPreviousPage returns null when response is undefined", () => {
    const query = new QueryBuilder(serviceName);
    const queryManager = new QueryManager(query, fakeItems);

    expect(queryManager.getPreviousPage()).to.equal(null);
  });
});
