"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("faker");
var QueryBuilder_1 = require("./QueryBuilder");
var QueryManager_1 = require("./QueryManager");
var TestUtils_1 = require("../TestUtils");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("QueryManager", function () {
    var fakeItems;
    var currentPage;
    var totalPages;
    var pageSize;
    var totalCount;
    var nextPage;
    var previousPage;
    var fullQueryResponse;
    var serviceName = "fakeModel";
    beforeEach(function () {
        TestUtils_1.initializeTestServices(TestUtils_1.fakeModelModule);
        currentPage = faker_1.random.number();
        totalPages = faker_1.random.number();
        pageSize = faker_1.random.number();
        totalCount = faker_1.random.number();
        nextPage = faker_1.random.number();
        previousPage = faker_1.random.number();
        fakeItems = TestUtils_1.seedServiceList(serviceName);
        fullQueryResponse = {
            currentPage: currentPage,
            totalPages: totalPages,
            pageSize: pageSize,
            totalCount: totalCount,
            nextPage: nextPage,
            previousPage: previousPage,
            ids: [],
        };
    });
    it("constructs a QueryManager instance", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        expect(new QueryManager_1.QueryManager(query)).to.deep.contain({
            query: query,
        });
    });
    it("returns expected isLoading on meta property", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        var queryMeta = {
            isLoading: true,
        };
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems, fullQueryResponse, queryMeta);
        expect(queryManager.isLoading).to.equal(true);
    });
    it("isLoading is true when response is empty and there is no isLoading property on meta", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems);
        expect(queryManager.isLoading).to.equal(true);
    });
    it("isLoading is false when response is not empty and there is no isLoading property on meta", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems, fullQueryResponse);
        expect(queryManager.isLoading).to.equal(false);
    });
    it("returns expected errors on meta property", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        var queryMeta = {
            errors: "errors",
        };
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems, fullQueryResponse, queryMeta);
        expect(queryManager.errors).to.equal(queryMeta.errors);
    });
    it("returns expected query items", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems);
        expect(queryManager.items).to.deep.equal(fakeItems);
    });
    it("hasNextPage returns true when response has next page", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems, fullQueryResponse);
        expect(queryManager.hasNextPage()).to.equal(true);
    });
    it("hasNextPage returns false when response does not have next page", function () {
        var queryResponseNoNextPage = {
            currentPage: currentPage,
            totalPages: totalPages,
            pageSize: pageSize,
            totalCount: totalCount,
            nextPage: 0,
            previousPage: previousPage,
            ids: [],
        };
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems, queryResponseNoNextPage);
        expect(queryManager.hasNextPage()).to.equal(false);
    });
    it("hasPreviousPage returns true when response has previous page", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems, fullQueryResponse);
        expect(queryManager.hasPreviousPage()).to.equal(true);
    });
    it("hasPreviousPage returns false when response does not have previous page", function () {
        var queryResponseNoPreviousPage = {
            currentPage: currentPage,
            totalPages: totalPages,
            pageSize: pageSize,
            totalCount: totalCount,
            nextPage: nextPage,
            previousPage: 0,
            ids: [],
        };
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems, queryResponseNoPreviousPage);
        expect(queryManager.hasPreviousPage()).to.equal(false);
    });
    it("getNextPage returns expected IQueryBuilder next page", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName, { x: faker_1.random.number() });
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems, fullQueryResponse);
        var expectedQueryBuilder = query.page(nextPage);
        expect(queryManager.getNextPage()).to.deep.equal(expectedQueryBuilder);
    });
    it("getNextPage returns null when response is undefined", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems);
        expect(queryManager.getNextPage()).to.equal(null);
    });
    it("getPreviousPage returns expected IQueryBuilder for previous page", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName, { x: faker_1.random.number() });
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems, fullQueryResponse);
        var expectedQueryBuilder = query.page(previousPage);
        expect(queryManager.getPreviousPage()).to.deep.equal(expectedQueryBuilder);
    });
    it("getPreviousPage returns null when response is undefined", function () {
        var query = new QueryBuilder_1.QueryBuilder(serviceName);
        var queryManager = new QueryManager_1.QueryManager(query, fakeItems);
        expect(queryManager.getPreviousPage()).to.equal(null);
    });
});
