"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var _modelDataCreatorMap = {};
function initializeMockDataCreators(modules) {
    _modelDataCreatorMap = {};
    lodash_1.forEach(modules, function (moduleItem, moduleName) {
        var mockDataCreatorName = "createMock" + lodash_1.upperFirst(moduleName);
        if (mockDataCreatorName in moduleItem) {
            _modelDataCreatorMap[moduleName] = moduleItem[mockDataCreatorName];
        }
    });
}
exports.initializeMockDataCreators = initializeMockDataCreators;
function getModelDataCreatorMap() {
    return _modelDataCreatorMap;
}
exports.getModelDataCreatorMap = getModelDataCreatorMap;
