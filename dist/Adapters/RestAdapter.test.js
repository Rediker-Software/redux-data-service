"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
var RestAdapter_1 = require("./RestAdapter");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach, afterEach = _a.afterEach;
var expect = intern.getPlugin("chai").expect;
describe("RestAdapter", function () {
    var apiUrl = "http://www.example.com";
    var pathName = "test";
    var restUrl = apiUrl + "/" + pathName;
    var xhr;
    var restAdapter;
    beforeEach(function () {
        xhr = sinon_1.useFakeXMLHttpRequest();
        xhr.onCreate = sinon_1.spy();
        restAdapter = new RestAdapter_1.RestAdapter(pathName, { apiUrl: apiUrl });
    });
    afterEach(function () { return xhr.restore(); });
    it("builds the URL of the endpoint", function () {
        expect(restAdapter.getRestURL()).to.equal(restUrl);
    });
    it("performs a fetchAll request", function () {
        restAdapter.fetchAll().subscribe(sinon_1.spy());
        expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
        expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(restUrl, "it should send a request to the correct url");
        expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
    });
    it("performs a fetchAll request with the given query param", function () {
        restAdapter.fetchAll({ filter: "all" }).subscribe(sinon_1.spy());
        expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
        expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(restUrl + "?filter=all", "it should send a request to the correct url");
        expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
    });
    it("performs a fetchAll request with multiple query params", function () {
        restAdapter.fetchAll({ filter: "all", hello: "world" }).subscribe(sinon_1.spy());
        expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
        expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(restUrl + "?filter=all&hello=world", "it should send a request to the correct url");
        expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
    });
    it("performs a fetchItem request", function () {
        restAdapter.fetchItem("2").subscribe(sinon_1.spy());
        expect(xhr.onCreate.callCount).to.equal(1, "it should send an xhr request");
        expect(xhr.onCreate.firstCall.args[0]).to.have.property("url").to.equal(restUrl + "/2", "it should send a request to the correct url");
        expect(xhr.onCreate.firstCall.args[0]).to.have.property("method").to.equal("GET", "it should send a request with the correct HTTP method");
    });
});
//# sourceMappingURL=RestAdapter.test.js.map