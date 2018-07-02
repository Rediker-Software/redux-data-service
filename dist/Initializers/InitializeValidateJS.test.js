"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
var InitializeValidateJS_1 = require("./InitializeValidateJS");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("initializeValidateJS", function () {
    var fakeValidateJS;
    var mockInitializers;
    var initialize;
    beforeEach(function () {
        fakeValidateJS = sinon_1.spy();
        mockInitializers = {
            initializeSomeValidator: sinon_1.spy(),
            initializeSomeOtherValidator: sinon_1.spy(),
            fakeOtherThing: sinon_1.spy(),
        };
        initialize = InitializeValidateJS_1.makeInitializeValidateJS(fakeValidateJS, mockInitializers);
    });
    it("runs every function whose name starts with \"initialize\"", function () {
        initialize();
        expect(mockInitializers.initializeSomeValidator).to.have.property("callCount").to.equal(1);
        expect(mockInitializers.initializeSomeOtherValidator).to.have.property("callCount").to.equal(1);
    });
    it("passes the validateJS object into the validator initializer", function () {
        initialize();
        expect(mockInitializers.initializeSomeValidator.firstCall.args[0]).to.equal(fakeValidateJS);
    });
    it("does not run functions which do not start with \"initialize\"", function () {
        initialize();
        expect(mockInitializers.fakeOtherThing).to.have.property("callCount").to.equal(0);
    });
});
//# sourceMappingURL=InitializeValidateJS.test.js.map