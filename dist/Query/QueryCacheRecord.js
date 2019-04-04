"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
exports.QueryCacheRecord = immutable_1.Record({
    query: undefined,
    response: undefined,
    isLoading: false,
    errors: undefined,
});
