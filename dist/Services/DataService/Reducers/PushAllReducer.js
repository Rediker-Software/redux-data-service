"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pushAllReducer(state, action) {
    return (action.payload && action.payload.items)
        ? (state.update("items", function (items) { return items.withMutations(function (itemsMap) {
            action.payload.items.forEach(function (item) {
                itemsMap.update(item.id, function (oldItem) {
                    if (oldItem) {
                        oldItem.markForDestruction();
                    }
                    return item;
                });
            });
        }); }))
        : state;
}
exports.pushAllReducer = pushAllReducer;
