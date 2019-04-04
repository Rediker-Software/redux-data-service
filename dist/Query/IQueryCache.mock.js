"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("faker");
function createMockQueryResponse(overrideValues) {
    return __assign({ currentPage: faker_1.random.number(), totalPages: faker_1.random.number(), pageSize: faker_1.random.number(), totalCount: faker_1.random.number(), nextPage: faker_1.random.number(), previousPage: faker_1.random.number(), hasPrevious: faker_1.random.boolean(), hasNext: faker_1.random.boolean(), ids: [
            faker_1.random.uuid(),
            faker_1.random.uuid(),
        ] }, overrideValues);
}
exports.createMockQueryResponse = createMockQueryResponse;
