"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryCacheRecord_1 = require("../../../Query/QueryCacheRecord");
var ShouldFetchAll_1 = require("../ShouldFetchAll");
function fetchAllReducer(state, action) {
    if (!ShouldFetchAll_1.shouldFetchAll(state, action)) {
        return state;
    }
    return state.update("requestCache", function (requestCache) { return (requestCache.update(action.payload.getHashCode(), function (queryCacheRecord) { return (queryCacheRecord
        ? queryCacheRecord.set("isLoading", true)
        : new QueryCacheRecord_1.QueryCacheRecord({ isLoading: true, query: action.payload })); })); });
}
exports.fetchAllReducer = fetchAllReducer;
