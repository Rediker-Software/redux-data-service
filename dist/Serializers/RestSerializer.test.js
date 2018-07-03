"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
var RestSerializer_1 = require("./RestSerializer");
var Model_mock_1 = require("../Model/Model.mock");
var faker_1 = require("faker");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("RestSerializer", function () {
    describe("serialize", function () {
        it("first transforms the model before serializing it", function () {
            var fakeModel = new Model_mock_1.FakeModel({ id: faker_1.default.random.number().toString() });
            var restSerializer = new RestSerializer_1.RestSerializer(Model_mock_1.FakeModel);
            var stubTransform = sinon_1.stub(restSerializer, "transform");
            restSerializer.serialize(fakeModel);
            expect(stubTransform.firstCall.args[0]).to.equal(fakeModel);
        });
        it("converts the model into a JSON string", function () {
            var fullText = faker_1.default.lorem.word().toString();
            var fakeModel = new Model_mock_1.FakeModel({
                id: faker_1.default.random.number().toString(),
                fullText: fullText,
            });
            var restSerializer = new RestSerializer_1.RestSerializer(Model_mock_1.FakeModel);
            var serializedModel = restSerializer.serialize(fakeModel);
            expect(serializedModel).to.equal(JSON.stringify({ fullText: fullText }));
        });
    });
    describe("deserialize", function () {
        it("converts the deserialized raw data into a Model by normalizing it", function () {
            var fakeModelData = {
                id: faker_1.default.random.number().toString(),
                fullText: faker_1.default.lorem.word().toString(),
            };
            var serializedModel = JSON.stringify(fakeModelData);
            var restSerializer = new RestSerializer_1.RestSerializer(Model_mock_1.FakeModel);
            var stubNormalize = sinon_1.stub(restSerializer, "normalize");
            restSerializer.deserialize(serializedModel);
            expect(stubNormalize.firstCall.args[0]).to.deep.equal(fakeModelData);
        });
        it("converts the JSON string into a model", function () {
            var fakeModelData = {
                id: faker_1.default.random.number().toString(),
                fullText: faker_1.default.lorem.word().toString(),
            };
            var fakeModel = new Model_mock_1.FakeModel(fakeModelData);
            var serializedModel = JSON.stringify(fakeModelData);
            var restSerializer = new RestSerializer_1.RestSerializer(Model_mock_1.FakeModel);
            var deserializedModel = restSerializer.deserialize(serializedModel);
            expect(deserializedModel).to.deep.equal(fakeModel);
        });
    });
});
