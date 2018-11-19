// tslint:disable no-unused-expression

import { random } from "faker";

import {QueryBuilder} from "./QueryBuilder";
import {QueryManager} from "./QueryManager";
import {fakeModelModule, initializeTestServices, seedServiceList} from "../TestUtils";
import { IFakeModelData } from "../Model";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("QueryManager", () => {

  let fakeItems;
  const serviceName = "fakeModel";

  beforeEach(() => {
    initializeTestServices(fakeModelModule);
    fakeItems = seedServiceList<IFakeModelData>(serviceName);
  });

  it("constructs a QueryManager instance", () => {
    const query = new QueryBuilder(serviceName, { x: random.number() });
    expect(new QueryManager(query)).to.deep.contain({
      query,
    });
  });

  it("returns query items", () => {
    const query = new QueryBuilder(serviceName, { x: random.number() });
    const queryManager = new QueryManager(query, fakeItems);
    expect(queryManager.items).to.deep.equal(fakeItems);
  });
});
