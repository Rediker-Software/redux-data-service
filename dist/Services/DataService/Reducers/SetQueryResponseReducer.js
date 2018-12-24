"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Query_1 = require("../../../Query");
function setQueryResponseReducer(state, action) {
    var queryCache = action.payload;
    return state.update("requestCache", function (requestCache) { return requestCache.update(queryCache.query.getHashCode(), function (existingQueryCache) {
        if (existingQueryCache) {
            return existingQueryCache.merge(queryCache);
        }
        else {
            return Query_1.QueryCacheRecord(queryCache);
        }
    }); });
}
exports.setQueryResponseReducer = setQueryResponseReducer;
