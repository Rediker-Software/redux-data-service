"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("../Model");
var Services_1 = require("../Services");
exports.modules = {
    fakeModel: {
        FakeModel: Model_1.FakeModel,
        FakeModelService: Services_1.FakeModelService,
        createMockFakeModel: Model_1.createMockFakeModel,
    },
};
