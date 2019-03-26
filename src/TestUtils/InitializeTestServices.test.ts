// tslint:disable no-unused-expression

import { getConfiguration } from "../Configure";
import { MemoryAdapter, RestAdapter } from "../Adapters";
import { MemorySerializer, RestSerializer } from "../Serializers";
import { FakeModelService } from "../Services/DataService/DataService.mock";
import { FakeModel } from "../Model/Model.mock";

import { initializeTestServices } from "./InitializeTestServices";
import { fakeModelModule } from "./FakeModelModule";
import { getService, getDataService } from "../Services";
import { QueryBuilder } from "../Query";
import { getFakedXHRHistory } from "./StubXhr";
import { seedService } from "./Seed";

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

    it("adds fakeModelModule to initialized modules by default", () => {
      const store = initializeTestServices();
      const fakeService = getDataService("fakeModel");

      expect(fakeService).to.be.an.instanceOf(FakeModelService);
    });

    it("seeds a fakeModel", () => {
      initializeTestServices();

      const fakeModel = seedService("fakeModel");

      expect(fakeModel).to.be.an.instanceOf(FakeModel);
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
      class RestFakeModelService extends FakeModelService {
        protected readonly AdapterClass = RestAdapter;
        protected readonly SerializerClass = RestSerializer;
      }

      const restFakeModelModule = {
        fakeModel: {
          ...fakeModelModule.fakeModel,
          FakeModelService: RestFakeModelService,
        },
      };

      initializeTestServices(restFakeModelModule);

      const service = getService("fakeModel") as RestFakeModelService;

      service
        .actions
        .fetchAll(new QueryBuilder("fakeModel", { hello: "world" }))
        .invoke();

      expect(getFakedXHRHistory())
        .to.be.an("array")
        .to.have.lengthOf(1);
    });

  });

});
