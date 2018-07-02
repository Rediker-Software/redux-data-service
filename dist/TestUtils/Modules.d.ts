import { createMockFakeModel, FakeModel } from "Model/Model.mock";
import { FakeModelService } from "Services/DataService.mock";
export declare const modules: {
    fakeModel: {
        FakeModel: typeof FakeModel;
        FakeModelService: typeof FakeModelService;
        createMockFakeModel: typeof createMockFakeModel;
    };
};
