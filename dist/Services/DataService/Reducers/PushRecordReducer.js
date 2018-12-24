"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pushRecordReducer(state, action) {
    var item = action.payload;
    return state.update("items", function (items) {
        return items.update(item.id, function () { return item; });
    });
}
exports.pushRecordReducer = pushRecordReducer;
