import { setErrorsReducer } from "./SetErrorsReducer";
import { createMockFakeModels, IFakeModelData, FakeModel } from "../../../Model/Model.mock";
import { IDataServiceState } from "../IDataServiceState";
import { DataServiceStateRecord } from "../DataServiceStateRecord";
import { DataService } from "../DataService";
import hash from "object-hash";
import { registerService } from "../../ServiceProvider";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("setErrorsReducer", () => {
  let state;
  let fakeService;
  
  beforeEach(() => {
    state = DataServiceStateRecord();

    class FakeService extends DataService<IFakeModelData> {
      public name = "Test Service";
      public ModelClass = FakeModel;
    }

    fakeService = new FakeService();
    registerService(fakeService);
  });
  
  it("updates the state adding errors that occurred during the fetchAllEpic", () => {
    const queryParams = { fakeField: "fakeVal" };

    const errors = ["test error"];
    const updatedState: IDataServiceState<any> =
      fakeService.setErrorsReducer(state, fakeService.actions.setErrors({ errors }, { queryParams }));
    debugger;
    const cachedRequest = updatedState.requestCache.get(hash(queryParams || {}) as string);
    expect(cachedRequest.toJS()).to.deep.include({
      ids: [],
      isLoading: false,
      errors,
    }, "cached request value is properly initilized");
  });

  it("preserves the ids", () => {
    const expectedValues = createMockFakeModels(2);
    const existingIds = expectedValues.map((val) => val.id);
    const queryParams = { fakeField: "fakeVal" };

    const errors = ["test error"];
    const updatedState: IDataServiceState<any> =
    fakeService.setErrorsReducer(state, fakeService.actions.setErrors({ errors }, { queryParams }));

    const cachedRequest = updatedState.requestCache.get(hash(queryParams || {}) as string);
    expect(cachedRequest.toJS()).to.deep.include({
      ids: existingIds,
      isLoading: false,
      errors,
    }, "cached request value is properly initialized");
  });
});
