"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var sinon_1 = require("sinon");
var Services_1 = require("../Services");
var Configure_1 = require("../Configure");
var modelDataCreatorMap = {};
var actionStubMap = {};
var _FakedXHRHistory = [];
var _FakeXHR;
function initializeTestServices(modules, shouldStubActionCreators) {
    if (shouldStubActionCreators === void 0) { shouldStubActionCreators = true; }
    var store = Configure_1.configure({ modules: modules });
    initializeMockDataCreators(modules);
    stubXHR();
    if (shouldStubActionCreators) {
        stubActionCreators(modules);
    }
    else {
        actionStubMap = {};
    }
    return store;
}
exports.initializeTestServices = initializeTestServices;
function initializeMockDataCreators(modules) {
    modelDataCreatorMap = {};
    lodash_1.forEach(modules, function (moduleItem, moduleName) {
        var mockDataCreatorName = "createMock" + lodash_1.upperFirst(moduleName);
        if (mockDataCreatorName in moduleItem) {
            modelDataCreatorMap[moduleName] = moduleItem[mockDataCreatorName];
        }
    });
}
exports.initializeMockDataCreators = initializeMockDataCreators;
function stubActionCreators(modules) {
    actionStubMap = {};
    Object.keys(modules).forEach(function (moduleName) {
        var stubMapEntry = stubService(moduleName);
        if (stubMapEntry) {
            actionStubMap[moduleName] = stubMapEntry;
        }
    });
}
exports.stubActionCreators = stubActionCreators;
function stubXHR() {
    _FakeXHR = sinon_1.useFakeXMLHttpRequest();
    _FakedXHRHistory = [];
    _FakeXHR.onCreate = function (xhr) {
        _FakedXHRHistory.push(xhr);
    };
}
exports.stubXHR = stubXHR;
function getFakeXHR() {
    return _FakeXHR;
}
exports.getFakeXHR = getFakeXHR;
function getFakedXHRHistory() {
    return _FakedXHRHistory;
}
exports.getFakedXHRHistory = getFakedXHRHistory;
function stubService(moduleName) {
    var service = Services_1.getDataService(moduleName);
    var actionsToStub = ["fetchAll", "fetchRecord", "createRecord", "updateRecord", "patchRecord", "deleteRecord"];
    var stubActions = actionsToStub.reduce(function (actionStubMapEntry, fnNameToStub) {
        var stubAction = tryStubAction(moduleName, service.actions, fnNameToStub);
        if (stubAction) {
            actionStubMapEntry[fnNameToStub] = stubAction;
        }
        return actionStubMapEntry;
    }, {});
    return lodash_1.isEmpty(stubActions) ? undefined : stubActions;
}
function tryStubAction(moduleName, obj, methodName) {
    if (methodName in obj) {
        var invokeSpy_1 = sinon_1.spy();
        var mainStub = sinon_1.stub(obj, methodName).callsFake(function (payload, meta) {
            return {
                invoke: invokeSpy_1,
                type: moduleName + "/" + methodName,
                payload: payload,
                meta: meta,
            };
        });
        return { base: mainStub, invokeSpy: invokeSpy_1 };
    }
}
function getActionStubMap() {
    return actionStubMap;
}
exports.getActionStubMap = getActionStubMap;
function restoreActionStubs() {
    Object.keys(actionStubMap).forEach(function (moduleName) {
        Object.keys(actionStubMap[moduleName]).forEach(function (actionName) {
            actionStubMap[moduleName][actionName].base.restore();
        });
    });
    actionStubMap = {};
}
exports.restoreActionStubs = restoreActionStubs;
function seedService(serviceName, overrideValues) {
    if (overrideValues === void 0) { overrideValues = {}; }
    if (serviceName in modelDataCreatorMap) {
        var model = modelDataCreatorMap[serviceName](overrideValues);
        var service = Services_1.getDataService(serviceName);
        service.actions.pushRecord(model).invoke();
        return model;
    }
    else {
        throw new ReferenceError("ModelDataCreator for \"" + serviceName + "\" not registered!");
    }
}
exports.seedService = seedService;
function seedServiceList(serviceName, count, overrideValues) {
    if (count === void 0) { count = 5; }
    if (overrideValues === void 0) { overrideValues = {}; }
    var seededData = [];
    for (var i = 0; i < count; i++) {
        seededData.push(seedService(serviceName, overrideValues));
    }
    var service = Services_1.getDataService(serviceName);
    service.actions.pushAll({ items: seededData }, { queryParams: overrideValues }).invoke();
    return seededData;
}
exports.seedServiceList = seedServiceList;
function seedServices(serviceNames) {
    if (!serviceNames) {
        serviceNames = Object.keys(modelDataCreatorMap);
    }
    return serviceNames.reduce(function (seededData, serviceName) {
        seededData[serviceName] = seedServiceList(serviceName);
        return seededData;
    }, {});
}
exports.seedServices = seedServices;
function createMockServiceState(service, actions) {
    if (actions === void 0) { actions = []; }
    var _a;
    var state = service.getDefaultState();
    actions.forEach(function (action) {
        state = service.reducer(state, action);
    });
    return _a = {},
        _a[service.name] = state,
        _a;
}
exports.createMockServiceState = createMockServiceState;
