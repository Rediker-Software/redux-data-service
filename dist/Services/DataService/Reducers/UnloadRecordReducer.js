"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function unloadRecordReducer(state, action) {
    var id = action.payload.id;
    var model = state.items.get(id);
    if (model) {
        model.markForDestruction();
    }
    return state.update("items", function (items) { return items.delete(id); });
}
exports.unloadRecordReducer = unloadRecordReducer;
