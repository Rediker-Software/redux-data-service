"use strict";
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
var sinon_1 = require("sinon");
var RestSerializer_1 = require("./RestSerializer");
var Model_mock_1 = require("../Model/Model.mock");
var faker_1 = require("faker");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("RestSerializer", function () {
    describe("serialize", function () {
        it("first transforms the model before serializing it", function () { return __awaiter(_this, void 0, void 0, function () {
            var fakeModel, restSerializer, stubTransform;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fakeModel = new Model_mock_1.FakeModel({ id: faker_1.default.random.number().toString() });
                        restSerializer = new RestSerializer_1.RestSerializer(Model_mock_1.FakeModel);
                        stubTransform = sinon_1.stub(restSerializer, "transform");
                        return [4, restSerializer.serialize(fakeModel)];
                    case 1:
                        _a.sent();
                        expect(stubTransform.firstCall.args[0]).to.equal(fakeModel);
                        return [2];
                }
            });
        }); });
        it("converts the model into a JSON string", function () { return __awaiter(_this, void 0, void 0, function () {
            var fullText, fakeModel, restSerializer, serializedModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullText = faker_1.default.lorem.word().toString();
                        fakeModel = new Model_mock_1.FakeModel({
                            id: faker_1.default.random.number().toString(),
                            fullText: fullText,
                        });
                        restSerializer = new RestSerializer_1.RestSerializer(Model_mock_1.FakeModel);
                        return [4, restSerializer.serialize(fakeModel)];
                    case 1:
                        serializedModel = _a.sent();
                        expect(serializedModel).to.equal(JSON.stringify({ fullText: fullText }));
                        return [2];
                }
            });
        }); });
    });
    describe("deserialize", function () {
        it("converts the deserialized raw data into a Model by normalizing it", function () { return __awaiter(_this, void 0, void 0, function () {
            var fakeModelData, serializedModel, restSerializer, stubNormalize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fakeModelData = {
                            id: faker_1.default.random.number().toString(),
                            fullText: faker_1.default.lorem.word().toString(),
                        };
                        serializedModel = JSON.stringify(fakeModelData);
                        restSerializer = new RestSerializer_1.RestSerializer(Model_mock_1.FakeModel);
                        stubNormalize = sinon_1.stub(restSerializer, "normalize");
                        return [4, restSerializer.deserialize(serializedModel)];
                    case 1:
                        _a.sent();
                        expect(stubNormalize.firstCall.args[0]).to.deep.equal(fakeModelData);
                        return [2];
                }
            });
        }); });
        it("converts the JSON string into a model", function () { return __awaiter(_this, void 0, void 0, function () {
            var fakeModelData, fakeModel, serializedModel, restSerializer, deserializedModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fakeModelData = {
                            id: faker_1.default.random.number().toString(),
                            fullText: faker_1.default.lorem.word().toString(),
                        };
                        fakeModel = new Model_mock_1.FakeModel(fakeModelData);
                        serializedModel = JSON.stringify(fakeModelData);
                        restSerializer = new RestSerializer_1.RestSerializer(Model_mock_1.FakeModel);
                        return [4, restSerializer.deserialize(serializedModel)];
                    case 1:
                        deserializedModel = _a.sent();
                        expect(deserializedModel).to.deep.equal(fakeModel);
                        return [2];
                }
            });
        }); });
    });
});
