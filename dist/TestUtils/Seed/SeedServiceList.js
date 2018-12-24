"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Query_1 = require("../../Query");
var Services_1 = require("../../Services");
var IQueryCache_mock_1 = require("../../Query/IQueryCache.mock");
var SeedService_1 = require("./SeedService");
function seedServiceList(serviceName, count, overrideValues, options) {
    if (count === void 0) { count = 5; }
    if (overrideValues === void 0) { overrideValues = {}; }
    if (options === void 0) { options = {}; }
    var seededData = [];
    for (var i = 0; i < count; i++) {
        seededData.push(SeedService_1.seedService(serviceName, overrideValues));
    }
    var service = Services_1.getDataService(serviceName);
    var queryParams = options.queryParams, response = __rest(options, ["queryParams"]);
    service
        .actions
        .setQueryResponse({
        query: new Query_1.QueryBuilder(serviceName, queryParams || overrideValues),
        response: IQueryCache_mock_1.createMockQueryResponse(__assign({ ids: seededData.map(function (x) { return x.id; }) }, response)),
    })
        .invoke();
    return seededData;
}
exports.seedServiceList = seedServiceList;
