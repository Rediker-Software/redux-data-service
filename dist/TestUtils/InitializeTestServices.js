"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var Configure_1 = require("../Configure");
var Adapters_1 = require("../Adapters");
var Serializers_1 = require("../Serializers");
var StubXhr_1 = require("./StubXhr");
var MockDataCreators_1 = require("./Mock/MockDataCreators");
var FakeModelModule_1 = require("./FakeModelModule");
function initializeTestServices(modules, configOptions) {
    if (modules === void 0) { modules = {}; }
    if (configOptions === void 0) { configOptions = {}; }
    modules = __assign({}, FakeModelModule_1.fakeModelModule, modules);
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
