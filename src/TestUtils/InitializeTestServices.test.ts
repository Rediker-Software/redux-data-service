// tslint:disable no-unused-expression

import { getConfiguration } from "../Configure";
import { MemoryAdapter, RestAdapter } from "../Adapters";
import { MemorySerializer, RestSerializer } from "../Serializers";

import { initializeTestServices } from "./InitializeTestServices";
import { fakeModelModule } from "./FakeModelModule";
import { DataService, getService } from "../Services";
import { IFakeModelData } from "../Model/Model.mock";
import { QueryBuilder } from "../Query";
import { getActionStubMap } from "./Stub/StubActionCreators";
import { getFakedXHRHistory } from "./Stub/StubXhr";

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

  describe("stubbed xhr actions", () => {

    it("has a working spy on the invoke method", () => {
      initializeTestServices(fakeModelModule);

      const service = getService("fakeModel") as DataService<IFakeModelData>;
      service.actions.fetchAll({}).invoke();
      expect(getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;
      expect(getActionStubMap().fakeModel.fetchAll.invokeSpy.calledOnce).to.be.true;
    });

    it("has a working base stub", () => {
      initializeTestServices(fakeModelModule);

      const service = getService("fakeModel") as DataService<IFakeModelData>;
      service.actions.fetchAll({});
      expect(getActionStubMap().fakeModel.fetchAll.base.called).to.be.true;
      expect(getActionStubMap().fakeModel.fetchAll.invokeSpy.called).to.be.false;
    });

    it("returns a valid IAction", () => {
      initializeTestServices(fakeModelModule);

      const service = getService("fakeModel") as DataService<IFakeModelData>;
      const suspectedIAction = service.actions.fetchAll({});
      expect(suspectedIAction).to.have.all.keys(["invoke", "meta", "payload", "type"]);
    });

    it("resets the stubs when initializeTestServices is called again", () => {
      initializeTestServices(fakeModelModule);
      const service = getService("fakeModel") as DataService<IFakeModelData>;
      service.actions.fetchAll({});
      expect(getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;

      initializeTestServices(fakeModelModule);
      const newService = getService("fakeModel") as DataService<IFakeModelData>;
      newService.actions.fetchAll({});
      expect(getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;
    });

    it("takes an optional argument to bypass stubbing methods", () => {
      initializeTestServices(fakeModelModule, false);

      expect(getActionStubMap()).to.be.empty;
    });

    it("uses fake xhr when stubs are not in use", () => {
      initializeTestServices(fakeModelModule, false, { adapter: RestAdapter, serializer: RestSerializer });

      const service = getService("fakeModel") as DataService<IFakeModelData>;
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
