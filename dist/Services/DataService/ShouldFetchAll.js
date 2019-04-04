"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shouldFetchAll(state, action) {
    var queryCache = state.requestCache.get(action.payload.getHashCode());
    var shouldForceReload = action.meta != null && action.meta.forceReload;
    return !queryCache || !queryCache.response || shouldForceReload;
}
exports.shouldFetchAll = shouldFetchAll;
