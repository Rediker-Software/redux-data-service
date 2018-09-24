"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("../Model");
var BaseSerializer_1 = require("./BaseSerializer");
var MockSerializer = (function (_super) {
    __extends(MockSerializer, _super);
    function MockSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockSerializer.prototype.serialize = function () {
        return "";
    };
    MockSerializer.prototype.deserialize = function () {
        return new Model_1.FakeModel({ id: "123" });
    };
    return MockSerializer;
}(BaseSerializer_1.BaseSerializer));
exports.MockSerializer = MockSerializer;
