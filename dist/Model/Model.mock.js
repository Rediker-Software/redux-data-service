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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("faker");
var lodash_1 = require("lodash");
var Model_1 = require("Model");
var FieldType_1 = require("./FieldType");
var Decorators_1 = require("./Decorators");
var FakeModel = (function (_super) {
    __extends(FakeModel, _super);
    function FakeModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.serviceName = "fakeModel";
        return _this;
    }
    FakeModel.prototype.getData = function () {
        return this.modelData;
    };
    __decorate([
        Decorators_1.attr(FieldType_1.StringField),
        __metadata("design:type", String)
    ], FakeModel.prototype, "fullText", void 0);
    return FakeModel;
}(Model_1.Model));
exports.FakeModel = FakeModel;
function createMockFakeModelData(id) {
    return {
        id: id != null ? id : faker_1.random.number().toString(),
        fullText: faker_1.lorem.word(),
        dateUpdated: new Date(),
        dateDeleted: null,
    };
}
exports.createMockFakeModelData = createMockFakeModelData;
function createMockFakeModel(overrideValues) {
    var modelData = lodash_1.merge({}, createMockFakeModelData(), overrideValues);
    return new FakeModel(modelData);
}
exports.createMockFakeModel = createMockFakeModel;
function createMockFakeModelArray(numItems) {
    if (numItems === void 0) { numItems = 10; }
    var items = [];
    for (var x = 0; x < numItems; x++) {
        items.push(createMockFakeModelData(x.toString()));
    }
    return items;
}
exports.createMockFakeModelArray = createMockFakeModelArray;
function createMockFakeModels(numItems) {
    if (numItems === void 0) { numItems = 10; }
    return createMockFakeModelArray(numItems).map(function (item) { return new FakeModel(item); });
}
exports.createMockFakeModels = createMockFakeModels;
//# sourceMappingURL=Model.mock.js.map