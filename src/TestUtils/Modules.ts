import { createMockFakeModel, FakeModel } from "../Model";
import { FakeModelService } from "../Services";

export const modules = {
  fakeModel: {
    FakeModel,
    FakeModelService,
    createMockFakeModel,
  },
};
