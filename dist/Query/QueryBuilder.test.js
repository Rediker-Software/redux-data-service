"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
var faker_1 = require("faker");
var QueryBuilder_1 = require("./QueryBuilder");
var TestUtils_1 = require("../TestUtils");
var Services_1 = require("../Services");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("QueryBuilder", function () {
    var serviceName;
    var key;
    var value;
    beforeEach(function () {
        serviceName = faker_1.random.word();
        key = faker_1.random.word();
        value = faker_1.random.word();
    });
    it("constructs a QueryBuilder instance", function () {
        var queryParams = { x: faker_1.random.number() };
        expect(new QueryBuilder_1.QueryBuilder(serviceName, queryParams)).to.deep.contain({
            serviceName: serviceName,
            queryParams: queryParams,
        });
    });
    describe("filtering", function () {
        it("adds the given filter criteria", function () {
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            query = query.filter(key, value);
            expect(query.queryParams)
                .to.have.property(key)
                .to.equal(value);
        });
        it("spreads the current queryParams onto the queryParams of the new object when filtering", function () {
            var _a;
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query = query.filter(faker_1.random.word(), faker_1.random.number());
            expect(query.queryParams)
                .to.have.property(key)
                .to.equal(value);
        });
        it("supports adding multiple filtering criteria via chaining", function () {
            var _a;
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            var key2 = faker_1.random.word();
            var value2 = faker_1.random.number();
            var key3 = faker_1.random.word();
            var value3 = faker_1.random.boolean();
            query = query
                .filter(key, value)
                .filter(key2, value2)
                .filter(key3, value3);
            expect(query.queryParams).to.deep.equal((_a = {},
                _a[key] = value,
                _a[key2] = value2,
                _a[key3] = value3,
                _a));
        });
        it("creates a new instance when filtering criteria is added", function () {
            var oldQuery = new QueryBuilder_1.QueryBuilder(serviceName);
            var newQuery = oldQuery.filter(key, value);
            expect(newQuery).to.not.equal(oldQuery);
        });
        it("does not modify the current instance when filtering criteria is added", function () {
            var _a;
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query.filter(faker_1.random.word(), faker_1.random.number());
            expect(query.queryParams)
                .to.deep.equal(currentQueryParams);
        });
    });
    describe("removing filter criteria", function () {
        it("supports removing filtering criteria", function () {
            var _a;
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query = query.removeFilter(key);
            expect(query.queryParams)
                .to.not.have.property(key);
        });
        it("spreads the current queryParams onto the queryParams of the new object when filtering criteria is removed", function () {
            var _a;
            var otherKey = faker_1.random.word();
            var otherValue = faker_1.random.word();
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a[otherKey] = otherValue,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query = query.removeFilter(otherKey);
            expect(query.queryParams)
                .to.have.property(key)
                .to.equal(value);
        });
        it("supports removing multiple filtering criteria via chaining", function () {
            var _a;
            var key2 = faker_1.random.word();
            var value2 = faker_1.random.number();
            var key3 = faker_1.random.word();
            var value3 = faker_1.random.boolean();
            var query = new QueryBuilder_1.QueryBuilder(serviceName, (_a = {},
                _a[key] = value,
                _a[key2] = value2,
                _a[key3] = value3,
                _a));
            query = query
                .removeFilter(key2)
                .removeFilter(key3);
            expect(query.queryParams)
                .to.not.have.any.keys([key2, key3]);
        });
        it("creates a new instance when filtering criteria is removed", function () {
            var oldQuery = new QueryBuilder_1.QueryBuilder(serviceName);
            var newQuery = oldQuery.removeFilter(key);
            expect(newQuery).to.not.equal(oldQuery);
        });
        it("does not modify the current instance when filtering criteria is removed", function () {
            var _a;
            var otherKey = faker_1.random.word();
            var otherValue = faker_1.random.word();
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a[otherKey] = otherValue,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query.removeFilter(otherKey);
            expect(query.queryParams)
                .to.deep.equal(currentQueryParams);
        });
    });
    describe("page number", function () {
        var pageNumber;
        beforeEach(function () {
            pageNumber = faker_1.random.number();
        });
        it("sets the given page number", function () {
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            query = query.page(pageNumber);
            expect(query.queryParams)
                .to.have.property("page")
                .to.equal(pageNumber);
        });
        it("spreads the current queryParams onto the queryParams of the new object with the new page number", function () {
            var _a, _b;
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query = query.page(pageNumber);
            expect(query.queryParams).to.deep.equal((_b = {
                    page: pageNumber
                },
                _b[key] = value,
                _b));
        });
        it("supports adding the page number with other query criteria via chaining", function () {
            var _a;
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            var key2 = faker_1.random.word();
            var value2 = faker_1.random.number();
            query = query
                .filter(key, value)
                .page(pageNumber)
                .filter(key2, value2);
            expect(query.queryParams).to.deep.equal((_a = {},
                _a[key] = value,
                _a[key2] = value2,
                _a.page = pageNumber,
                _a));
        });
        it("creates a new instance when setting the page number", function () {
            var oldQuery = new QueryBuilder_1.QueryBuilder(serviceName);
            var newQuery = oldQuery.page(pageNumber);
            expect(newQuery).to.not.equal(oldQuery);
        });
        it("does not modify the current instance when setting the page number", function () {
            var _a;
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query.page(pageNumber);
            expect(query.queryParams)
                .to.deep.equal(currentQueryParams);
        });
    });
    describe("page size", function () {
        var pageSize;
        beforeEach(function () {
            pageSize = faker_1.random.number();
        });
        it("sets the given page size", function () {
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            query = query.pageSize(pageSize);
            expect(query.queryParams)
                .to.have.property("pageSize")
                .to.equal(pageSize);
        });
        it("spreads the current queryParams onto the queryParams of the new object with the new page size", function () {
            var _a, _b;
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query = query.pageSize(pageSize);
            expect(query.queryParams).to.deep.equal((_b = {
                    pageSize: pageSize
                },
                _b[key] = value,
                _b));
        });
        it("supports adding the page size with other query criteria via chaining", function () {
            var _a;
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            var key2 = faker_1.random.word();
            var value2 = faker_1.random.number();
            var page = faker_1.random.number();
            query = query
                .filter(key, value)
                .page(page)
                .pageSize(pageSize)
                .filter(key2, value2);
            expect(query.queryParams).to.deep.equal((_a = {},
                _a[key] = value,
                _a[key2] = value2,
                _a.page = page,
                _a.pageSize = pageSize,
                _a));
        });
        it("creates a new instance when setting the page size", function () {
            var oldQuery = new QueryBuilder_1.QueryBuilder(serviceName);
            var newQuery = oldQuery.pageSize(pageSize);
            expect(newQuery).to.not.equal(oldQuery);
        });
        it("does not modify the current instance when setting the page size", function () {
            var _a;
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query.pageSize(pageSize);
            expect(query.queryParams)
                .to.deep.equal(currentQueryParams);
        });
    });
    describe("sorting", function () {
        it("adds the given sorting criteria with a default SortDirection of 'asc'", function () {
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            query = query.sort(key);
            expect(query.queryParams.sort[0])
                .to.have.property("direction")
                .to.equal("asc");
        });
        it("adds the given sorting criteria with the given SortDirection", function () {
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            query = query.sort(key, "desc");
            expect(query.queryParams.sort[0])
                .to.have.property("direction")
                .to.equal("desc");
        });
        it("spreads the current queryParams onto the queryParams of the new object when sorting", function () {
            var _a, _b;
            var sortKey = faker_1.random.word();
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query = query.sort(sortKey);
            expect(query.queryParams).to.deep.equal((_b = {},
                _b[key] = value,
                _b.sort = [
                    { key: sortKey, direction: "asc" },
                ],
                _b));
        });
        it("supports adding multiple sorting criteria via chaining", function () {
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            var key2 = faker_1.random.word();
            var key3 = faker_1.random.word();
            query = query
                .sort(key)
                .sort(key2, "desc")
                .sort(key3);
            expect(query.queryParams)
                .to.have.property("sort")
                .to.deep.equal([
                { key: key, direction: "asc" },
                { key: key2, direction: "desc" },
                { key: key3, direction: "asc" },
            ]);
        });
        it("creates a new instance when sorting criteria is added", function () {
            var oldQuery = new QueryBuilder_1.QueryBuilder(serviceName);
            var newQuery = oldQuery.sort(key);
            expect(newQuery).to.not.equal(oldQuery);
        });
        it("does not modify the current instance when sorting criteria is added", function () {
            var _a;
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query.sort(faker_1.random.word());
            expect(query.queryParams)
                .to.deep.equal(currentQueryParams);
        });
        it("places the sort in a position specified by the parameter", function () {
            var position = faker_1.random.number({ max: 4 });
            var key1 = faker_1.lorem.word();
            var key2 = faker_1.lorem.word();
            var key3 = faker_1.lorem.word();
            var key4 = faker_1.lorem.word();
            var key5 = faker_1.lorem.word();
            var currentQueryParams = {
                sort: [
                    { key: key1 },
                    { key: key2 },
                    { key: key3 },
                    { key: key4 },
                ],
            };
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            var sortedQuery = query.sort(key5, "asc", position);
            expect(sortedQuery.queryParams.sort[position]).to.deep.equal({ key: key5, direction: "asc" });
        });
        it("creates a new sort object if none exists", function () {
            var currentQueryParams = {};
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            var sortedQuery = query.sort(faker_1.lorem.word());
            expect(sortedQuery.queryParams.sort).to.exist;
        });
        it("creates a new sort list if no sorts existed previously", function () {
            var currentQueryParams = {};
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            var sortedQuery = query.sort(faker_1.lorem.word());
            expect(sortedQuery.queryParams.sort.length).to.equal(1);
        });
        it("pushes the sort onto the end of the list if no position is specified", function () {
            var key1 = faker_1.lorem.word();
            var key2 = faker_1.lorem.word();
            var key3 = faker_1.lorem.word();
            var currentQueryParams = {
                sort: [
                    { key: key1 },
                    { key: key2 },
                ],
            };
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            var sortedQuery = query.sort(key3);
            expect(sortedQuery.queryParams.sort[2]).to.deep.equal({ key: key3, direction: "asc" });
        });
    });
    describe("removing sort criteria", function () {
        it("supports removing sorting criteria", function () {
            var otherSort = faker_1.random.word();
            var currentQueryParams = {
                sort: [
                    { key: key, direction: "asc" },
                    { key: otherSort, direction: "desc" },
                ],
            };
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query = query.removeSort(key);
            expect(query.queryParams.sort[0])
                .to.deep.equal({ key: otherSort, direction: "desc" });
        });
        it("removes the 'sort' object from queryParams if there is one sort param and it is removed", function () {
            var currentQueryParams = {
                sort: [
                    { key: key, direction: value },
                ],
            };
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query = query.removeSort(key);
            expect(query.queryParams)
                .to.not.have.property("sort");
        });
        it("spreads the current queryParams onto the queryParams of the new object when sorting criteria is removed", function () {
            var _a;
            var otherKey = faker_1.random.word();
            var otherValue = faker_1.random.word();
            var sortKey = faker_1.random.word();
            var otherSort = faker_1.random.word();
            var page = faker_1.random.number();
            var pageSize = faker_1.random.number();
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            query = query
                .filter(key, value)
                .filter(otherKey, otherValue)
                .sort(sortKey, "desc")
                .sort(otherSort, "asc")
                .page(page)
                .pageSize(pageSize)
                .removeSort(sortKey);
            expect(query.queryParams).to.deep.equal((_a = {
                    page: page,
                    pageSize: pageSize
                },
                _a[key] = value,
                _a[otherKey] = otherValue,
                _a.sort = [
                    { key: otherSort, direction: "asc" },
                ],
                _a));
        });
        it("supports removing multiple sorting criteria via chaining", function () {
            var key2 = faker_1.random.word();
            var key3 = faker_1.random.word();
            var query = new QueryBuilder_1.QueryBuilder(serviceName, {
                sort: [
                    { key: key, direction: "desc" },
                    { key: key2, direction: "asc" },
                    { key: key3, direction: "desc" },
                ],
            });
            query = query
                .removeSort(key2)
                .removeSort(key3);
            expect(query.queryParams)
                .to.have.property("sort")
                .to.not.deep.equal([{ key: key2, direction: "asc" }, { key: key3, direction: "desc" }]);
        });
        it("does not throw an exception when removing a sort key that does not exist", function () {
            var oldQuery = new QueryBuilder_1.QueryBuilder(serviceName);
            var newQuery = oldQuery.removeSort(key);
            expect(newQuery).to.not.be.null;
        });
        it("creates a new instance when sorting criteria is removed", function () {
            var oldQuery = new QueryBuilder_1.QueryBuilder(serviceName);
            var newQuery = oldQuery.removeSort(key);
            expect(newQuery).to.not.equal(oldQuery);
        });
        it("does not modify the current instance when filtering criteria is removed", function () {
            var _a;
            var otherKey = faker_1.random.word();
            var otherValue = faker_1.random.word();
            var currentQueryParams = (_a = {},
                _a[key] = value,
                _a[otherKey] = otherValue,
                _a);
            var query = new QueryBuilder_1.QueryBuilder(serviceName, currentQueryParams);
            query.removeFilter(otherKey);
            expect(query.queryParams)
                .to.deep.equal(currentQueryParams);
        });
    });
    describe("invoking the query", function () {
        var invokeSpy;
        var fetchAllStub;
        beforeEach(function () {
            TestUtils_1.initializeTestServices({});
            invokeSpy = sinon_1.spy();
            fetchAllStub = sinon_1.stub().returns({ invoke: invokeSpy });
            var fakeService = {
                name: serviceName,
                actions: {
                    fetchAll: fetchAllStub,
                },
            };
            Services_1.registerService(fakeService);
        });
        it("passes itself into the fetchAll action", function () {
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            query.invoke();
            expect(fetchAllStub.calledOnceWith(query)).to.be.true;
        });
        it("invokes the fetchAll action", function () {
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            query.invoke();
            expect(invokeSpy.calledOnce).to.be.true;
        });
    });
    describe("hash code", function () {
        it("generates a hash code when no query params have been provided", function () {
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            expect(query.getHashCode()).to.be.a("string");
        });
        it("generates a hash code for the current query params", function () {
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            var newQuery = query.page(faker_1.random.number());
            expect(newQuery.getHashCode())
                .to.be.a("string")
                .that.does.not.equal(query.getHashCode());
        });
        it("generates the same hash code for two different objects with equivalent query params", function () {
            var _a;
            var query = new QueryBuilder_1.QueryBuilder(serviceName, (_a = {},
                _a[key] = value,
                _a));
            var newQuery = query.filter(key, value);
            expect(newQuery.getHashCode())
                .to.equal(query.getHashCode());
        });
        it("generates a new hash code for each new instance", function () {
            var query = new QueryBuilder_1.QueryBuilder(serviceName);
            query = query.page(faker_1.random.number());
            var newQuery = query.filter(key, value);
            expect(newQuery.getHashCode())
                .to.not.equal(query.getHashCode());
        });
    });
});
