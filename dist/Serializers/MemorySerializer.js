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
var MemorySerializer = (function (_super) {
    __extends(MemorySerializer, _super);
    function MemorySerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MemorySerializer.prototype.serialize = function (model) {
        return this.transform(model);
    };
    MemorySerializer.prototype.deserialize = function (data) {
        return this.normalize(data);
    };
    return MemorySerializer;
}(BaseSerializer_1.BaseSerializer));
exports.MemorySerializer = MemorySerializer;
