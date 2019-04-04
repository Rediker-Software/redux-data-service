"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mock_1 = require("../Mock");
var SeedServiceList_1 = require("./SeedServiceList");
function seedServices(serviceNames) {
    var modelDataCreatorMap = Mock_1.getModelDataCreatorMap();
    if (!serviceNames) {
        serviceNames = Object.keys(modelDataCreatorMap);
    }
    return serviceNames.reduce(function (seededData, serviceName) {
        seededData[serviceName] = SeedServiceList_1.seedServiceList(serviceName);
        return seededData;
    }, {});
}
exports.seedServices = seedServices;
