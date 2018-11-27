"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryManager = (function () {
    function QueryManager(query, items, response, meta) {
        this.query = query;
        this.items = items;
        this.response = response;
        this.meta = meta;
    }
    Object.defineProperty(QueryManager.prototype, "isLoading", {
        get: function () {
            if (this.meta && "isLoading" in this.meta) {
                return this.meta.isLoading;
            }
            else {
                return this.response == null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryManager.prototype, "errors", {
        get: function () {
            return this.meta.errors;
        },
        enumerable: true,
        configurable: true
    });
    QueryManager.prototype.hasNextPage = function () {
        return this.response && this.response.nextPage > 0;
    };
    QueryManager.prototype.hasPreviousPage = function () {
        return this.response && this.response.previousPage > 0;
    };
    QueryManager.prototype.getNextPage = function () {
        return this.hasNextPage()
            ? this.query.page(this.response.nextPage)
            : null;
    };
    QueryManager.prototype.getPreviousPage = function () {
        return this.hasPreviousPage()
            ? this.query.page(this.response.previousPage)
            : null;
    };
    return QueryManager;
}());
exports.QueryManager = QueryManager;
