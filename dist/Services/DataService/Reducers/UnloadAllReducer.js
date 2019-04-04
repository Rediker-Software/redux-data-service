"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataServiceStateRecord_1 = require("../DataServiceStateRecord");
function unloadAllReducer(state, action) {
    state.items.forEach(function (model) {
        model.markForDestruction();
    });
    return DataServiceStateRecord_1.DataServiceStateRecord();
}
exports.unloadAllReducer = unloadAllReducer;
