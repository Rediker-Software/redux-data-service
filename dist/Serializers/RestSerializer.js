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
var BaseSerializer_1 = require("./BaseSerializer");
var RestSerializer = (function (_super) {
    __extends(RestSerializer, _super);
    function RestSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RestSerializer.prototype.serialize = function (model) {
        var modelData = this.transform(model);
        return JSON.stringify(modelData);
    };
    RestSerializer.prototype.deserialize = function (data) {
        data = (typeof data === "string") ? JSON.parse(data) : data;
        return this.normalize(data);
    };
    return RestSerializer;
}(BaseSerializer_1.BaseSerializer));
exports.RestSerializer = RestSerializer;
