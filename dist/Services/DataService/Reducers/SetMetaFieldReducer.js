"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setMetaFieldReducer(state, action) {
    return state.withMutations(function (record) {
        var _a = action.payload, id = _a.id, fieldName = _a.fieldName, value = _a.value;
        if (record.items.has(id)) {
            record.update("items", function (items) { return items.update(id, function (item) {
                var _a;
                return item.applyUpdates(null, (_a = {}, _a[fieldName] = value, _a));
            }); });
        }
    });
}
exports.setMetaFieldReducer = setMetaFieldReducer;
