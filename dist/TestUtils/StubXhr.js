"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
var _FakedXHRHistory = [];
var _FakeXHR;
function stubXHR() {
    _FakeXHR = sinon_1.useFakeXMLHttpRequest();
    _FakedXHRHistory = [];
    _FakeXHR.onCreate = function (xhr) {
        _FakedXHRHistory.push(xhr);
    };
}
exports.stubXHR = stubXHR;
function getFakeXHR() {
    return _FakeXHR;
}
exports.getFakeXHR = getFakeXHR;
function getFakedXHRHistory() {
    return _FakedXHRHistory;
}
exports.getFakedXHRHistory = getFakedXHRHistory;
