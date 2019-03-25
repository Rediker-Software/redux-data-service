// tslint:disable no-unused-expression

import { stub, spy } from "sinon";
import { lorem, random } from "faker";

import { IFakeModelData } from "../../Model/Model.mock";
import { getDataService } from "../../Services";
import { IQueryResponse } from "../../Query";

import { initializeTestServices } from "../InitializeTestServices";
import { fakeModelModule } from "../FakeModelModule";
import { seedServiceList } from "./SeedServiceList";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("seedServiceList", () => {
  let store;

  beforeEach(() => {
    store = initializeTestServices(fakeModelModule);
  });

  it("returns an array of the seeded data", () => {
    const seededData = seedServiceList("fakeModel");
    const state = store.getState();
    expect(state.fakeModel.items.valueSeq().toJS()).to.deep.equal(seededData);
  });

  it("takes an optional count param", () => {
    seedServiceList("fakeModel", 25);
    const state = store.getState();
    console.log(state.fakeModel.items.valueSeq());
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
    const fakeModelDataKeys = ["fullText", "dateUpdated", "dateDeleted", "id"];

    state.fakeModel.items.valueSeq().forEach((itemModel) => {
      expect(
        itemModel.getData(),
      ).to.have.all.keys(fakeModelDataKeys);
    });
  });

  it("dispatches a setQueryResponse action with the given query params", () => {
    const fakeService = getDataService("fakeModel");

    const setQueryResponseStub = stub(fakeService.actions, "setQueryResponse").returns({
      invoke: spy(),
    });

    const queryParams = {
      hello: random.word(),
    };

    seedServiceList("fakeModel", 5, {}, {
      queryParams,
    });

    expect(setQueryResponseStub.firstCall.args[0])
      .to.have.property("query")
      .to.have.property("queryParams")
      .to.deep.equal(queryParams);
  });

  it("dispatches a setQueryResponse action using the overrideValues by default if no query params given", () => {
    const fakeService = getDataService("fakeModel");

    const setQueryResponseStub = stub(fakeService.actions, "setQueryResponse").returns({
      invoke: spy(),
    });

    const overrideValues = {
      fullText: random.word(),
    };

    seedServiceList<any>("fakeModel", 5, overrideValues);

    expect(setQueryResponseStub.firstCall.args[0])
      .to.have.property("query")
      .to.have.property("queryParams")
      .to.deep.equal(overrideValues);
  });

  it("dispatches a setQueryResponse action with the ids of the generated items", () => {
    const fakeService = getDataService("fakeModel");

    const setQueryResponseStub = stub(fakeService.actions, "setQueryResponse").returns({
      invoke: spy(),
    });

    const items = seedServiceList<any>("fakeModel");

    expect(setQueryResponseStub.firstCall.args[0])
      .to.have.property("response")
      .to.have.property("ids")
      .to.deep.equal(items.map(item => item.id));
  });

  it("dispatches a setQueryResponse action with the given response values", () => {
    const fakeService = getDataService("fakeModel");

    const setQueryResponseStub = stub(fakeService.actions, "setQueryResponse").returns({
      invoke: spy(),
    });

    const fakeResponseValues: Partial<IQueryResponse> = {
      totalCount: random.number(),
      nextPage: random.number(),
      previousPage: random.number(),
    };

    seedServiceList<any>("fakeModel", 5, {}, fakeResponseValues);

    expect(setQueryResponseStub.firstCall.args[0])
      .to.have.property("response")
      .to.deep.include(fakeResponseValues);
  });

});
