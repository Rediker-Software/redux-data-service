"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("faker");
var sinon_1 = require("sinon");
var TestUtils_1 = require("../TestUtils");
var Services_1 = require("../Services");
var MemoryAdapter_1 = require("./MemoryAdapter");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("MemoryAdapter", function () {
    var serviceName = "fakeModel";
    var memoryAdapter;
    beforeEach(function () {
        TestUtils_1.initializeTestServices(TestUtils_1.fakeModelModule);
        memoryAdapter = new MemoryAdapter_1.MemoryAdapter(serviceName);
    });
    describe("fetchAll", function () {
        it("seeds 20 items", function () {
            var fakeModelService = Services_1.getDataService(serviceName);
            var stubPushAll = sinon_1.stub(fakeModelService.actions, "pushAll").returns({ invoke: sinon_1.spy() });
            memoryAdapter.fetchAll();
            expect(stubPushAll.firstCall.args[0])
                .to.have.property("items")
                .to.be.an("array")
                .to.have.length(20);
        });
        it("returns an observable with the model data of the seeded 20 items", function () {
            var fakeModelService = Services_1.getDataService(serviceName);
            var stubPushAll = sinon_1.stub(fakeModelService.actions, "pushAll").callThrough();
            var fetchAll$ = memoryAdapter.fetchAll();
            var items = stubPushAll.firstCall.args[0].items;
            var fetchAllResponse;
            fetchAll$
                .take(1)
                .subscribe(function (response) { return fetchAllResponse = response; });
            expect(fetchAllResponse)
                .to.have.property("items")
                .to.deep.equal(items.map(function (item) { return item.modelData; }));
        });
    });
    describe("fetchItem", function () {
        it("seeds the requested item with the given id", function () {
            var fakeModelService = Services_1.getDataService(serviceName);
            var stubPushRecord = sinon_1.stub(fakeModelService.actions, "pushRecord").returns({ invoke: sinon_1.spy() });
            var fakeId = faker_1.random.number().toString();
            memoryAdapter.fetchItem(fakeId);
            expect(stubPushRecord.firstCall.args[0])
                .to.have.property("id")
                .to.equal(fakeId);
        });
        it("returns an observable with the model data of the seeded item", function () {
            var fakeModelService = Services_1.getDataService(serviceName);
            var stubPushRecord = sinon_1.stub(fakeModelService.actions, "pushRecord").callThrough();
            var fakeId = faker_1.random.number().toString();
            var fetchItem$ = memoryAdapter.fetchItem(fakeId);
            var item = stubPushRecord.firstCall.args[0];
            var fetchItemResponse;
            fetchItem$
                .take(1)
                .subscribe(function (response) { return fetchItemResponse = response; });
            expect(fetchItemResponse)
                .to.deep.equal(item.modelData);
        });
    });
    describe("createItem", function () {
        it("seeds a new item with the modelData it was given", function () {
            var fakeModelService = Services_1.getDataService(serviceName);
            var stubPushRecord = sinon_1.stub(fakeModelService.actions, "pushRecord").returns({ invoke: sinon_1.spy() });
            var fakeItem = TestUtils_1.seedService(serviceName);
            memoryAdapter.createItem(fakeItem);
            expect(stubPushRecord.firstCall.args[0])
                .to.deep.contain(fakeItem.modelData);
        });
        it("returns an observable with the model data of the newly seeded item", function () {
            var fakeModelService = Services_1.getDataService(serviceName);
            var stubPushRecord = sinon_1.stub(fakeModelService.actions, "pushRecord").callThrough();
            var fakeItem = TestUtils_1.seedService(serviceName);
            var createItem$ = memoryAdapter.createItem(fakeItem);
            var item = stubPushRecord.firstCall.args[0];
            var createItemResponse;
            createItem$
                .take(1)
                .subscribe(function (response) { return createItemResponse = response; });
            expect(createItemResponse)
                .to.deep.contain(item.modelData);
        });
    });
    describe("updateItem", function () {
        it("returns an observable with the model data it was given", function () {
            var fakeItem = TestUtils_1.seedService(serviceName);
            var fakeItemData = fakeItem.modelData;
            var updateItem$ = memoryAdapter.updateItem(fakeItemData.id, fakeItemData);
            var updateItemResponse;
            updateItem$
                .take(1)
                .subscribe(function (response) { return updateItemResponse = response; });
            expect(updateItemResponse)
                .to.deep.contain(fakeItemData);
        });
    });
    describe("patchItem", function () {
        it("returns an observable with the model data it was given", function () {
            var fakeItem = TestUtils_1.seedService(serviceName);
            var fakeItemData = fakeItem.modelData;
            var patchItem$ = memoryAdapter.patchItem(fakeItemData.id, fakeItemData);
            var patchItemResponse;
            patchItem$
                .take(1)
                .subscribe(function (response) { return patchItemResponse = response; });
            expect(patchItemResponse)
                .to.deep.contain(fakeItemData);
        });
    });
    describe("deleteItem", function () {
        it("returns an observable with the given id", function () {
            var fakeId = faker_1.random.number().toString();
            var deleteItem$ = memoryAdapter.deleteItem(fakeId);
            var deleteItemResponse;
            deleteItem$
                .take(1)
                .subscribe(function (response) { return deleteItemResponse = response; });
            expect(deleteItemResponse)
                .to.have.property("id")
                .to.equal(fakeId);
        });
        it("returns an observable with a dateDeleted value set to a Date", function () {
            var fakeId = faker_1.random.number().toString();
            var deleteItem$ = memoryAdapter.deleteItem(fakeId);
            var deleteItemResponse;
            deleteItem$
                .take(1)
                .subscribe(function (response) { return deleteItemResponse = response; });
            expect(deleteItemResponse)
                .to.have.property("dateDeleted")
                .to.be.an.instanceof(Date);
        });
    });
});
