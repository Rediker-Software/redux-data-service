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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var sinon_1 = require("sinon");
var faker_1 = require("faker");
var date_fns_1 = require("date-fns");
var Services_1 = require("Services");
var Model_1 = require("Model");
var Adapters_1 = require("Adapters");
var RestSerializer_1 = require("./RestSerializer");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach, afterEach = _a.afterEach;
var expect = intern.getPlugin("chai").expect;
var MockModel = (function (_super) {
    __extends(MockModel, _super);
    function MockModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.serviceName = "fakeModel";
        return _this;
    }
    __decorate([
        Model_1.attr(Model_1.StringField),
        __metadata("design:type", String)
    ], MockModel.prototype, "fullText", void 0);
    __decorate([
        Model_1.attr(Model_1.DateField),
        __metadata("design:type", Date)
    ], MockModel.prototype, "startDate", void 0);
    __decorate([
        Model_1.attr(Model_1.TimeField),
        __metadata("design:type", Date)
    ], MockModel.prototype, "startTime", void 0);
    __decorate([
        Model_1.attr(Model_1.NumberField),
        __metadata("design:type", Number)
    ], MockModel.prototype, "age", void 0);
    __decorate([
        Model_1.attr(Model_1.StringField),
        __metadata("design:type", String)
    ], MockModel.prototype, "organizationId", void 0);
    __decorate([
        Model_1.belongsTo({ serviceName: "fakeRelatedModel" }),
        __metadata("design:type", Object)
    ], MockModel.prototype, "organization", void 0);
    return MockModel;
}(Model_1.Model));
var FakeService = (function (_super) {
    __extends(FakeService, _super);
    function FakeService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "fakeModel";
        _this.ModelClass = MockModel;
        _this._adapter = new Adapters_1.MockAdapter();
        _this._serializer = new RestSerializer_1.RestSerializer(MockModel);
        return _this;
    }
    return FakeService;
}(Services_1.DataService));
var FakeRelatedModel = (function (_super) {
    __extends(FakeRelatedModel, _super);
    function FakeRelatedModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.serviceName = "fakeRelatedModel";
        return _this;
    }
    __decorate([
        Model_1.attr(Model_1.StringField),
        __metadata("design:type", String)
    ], FakeRelatedModel.prototype, "fullText", void 0);
    return FakeRelatedModel;
}(Model_1.Model));
var FakeRelatedService = (function (_super) {
    __extends(FakeRelatedService, _super);
    function FakeRelatedService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "fakeRelatedModel";
        _this.ModelClass = FakeRelatedModel;
        _this._adapter = new Adapters_1.MockAdapter();
        _this._serializer = new RestSerializer_1.RestSerializer(FakeRelatedModel);
        return _this;
    }
    return FakeRelatedService;
}(Services_1.DataService));
describe("BaseSerializer", function () {
    describe("transform", function () {
        var mockModelData;
        var fakeService;
        var fakeRelatedService;
        var fakeRelatedModel;
        var stubRelatedSerializerTransform;
        var fakeModel;
        var mockSerializer;
        var fakeRelatedModelId;
        var age;
        var fullText;
        var startDateString;
        var startTimeString;
        beforeEach(function () {
            age = faker_1.default.random.number();
            fullText = faker_1.default.lorem.word();
            startDateString = date_fns_1.format(faker_1.default.date.recent(), "YYYY-MM-DD");
            startTimeString = date_fns_1.format(faker_1.default.date.recent(), "hh:mm:ss a");
            fakeRelatedModelId = faker_1.default.random.number().toString();
            var modelId = faker_1.default.random.number().toString();
            fakeRelatedModel = new FakeRelatedModel({
                id: fakeRelatedModelId,
                fullText: faker_1.default.lorem.word(),
            });
            mockModelData = {
                id: modelId,
                fullText: fullText,
                age: age,
                startDate: date_fns_1.parse(startDateString, "YYYY-MM-DD", new Date()),
                startTime: date_fns_1.parse(startTimeString, "hh:mm:ss a", new Date()),
                organizationId: fakeRelatedModelId,
            };
            fakeModel = new MockModel(mockModelData);
            mockSerializer = new RestSerializer_1.RestSerializer(MockModel);
            fakeService = new FakeService();
            fakeRelatedService = new FakeRelatedService();
            sinon_1.stub(fakeRelatedService, "getById").returns(Observable_1.Observable.of(fakeRelatedModel));
            stubRelatedSerializerTransform = sinon_1.stub(fakeRelatedService.serializer, "transform").callThrough();
            Services_1.registerService(fakeService);
            Services_1.registerService(fakeRelatedService);
        });
        it("transforms the model into a plain javascript object based on each field's FieldType", function () {
            var transformedModelData = mockSerializer.transform(fakeModel);
            expect(transformedModelData).to.deep.equal({
                age: age,
                fullText: fullText,
                startDate: startDateString,
                startTime: startTimeString,
                organizationId: fakeRelatedModelId,
            });
        });
        it("excludes transforming fields from the model using the model's fields property", function () {
            fakeModel.fields.age.serialize = false;
            var transformedModelData = mockSerializer.transform(fakeModel);
            expect(transformedModelData).to.not.have.property("age");
        });
        it("excludes transforming relationships from the model by default", function () {
            var transformedModelData = mockSerializer.transform(fakeModel);
            expect(fakeModel).to.have.property("organization");
            expect(transformedModelData).to.not.have.property("organization");
        });
        it("transforms relationships on the model when serialize = true", function () {
            fakeModel.fields.organization.serialize = true;
            var transformedModelData = mockSerializer.transform(fakeModel);
            expect(fakeModel).to.have.property("organization");
            expect(transformedModelData).to.have.property("organization");
        });
        it("uses the relationship's own data service to transform it when serialize = true", function () {
            fakeModel.fields.organization.serialize = true;
            mockSerializer.transform(fakeModel);
            expect(stubRelatedSerializerTransform.firstCall.args[0]).to.equal(fakeRelatedModel);
        });
    });
    describe("normalize", function () {
        var fakeService;
        var fakeRelatedService;
        var fakeRelatedModel;
        var mockSerializer;
        var fakeRelatedModelId;
        var modelId;
        beforeEach(function () {
            modelId = faker_1.default.random.number().toString();
            fakeRelatedModelId = faker_1.default.random.number().toString();
            fakeRelatedModel = new FakeRelatedModel({
                id: fakeRelatedModelId,
                fullText: faker_1.default.lorem.word(),
            });
            mockSerializer = new RestSerializer_1.RestSerializer(MockModel);
            fakeService = new FakeService();
            fakeRelatedService = new FakeRelatedService();
            sinon_1.stub(fakeRelatedService, "getById").returns(Observable_1.Observable.of(fakeRelatedModel));
            Services_1.registerService(fakeService);
            Services_1.registerService(fakeRelatedService);
        });
        it("normalizes raw data to create an instance of the model", function () {
            var age = faker_1.default.random.number();
            var fullText = faker_1.default.lorem.word();
            var startDateString = date_fns_1.format(faker_1.default.date.recent(), "YYYY-MM-DD");
            var startTimeString = date_fns_1.format(faker_1.default.date.recent(), "hh:mm:ss a");
            var rawModelData = {
                id: modelId,
                fullText: fullText,
                age: age,
                startDate: startDateString,
                startTime: startTimeString,
                organizationId: fakeRelatedModelId,
            };
            var model = mockSerializer.normalize(rawModelData);
            expect(model).to.deep.contain({
                age: age,
                fullText: fullText,
                startDate: date_fns_1.parse(startDateString, "YYYY-MM-DD", new Date()),
                startTime: date_fns_1.parse(startTimeString, "hh:mm:ss a", new Date()),
                organizationId: fakeRelatedModelId,
                organization: fakeRelatedModel,
            });
        });
        describe("side loads nested related models", function () {
            var relatedModelData;
            var rawModelData;
            var invokeSpy;
            var pushRecordStub;
            beforeEach(function () {
                relatedModelData = {
                    id: fakeRelatedModelId,
                    fullText: fakeRelatedModel.fullText,
                };
                rawModelData = {
                    id: modelId,
                    organizationId: fakeRelatedModelId,
                    organization: relatedModelData,
                };
                invokeSpy = sinon_1.spy();
                pushRecordStub = sinon_1.stub(fakeRelatedService.actions, "pushRecord").returns({ invoke: invokeSpy });
            });
            afterEach(function () {
                pushRecordStub.restore();
            });
            it("normalizes nested related data", function () {
                var normalizeStub = sinon_1.stub(fakeRelatedService.serializer, "normalize");
                mockSerializer.normalize(rawModelData);
                expect(normalizeStub.firstCall.args[0]).to.equal(relatedModelData);
            });
            it("creates a pushRecord action with related data", function () {
                mockSerializer.normalize(rawModelData);
                expect(pushRecordStub.firstCall.args[0]).to.deep.equal(fakeRelatedModel);
            });
            it("invokes a pushRecord action with related data", function () {
                mockSerializer.normalize(rawModelData);
                expect(invokeSpy.calledOnce).to.be.true;
            });
        });
    });
});
//# sourceMappingURL=BaseSerializer.test.js.map