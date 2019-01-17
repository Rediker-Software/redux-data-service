// tslint:disable no-unused-expression

import { fakeModelModule } from "../FakeModelModule";
import { initializeTestServices } from "../InitializeTestServices";
import { seedServices } from "./SeedServices";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("seedServices", () => {
  let store;
  beforeEach(() => {
    store = initializeTestServices(fakeModelModule);
  });

  it("seeds all registered services", () => {
    store = initializeTestServices(fakeModelModule);

    seedServices();

    const state = store.getState();

    Object.keys(state).forEach((moduleName) => {
      expect(state[moduleName].items.valueSeq().size).to.be.above(0, "seeded service in state");
    });
  });

  it("returns the seeded data", () => {
    const initServiceNames = Object.keys(fakeModelModule).slice(0, 3);
    store = initializeTestServices(fakeModelModule);
    const seededData = seedServices(initServiceNames);

    const state = store.getState();
    Object.keys(seededData).forEach((moduleName) => {
      expect(state[moduleName].items.valueSeq().toJS())
        .to.deep.equal(seededData[moduleName], "seeded data is same as returned data");
    });
  });
});
