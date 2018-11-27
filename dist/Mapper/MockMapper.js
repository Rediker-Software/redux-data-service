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
var sinon_1 = require("sinon");
var of_1 = require("rxjs/observable/of");
var MockMapper = (function () {
    function MockMapper() {
        this.transform = sinon_1.stub().callsFake(function (model) {
            return of_1.of(__assign({}, model));
        });
        this.normalize = sinon_1.stub().callsFake(function (data) {
            return of_1.of({
                data: data,
            });
        });
    }
    return MockMapper;
}());
exports.MockMapper = MockMapper;
