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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var sinon_1 = require("sinon");
var faker_1 = require("faker");
var date_fns_1 = require("date-fns");
var lodash_1 = require("lodash");
var __1 = require("..");
var Services_1 = require("../Services");
var Model_1 = require("../Model");
var MockAdapter_1 = require("../Adapters/MockAdapter");
var FieldType_1 = require("../Model/FieldType");
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
    __decorate([
        Model_1.attr(FieldType_1.ArrayField),
        __metadata("design:type", Array)
    ], MockModel.prototype, "fakeItemIds", void 0);
    __decorate([
        Model_1.hasMany({ serviceName: "fakeRelatedModel" }),
        __metadata("design:type", Array)
    ], MockModel.prototype, "fakeItems", void 0);
    return MockModel;
}(Model_1.Model));
var FakeService = (function (_super) {
    __extends(FakeService, _super);
    function FakeService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "fakeModel";
        _this.ModelClass = MockModel;
        _this._adapter = new MockAdapter_1.MockAdapter();
        _this._serializer = new __1.RestSerializer(MockModel);
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
    __decorate([
        Model_1.attr(Model_1.StringField),
        __metadata("design:type", String)
    ], FakeRelatedModel.prototype, "fakeModelId", void 0);
    return FakeRelatedModel;
}(Model_1.Model));
var FakeRelatedService = (function (_super) {
    __extends(FakeRelatedService, _super);
    function FakeRelatedService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "fakeRelatedModel";
        _this.ModelClass = FakeRelatedModel;
        _this._adapter = new MockAdapter_1.MockAdapter();
        _this._serializer = new __1.RestSerializer(FakeRelatedModel);
        return _this;
    }
    return FakeRelatedService;
}(Services_1.DataService));
describe("Mapper", function () {
    describe("transform", function () {
        var mockModelData;
        var fakeService;
        var fakeRelatedService;
        var fakeRelatedModelData;
        var fakeRelatedModel;
        var fakeModel;
        var mockSerializer;
        var fakeRelatedModelId;
        var age;
        var fullText;
        var startDateString;
        var startTimeString;
        var modelId;
        beforeEach(function () {
            Services_1.BaseService.registerDispatch(sinon_1.spy());
            mockSerializer = new __1.RestSerializer(MockModel);
            fakeService = new FakeService();
            fakeRelatedService = new FakeRelatedService();
            Services_1.registerService(fakeService);
            Services_1.registerService(fakeRelatedService);
            age = faker_1.random.number();
            fullText = faker_1.lorem.word();
            startDateString = date_fns_1.format(faker_1.date.recent(), "YYYY-MM-DD");
            startTimeString = date_fns_1.format(faker_1.date.recent(), "hh:mm:ss a");
            fakeRelatedModelId = faker_1.random.number().toString();
            modelId = faker_1.random.number().toString();
            fakeRelatedModelData = {
                id: fakeRelatedModelId,
                fullText: faker_1.lorem.word(),
                fakeModelId: modelId,
            };
            fakeRelatedModel = new FakeRelatedModel(fakeRelatedModelData);
            sinon_1.stub(fakeRelatedService, "getById").returns(Observable_1.Observable.of(fakeRelatedModel));
            mockModelData = {
                id: modelId,
                fullText: fullText,
                age: age,
                startDate: date_fns_1.parse(startDateString, "YYYY-MM-DD", new Date()),
                startTime: date_fns_1.parse(startTimeString, "hh:mm:ss a", new Date()),
                organizationId: fakeRelatedModelId,
            };
            fakeModel = new MockModel(mockModelData);
        });
        it("transforms the model into a plain javascript object based on each field's FieldType", function () { return __awaiter(_this, void 0, void 0, function () {
            var transformedModelData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, mockSerializer.transform(fakeModel)];
                    case 1:
                        transformedModelData = _a.sent();
                        expect(transformedModelData).to.deep.equal({
                            age: age,
                            fullText: fullText,
                            startDate: startDateString,
                            startTime: startTimeString,
                            organizationId: fakeRelatedModelId,
                            fakeItemIds: [],
                        });
                        return [2];
                }
            });
        }); });
        it("excludes transforming fields from the model using the model's fields property", function () { return __awaiter(_this, void 0, void 0, function () {
            var transformedModelData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fakeModel.fields.age.serialize = false;
                        return [4, mockSerializer.transform(fakeModel)];
                    case 1:
                        transformedModelData = _a.sent();
                        expect(transformedModelData).to.not.have.property("age");
                        return [2];
                }
            });
        }); });
        it("excludes transforming relationships from the model by default", function () { return __awaiter(_this, void 0, void 0, function () {
            var transformedModelData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, mockSerializer.transform(fakeModel)];
                    case 1:
                        transformedModelData = _a.sent();
                        expect(fakeModel).to.have.property("organization");
                        expect(transformedModelData).to.not.have.property("organization");
                        return [2];
                }
            });
        }); });
        it("transforms belongsTo relationships on the model when serialize = true", function () { return __awaiter(_this, void 0, void 0, function () {
            var transformedModelData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sinon_1.stub(fakeRelatedService.serializer, "transform").callThrough();
                        fakeModel.fields.organization.serialize = true;
                        return [4, mockSerializer.transform(fakeModel)];
                    case 1:
                        transformedModelData = _a.sent();
                        expect(transformedModelData).to.have.property("organization").to.deep.equal(lodash_1.omit(fakeRelatedModelData, "id"));
                        return [2];
                }
            });
        }); });
        it("uses the belongsTo relationship's own data service to transform it when serialize = true", function () { return __awaiter(_this, void 0, void 0, function () {
            var stubRelatedSerializerTransform;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stubRelatedSerializerTransform = sinon_1.stub(fakeRelatedService.serializer, "transform").returns(fakeRelatedModelData);
                        fakeModel.fields.organization.serialize = true;
                        return [4, mockSerializer.transform(fakeModel)];
                    case 1:
                        _a.sent();
                        expect(stubRelatedSerializerTransform.firstCall.args[0]).to.equal(fakeModel.organization);
                        return [2];
                }
            });
        }); });
        it("transforms hasMany relationships on the model when serialize = true", function () { return __awaiter(_this, void 0, void 0, function () {
            var anotherFakeRelatedModelId, anotherFakeRelatedModelData, anotherFakeRelatedModel, transformedModelData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sinon_1.stub(fakeRelatedService.serializer, "transform").callThrough();
                        anotherFakeRelatedModelId = faker_1.random.number().toString();
                        anotherFakeRelatedModelData = {
                            id: anotherFakeRelatedModelId,
                            fullText: faker_1.lorem.word(),
                            fakeModelId: modelId,
                        };
                        anotherFakeRelatedModel = new FakeRelatedModel(anotherFakeRelatedModelData);
                        fakeModel = fakeModel.applyUpdates(undefined, undefined, {
                            fakeItems: [fakeRelatedModel, anotherFakeRelatedModel],
                        });
                        fakeModel.fields.fakeItems.serialize = true;
                        return [4, mockSerializer.transform(fakeModel)];
                    case 1:
                        transformedModelData = _a.sent();
                        expect(transformedModelData).to.have.property("fakeItems").to.deep.equal([
                            lodash_1.omit(fakeRelatedModelData, "id"),
                            lodash_1.omit(anotherFakeRelatedModelData, "id"),
                        ]);
                        return [2];
                }
            });
        }); });
    });
    describe("normalize", function () {
        var fakeService;
        var fakeRelatedService;
        var fakeRelatedModel;
        var mockSerializer;
        var fakeRelatedModelId;
        var modelId;
        beforeEach(function () {
            modelId = faker_1.random.number().toString();
            fakeRelatedModelId = faker_1.random.number().toString();
            fakeRelatedModel = new FakeRelatedModel({
                id: fakeRelatedModelId,
                fullText: faker_1.lorem.word(),
            });
            mockSerializer = new __1.RestSerializer(MockModel);
            fakeService = new FakeService();
            fakeRelatedService = new FakeRelatedService();
            sinon_1.stub(fakeRelatedService, "getById").returns(Observable_1.Observable.of(fakeRelatedModel));
            Services_1.registerService(fakeService);
            Services_1.registerService(fakeRelatedService);
        });
        it("normalizes raw data to create an instance of the model", function () { return __awaiter(_this, void 0, void 0, function () {
            var age, fullText, startDateString, startTimeString, rawModelData, model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        age = faker_1.random.number();
                        fullText = faker_1.lorem.word();
                        startDateString = date_fns_1.format(faker_1.date.recent(), "YYYY-MM-DD");
                        startTimeString = date_fns_1.format(faker_1.date.recent(), "hh:mm:ss a");
                        rawModelData = {
                            id: modelId,
                            fullText: fullText,
                            age: age,
                            startDate: startDateString,
                            startTime: startTimeString,
                            organizationId: fakeRelatedModelId,
                        };
                        return [4, mockSerializer.normalize(rawModelData)];
                    case 1:
                        model = _a.sent();
                        expect(model).to.deep.contain({
                            age: age,
                            fullText: fullText,
                            startDate: date_fns_1.parse(startDateString, "YYYY-MM-DD", new Date()),
                            startTime: date_fns_1.parse(startTimeString, "hh:mm:ss a", new Date()),
                            organizationId: fakeRelatedModelId,
                            organization: fakeRelatedModel,
                        });
                        return [2];
                }
            });
        }); });
        describe("side loads nested related models - belongsTo", function () {
            var relatedModelData;
            var rawModelData;
            var invokeSpy;
            var pushRecordStub;
            beforeEach(function () {
                relatedModelData = {
                    id: fakeRelatedModelId,
                    fullText: fakeRelatedModel.fullText,
                    fakeModelId: modelId,
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
            it("normalizes nested related data", function () { return __awaiter(_this, void 0, void 0, function () {
                var normalizeStub;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            normalizeStub = sinon_1.stub(fakeRelatedService.serializer, "normalize").callThrough();
                            return [4, mockSerializer.normalize(rawModelData)];
                        case 1:
                            _a.sent();
                            expect(normalizeStub.firstCall.args[0]).to.equal(relatedModelData);
                            return [2];
                    }
                });
            }); });
            it("creates a pushRecord action with related data", function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, mockSerializer.normalize(rawModelData)];
                        case 1:
                            _a.sent();
                            expect(pushRecordStub.firstCall.args[0]).to.deep.equal(new FakeRelatedModel(relatedModelData));
                            return [2];
                    }
                });
            }); });
            it("invokes a pushRecord action with related data", function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, mockSerializer.normalize(rawModelData)];
                        case 1:
                            _a.sent();
                            expect(invokeSpy.calledOnce).to.be.true;
                            return [2];
                    }
                });
            }); });
        });
        describe("side loads nested related models - hasMany", function () {
            var relatedModelsData;
            var rawModelData;
            var invokeSpy;
            var pushRecordStub;
            beforeEach(function () {
                relatedModelsData = [
                    {
                        id: fakeRelatedModelId,
                        fullText: faker_1.lorem.word(),
                    },
                    {
                        id: faker_1.random.number.toString(),
                        fullText: faker_1.lorem.word(),
                    },
                    {
                        id: faker_1.random.number.toString(),
                        fullText: faker_1.lorem.word(),
                    },
                ];
                rawModelData = {
                    id: modelId,
                    fakeItemIds: relatedModelsData.map(function (item) { return item.id; }),
                    fakeItems: relatedModelsData,
                };
                invokeSpy = sinon_1.spy();
                pushRecordStub = sinon_1.stub(fakeRelatedService.actions, "pushRecord").returns({ invoke: invokeSpy });
            });
            afterEach(function () {
                pushRecordStub.restore();
            });
            it("normalizes nested related data for each item", function () { return __awaiter(_this, void 0, void 0, function () {
                var normalizeStub;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            normalizeStub = sinon_1.stub(fakeRelatedService.serializer, "normalize").callThrough();
                            return [4, mockSerializer.normalize(rawModelData)];
                        case 1:
                            _a.sent();
                            relatedModelsData.forEach(function (itemData, index) {
                                expect(normalizeStub.getCall(index).args[0]).to.equal(itemData);
                            });
                            return [2];
                    }
                });
            }); });
            it("creates a pushRecord action for each item", function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, mockSerializer.normalize(rawModelData)];
                        case 1:
                            _a.sent();
                            relatedModelsData.forEach(function (itemData, index) {
                                expect(pushRecordStub.getCall(index).args[0]).to.deep.equal(new FakeRelatedModel(itemData));
                            });
                            return [2];
                    }
                });
            }); });
            it("invokes a pushRecord action for each item", function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, mockSerializer.normalize(rawModelData)];
                        case 1:
                            _a.sent();
                            expect(invokeSpy.callCount).to.equal(relatedModelsData.length);
                            return [2];
                    }
                });
            }); });
        });
    });
});
