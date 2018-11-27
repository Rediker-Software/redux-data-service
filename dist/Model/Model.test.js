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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
require("rxjs/add/operator/publishReplay");
var sinon_1 = require("sinon");
var of_1 = require("rxjs/observable/of");
var Subject_1 = require("rxjs/Subject");
var faker_1 = require("faker");
var Services_1 = require("../Services");
var Initializers_1 = require("../Initializers");
var Model_1 = require("./Model");
var Decorators_1 = require("./Decorators");
var FieldType_1 = require("./FieldType");
var TestUtils_1 = require("../TestUtils");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach, before = _a.before;
var expect = intern.getPlugin("chai").expect;
describe("Model", function () {
    before(function () {
        Initializers_1.initializeValidateJS();
    });
    describe("Fields", function () {
        var mockModel = new Model_1.Model({ id: "fakeId", dateDeleted: new Date(), dateUpdated: new Date() });
        it("sets id to be readOnly", function () {
            expect(mockModel.fields.id).to.have.property("readOnly", true);
        });
        it("sets dateDeleted to be readOnly", function () {
            expect(mockModel.fields.dateDeleted).to.have.property("readOnly", true);
        });
        it("sets dateUpdated to be readOnly", function () {
            expect(mockModel.fields.dateUpdated).to.have.property("readOnly", true);
        });
    });
    describe("Saving the model", function () {
        var service;
        var modelId;
        var relatedModelId;
        var favoriteColor;
        var name;
        beforeEach(function () {
            modelId = faker_1.random.number().toString();
            relatedModelId = faker_1.random.number().toString();
            favoriteColor = faker_1.lorem.word();
            name = faker_1.lorem.word();
            Services_1.BaseService.registerDispatch(sinon_1.spy());
            var RelatedModel = (function (_super) {
                __extends(RelatedModel, _super);
                function RelatedModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "relatedModel";
                    return _this;
                }
                __decorate([
                    Decorators_1.required(),
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], RelatedModel.prototype, "favoriteColor", void 0);
                return RelatedModel;
            }(Model_1.Model));
            var RelatedModelService = (function (_super) {
                __extends(RelatedModelService, _super);
                function RelatedModelService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "relatedModel";
                    _this.ModelClass = RelatedModel;
                    return _this;
                }
                return RelatedModelService;
            }(Services_1.DataService));
            var Example = (function (_super) {
                __extends(Example, _super);
                function Example() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "example";
                    return _this;
                }
                __decorate([
                    Decorators_1.required(),
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "name", void 0);
                __decorate([
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "relatedModelId", void 0);
                __decorate([
                    Decorators_1.belongsTo(),
                    __metadata("design:type", RelatedModel)
                ], Example.prototype, "relatedModel", void 0);
                return Example;
            }(Model_1.Model));
            var ExampleService = (function (_super) {
                __extends(ExampleService, _super);
                function ExampleService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "example";
                    _this.ModelClass = Example;
                    return _this;
                }
                return ExampleService;
            }(Services_1.DataService));
            var relatedModel = new RelatedModel({
                id: relatedModelId,
                favoriteColor: favoriteColor,
            }, {
                changes: {
                    favoriteColor: "",
                },
            });
            var relatedModelService = new RelatedModelService();
            sinon_1.stub(relatedModelService, "getById").returns(of_1.of(relatedModel));
            Services_1.registerService(relatedModelService);
            service = new ExampleService();
            Services_1.registerService(service);
        });
        describe("Model#save", function () {
            it("rejects the promise if there are validation errors", function () {
                var model = service.createNew();
                return model.save()
                    .then(function () {
                    throw new Error("Promise should throw when there are validation errors");
                })
                    .catch(function (errors) {
                    expect(errors).to.have.property("name").deep.equal(["Name is required"]);
                });
            });
            it("calls saveRelatedModels to save related models", function () {
                var model = service
                    .createNew()
                    .applyUpdates({ name: faker_1.lorem.word() });
                var stubSaveRelatedModels = sinon_1.stub(model, "saveRelatedModels");
                sinon_1.stub(model, "saveModel");
                return model.save().finally(function () {
                    expect(stubSaveRelatedModels.callCount).to.equal(1);
                });
            });
            it("calls saveModel to save the model's own data", function () {
                var model = service
                    .createNew()
                    .applyUpdates({ name: faker_1.lorem.word() });
                var stubSaveModel = sinon_1.stub(model, "saveModel");
                sinon_1.stub(model, "saveRelatedModels");
                return model.save().finally(function () {
                    expect(stubSaveModel.callCount).to.equal(1);
                });
            });
            it("returns the same instance of the model when there are no errors and no changes", function () {
                var model = service.createNew({ name: faker_1.lorem.word() });
                return model
                    .save()
                    .then(function (result) {
                    expect(result).to.equal(model);
                })
                    .catch(function () {
                    throw new Error("Expected promise to resolve when there are no errors or changes");
                });
            });
        });
        describe("Model.saveRelatedModels", function () {
            it("saves related models with pending changes", function () {
                var model = service.createNew({ relatedModelId: relatedModelId });
                var stubRelatedSaveModel = sinon_1.stub(model.relatedModel, "saveModel").resolves();
                return model.saveRelatedModels().finally(function () {
                    expect(stubRelatedSaveModel.callCount).to.equal(1);
                });
            });
            it("assigns new related models onto the model after it is saved", function () {
                var fakeModel = sinon_1.spy();
                var model = service.createNew({ relatedModelId: relatedModelId });
                var stubSetRelated = sinon_1.stub(model, "setRelated");
                sinon_1.stub(model.relatedModel, "saveModel").resolves(fakeModel);
                return model.saveRelatedModels().finally(function () {
                    expect(stubSetRelated.firstCall.args).to.deep.equal([
                        "relatedModel",
                        fakeModel,
                    ]);
                });
            });
        });
        describe("Model#saveModel", function () {
            describe("saving a new record", function () {
                var expectedName;
                var invokeSpy;
                var createRecordStub;
                var model;
                it("calls createRecord action on the service when calling save() on a new record", function () {
                    expectedName = "hello, world!";
                    invokeSpy = sinon_1.spy();
                    createRecordStub = sinon_1.stub(service.actions, "createRecord").returns({
                        invoke: invokeSpy,
                    });
                    model = service
                        .createNew()
                        .applyUpdates({ name: expectedName });
                    model.saveModel();
                    expect(createRecordStub.firstCall.args[0]).to.deep.equal({ id: model.id });
                });
                it("dispatches createRecord action to the service when calling save() on a new record", function () {
                    expectedName = "hello, world!";
                    invokeSpy = sinon_1.spy();
                    createRecordStub = sinon_1.stub(service.actions, "createRecord").returns({
                        invoke: invokeSpy,
                    });
                    model = service
                        .createNew()
                        .applyUpdates({ name: expectedName });
                    model.saveModel();
                    expect(invokeSpy.calledOnce).to.equal(true);
                });
            });
            describe("saving an existing record", function () {
                var updateRecordStub;
                var model;
                beforeEach(function () {
                    updateRecordStub = sinon_1.stub(service.actions, "updateRecord");
                    model = new service.ModelClass(service, { id: faker_1.random.number().toString(), name: faker_1.lorem.word() });
                });
                it("calls updateRecord action on the service when calling save() on an existing record", function () {
                    var expectedName = "hello, world!";
                    model = model.applyUpdates({ name: expectedName });
                    model.saveModel();
                    expect(updateRecordStub.firstCall.args[0]).to.deep.equal({ id: model.id });
                });
                it("dispatches updateRecord action to the service when calling save() on an existing record", function () {
                    var invokeSpy = sinon_1.spy();
                    updateRecordStub.returns({
                        invoke: invokeSpy,
                    });
                    model
                        .applyUpdates({ name: faker_1.lorem.word() })
                        .saveModel();
                    expect(invokeSpy.calledOnce).to.be.true;
                });
            });
        });
    });
    describe("Model#validate & Model#validateField", function () {
        var service;
        var modelId;
        var relatedModelId;
        var favoriteColor;
        var name;
        beforeEach(function () {
            modelId = faker_1.random.number().toString();
            relatedModelId = faker_1.random.number().toString();
            favoriteColor = faker_1.lorem.word();
            name = faker_1.lorem.word();
            Services_1.BaseService.registerDispatch(sinon_1.spy());
            var RelatedModel = (function (_super) {
                __extends(RelatedModel, _super);
                function RelatedModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "relatedModel";
                    return _this;
                }
                __decorate([
                    Decorators_1.required(),
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], RelatedModel.prototype, "favoriteColor", void 0);
                return RelatedModel;
            }(Model_1.Model));
            var RelatedModelService = (function (_super) {
                __extends(RelatedModelService, _super);
                function RelatedModelService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "relatedModel";
                    _this.ModelClass = RelatedModel;
                    return _this;
                }
                return RelatedModelService;
            }(Services_1.DataService));
            var Example = (function (_super) {
                __extends(Example, _super);
                function Example() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "example";
                    return _this;
                }
                __decorate([
                    Decorators_1.required(),
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "name", void 0);
                __decorate([
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "relatedModelId", void 0);
                __decorate([
                    Decorators_1.belongsTo(),
                    __metadata("design:type", RelatedModel)
                ], Example.prototype, "relatedModel", void 0);
                return Example;
            }(Model_1.Model));
            var ExampleService = (function (_super) {
                __extends(ExampleService, _super);
                function ExampleService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "example";
                    _this.ModelClass = Example;
                    return _this;
                }
                return ExampleService;
            }(Services_1.DataService));
            var relatedModel = new RelatedModel({
                id: relatedModelId,
                favoriteColor: favoriteColor,
            }, {
                changes: {
                    favoriteColor: "",
                },
            });
            var relatedModelService = new RelatedModelService();
            sinon_1.stub(relatedModelService, "getById").returns(of_1.of(relatedModel));
            Services_1.registerService(relatedModelService);
            service = new ExampleService();
            Services_1.registerService(service);
        });
        it("validates the model's data using the model's validation rules", function () {
            var model = new service.ModelClass({ id: modelId, name: "" });
            expect(model.validate()).to.deep.equal({
                name: ["Name is required"],
            });
        });
        it("passes validation result to the SET_META_FIELD action creator on the DataService to update the model's error meta field", function () {
            var model = new service.ModelClass({ id: modelId, name: "" });
            var setMetaFieldStub = sinon_1.stub(service.actions, "setMetaField").returns({
                invoke: sinon_1.spy(),
            });
            model.validate();
            expect(setMetaFieldStub.firstCall.args[0]).to.deep.equal({
                id: modelId,
                fieldName: "errors",
                value: {
                    name: ["Name is required"],
                },
            });
        });
        it("dispatches SET_META_FIELD action after it is created to update the model's error meta field", function () {
            var model = new service.ModelClass({ id: modelId, name: "" });
            var invokeSpy = sinon_1.spy();
            sinon_1.stub(service.actions, "setMetaField").returns({
                invoke: invokeSpy,
            });
            model.validate();
            expect(invokeSpy.calledOnce).to.equal(true);
        });
        it("optionally includes related models when validating the model", function () {
            var model = new service.ModelClass({ id: modelId, name: "", relatedModelId: relatedModelId });
            model.getRelated("relatedModel");
            expect(model.validate(true)).to.deep.equal({
                "relatedModel.favoriteColor": ["Favorite color is required"],
                name: ["Name is required"],
            });
        });
        it("does not validate related models which have not been loaded previously", function () {
            var model = new service.ModelClass({ id: modelId, name: name, relatedModelId: relatedModelId });
            expect(model.validate(true)).to.deep.equal({});
        });
        it("validates a single field", function () {
            var model = new service.ModelClass({ id: modelId, name: "" });
            expect(model.validateField("name")).to.deep.equal([
                "Name is required",
            ]);
        });
        it("validates a single nested field", function () {
            var model = new service.ModelClass({ id: modelId, name: "", relatedModelId: relatedModelId });
            expect(model.validateField("relatedModel.favoriteColor")).to.deep.equal([
                "Favorite color is required",
            ]);
        });
        it("updates existing validation results when validating a single field", function () {
            var model = new service.ModelClass({ id: modelId, name: "" });
            var errors = model.validate();
            model = model.applyUpdates({ name: name }, { errors: errors });
            expect(model.validateField("name")).to.be.undefined;
        });
    });
    describe("Model#reset", function () {
        var service;
        var model;
        var originalData;
        var modelId;
        var name;
        beforeEach(function () {
            modelId = faker_1.random.number().toString();
            name = faker_1.lorem.word();
            Services_1.BaseService.registerDispatch(sinon_1.spy());
            var Example = (function (_super) {
                __extends(Example, _super);
                function Example() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "example";
                    return _this;
                }
                __decorate([
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "name", void 0);
                return Example;
            }(Model_1.Model));
            var ExampleService = (function (_super) {
                __extends(ExampleService, _super);
                function ExampleService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "example";
                    _this.ModelClass = Example;
                    return _this;
                }
                return ExampleService;
            }(Services_1.DataService));
            service = new ExampleService();
            Services_1.registerService(service);
            originalData = { id: modelId, name: name };
            model = new Example(originalData);
        });
        it("does not attempt to reset if the Model has not changed", function () {
            var pushRecordStub = sinon_1.stub(service.actions, "pushRecord");
            model.reset();
            expect(pushRecordStub.callCount).to.equal(0);
        });
        it("passes the model's original data to the DataService's pushRecord action creator to reset the Model's data", function () {
            var pushRecordStub = sinon_1.stub(service.actions, "pushRecord").returns({
                invoke: sinon_1.spy(),
            });
            model
                .applyUpdates({
                name: faker_1.lorem.word(),
            })
                .reset();
            expect(pushRecordStub.firstCall.args[0]).to.deep.equal(model);
        });
        it("dispatches the pushRecord action to reset the Model's data", function () {
            var invokeSpy = sinon_1.spy();
            sinon_1.stub(service.actions, "pushRecord").returns({
                invoke: invokeSpy,
            });
            model
                .applyUpdates({
                name: faker_1.lorem.word(),
            })
                .reset();
            expect(invokeSpy.calledOnce).to.equal(true);
        });
        it("unloads the model if it is new", function () {
            var newModel = service.createNew();
            var unloadStub = sinon_1.stub(newModel, "unload");
            newModel.reset();
            expect(unloadStub.callCount).to.equal(1);
        });
    });
    describe("Model#forceReload", function () {
        var service;
        var modelId;
        beforeEach(function () {
            modelId = faker_1.random.number().toString();
            Services_1.BaseService.registerDispatch(sinon_1.spy());
            var Example = (function (_super) {
                __extends(Example, _super);
                function Example() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "example";
                    return _this;
                }
                __decorate([
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "name", void 0);
                return Example;
            }(Model_1.Model));
            var ExampleService = (function (_super) {
                __extends(ExampleService, _super);
                function ExampleService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "example";
                    _this.ModelClass = Example;
                    return _this;
                }
                return ExampleService;
            }(Services_1.DataService));
            service = new ExampleService();
            Services_1.registerService(service);
        });
        it("does not attempt to forceReload if the model is new", function () {
            var fetchRecordStub = sinon_1.stub(service.actions, "fetchRecord");
            var model = service.createNew();
            model.forceReload();
            expect(fetchRecordStub.callCount).to.equal(0);
        });
        it("passes the model's id and forceReload: true to the fetchRecord action creator to force the model to reload", function () {
            var fetchRecordStub = sinon_1.stub(service.actions, "fetchRecord").returns({
                invoke: sinon_1.spy(),
            });
            var model = new service.ModelClass({ id: modelId });
            model.forceReload();
            expect(fetchRecordStub.firstCall.args).to.deep.equal([
                { id: modelId },
                { forceReload: true },
            ]);
        });
        it("dispatches fetchRecord action to force the model to reload", function () {
            var invokeSpy = sinon_1.spy();
            sinon_1.stub(service.actions, "fetchRecord").returns({
                invoke: invokeSpy,
            });
            var model = new service.ModelClass({ id: modelId });
            model.forceReload();
            expect(invokeSpy.calledOnce).to.equal(true);
        });
    });
    describe("Model#applyUpdates", function () {
        describe("creates a new instance of the Model", function () {
            var service;
            var modelId;
            var name;
            beforeEach(function () {
                modelId = faker_1.random.number().toString();
                name = faker_1.lorem.word();
                Services_1.BaseService.registerDispatch(sinon_1.spy());
                var Example = (function (_super) {
                    __extends(Example, _super);
                    function Example() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "example";
                        return _this;
                    }
                    __decorate([
                        Decorators_1.attr(FieldType_1.StringField),
                        __metadata("design:type", String)
                    ], Example.prototype, "name", void 0);
                    return Example;
                }(Model_1.Model));
                var ExampleService = (function (_super) {
                    __extends(ExampleService, _super);
                    function ExampleService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "example";
                        _this.ModelClass = Example;
                        return _this;
                    }
                    return ExampleService;
                }(Services_1.DataService));
                service = new ExampleService();
                Services_1.registerService(service);
            });
            it("creates a new instance of the Model", function () {
                var firstModel = service.createNew();
                var secondModel = firstModel.applyUpdates();
                expect(firstModel).to.not.equal(secondModel);
            });
            it("creates a new instance of the Model using its own data", function () {
                var originalData = { id: modelId, name: name };
                var firstModel = new service.ModelClass(service, originalData);
                var secondModel = firstModel.applyUpdates();
                expect(firstModel).to.deep.equal(secondModel);
            });
            it("creates a new instance of the Model with new meta", function () {
                var firstModel = service.createNew();
                var secondModel = firstModel.applyUpdates(null, { isLoading: true });
                expect(secondModel).to.have.property("isLoading").to.be.true;
            });
            it("creates a new instance of the Model with new meta without modifying the original", function () {
                var firstModel = service.createNew();
                var secondModel = firstModel.applyUpdates(null, { isLoading: true });
                expect(firstModel).to.have.property("isLoading").to.be.false;
            });
            it("creates a new instance of the Model with new data", function () {
                var expectedValue = faker_1.lorem.word();
                var firstModel = service.createNew();
                var secondModel = firstModel.applyUpdates({ name: expectedValue });
                expect(secondModel).to.have.property("name").to.equal(expectedValue);
            });
            it("creates a new instance of the Model with new data without modifying the original", function () {
                var firstModel = service.createNew();
                var secondModel = firstModel.applyUpdates({ name: faker_1.lorem.word() });
                expect(firstModel).to.have.property("name").to.equal("");
            });
            it("throws a ReferenceError if attempting to set on an invalid field name", function () {
                var model = service.createNew();
                expect(function () { return model.applyUpdates({ asdf: faker_1.random.number() }); }).to.throw(ReferenceError, "not found");
            });
            it("throws a TypeError if attempting to set an invalid type for a field", function () {
                var model = service.createNew();
                expect(function () { return model.applyUpdates({ name: faker_1.random.number() }); }).to.throw(TypeError, "invalid");
            });
        });
        describe("creates new instance by merging own data with new data", function () {
            var service;
            var originalData;
            var firstModel;
            var modelId;
            var name;
            var age;
            var languages;
            beforeEach(function () {
                modelId = faker_1.random.number().toString();
                name = faker_1.lorem.word();
                age = faker_1.random.number();
                languages = [faker_1.random.word(), faker_1.random.word(), faker_1.random.word()];
                var Example = (function (_super) {
                    __extends(Example, _super);
                    function Example() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.serviceName = "example";
                        return _this;
                    }
                    Example.prototype.getMeta = function () {
                        return this.meta;
                    };
                    Example.prototype.getModelData = function () {
                        return this.modelData;
                    };
                    __decorate([
                        Decorators_1.attr(FieldType_1.StringField),
                        __metadata("design:type", String)
                    ], Example.prototype, "name", void 0);
                    __decorate([
                        Decorators_1.attr(FieldType_1.NumberField),
                        __metadata("design:type", Number)
                    ], Example.prototype, "age", void 0);
                    __decorate([
                        Decorators_1.attr(FieldType_1.ArrayField),
                        __metadata("design:type", Array)
                    ], Example.prototype, "languages", void 0);
                    return Example;
                }(Model_1.Model));
                var ExampleService = (function (_super) {
                    __extends(ExampleService, _super);
                    function ExampleService() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.name = "example";
                        _this.ModelClass = Example;
                        return _this;
                    }
                    return ExampleService;
                }(Services_1.DataService));
                service = new ExampleService();
                Services_1.registerService(service);
                originalData = { id: modelId, name: name, age: age, languages: languages };
                firstModel = new service.ModelClass(originalData);
            });
            it("creates a new instance of the Model with new data as meta.changes", function () {
                var secondModelChanges = { name: faker_1.lorem.word() };
                var secondModel = firstModel.applyUpdates(secondModelChanges);
                expect(secondModel.getMeta()).to.have.property("changes").to.deep.equal(secondModelChanges);
            });
            it("creates a new instance of the Model without changing modelData", function () {
                var secondModel = firstModel.applyUpdates({ name: faker_1.lorem.word() });
                expect(secondModel.getModelData()).to.deep.equal(originalData);
            });
            it("creates a new instance of the Model with new data without modifying the meta.changes on the first model", function () {
                var secondModel = firstModel.applyUpdates({ name: faker_1.lorem.word() });
                expect(firstModel.getMeta()).to.have.property("changes").to.be.null;
            });
            it("creates a new instance of the Model with new data and changes meta.changes if it was already set", function () {
                var secondModel = firstModel.applyUpdates({ name: faker_1.lorem.word() });
                var thirdModelChanges = { name: faker_1.lorem.word() };
                var thirdModel = secondModel.applyUpdates(thirdModelChanges);
                expect(thirdModel.getMeta()).to.have.property("changes").to.deep.equal(thirdModelChanges);
            });
            it("creates a new instance of the Model with new meta without modifying the meta on the first model", function () {
                var secondModel = firstModel.applyUpdates(null, { isLoading: true });
                expect(firstModel.getMeta()).to.have.property("isLoading").to.be.false;
            });
            it("creates a new instance of the Model with new meta", function () {
                var secondModel = firstModel.applyUpdates(null, { isLoading: true });
                expect(secondModel.getMeta()).to.have.property("isLoading").to.be.true;
            });
            it("creates a new instance of the Model with new meta without changing modelData", function () {
                var secondModel = firstModel.applyUpdates(null, { isLoading: true });
                expect(secondModel.getModelData()).to.deep.equal(originalData);
            });
            it("creates a new instance of the Model with empty array when updating with an empty array", function () {
                var secondModel = firstModel.applyUpdates({ languages: [] });
                expect(secondModel.getMeta()).to.have.property("changes").to.have.property("languages").to.be.empty;
            });
        });
    });
    describe("Model#getField", function () {
        var service;
        var model;
        var modelId;
        var name;
        beforeEach(function () {
            modelId = faker_1.random.number().toString();
            name = faker_1.lorem.word();
            Services_1.BaseService.registerDispatch(sinon_1.spy());
            var Example = (function (_super) {
                __extends(Example, _super);
                function Example() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "example";
                    return _this;
                }
                __decorate([
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "name", void 0);
                return Example;
            }(Model_1.Model));
            var ExampleService = (function (_super) {
                __extends(ExampleService, _super);
                function ExampleService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "example";
                    _this.ModelClass = Example;
                    return _this;
                }
                return ExampleService;
            }(Services_1.DataService));
            service = new ExampleService();
            Services_1.registerService(service);
            model = new Example({ id: modelId, name: name });
        });
        it("returns the default value if the fieldName is not in the modelData", function () {
            expect(model.getField("fakeField", "hello")).to.equal("hello");
        });
        it("returns the value in modelData for the given fieldName", function () {
            expect(model.getField("name")).to.equal(name);
        });
    });
    describe("Model#setField", function () {
        var service;
        var ExampleModel;
        var modelId;
        var name;
        beforeEach(function () {
            modelId = faker_1.random.number().toString();
            name = faker_1.lorem.word();
            Services_1.BaseService.registerDispatch(sinon_1.spy());
            var Example = (function (_super) {
                __extends(Example, _super);
                function Example() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "example";
                    return _this;
                }
                __decorate([
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "name", void 0);
                return Example;
            }(Model_1.Model));
            var ExampleService = (function (_super) {
                __extends(ExampleService, _super);
                function ExampleService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "example";
                    _this.ModelClass = Example;
                    return _this;
                }
                return ExampleService;
            }(Services_1.DataService));
            service = new ExampleService();
            Services_1.registerService(service);
            ExampleModel = Example;
        });
        it("passes the model's id and the given data to the setField action creator", function () {
            var setFieldStub = sinon_1.stub(service.actions, "setField").returns({
                invoke: sinon_1.spy(),
            });
            var model = new ExampleModel({ id: modelId, name: name });
            var expectedValue = faker_1.lorem.word();
            model.setField("name", expectedValue);
            expect(setFieldStub.firstCall.args[0]).to.deep.equal({
                id: modelId,
                fieldName: "name",
                value: expectedValue,
            });
        });
        it("dispatches fetchRecord action to force the model to reload", function () {
            var invokeSpy = sinon_1.spy();
            sinon_1.stub(service.actions, "setField").returns({
                invoke: invokeSpy,
            });
            var model = new ExampleModel({ id: modelId, name: name });
            model.setField("name", faker_1.lorem.word());
            expect(invokeSpy.calledOnce).to.be.true;
        });
        it("does not mutate the current instance of the Model", function () {
            sinon_1.stub(service.actions, "setField").returns({
                invoke: sinon_1.spy(),
            });
            var model = new ExampleModel({ id: modelId, name: name });
            model.setField("name", faker_1.lorem.word());
            expect(model.name).to.equal(name);
        });
        it("throws a ReferenceError if attempting to set on an invalid field name", function () {
            var model = new ExampleModel({ id: modelId, name: name });
            expect(function () { return model.setField("asdf", faker_1.random.number()); }).to.throw(ReferenceError, "not found");
        });
        it("throws a TypeError if attempting to set an invalid type for a field", function () {
            var model = new ExampleModel({ id: modelId, name: name });
            expect(function () { return model.setField("name", faker_1.random.number()); }).to.throw(TypeError, "invalid");
        });
    });
    describe("Model - relationship magic getter and setter", function () {
        var exampleService;
        var studentService;
        var organizationService;
        var ExampleModelClass;
        var id;
        var organizationId;
        beforeEach(function () {
            id = faker_1.random.number().toString();
            organizationId = faker_1.random.number().toString();
            Services_1.BaseService.registerDispatch(sinon_1.spy());
            var Organization = (function (_super) {
                __extends(Organization, _super);
                function Organization() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "organization";
                    return _this;
                }
                return Organization;
            }(Model_1.Model));
            var OrganizationService = (function (_super) {
                __extends(OrganizationService, _super);
                function OrganizationService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "organization";
                    _this.ModelClass = Organization;
                    return _this;
                }
                return OrganizationService;
            }(Services_1.DataService));
            var Student = (function (_super) {
                __extends(Student, _super);
                function Student() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "student";
                    return _this;
                }
                return Student;
            }(Model_1.Model));
            var StudentService = (function (_super) {
                __extends(StudentService, _super);
                function StudentService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "student";
                    _this.ModelClass = Student;
                    return _this;
                }
                return StudentService;
            }(Services_1.DataService));
            var Example = (function (_super) {
                __extends(Example, _super);
                function Example() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "example";
                    return _this;
                }
                __decorate([
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "organizationId", void 0);
                __decorate([
                    Decorators_1.attr(FieldType_1.ArrayField),
                    __metadata("design:type", Array)
                ], Example.prototype, "studentIds", void 0);
                __decorate([
                    Decorators_1.belongsTo(),
                    __metadata("design:type", Object)
                ], Example.prototype, "organization", void 0);
                __decorate([
                    Decorators_1.hasMany(),
                    __metadata("design:type", Array)
                ], Example.prototype, "students", void 0);
                return Example;
            }(Model_1.Model));
            ExampleModelClass = Example;
            var ExampleService = (function (_super) {
                __extends(ExampleService, _super);
                function ExampleService() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "example";
                    _this.ModelClass = Example;
                    return _this;
                }
                return ExampleService;
            }(Services_1.DataService));
            exampleService = new ExampleService();
            studentService = new StudentService();
            organizationService = new OrganizationService();
            Services_1.registerService(exampleService);
            Services_1.registerService(studentService);
            Services_1.registerService(organizationService);
        });
        describe("Model#getRelated", function () {
            it("returns undefined if the requested related field is not a property on the model", function () {
                var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                expect(model.getRelated("fakeField")).to.be.undefined;
            });
            it("returns a shadow for a belongsTo relationship if the current model is a shadow", function () {
                var shadowModel = exampleService.getShadowObject();
                expect(shadowModel.getRelated("organization")).to.have.property("isShadow").to.be.true;
            });
            it("returns undefined for a belongsTo relationship if the related id field is empty", function () {
                var model = new ExampleModelClass({ id: id, organizationId: null });
                expect(model.getRelated("organization")).to.be.undefined;
            });
            it("returns an empty array for a hasMany relationship if the related ids field is empty", function () {
                var model = new ExampleModelClass({ id: id, studentIds: [] });
                expect(model.getRelated("students")).to.be.an("array").that.is.empty;
            });
            it("uses the Observable returned from the DataService to get the related BelongsTo model", function () {
                var organizationObservable = of_1.of(new organizationService.ModelClass({ id: organizationId }));
                sinon_1.stub(organizationService, "getById").returns(organizationObservable);
                var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                expect(model).to.have.property("organization").to.have.property("id").to.equal(organizationId);
            });
            it("uses the Observable returned from the DataService to get the related HasMany models", function () {
                var studentIds = [faker_1.random.number().toString(), faker_1.random.number().toString()];
                var students = studentIds.map(function (studentId) { return new studentService.ModelClass({ id: studentId }); });
                var studentObservable = of_1.of(students);
                sinon_1.stub(studentService, "getByIds").returns(studentObservable);
                var model = new ExampleModelClass({ id: id, studentIds: studentIds });
                expect(model).to.have.property("students").to.deep.equal(students);
            });
            it("dispatches a setRelationship action when the Observable updates more than once", function () {
                var stubSetRelationship = sinon_1.stub(exampleService.actions, "setRelationship").returns({ invoke: sinon_1.spy() });
                var organizationObservable = new Subject_1.Subject();
                sinon_1.stub(organizationService, "getById").returns(organizationObservable.publishReplay(1).refCount());
                var organization1 = new organizationService.ModelClass({ id: organizationId });
                var organization2 = new organizationService.ModelClass({ id: organizationId });
                var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                model.getRelated("organization");
                organizationObservable.next(organization1);
                organizationObservable.next(organization2);
                expect(stubSetRelationship.firstCall.args[0]).to.have.property("value").to.equal(organization2);
            });
            it("stops listening to new changes when the Model is being torn down", function () {
                var organizationObservable = new Subject_1.Subject();
                sinon_1.stub(organizationService, "getById").returns(organizationObservable.publishReplay(1).refCount());
                var organization1 = new organizationService.ModelClass({ id: organizationId });
                var organization2 = new organizationService.ModelClass({ id: organizationId });
                var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                model.getRelated("organization");
                organizationObservable.next(organization1);
                model.markForDestruction();
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        try {
                            organizationObservable.next(organization2);
                            expect(model).to.have.property("organization").to.equal(organization1).but.to.not.equal(organization2);
                            resolve();
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            });
            it("will not subscribe to new changes when the Model is being torn down", function () {
                var organization = new organizationService.ModelClass({ id: organizationId });
                var organizationObservable = of_1.of(organization);
                sinon_1.stub(organizationService, "getById").returns(organizationObservable);
                var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                model.markForDestruction();
                expect(model).to.have.property("organization").to.be.undefined;
            });
            it("will return the correct version of a relationship when its related id changes", function () {
                var newOrganizationId = faker_1.random.number().toString();
                var organization = new organizationService.ModelClass({ id: organizationId });
                var newOrganization = new organizationService.ModelClass({ id: newOrganizationId });
                var getByIdStub = sinon_1.stub(organizationService, "getById").returns(of_1.of(organization));
                var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                expect(model).to.have.property("organization").to.equal(organization);
                getByIdStub.restore();
                sinon_1.stub(organizationService, "getById").returns(of_1.of(newOrganization));
                var updatedModel = model.applyUpdates({ organizationId: newOrganizationId });
                expect(updatedModel).to.have.property("organization").to.equal(newOrganization);
            });
            it("will not change the relationship of the current model instance when its related id changes", function () {
                var organization = new organizationService.ModelClass({ id: organizationId });
                var newOrganizationId = faker_1.random.number().toString();
                var newOrganization = new organizationService.ModelClass({ id: organizationId });
                var getByIdStub = sinon_1.stub(organizationService, "getById").returns(of_1.of(organization));
                var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                expect(model).to.have.property("organization").to.equal(organization);
                getByIdStub.restore();
                sinon_1.stub(organizationService, "getById").returns(of_1.of(newOrganization));
                model.applyUpdates({ organizationId: newOrganizationId });
                expect(model).to.have.property("organization").to.equal(organization);
            });
        });
        describe("Model#setRelated", function () {
            it("passes the BelongsTo model id to the setField method", function () {
                var organization = new organizationService.ModelClass({ id: organizationId });
                var model = new ExampleModelClass({ id: id, organizationId: organizationId });
                var setFieldStub = sinon_1.stub(model, "setField");
                model.setRelated("organization", organization);
                expect(setFieldStub.firstCall.args).to.deep.equal([
                    "organizationId",
                    organizationId,
                ]);
            });
            it("passes the HasMany model ids to the setField method", function () {
                var studentIds = [faker_1.random.number().toString(), faker_1.random.number().toString()];
                var students = studentIds.map(function (studentId) { return new studentService.ModelClass({ id: studentId }); });
                var model = new ExampleModelClass({ id: id, studentIds: studentIds });
                var setFieldStub = sinon_1.stub(model, "setField");
                model.setRelated("students", students);
                expect(setFieldStub.firstCall.args).to.deep.equal([
                    "studentIds",
                    studentIds,
                ]);
            });
        });
    });
    describe("Model#getServiceForRelationship", function () {
        var model;
        var fakeServiceName;
        beforeEach(function () {
            var Example = (function (_super) {
                __extends(Example, _super);
                function Example() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.serviceName = "example";
                    return _this;
                }
                __decorate([
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "objectType", void 0);
                __decorate([
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "relatedThingId", void 0);
                __decorate([
                    Decorators_1.belongsTo({ serviceNameField: "objectType" }),
                    __metadata("design:type", Object)
                ], Example.prototype, "relatedThing", void 0);
                __decorate([
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], Example.prototype, "studentId", void 0);
                __decorate([
                    Decorators_1.belongsTo(),
                    __metadata("design:type", Object)
                ], Example.prototype, "student", void 0);
                return Example;
            }(Model_1.Model));
            fakeServiceName = faker_1.random.word();
            model = new Example({ id: faker_1.random.word(), objectType: fakeServiceName });
        });
        it("uses a relationship's serviceNameField to get the related service", function () {
            var fakeService = { name: fakeServiceName };
            Services_1.registerService(fakeService);
            expect(model.getServiceForRelationship("relatedThing")).to.equal(fakeService);
        });
        it("uses the relationship's field name to determine the serviceName by default to get the related service", function () {
            var fakeStudentService = { name: "student" };
            Services_1.registerService(fakeStudentService);
            expect(model.getServiceForRelationship("student")).to.equal(fakeStudentService);
        });
    });
    describe("Model#isDirty", function () {
        it("considers the model to be dirty when a field has changed", function () {
            TestUtils_1.initializeTestServices(TestUtils_1.fakeModelModule);
            var model = TestUtils_1.seedService("fakeModel");
            model = model.applyUpdates({ fullText: faker_1.lorem.word() });
            expect(model.isDirty).to.be.true;
        });
        it("does not consider the model to be dirty when the model has not been changed", function () {
            TestUtils_1.initializeTestServices(TestUtils_1.fakeModelModule);
            var model = TestUtils_1.seedService("fakeModel");
            expect(model.isDirty).to.be.false;
        });
    });
    describe("Model#hasUnsavedChanges", function () {
        it("considers the model to have unsaved changes when one of its own fields has changed", function () {
            TestUtils_1.initializeTestServices(TestUtils_1.fakeModelModule);
            var model = TestUtils_1.seedService("fakeModel");
            model = model.applyUpdates({ fullText: faker_1.lorem.word() });
            expect(model.hasUnsavedChanges).to.be.true;
        });
        it("considers the model to have unsaved changes when one of its previously loaded related models has changed", function () {
            TestUtils_1.initializeTestServices(TestUtils_1.fakeModelModule);
            var model = TestUtils_1.seedService("fakeModel");
            model.relatedModels = { someRelatedModel: { isDirty: true } };
            expect(model.hasUnsavedChanges).to.be.true;
        });
        it("does not consider the model to have unsaved changes when the model and its relationships have not been changed", function () {
            TestUtils_1.initializeTestServices(TestUtils_1.fakeModelModule);
            var model = TestUtils_1.seedService("fakeModel");
            model.relatedModels = { someRelatedModel: { isDirty: false } };
            expect(model.hasUnsavedChanges).to.be.false;
        });
    });
    describe("Model#parseFieldValue", function () {
        it("parses the given value using the specified fieldName", function () { return __awaiter(_this, void 0, void 0, function () {
            var model, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        TestUtils_1.initializeTestServices(TestUtils_1.fakeModelModule);
                        model = TestUtils_1.seedService("fakeModel");
                        return [4, model.parseFieldValue("fullText", 4)];
                    case 1:
                        value = _a.sent();
                        expect(value).to.be.a("string").and.to.equal("4");
                        return [2];
                }
            });
        }); });
    });
    describe("sub-classing works as expected", function () {
        it("Model decorators apply only to the subtype and not the parent", function () {
            var MockModel = (function (_super) {
                __extends(MockModel, _super);
                function MockModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    Decorators_1.attr(FieldType_1.DateField),
                    __metadata("design:type", Date)
                ], MockModel.prototype, "asdfasdfasdf", void 0);
                __decorate([
                    Decorators_1.attr(FieldType_1.TimeField),
                    __metadata("design:type", Date)
                ], MockModel.prototype, "startTime", void 0);
                __decorate([
                    Decorators_1.attr(FieldType_1.DateTimeField),
                    __metadata("design:type", Date)
                ], MockModel.prototype, "endDateTime", void 0);
                __decorate([
                    Decorators_1.attr(FieldType_1.NumberField),
                    __metadata("design:type", Number)
                ], MockModel.prototype, "age", void 0);
                __decorate([
                    Decorators_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], MockModel.prototype, "organizationId", void 0);
                return MockModel;
            }(Model_1.Model));
            var model = new Model_1.Model({ id: faker_1.random.number().toString() });
            expect(model.fields).to.deep.equal({
                id: __assign({}, FieldType_1.StringField, { serialize: false, readOnly: true }),
                dateDeleted: __assign({}, FieldType_1.DateTimeField, { serialize: false, readOnly: true }),
                dateUpdated: __assign({}, FieldType_1.DateTimeField, { serialize: false, readOnly: true }),
            });
        });
    });
});
