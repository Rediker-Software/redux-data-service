"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
var Initialize_1 = require("./Initialize");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("initialize", function () {
    var mockInitializers;
    var initialize;
    beforeEach(function () {
        mockInitializers = {
            initializeSomething: sinon_1.spy(),
            fakeOtherThing: sinon_1.spy(),
        };
        initialize = Initialize_1.makeInitialize(mockInitializers);
    });
    it("initialization status is set to false before the application initializes", function () {
        Initialize_1.resetInitializationStatus();
        expect(Initialize_1.isApplicationInitialized()).to.be.false;
    });
    it("initialization status is set to true after the application initializes", function () {
        Initialize_1.resetInitializationStatus();
        initialize();
        expect(Initialize_1.isApplicationInitialized()).to.be.true;
    });
    it("runs every function whose name starts with \"initialize\"", function () {
        initialize();
        expect(mockInitializers.initializeSomething).to.have.property("callCount").to.equal(1);
    });
    it("does not run functions which do not start with \"initialize\"", function () {
        initialize();
        expect(mockInitializers.fakeOtherThing).to.have.property("callCount").to.equal(0);
    });
});
//# sourceMappingURL=Initialize.test.js.map