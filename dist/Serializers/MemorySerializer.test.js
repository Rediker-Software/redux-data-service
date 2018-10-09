"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var TestUtils_1 = require("../TestUtils");
var Model_mock_1 = require("../Model/Model.mock");
var MemorySerializer_1 = require("./MemorySerializer");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("MemorySerializer", function () {
    var serializer;
    beforeEach(function () {
        TestUtils_1.initializeTestServices(TestUtils_1.fakeModelModule);
        serializer = new MemorySerializer_1.MemorySerializer(Model_mock_1.FakeModel);
    });
    it("serialize() returns the raw model data", function () {
        var fakeModel = TestUtils_1.seedService("fakeModel");
        expect(serializer.serialize(fakeModel))
            .to.deep.contain(lodash_1.omit(fakeModel.modelData, ["id", "dateUpdated", "dateDeleted"]));
    });
    it("deserialize() returns the model when given raw data", function () {
        var fakeModel = TestUtils_1.seedService("fakeModel");
        expect(serializer.deserialize(fakeModel.modelData))
            .to.deep.equal(fakeModel);
    });
});
