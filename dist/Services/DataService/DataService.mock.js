"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("../../Model");
var Adapters_1 = require("../../Adapters");
var Mapper_1 = require("../../Mapper");
var Serializers_1 = require("../../Serializers");
var DataService_1 = require("./DataService");
var FakeModelService = (function (_super) {
    __extends(FakeModelService, _super);
    function FakeModelService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "fakeModel";
        _this.ModelClass = Model_1.FakeModel;
        _this.AdapterClass = Adapters_1.MockAdapter;
        _this.SerializerClass = Serializers_1.MockSerializer;
        _this.MapperClass = Mapper_1.MockMapper;
        return _this;
    }
    return FakeModelService;
}(DataService_1.DataService));
exports.FakeModelService = FakeModelService;
