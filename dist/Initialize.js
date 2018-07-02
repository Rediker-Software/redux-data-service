"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Initializers = require("./Initializers");
var lodash_1 = require("lodash");
var initializationComplete = false;
exports.isApplicationInitialized = function () { return initializationComplete; };
exports.resetInitializationStatus = function () { return initializationComplete = false; };
exports.makeInitialize = function (initializers) { return function () {
    lodash_1.forEach(initializers, function (initializer, name) {
        if (name.startsWith("initialize")) {
            initializer();
        }
    });
    initializationComplete = true;
}; };
exports.initialize = exports.makeInitialize(Initializers);
//# sourceMappingURL=Initialize.js.map