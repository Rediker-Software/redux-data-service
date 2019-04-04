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
var of_1 = require("rxjs/observable/of");
var Seed_1 = require("../TestUtils/Seed");
var MemoryAdapter = (function () {
    function MemoryAdapter(serviceName) {
        this.serviceName = serviceName;
    }
    MemoryAdapter.prototype.fetchAll = function (requestParams) {
        if (requestParams === void 0) { requestParams = {}; }
        var items = Seed_1.seedServiceList(this.serviceName, 20, requestParams);
        return of_1.of({ items: items.map(function (item) { return item.modelData; }) });
    };
    MemoryAdapter.prototype.fetchItem = function (id) {
        var model = Seed_1.seedService(this.serviceName, { id: id });
        return of_1.of(model.modelData);
    };
    MemoryAdapter.prototype.createItem = function (item) {
        var model = Seed_1.seedService(this.serviceName, item);
        return of_1.of(model.modelData);
    };
    MemoryAdapter.prototype.updateItem = function (id, item) {
        return of_1.of(__assign({}, item, { id: id }));
    };
    MemoryAdapter.prototype.patchItem = function (id, item) {
        return of_1.of(__assign({}, item, { id: id }));
    };
    MemoryAdapter.prototype.deleteItem = function (id) {
        return of_1.of({ id: id, dateDeleted: new Date() });
    };
    return MemoryAdapter;
}());
exports.MemoryAdapter = MemoryAdapter;
