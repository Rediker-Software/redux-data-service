import { createMockFakeModel, FakeModel } from "../Model";
import { FakeModelService } from "../Services";

export const fakeModelModule = {
  fakeModel: {
    FakeModel,
    FakeModelService,
    createMockFakeModel,
  },
};
