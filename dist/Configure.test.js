"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Adapters_1 = require("./Adapters");
var Mapper_1 = require("./Mapper");
var Serializers_1 = require("./Serializers");
var _1 = require(".");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("Configure", function () {
    it("uses the RestSerializer in the configuration by default when no Serializer is specified", function () {
        _1.configure({ modules: null });
        var config = _1.getConfiguration();
        expect(config.serializer).to.equal(Serializers_1.RestSerializer);
    });
    it("uses the provided Serializer in the configuration", function () {
        _1.configure({ modules: null, serializer: Serializers_1.MockSerializer });
        var config = _1.getConfiguration();
        expect(config.serializer).to.equal(Serializers_1.MockSerializer);
    });
    it("uses the RestAdapter in the configuration by default when no Adapter is specified", function () {
        _1.configure({ modules: null });
        var config = _1.getConfiguration();
        expect(config.adapter).to.equal(Adapters_1.RestAdapter);
    });
    it("uses the provided Adapter in the configuration", function () {
        _1.configure({ modules: null, adapter: Adapters_1.MockAdapter });
        var config = _1.getConfiguration();
        expect(config.adapter).to.equal(Adapters_1.MockAdapter);
    });
    it("uses the Mapper in the configuration by default when no Mapper is specified", function () {
        _1.configure({ modules: null });
        var config = _1.getConfiguration();
        expect(config.mapper).to.equal(Mapper_1.Mapper);
    });
    it("uses the provided Mapper in the configuration", function () {
        _1.configure({ modules: null, mapper: Mapper_1.MockMapper });
        var config = _1.getConfiguration();
        expect(config.mapper).to.equal(Mapper_1.MockMapper);
    });
});
