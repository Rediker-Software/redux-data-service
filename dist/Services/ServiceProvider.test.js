"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
var ServiceProvider_1 = require("./ServiceProvider");
var Subject_1 = require("rxjs/Subject");
var Initialize_1 = require("../Initialize");
var redux_observable_1 = require("redux-observable");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach, afterEach = _a.afterEach;
var expect = intern.getPlugin("chai").expect;
describe("ServiceProvider", function () {
    describe("dependency injection", function () {
        var fakeService;
        beforeEach(function () {
            fakeService = {
                name: "fake",
                types: {},
                actions: {},
                reducer: sinon_1.spy(),
                epics: [],
                selectors: {},
                getDefaultState: function () { return ({
                    hello: "world",
                }); },
            };
            ServiceProvider_1.registerService(fakeService);
        });
        it("enables dependency injection by returning the requested service by its name", function () {
            var injectedService = ServiceProvider_1.getService("fake");
            expect(injectedService).to.equal(fakeService);
        });
        it("supports replacing a registered service with a mock version of it", function () {
            var mockFakeService = {
                name: "fake",
                types: {},
                actions: {},
                reducer: sinon_1.spy(),
                epics: [],
                selectors: {},
                getDefaultState: function () { return ({
                    hello: "mock",
                }); },
            };
            ServiceProvider_1.registerService(mockFakeService);
            var injectedService = ServiceProvider_1.getService("fake");
            expect(injectedService).to.equal(mockFakeService).but.to.not.equal(fakeService);
        });
    });
    describe("initializing services from modules", function () {
        it("registers services from modules whose service class name is the module name + \"Service\"", function () {
            var OrganizationTypeService = (function () {
                function OrganizationTypeService() {
                    this.name = "organizationType";
                }
                return OrganizationTypeService;
            }());
            var modules = {
                organizationType: {
                    OrganizationTypeService: OrganizationTypeService,
                },
            };
            ServiceProvider_1.initializeServices(modules);
            var service = ServiceProvider_1.getService("organizationType");
            expect(service).to.be.an.instanceOf(OrganizationTypeService);
        });
        it("does not register classes which do not end in \"Service\"", function () {
            var Model = (function () {
                function Model() {
                    this.name = "organizationType";
                }
                return Model;
            }());
            var modules = {
                organizationType: {
                    Model: Model,
                },
            };
            ServiceProvider_1.initializeServices(modules);
            Initialize_1.initialize();
            expect(function () { return ServiceProvider_1.getService("organizationType"); }).to.throw(ReferenceError, "not found");
        });
        it("does not throw if the application is still initializing", function () {
            Initialize_1.resetInitializationStatus();
            expect(function () { return ServiceProvider_1.getService("lolCoolServiceBrah"); }).to.not.throw();
        });
        it("registers services from multiple modules", function () {
            var OrganizationTypeService = (function () {
                function OrganizationTypeService() {
                    this.name = "organizationType";
                }
                return OrganizationTypeService;
            }());
            var StudentService = (function () {
                function StudentService() {
                    this.name = "student";
                }
                return StudentService;
            }());
            var modules = {
                organizationType: {
                    OrganizationTypeService: OrganizationTypeService,
                },
                student: {
                    StudentService: StudentService,
                },
            };
            ServiceProvider_1.initializeServices(modules);
            var service = ServiceProvider_1.getService("student");
            expect(service).to.be.an.instanceOf(StudentService);
        });
        it("registers services from modules even if some modules do not have Services", function () {
            var OrganizationTypeService = (function () {
                function OrganizationTypeService() {
                    this.name = "organizationType";
                }
                return OrganizationTypeService;
            }());
            var StudentService = (function () {
                function StudentService() {
                    this.name = "student";
                }
                return StudentService;
            }());
            var modules = {
                organization: {},
                organizationType: {
                    OrganizationTypeService: OrganizationTypeService,
                },
                student: {
                    StudentService: StudentService,
                },
            };
            ServiceProvider_1.initializeServices(modules);
            var service = ServiceProvider_1.getService("student");
            expect(service).to.be.an.instanceOf(StudentService);
        });
    });
    describe("getReducers", function () {
        it("combines the reducers from each service to create a root reducer which can be passed into Redux", function () {
            var studentReducerStub = sinon_1.stub().returns({
                hello: "world",
            });
            var studentService = {
                name: "student",
                types: {},
                actions: {},
                reducer: studentReducerStub,
                epics: [],
                selectors: {},
                getDefaultState: function () { return ({}); },
            };
            var organizationTypeReducerStub = sinon_1.stub().returns({
                types: [],
            });
            var organizationTypeService = {
                name: "organizationType",
                types: {},
                actions: {},
                reducer: organizationTypeReducerStub,
                epics: [],
                selectors: {},
                getDefaultState: function () { return ({}); },
            };
            ServiceProvider_1.registerService(studentService);
            ServiceProvider_1.registerService(organizationTypeService);
            var reducers = ServiceProvider_1.getReducers();
            expect(reducers).to.deep.equal({
                student: studentReducerStub,
                organizationType: organizationTypeReducerStub,
            });
        });
    });
    describe("getEpics", function () {
        it("combines the epics from each service to create a root epic which can be passed into redux-observable", function () {
            var studentEpicStub = sinon_1.stub().returns(new Subject_1.Subject());
            var studentService = {
                name: "student",
                types: {},
                actions: {},
                reducer: function () { return ({}); },
                epics: [studentEpicStub],
                selectors: {},
                getDefaultState: function () { return ({}); },
            };
            var organizationTypeEpicStub = sinon_1.stub().returns(new Subject_1.Subject());
            var organizationTypeService = {
                name: "organizationType",
                types: {},
                actions: {},
                reducer: function () { return ({}); },
                epics: [organizationTypeEpicStub],
                selectors: {},
                getDefaultState: function () { return ({}); },
            };
            ServiceProvider_1.registerService(studentService);
            ServiceProvider_1.registerService(organizationTypeService);
            var rootEpic = redux_observable_1.combineEpics.apply(void 0, ServiceProvider_1.getEpics());
            rootEpic.call(rootEpic);
            expect(studentEpicStub.callCount).to.equal(1);
            expect(organizationTypeEpicStub.callCount).to.equal(1);
        });
    });
});
