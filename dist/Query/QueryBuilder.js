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
var hash = require("object-hash");
var lodash_1 = require("lodash");
var Services_1 = require("../Services");
var QueryBuilder = (function () {
    function QueryBuilder(serviceName, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        this.serviceName = serviceName;
        this.queryParams = queryParams;
    }
    QueryBuilder.prototype.filter = function (key, value) {
        var _a;
        var queryParams = __assign({}, this.queryParams, (_a = {}, _a[key] = value, _a));
        return new QueryBuilder(this.serviceName, queryParams);
    };
    QueryBuilder.prototype.removeFilter = function (key) {
        var queryParams = __assign({}, this.queryParams);
        delete queryParams[key];
        return new QueryBuilder(this.serviceName, queryParams);
    };
    QueryBuilder.prototype.page = function (pageNumber) {
        var queryParams = __assign({}, this.queryParams, { page: pageNumber });
        return new QueryBuilder(this.serviceName, queryParams);
    };
    QueryBuilder.prototype.pageSize = function (pageSize) {
        var queryParams = __assign({}, this.queryParams, { pageSize: pageSize });
        return new QueryBuilder(this.serviceName, queryParams);
    };
    QueryBuilder.prototype.sort = function (key, direction) {
        if (direction === void 0) { direction = "asc"; }
        var _a;
        var queryParams = lodash_1.merge({}, this.queryParams, {
            sort: (_a = {},
                _a[key] = direction,
                _a),
        });
        return new QueryBuilder(this.serviceName, queryParams);
    };
    QueryBuilder.prototype.removeSort = function (key) {
        var queryParams = __assign({}, this.queryParams);
        if ("sort" in queryParams) {
            delete queryParams.sort[key];
            if (lodash_1.isEmpty(queryParams.sort)) {
                delete queryParams.sort;
            }
        }
        return new QueryBuilder(this.serviceName, queryParams);
    };
    QueryBuilder.prototype.invoke = function () {
        Services_1.getDataService(this.serviceName)
            .actions
            .fetchAll(this)
            .invoke();
    };
    QueryBuilder.prototype.getHashCode = function () {
        if (!this.hashCode) {
            this.hashCode = hash(this.queryParams);
        }
        return this.hashCode;
    };
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
