"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var from_1 = require("rxjs/observable/from");
var Initialize_1 = require("Initialize");
var Services_1 = require("Services");
var Store_1 = require("Store");
var configuration = {};
function getConfiguration() {
    return configuration;
}
exports.getConfiguration = getConfiguration;
function configure(config, configureStore) {
    if (configureStore === void 0) { configureStore = Store_1.configureStore; }
    configuration = config;
    Initialize_1.initialize();
    Services_1.initializeServices(config.modules);
    var store = configureStore(Services_1.getReducers(), Services_1.getEpics());
    Services_1.BaseService.setStateObservable(from_1.from(store));
    Services_1.BaseService.registerDispatch(store.dispatch);
    return store;
}
exports.configure = configure;
//# sourceMappingURL=Configure.js.map