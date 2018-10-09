"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var Initialize_1 = require("../Initialize");
var serviceMap = {};
function getService(name) {
    if (name in serviceMap) {
        return serviceMap[name];
    }
    else if (process.env.NODE_ENV !== "production" && Initialize_1.isApplicationInitialized()) {
        throw new ReferenceError("Requested service \"" + name + "\" was not found. Did you forget to register it?");
    }
}
exports.getService = getService;
function getDataService(name) {
    return getService(name);
}
exports.getDataService = getDataService;
function initializeServices(modules) {
    serviceMap = {};
    lodash_1.forEach(modules, function (moduleObj, moduleName) {
        var serviceName = lodash_1.upperFirst(moduleName) + "Service";
        if (serviceName in moduleObj) {
            try {
                var ServiceClass = moduleObj[serviceName];
                registerService(new ServiceClass());
            }
            catch (e) {
                if (process.env.NODE_ENV !== "production") {
                    console.error("Failed to register service \"" + serviceName + "\"", moduleObj[serviceName], e);
                }
                throw e;
            }
        }
    });
}
exports.initializeServices = initializeServices;
function registerService(service) {
    var name = service.name;
    serviceMap[name] = service;
}
exports.registerService = registerService;
function getReducers() {
    return lodash_1.mapValues(serviceMap, function (service) { return service.reducer; });
}
exports.getReducers = getReducers;
function getEpics() {
    var epics = [];
    lodash_1.forEach(serviceMap, function (service) {
        epics = epics.concat(service.epics);
    });
    return epics;
}
exports.getEpics = getEpics;
