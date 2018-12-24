"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Services_1 = require("../../Services");
var MockDataCreators_1 = require("../Mock/MockDataCreators");
function seedService(serviceName, overrideValues) {
    if (overrideValues === void 0) { overrideValues = {}; }
    var modelDataCreatorMap = MockDataCreators_1.getModelDataCreatorMap();
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
