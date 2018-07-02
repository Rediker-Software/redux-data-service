"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model_mock_1 = require("Model/Model.mock");
var DataService_mock_1 = require("Services/DataService.mock");
exports.modules = {
    fakeModel: {
        FakeModel: Model_mock_1.FakeModel,
        FakeModelService: DataService_mock_1.FakeModelService,
        createMockFakeModel: Model_mock_1.createMockFakeModel,
    },
};
//# sourceMappingURL=Modules.js.map