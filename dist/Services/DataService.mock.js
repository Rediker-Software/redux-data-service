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
var DataService_1 = require("./DataService");
var Model_1 = require("Model");
var FakeModelService = (function (_super) {
    __extends(FakeModelService, _super);
    function FakeModelService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "fakeModel";
        _this.ModelClass = Model_1.FakeModel;
        return _this;
    }
    return FakeModelService;
}(DataService_1.DataService));
exports.FakeModelService = FakeModelService;
//# sourceMappingURL=DataService.mock.js.map