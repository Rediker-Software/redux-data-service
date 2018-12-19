import { createMockFakeModel, FakeModel } from "../Model/Model.mock";
import { FakeModelService } from "../Services/DataService/DataService.mock";

export const fakeModelModule = {
  fakeModel: {
    FakeModel,
    FakeModelService,
    createMockFakeModel,
  },
};
