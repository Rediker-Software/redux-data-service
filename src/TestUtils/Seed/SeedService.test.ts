// tslint:disable no-unused-expression

import { stub, spy } from "sinon";
import { lorem, random } from "faker";

import { seedService } from "./SeedService";
import { IFakeModelData } from "../../Model/Model.mock";
import { fakeModelModule } from "../FakeModelModule";
import { initializeTestServices } from "../InitializeTestServices";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("seedService", () => {
  let store;

  beforeEach(() => {
    store = initializeTestServices(fakeModelModule);
  });

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
    const fakeModelDataKeys = ["fullText", "dateUpdated", "dateDeleted", "id"];

    expect(
      state.fakeModel.items.valueSeq().first().getData(),
    ).to.have.all.keys(fakeModelDataKeys);
  });
});
