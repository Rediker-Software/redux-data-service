import { createMockFakeModel, FakeModel } from "Model/Model.mock";
import { FakeModelService } from "Services/DataService.mock";

export const modules = {
  fakeModel: {
    FakeModel,
    FakeModelService,
    createMockFakeModel,
  },
};
