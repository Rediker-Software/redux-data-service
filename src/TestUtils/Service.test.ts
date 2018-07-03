// tslint:disable:no-unused-expression

import { DataService, getService } from "../Services";
import { IFakeModelData } from "../Model";
import { modules } from "../TestUtils/Modules";

import { getActionStubMap, getFakedXHRHistory, initializeTestServices, seedService, seedServiceList, seedServices } from "./Service";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("initializeServices", () => {

  it("builds all services", () => {
    const store = initializeTestServices(modules);

    // they should be in the same order
    const returnedKeys = Object.keys(store.getState());
    const moduleKeys = Object.keys(modules);

    expect(moduleKeys).to.have.all.members(returnedKeys, "actual modules and returned modules are same");
  });

  describe("stubbed xhr actions", () => {
    it("has a working spy on the invoke method", () => {
      initializeTestServices(modules);

      const service = getService("fakeModel") as DataService<IFakeModelData>;
      service.actions.fetchAll({}).invoke();
      expect(getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;
      expect(getActionStubMap().fakeModel.fetchAll.invokeSpy.calledOnce).to.be.true;
    });

    it("has a working base stub", () => {
      initializeTestServices(modules);

      const service = getService("fakeModel") as DataService<IFakeModelData>;
      service.actions.fetchAll({});
      expect(getActionStubMap().fakeModel.fetchAll.base.called).to.be.true;
      expect(getActionStubMap().fakeModel.fetchAll.invokeSpy.called).to.be.false;
    });

    it("returns a valid IAction", () => {
      initializeTestServices(modules);

      const service = getService("fakeModel") as DataService<IFakeModelData>;
      const suspectedIAction = service.actions.fetchAll({});
      expect(suspectedIAction).to.have.all.keys(["invoke", "meta", "payload", "type"]);
    });

    it("resets the stubs when initializeTestServices is called again", () => {
      initializeTestServices(modules);
      const service = getService("fakeModel") as DataService<IFakeModelData>;
      service.actions.fetchAll({});
      expect(getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;

      initializeTestServices(modules);
      const newService = getService("fakeModel") as DataService<IFakeModelData>;
      newService.actions.fetchAll({});
      expect(getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;
    });

    it("takes an optional argument to bypass stubbing methods", () => {
      initializeTestServices(modules, false);

      expect(getActionStubMap()).to.be.empty;
    });

    it("uses fake xhr when stubs are not in use", () => {
      initializeTestServices(modules, false);

      const service = getService("fakeModel") as DataService<IFakeModelData>;
      const initHistorySize = getFakedXHRHistory().length;
      service.actions.fetchAll({}).invoke();
      expect(getFakedXHRHistory().length).to.be.above(initHistorySize, "calling an action changes faked xhr history stack");
    });
  });

  describe("mock data", () => {
    let store;
    beforeEach(() => {
      store = initializeTestServices(modules);
    });

    it("doesn't give mock data when not requested", () => {
      const state = store.getState();
      Object.keys(state).forEach((stateKey) => {
        expect(state[stateKey].items).to.have.property("size")
          .that.is.equal(0, "does not prepopulate");
      });
    });

    const fakeModelDataKeys = ["fullText", "dateUpdated", "dateDeleted", "id"]; // all valid keys of IFakeModelData
    describe("seedService", () => {

      it("returns the seeded data", () => {
        const mockFakeModel = seedService("fakeModel");

        const state = store.getState();
        expect(state.fakeModel.items.valueSeq().first()).to.deep.equal(mockFakeModel);
      });

      it("can completely override the data", () => {
        const mockFakeModelData = {
          id: "1",
          fullText: "test",
          dateUpdated: null,
          dateDeleted: null,
        } as IFakeModelData;

        const mockFakeModel = seedService("fakeModel", mockFakeModelData);

        const state = store.getState();
        expect(state.fakeModel.items.valueSeq().first()).to.deep.equal(mockFakeModel);
      });

      it("can partially override the data", () => {
        const mockFakeModelData = {
          fullText: "test",
        } as Partial<IFakeModelData>;

        const mockFakeModel = seedService("fakeModel", mockFakeModelData);

        const state = store.getState();
        expect(state.fakeModel.items.valueSeq().first()).to.deep.include(mockFakeModel);
      });

      it("can create an instance without an input data", () => {
        seedService("fakeModel");
        const state = store.getState();
        expect(state.fakeModel.items.valueSeq().first().getData()).to.have.all.keys(fakeModelDataKeys);
      });
    });

    describe("seedServiceList", () => {
      it("returns an array of the seeded data", () => {
        const seededData = seedServiceList("fakeModel");
        const state = store.getState();
        expect(state.fakeModel.items.valueSeq().toJS()).to.deep.equal(seededData);
      });

      it("takes an optional count param", () => {
        seedServiceList("fakeModel", 25);
        const state = store.getState();
        expect(state.fakeModel.items.valueSeq().size).to.equal(25, "seeds as many as requested");
      });

      it("overrides with supplied overrides", () => {
        const overridenValues = { fullText: "Jon can't handle the salsa" };
        seedServiceList<IFakeModelData>("fakeModel", 5, overridenValues);
        store.getState().fakeModel.items.valueSeq().toJS().forEach((itemModelData) => {
          expect(itemModelData).to.have.include(overridenValues);
        });
      });

      it("can create instances without any input data", () => {
        seedServiceList("fakeModel");
        const state = store.getState();
        state.fakeModel.items.valueSeq().forEach((itemModel) => {
          expect(itemModel.getData()).to.have.all.keys(fakeModelDataKeys);
        });
      });
    });

    describe("seedServices", () => {
      it("seeds all registered services", () => {
        store = initializeTestServices(modules);

        seedServices();

        const state = store.getState();

        Object.keys(state).forEach((moduleName) => {
          expect(state[moduleName].items.valueSeq().size).to.be.above(0, "seeded service in state");
        });
      });

      it("returns the seeded data", () => {
        const initServiceNames = Object.keys(modules).slice(0, 3);
        store = initializeTestServices(modules);
        const seededData = seedServices(initServiceNames);

        const state = store.getState();
        Object.keys(seededData).forEach((moduleName) => {
          expect(state[moduleName].items.valueSeq().toJS())
            .to.deep.equal(seededData[moduleName], "seeded data is same as returned data");
        });
      });
    });
  });
});
