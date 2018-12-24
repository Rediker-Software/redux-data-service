"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var Configure_1 = require("../Configure");
var Adapters_1 = require("../Adapters");
var Serializers_1 = require("../Serializers");
var StubXhr_1 = require("./StubXhr");
var MockDataCreators_1 = require("./Mock/MockDataCreators");
function initializeTestServices(modules, configOptions) {
    if (configOptions === void 0) { configOptions = {}; }
    var store = Configure_1.configure(lodash_1.defaults({}, configOptions, {
        modules: modules,
        adapter: Adapters_1.MemoryAdapter,
        serializer: Serializers_1.MemorySerializer,
    }));
    MockDataCreators_1.initializeMockDataCreators(modules);
    StubXhr_1.stubXHR();
    return store;
}
exports.initializeTestServices = initializeTestServices;
