// tslint:disable:no-unused-expression
import "rxjs/add/operator/take";
import { of as of$ } from "rxjs/observable/of";

import { spy, stub } from "sinon";
import { MockAdapter } from "Adapters";
import { BaseService } from "./BaseService";
import { createMockTestService } from "./BaseService.mock";
import { registerService } from "./ServiceProvider";
import { createMockStore } from "redux-test-utils";
import { IFakeModelData } from "Model";
import { createMockServiceState } from "TestUtils";

declare var intern;
const { beforeEach, it, describe } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

/***
 * Tests specifically for BaseService, although they instantiate a service mocking it that has extra functionality.
 */
describe("BaseService", () => {
  let mockTestService;
  let mockAdapter;
  let store;
  let state;

  beforeEach(() => {
    mockAdapter = new MockAdapter();

    mockTestService = createMockTestService();

    registerService(mockTestService);

    state = createMockServiceState<IFakeModelData>(mockTestService, []);
    store = createMockStore(state);
  });

  it("allows registration of a dispatch", () => {
    const dispatchSpy = spy();
    BaseService.registerDispatch(dispatchSpy);
    mockTestService.actions.bakeBaguettes({}, {}).invoke();
    expect(dispatchSpy.calledOnce).to.be.true;
  });

  it("allows setting the state observable", () => {
    const expectedValue = "hello world";
    const observable = of$(expectedValue);
    BaseService.setStateObservable(observable);

    BaseService
      .getStateObservable()
      .take(1)
      .subscribe(
        value => expect(value).to.equal(expectedValue),
      );
  });

  describe("epics", () => {
    it("exposes the epics through a getter", () => {
      const stubBakeBaguettesEpic = stub(mockTestService, "bakeBaguettesEpic");
      const stubEatBaguettesEpic = stub(mockTestService, "eatBaguettesEpic");

      mockTestService.epics.forEach(epic => epic());
      expect(stubBakeBaguettesEpic.callCount).to.equal(1);
      expect(stubEatBaguettesEpic.callCount).to.equal(1);
    });
  });

  describe("actions", () => {
    it("exposes the actions", () => {
      expect(mockTestService.actions).to.have.all.keys([ "bakeBaguettes", "eatBaguettes" ]);
    });

    describe("exposes a method to make action creators", () => {
      let actionType;
      let action;
      const defaultMeta = { favoriteBread: "baguette" };

      beforeEach(() => {
        actionType = mockTestService.makeActionType("TEST");
        action = mockTestService
          .makeActionCreator(actionType, defaultMeta);
      });

      it("publishes the default meta, type and payload when the action is created", () => {
        expect(action()).to.deep.include({ type: actionType, payload: undefined, meta: defaultMeta });
      });

      it("provides an invoke method", () => {
        expect(action()).to.have.property("invoke").that.is.a("function");
      });

      it("allows overriding meta completely", () => {
        const updatedMeta = { favoriteBread: "tortilla", secondFavoriteBread: "baguette" };
        expect(action(undefined, updatedMeta)).to.deep.include({ meta: updatedMeta });
      });

      it("provides the ability to merge the meta", () => {
        const updatedMeta = { secondFavoriteBread: "tortilla" };
        expect(action(undefined, updatedMeta)).to.deep.include({ meta: { ...defaultMeta, ...updatedMeta } });
      });

      it("passes on the payload", () => {
        const payload = { bread: "cooked" };
        expect(action(payload)).to.deep.include({ payload });
      });
    });
  });

  describe("selectors", () => {
    describe("serviceStateSelector", () => {
      it("returns the service specific state if exists", () => {
        const mockTestServiceState = mockTestService.selectors.getServiceState(store.getState());
        expect(mockTestServiceState).to.equal(state.mockTestService);
      });

      it("returns the root state in the absence of the service specific state", () => {
        const emptyStore = createMockStore();
        const probablyRootState = mockTestService.selectors.getServiceState(emptyStore.getState());
        expect(probablyRootState).to.equal(emptyStore.getState());
      });
    });

    it("exposes the selectors", () => {
      expect(mockTestService.selectors).to.have.all.keys([ "getServiceState", "eatBaguettes" ]);
    });
  });

  describe("reducers", () => {
    const returnValue = "I like baguettes";
    let bakeBaguetteReducerStub;
    let output;
    let action;

    beforeEach(() => {
      bakeBaguetteReducerStub = stub(mockTestService, "bakeBaguettesReducer").returns(returnValue);
      action = mockTestService.actions.bakeBaguettes();
      output = mockTestService.reducer(
        state.mockTestService,
        action,
      );
    });

    it("exposes the reducers output", () => {
      expect(output).to.equal(returnValue);
    });

    it("calls the reducer related to the action type", () => {
      expect(bakeBaguetteReducerStub.calledWithExactly(state.mockTestService, action)).to.be.true;
    });

    it("provides a the default state if not provided", () => {
      output = mockTestService.reducer(
        undefined,
        action,
      );
      expect(bakeBaguetteReducerStub.calledWithExactly(mockTestService.getDefaultState(), action)).to.be.true;
    });
  });

  describe("types", () => {
    it("creates an action type name", () => {
      const actionTypeName = mockTestService.makeActionType("bakeBaguettes");
      expect(actionTypeName).to.equal(`${mockTestService.name}/bakeBaguettes`);
    });

    it("exposes the types", () => {
      expect(mockTestService.types).to.have.all.keys([ "BAKE_BAGUETTES", "EAT_BAGUETTES" ]);
    });
  });
});
