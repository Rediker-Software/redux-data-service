// tslint:disable no-unused-expression

import { getConfiguration } from "../Configure";
import { MemoryAdapter, RestAdapter } from "../Adapters";
import { MemorySerializer, RestSerializer } from "../Serializers";

import { initializeTestServices } from "./InitializeTestServices";
import { fakeModelModule } from "./FakeModelModule";
import { getService } from "../Services";
import { QueryBuilder } from "../Query";
import { getFakedXHRHistory } from "./StubXhr";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("initializeTestServices", () => {

  describe("initialization", () => {

    it("builds all services", () => {
      const store = initializeTestServices(fakeModelModule);

      // they should be in the same order
      const returnedKeys = Object.keys(store.getState());
      const moduleKeys = Object.keys(fakeModelModule);

      expect(moduleKeys).to.have.all.members(returnedKeys, "actual fakeModelModule and returned fakeModelModule are same");
    });

    it("uses MemoryAdapter and MemorySerializer by default", () => {
      initializeTestServices(fakeModelModule);

      expect(getConfiguration()).to.deep.contain({
        adapter: MemoryAdapter,
        serializer: MemorySerializer,
      });
    });

    it("doesn't give mock data when not requested", () => {
      const store = initializeTestServices(fakeModelModule);
      const state = store.getState();
      Object.keys(state).forEach((stateKey) => {
        expect(state[stateKey].items).to.have.property("size")
          .that.is.equal(0, "does not prepopulate");
      });
    });

  });

  describe("stubbed xhr", () => {

    it("uses fake xhr when stubs are not in use", () => {
      initializeTestServices(fakeModelModule, { adapter: RestAdapter, serializer: RestSerializer });

      const service = getService("fakeModel") as any;
      service.AdapterClass = RestAdapter;

      const initHistorySize = getFakedXHRHistory().length;

      service
        .actions
        .fetchAll(new QueryBuilder("fakeModel"))
        .invoke();

      expect(
        getFakedXHRHistory().length,
      ).to.be.above(initHistorySize, "calling an action changes faked xhr history stack");
    });

  });

});
