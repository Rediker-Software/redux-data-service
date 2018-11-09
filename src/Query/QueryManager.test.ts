// tslint:disable no-unused-expression

import {spy, stub} from "sinon";
import {lorem, random} from "faker";

import {QueryBuilder} from "./QueryBuilder";
import {QueryManager} from "./QueryManager";
import {fakeModelModule, initializeTestServices, seedServiceList} from "../TestUtils";
import {IQueryResponse} from "./IQueryResponse";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("QueryManager", () => {

  let serviceName;
  let key;
  let value;

  beforeEach(() => {
    serviceName = "fakeModel";
    key = random.word();
    value = random.word();
  });

  it("constructs a QueryManager instance", () => {
    const query = new QueryBuilder(serviceName, { x: random.number() });
    expect(new QueryManager(query)).to.deep.contain({
      query,
    });
  });

  describe("iterable", () => {

    it("iterates over the items", () => {
      initializeTestServices(fakeModelModule);
      const fakeItems = seedServiceList(serviceName);

      const mockResponse = {
        ids: fakeItems.map(fakeItem => fakeItem.id),
      } as IQueryResponse;

      const query = new QueryManager(serviceName, mockResponse);
      for (const item of query) {
        expect()
      }
    });

  });

});
