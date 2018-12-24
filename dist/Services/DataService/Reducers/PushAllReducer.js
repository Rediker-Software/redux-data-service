"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pushAllReducer(state, action) {
    return state.update("items", function (items) { return items.withMutations(function (itemsMap) {
        action.payload.items.forEach(function (item) {
            itemsMap.update(item.id, function () { return item; });
        });
    }); });
}
exports.pushAllReducer = pushAllReducer;
