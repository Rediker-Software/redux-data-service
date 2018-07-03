"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Services_1 = require("../Services");
var FakeModelModule_1 = require("./FakeModelModule");
var Service_1 = require("./Service");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("initializeServices", function () {
    it("builds all services", function () {
        var store = Service_1.initializeTestServices(FakeModelModule_1.fakeModelModule);
        var returnedKeys = Object.keys(store.getState());
        var moduleKeys = Object.keys(FakeModelModule_1.fakeModelModule);
        expect(moduleKeys).to.have.all.members(returnedKeys, "actual fakeModelModule and returned fakeModelModule are same");
    });
    describe("stubbed xhr actions", function () {
        it("has a working spy on the invoke method", function () {
            Service_1.initializeTestServices(FakeModelModule_1.fakeModelModule);
            var service = Services_1.getService("fakeModel");
            service.actions.fetchAll({}).invoke();
            expect(Service_1.getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;
            expect(Service_1.getActionStubMap().fakeModel.fetchAll.invokeSpy.calledOnce).to.be.true;
        });
        it("has a working base stub", function () {
            Service_1.initializeTestServices(FakeModelModule_1.fakeModelModule);
            var service = Services_1.getService("fakeModel");
            service.actions.fetchAll({});
            expect(Service_1.getActionStubMap().fakeModel.fetchAll.base.called).to.be.true;
            expect(Service_1.getActionStubMap().fakeModel.fetchAll.invokeSpy.called).to.be.false;
        });
        it("returns a valid IAction", function () {
            Service_1.initializeTestServices(FakeModelModule_1.fakeModelModule);
            var service = Services_1.getService("fakeModel");
            var suspectedIAction = service.actions.fetchAll({});
            expect(suspectedIAction).to.have.all.keys(["invoke", "meta", "payload", "type"]);
        });
        it("resets the stubs when initializeTestServices is called again", function () {
            Service_1.initializeTestServices(FakeModelModule_1.fakeModelModule);
            var service = Services_1.getService("fakeModel");
            service.actions.fetchAll({});
            expect(Service_1.getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;
            Service_1.initializeTestServices(FakeModelModule_1.fakeModelModule);
            var newService = Services_1.getService("fakeModel");
            newService.actions.fetchAll({});
            expect(Service_1.getActionStubMap().fakeModel.fetchAll.base.calledOnce).to.be.true;
        });
        it("takes an optional argument to bypass stubbing methods", function () {
            Service_1.initializeTestServices(FakeModelModule_1.fakeModelModule, false);
            expect(Service_1.getActionStubMap()).to.be.empty;
        });
        it("uses fake xhr when stubs are not in use", function () {
            Service_1.initializeTestServices(FakeModelModule_1.fakeModelModule, false);
            var service = Services_1.getService("fakeModel");
            var initHistorySize = Service_1.getFakedXHRHistory().length;
            service.actions.fetchAll({}).invoke();
            expect(Service_1.getFakedXHRHistory().length).to.be.above(initHistorySize, "calling an action changes faked xhr history stack");
        });
    });
    describe("mock data", function () {
        var store;
        beforeEach(function () {
            store = Service_1.initializeTestServices(FakeModelModule_1.fakeModelModule);
        });
        it("doesn't give mock data when not requested", function () {
            var state = store.getState();
            Object.keys(state).forEach(function (stateKey) {
                expect(state[stateKey].items).to.have.property("size")
                    .that.is.equal(0, "does not prepopulate");
            });
        });
        var fakeModelDataKeys = ["fullText", "dateUpdated", "dateDeleted", "id"];
        describe("seedService", function () {
            it("returns the seeded data", function () {
                var mockFakeModel = Service_1.seedService("fakeModel");
                var state = store.getState();
                expect(state.fakeModel.items.valueSeq().first()).to.deep.equal(mockFakeModel);
            });
            it("can completely override the data", function () {
                var mockFakeModelData = {
                    id: "1",
                    fullText: "test",
                    dateUpdated: null,
                    dateDeleted: null,
                };
                var mockFakeModel = Service_1.seedService("fakeModel", mockFakeModelData);
                var state = store.getState();
                expect(state.fakeModel.items.valueSeq().first()).to.deep.equal(mockFakeModel);
            });
            it("can partially override the data", function () {
                var mockFakeModelData = {
                    fullText: "test",
                };
                var mockFakeModel = Service_1.seedService("fakeModel", mockFakeModelData);
                var state = store.getState();
                expect(state.fakeModel.items.valueSeq().first()).to.deep.include(mockFakeModel);
            });
            it("can create an instance without an input data", function () {
                Service_1.seedService("fakeModel");
                var state = store.getState();
                expect(state.fakeModel.items.valueSeq().first().getData()).to.have.all.keys(fakeModelDataKeys);
            });
        });
        describe("seedServiceList", function () {
            it("returns an array of the seeded data", function () {
                var seededData = Service_1.seedServiceList("fakeModel");
                var state = store.getState();
                expect(state.fakeModel.items.valueSeq().toJS()).to.deep.equal(seededData);
            });
            it("takes an optional count param", function () {
                Service_1.seedServiceList("fakeModel", 25);
                var state = store.getState();
                expect(state.fakeModel.items.valueSeq().size).to.equal(25, "seeds as many as requested");
            });
            it("overrides with supplied overrides", function () {
                var overridenValues = { fullText: "Jon can't handle the salsa" };
                Service_1.seedServiceList("fakeModel", 5, overridenValues);
                store.getState().fakeModel.items.valueSeq().toJS().forEach(function (itemModelData) {
                    expect(itemModelData).to.have.include(overridenValues);
                });
            });
            it("can create instances without any input data", function () {
                Service_1.seedServiceList("fakeModel");
                var state = store.getState();
                state.fakeModel.items.valueSeq().forEach(function (itemModel) {
                    expect(itemModel.getData()).to.have.all.keys(fakeModelDataKeys);
                });
            });
        });
        describe("seedServices", function () {
            it("seeds all registered services", function () {
                store = Service_1.initializeTestServices(FakeModelModule_1.fakeModelModule);
                Service_1.seedServices();
                var state = store.getState();
                Object.keys(state).forEach(function (moduleName) {
                    expect(state[moduleName].items.valueSeq().size).to.be.above(0, "seeded service in state");
                });
            });
            it("returns the seeded data", function () {
                var initServiceNames = Object.keys(FakeModelModule_1.fakeModelModule).slice(0, 3);
                store = Service_1.initializeTestServices(FakeModelModule_1.fakeModelModule);
                var seededData = Service_1.seedServices(initServiceNames);
                var state = store.getState();
                Object.keys(seededData).forEach(function (moduleName) {
                    expect(state[moduleName].items.valueSeq().toJS())
                        .to.deep.equal(seededData[moduleName], "seeded data is same as returned data");
                });
            });
        });
    });
});
