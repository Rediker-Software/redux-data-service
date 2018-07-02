"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectField_1 = require("./ObjectField");
exports.BelongsToField = __assign({}, ObjectField_1.ObjectField, { serialize: false });
//# sourceMappingURL=BelongsToField.js.map