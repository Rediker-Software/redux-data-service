"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var from_1 = require("rxjs/observable/from");
var Initialize_1 = require("./Initialize");
var Services_1 = require("./Services");
var Store_1 = require("./Store");
var Serializers_1 = require("./Serializers");
var Adapters_1 = require("./Adapters");
var Mapper_1 = require("./Mapper");
var defaultConfiguration = {
    adapter: Adapters_1.RestAdapter,
    serializer: Serializers_1.RestSerializer,
    mapper: Mapper_1.Mapper,
};
var configuration = {};
function getConfiguration() {
    return configuration;
}
exports.getConfiguration = getConfiguration;
function configure(config, configureStore) {
    if (configureStore === void 0) { configureStore = Store_1.configureStore; }
    configuration = __assign({}, defaultConfiguration, config);
    Initialize_1.initialize();
    Services_1.initializeServices(config.modules);
    var store = configureStore(Services_1.getReducers(), Services_1.getEpics());
    Services_1.BaseService.setStateObservable(from_1.from(store));
    Services_1.BaseService.registerDispatch(store.dispatch);
    return store;
}
exports.configure = configure;
