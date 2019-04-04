"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setRelationshipReducer(state, action) {
    return state.withMutations(function (record) {
        var _a = action.payload, id = _a.id, fieldName = _a.fieldName, value = _a.value;
        if (record.items.has(id)) {
            record.update("items", function (items) { return items.update(id, function (item) {
                var _a;
                return item.applyUpdates(undefined, undefined, (_a = {}, _a[fieldName] = value, _a));
            }); });
        }
        else if (process.env.NODE_ENV !== "production") {
            console.warn("setRelationshipReducer - attempted to set \"" + value + "\" on field \"" + fieldName + "\" for unknown id \"" + id + "\"");
        }
    });
}
exports.setRelationshipReducer = setRelationshipReducer;
