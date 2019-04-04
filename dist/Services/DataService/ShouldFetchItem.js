"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shouldFetchItem(state, action) {
    var item = state.items && state.items.get(action.payload.id);
    var shouldForceReload = action.meta != null && action.meta.forceReload;
    return !item || shouldForceReload;
}
exports.shouldFetchItem = shouldFetchItem;
