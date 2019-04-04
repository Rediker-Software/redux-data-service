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
var from_1 = require("rxjs/observable/from");
var Initialize_1 = require("./Initialize");
var ConfigureStore_1 = require("./Store/ConfigureStore");
var RestAdapter_1 = require("./Adapters/RestAdapter");
var RestSerializer_1 = require("./Serializers/RestSerializer");
var Mapper_1 = require("./Mapper/Mapper");
var ServiceProvider_1 = require("./Services/ServiceProvider");
var BaseService_1 = require("./Services/BaseService");
exports.DEFAULT_COALESCE_BUFFER_TIME = 50;
var defaultConfiguration = {
    adapter: RestAdapter_1.RestAdapter,
    serializer: RestSerializer_1.RestSerializer,
    mapper: Mapper_1.Mapper,
    preferPatchOverPut: false,
    coalesceFindRequests: false,
    coalesceBufferTime: exports.DEFAULT_COALESCE_BUFFER_TIME,
};
var configuration = {};
function getConfiguration() {
    return configuration;
}
exports.getConfiguration = getConfiguration;
function configure(config, configureStore) {
    if (configureStore === void 0) { configureStore = ConfigureStore_1.configureStore; }
    configuration = __assign({}, defaultConfiguration, config);
    Initialize_1.initialize();
    ServiceProvider_1.initializeServices(config.modules);
    var store = configureStore(ServiceProvider_1.getReducers(), ServiceProvider_1.getEpics());
    BaseService_1.BaseService.setStateObservable(from_1.from(store));
    BaseService_1.BaseService.registerDispatch(store.dispatch);
    return store;
}
exports.configure = configure;
