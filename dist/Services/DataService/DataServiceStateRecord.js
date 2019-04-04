"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
exports.DataServiceStateRecord = immutable_1.Record({
    items: immutable_1.Map(),
    requestCache: immutable_1.Map(),
});
