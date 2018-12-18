// tslint:disable no-unused-expression

import { spy, stub } from "sinon";
import { lorem, random } from "faker";

import { IQueryBuilder, QueryBuilder, SortDirection } from "./QueryBuilder";
import { initializeTestServices } from "../TestUtils/InitializeTestServices";
import { registerService } from "../Services/ServiceProvider";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("QueryBuilder", () => {

  let serviceName;
  let key;
  let value;

  beforeEach(() => {
    serviceName = random.word();
    key = random.word();
    value = random.word();
  });

  it("constructs a QueryBuilder instance", () => {
    const queryParams = { x: random.number() };
    expect(new QueryBuilder(serviceName, queryParams)).to.deep.contain({
      serviceName,
      queryParams,
    });
  });

  describe("filtering", () => {

    it("adds the given filter criteria", () => {
      let query: IQueryBuilder = new QueryBuilder(serviceName);

      query = query.filter(key, value);

      expect(query.queryParams)
        .to.have.property(key)
        .to.equal(value);
    });

    it("spreads the current queryParams onto the queryParams of the new object when filtering", () => {
      const currentQueryParams = {
        [key]: value,
      };

      let query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query = query.filter(random.word(), random.number());

      expect(query.queryParams)
        .to.have.property(key)
        .to.equal(value);
    });

    it("supports adding multiple filtering criteria via chaining", () => {
      let query: IQueryBuilder = new QueryBuilder(serviceName);

      const key2 = random.word();
      const value2 = random.number();
      const key3 = random.word();
      const value3 = random.boolean();

      query = query
        .filter(key, value)
        .filter(key2, value2)
        .filter(key3, value3);

      expect(query.queryParams).to.deep.equal({
        [key]: value,
        [key2]: value2,
        [key3]: value3,
      });
    });

    it("creates a new instance when filtering criteria is added", () => {
      const oldQuery: IQueryBuilder = new QueryBuilder(serviceName);
      const newQuery: IQueryBuilder = oldQuery.filter(key, value);

      expect(newQuery).to.not.equal(oldQuery);
    });

    it("does not modify the current instance when filtering criteria is added", () => {
      const currentQueryParams = {
        [key]: value,
      };

      const query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query.filter(random.word(), random.number());

      expect(query.queryParams)
        .to.deep.equal(currentQueryParams);
    });

  });

  describe("removing filter criteria", () => {

    it("supports removing filtering criteria", () => {
      const currentQueryParams = {
        [key]: value,
      };

      let query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query = query.removeFilter(key);

      expect(query.queryParams)
        .to.not.have.property(key);
    });

    it("spreads the current queryParams onto the queryParams of the new object when filtering criteria is removed", () => {
      const otherKey = random.word();
      const otherValue = random.word();

      const currentQueryParams = {
        [key]: value,
        [otherKey]: otherValue,
      };

      let query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query = query.removeFilter(otherKey);

      expect(query.queryParams)
        .to.have.property(key)
        .to.equal(value);
    });

    it("supports removing multiple filtering criteria via chaining", () => {
      const key2 = random.word();
      const value2 = random.number();
      const key3 = random.word();
      const value3 = random.boolean();

      let query: IQueryBuilder = new QueryBuilder(serviceName, {
        [key]: value,
        [key2]: value2,
        [key3]: value3,
      });

      query = query
        .removeFilter(key2)
        .removeFilter(key3);

      expect(query.queryParams)
        .to.not.have.any.keys([key2, key3]);
    });

    it("creates a new instance when filtering criteria is removed", () => {
      const oldQuery: IQueryBuilder = new QueryBuilder(serviceName);
      const newQuery: IQueryBuilder = oldQuery.removeFilter(key);

      expect(newQuery).to.not.equal(oldQuery);
    });

    it("does not modify the current instance when filtering criteria is removed", () => {
      const otherKey = random.word();
      const otherValue = random.word();

      const currentQueryParams = {
        [key]: value,
        [otherKey]: otherValue,
      };

      const query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query.removeFilter(otherKey);

      expect(query.queryParams)
        .to.deep.equal(currentQueryParams);
    });

  });

  describe("page number", () => {

    let pageNumber;

    beforeEach(() => {
      pageNumber = random.number();
    });

    it("sets the given page number", () => {
      let query: IQueryBuilder = new QueryBuilder(serviceName);

      query = query.page(pageNumber);

      expect(query.queryParams)
        .to.have.property("page")
        .to.equal(pageNumber);
    });

    it("spreads the current queryParams onto the queryParams of the new object with the new page number", () => {
      const currentQueryParams = {
        [key]: value,
      };

      let query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query = query.page(pageNumber);

      expect(query.queryParams).to.deep.equal({
        page: pageNumber,
        [key]: value,
      });
    });

    it("supports adding the page number with other query criteria via chaining", () => {
      let query: IQueryBuilder = new QueryBuilder(serviceName);

      const key2 = random.word();
      const value2 = random.number();

      query = query
        .filter(key, value)
        .page(pageNumber)
        .filter(key2, value2);

      expect(query.queryParams).to.deep.equal({
        [key]: value,
        [key2]: value2,
        page: pageNumber,
      });
    });

    it("creates a new instance when setting the page number", () => {
      const oldQuery: IQueryBuilder = new QueryBuilder(serviceName);
      const newQuery: IQueryBuilder = oldQuery.page(pageNumber);

      expect(newQuery).to.not.equal(oldQuery);
    });

    it("does not modify the current instance when setting the page number", () => {
      const currentQueryParams = {
        [key]: value,
      };

      const query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query.page(pageNumber);

      expect(query.queryParams)
        .to.deep.equal(currentQueryParams);
    });

  });

  describe("page size", () => {

    let pageSize;

    beforeEach(() => {
      pageSize = random.number();
    });

    it("sets the given page size", () => {
      let query: IQueryBuilder = new QueryBuilder(serviceName);

      query = query.pageSize(pageSize);

      expect(query.queryParams)
        .to.have.property("pageSize")
        .to.equal(pageSize);
    });

    it("spreads the current queryParams onto the queryParams of the new object with the new page size", () => {
      const currentQueryParams = {
        [key]: value,
      };

      let query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query = query.pageSize(pageSize);

      expect(query.queryParams).to.deep.equal({
        pageSize,
        [key]: value,
      });
    });

    it("supports adding the page size with other query criteria via chaining", () => {
      let query: IQueryBuilder = new QueryBuilder(serviceName);

      const key2 = random.word();
      const value2 = random.number();
      const page = random.number();

      query = query
        .filter(key, value)
        .page(page)
        .pageSize(pageSize)
        .filter(key2, value2);

      expect(query.queryParams).to.deep.equal({
        [key]: value,
        [key2]: value2,
        page,
        pageSize,
      });
    });

    it("creates a new instance when setting the page size", () => {
      const oldQuery: IQueryBuilder = new QueryBuilder(serviceName);
      const newQuery: IQueryBuilder = oldQuery.pageSize(pageSize);

      expect(newQuery).to.not.equal(oldQuery);
    });

    it("does not modify the current instance when setting the page size", () => {
      const currentQueryParams = {
        [key]: value,
      };

      const query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query.pageSize(pageSize);

      expect(query.queryParams)
        .to.deep.equal(currentQueryParams);
    });

  });

  describe("sorting", () => {

    it("adds the given sorting criteria with a default SortDirection of 'asc'", () => {
      let query: IQueryBuilder = new QueryBuilder(serviceName);

      query = query.sort(key);

      expect(query.queryParams.sort[0])
        .to.have.property("direction")
        .to.equal("asc");
    });

    it("adds the given sorting criteria with the given SortDirection", () => {
      let query: IQueryBuilder = new QueryBuilder(serviceName);

      query = query.sort(key, "desc");

      expect(query.queryParams.sort[0])
        .to.have.property("direction")
        .to.equal("desc");
    });

    it("spreads the current queryParams onto the queryParams of the new object when sorting", () => {
      const sortKey = random.word();
      const currentQueryParams = {
        [key]: value,
      };

      let query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query = query.sort(sortKey);

      expect(query.queryParams).to.deep.equal({
        [key]: value,
        sort: [
         { key: sortKey, direction: "asc" },
        ],
      });
    });

    it("supports adding multiple sorting criteria via chaining", () => {
      let query: IQueryBuilder = new QueryBuilder(serviceName);

      const key2 = random.word();
      const key3 = random.word();

      query = query
        .sort(key)
        .sort(key2, "desc")
        .sort(key3);

      expect(query.queryParams)
        .to.have.property("sort")
        .to.deep.equal([
          { key, direction: "asc" },
          { key: key2, direction: "desc" },
          { key: key3, direction: "asc" },
        ],
      );
    });

    it("creates a new instance when sorting criteria is added", () => {
      const oldQuery: IQueryBuilder = new QueryBuilder(serviceName);
      const newQuery: IQueryBuilder = oldQuery.sort(key);

      expect(newQuery).to.not.equal(oldQuery);
    });

    it("does not modify the current instance when sorting criteria is added", () => {
      const currentQueryParams = {
        [key]: value,
      };

      const query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query.sort(random.word());

      expect(query.queryParams)
        .to.deep.equal(currentQueryParams);
    });

    it("places the sort in a position specified by the parameter", () => {
      const position = random.number({ max: 4 });
      const key1 = lorem.word();
      const key2 = lorem.word();
      const key3 = lorem.word();
      const key4 = lorem.word();
      const key5 = lorem.word();

      const currentQueryParams = {
        sort: [
          { key: key1 },
          { key: key2 },
          { key: key3 },
          { key: key4 },
        ],
      };

      const query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);
      
      const sortedQuery = query.sort(key5, "asc", position);
      
      expect(sortedQuery.queryParams.sort[position]).to.deep.equal(
        { key: key5, direction: "asc" },
      );
    });

    it("creates a new sort object if none exists", () => {
      const currentQueryParams = {};

      const query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);
      const sortedQuery = query.sort(lorem.word());

      expect(sortedQuery.queryParams.sort).to.exist;
    });

    it("creates a new sort list if no sorts existed previously", () => {
      const currentQueryParams = {};

      const query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      const sortedQuery = query.sort(lorem.word());

      expect(sortedQuery.queryParams.sort.length).to.equal(1);
    });

    it("pushes the sort onto the end of the list if no position is specified", () => {
      const key1 = lorem.word();
      const key2 = lorem.word();
      const key3 = lorem.word();

      const currentQueryParams = {
        sort: [
          { key: key1 },
          { key: key2 },
        ],
      };

      const query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      const sortedQuery = query.sort(key3);

      expect(sortedQuery.queryParams.sort[2]).to.deep.equal(
        { key: key3, direction: "asc" },
      );
    });

  });

  describe("removing sort criteria", () => {

    it("supports removing sorting criteria", () => {
      const otherSort = random.word();
      const currentQueryParams = {
        sort: [
          { key, direction: "asc" as SortDirection },
          { key: otherSort, direction: "desc" as SortDirection },
        ],
      };

      let query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query = query.removeSort(key);

      expect(query.queryParams.sort[0])
        .to.deep.equal({ key: otherSort, direction: "desc" });
    });

    it("removes the 'sort' object from queryParams if there is one sort param and it is removed", () => {
      const currentQueryParams = {
        sort: [
          { key, direction: value },
        ],
      };

      let query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query = query.removeSort(key);

      expect(query.queryParams)
        .to.not.have.property("sort");
    });

    it("spreads the current queryParams onto the queryParams of the new object when sorting criteria is removed", () => {
      const otherKey = random.word();
      const otherValue = random.word();
      const sortKey = random.word();
      const otherSort = random.word();
      const page = random.number();
      const pageSize = random.number();

      let query: IQueryBuilder = new QueryBuilder(serviceName);

      query = query
        .filter(key, value)
        .filter(otherKey, otherValue)
        .sort(sortKey, "desc")
        .sort(otherSort, "asc")
        .page(page)
        .pageSize(pageSize)
        .removeSort(sortKey);

      expect(query.queryParams).to.deep.equal({
        page,
        pageSize,
        [key]: value,
        [otherKey]: otherValue,
        sort: [ 
          { key: otherSort, direction: "asc" },
        ],
      });
    });

    it("supports removing multiple sorting criteria via chaining", () => {
      const key2 = random.word();
      const key3 = random.word();

      let query: IQueryBuilder = new QueryBuilder(serviceName, {
        sort: [
          { key, direction: "desc" },
          { key: key2, direction: "asc" },
          { key: key3, direction: "desc" },
        ],
      });

      query = query
        .removeSort(key2)
        .removeSort(key3);

      expect(query.queryParams)
        .to.have.property("sort")
        .to.not.deep.equal([{ key: key2, direction: "asc" }, {key: key3, direction: "desc" }]);
    });

    it("does not throw an exception when removing a sort key that does not exist", () => {
      const oldQuery: IQueryBuilder = new QueryBuilder(serviceName);
      const newQuery: IQueryBuilder = oldQuery.removeSort(key);

      expect(newQuery).to.not.be.null;
    });

    it("creates a new instance when sorting criteria is removed", () => {
      const oldQuery: IQueryBuilder = new QueryBuilder(serviceName);
      const newQuery: IQueryBuilder = oldQuery.removeSort(key);

      expect(newQuery).to.not.equal(oldQuery);
    });

    it("does not modify the current instance when filtering criteria is removed", () => {
      const otherKey = random.word();
      const otherValue = random.word();

      const currentQueryParams = {
        [key]: value,
        [otherKey]: otherValue,
      };

      const query: IQueryBuilder = new QueryBuilder(serviceName, currentQueryParams);

      query.removeFilter(otherKey);

      expect(query.queryParams)
        .to.deep.equal(currentQueryParams);
    });

  });

  describe("invoking the query", () => {

    let invokeSpy;
    let fetchAllStub;

    beforeEach(() => {
      initializeTestServices({});

      invokeSpy = spy();
      fetchAllStub = stub().returns({ invoke: invokeSpy });

      const fakeService = {
        name: serviceName,
        actions: {
          fetchAll: fetchAllStub,
        },
      };

      registerService(fakeService as any);
    });

    it("passes itself into the fetchAll action", () => {
      const query = new QueryBuilder(serviceName);
      query.invoke();

      expect(fetchAllStub.calledOnceWith(query)).to.be.true;
    });

    it("invokes the fetchAll action", () => {
      const query = new QueryBuilder(serviceName);
      query.invoke();

      expect(invokeSpy.calledOnce).to.be.true;
    });

  });

  describe("hash code", () => {

    it("generates a hash code when no query params have been provided", () => {
      const query = new QueryBuilder(serviceName);
      expect(query.getHashCode()).to.be.a("string");
    });

    it("generates a hash code for the current query params", () => {
      const query = new QueryBuilder(serviceName);
      const newQuery = query.page(random.number());

      expect(newQuery.getHashCode())
        .to.be.a("string")
        .that.does.not.equal(query.getHashCode());
    });

    it("generates the same hash code for two different objects with equivalent query params", () => {
      const query = new QueryBuilder(serviceName, {
        [key]: value,
      });

      const newQuery = query.filter(key, value);

      expect(newQuery.getHashCode())
        .to.equal(query.getHashCode());
    });

    it("generates a new hash code for each new instance", () => {
      let query: IQueryBuilder = new QueryBuilder(serviceName);
      query = query.page(random.number());

      const newQuery = query.filter(key, value);

      expect(newQuery.getHashCode())
        .to.not.equal(query.getHashCode());
    });

  });

});
