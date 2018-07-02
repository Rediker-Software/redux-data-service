"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
var of_1 = require("rxjs/observable/of");
var faker_1 = require("faker");
var MockAdapter = (function () {
    function MockAdapter() {
        this.createItem = sinon_1.stub().callsFake(function (item) { return of_1.of(__assign({}, item, { id: faker_1.default.random.number().toString() })); });
        this.deleteItem = sinon_1.stub().callsFake(function (id) { return of_1.of({
            id: id,
            dateDeleted: new Date().toISOString(),
        }); });
        this.fetchAll = sinon_1.stub().callsFake(function () { return of_1.of([]); });
        this.fetchItem = sinon_1.stub().callsFake(function (id) { return of_1.of({ id: id }); });
        this.patchItem = sinon_1.stub().callsFake(function (id, item) { return of_1.of(__assign({}, item, { id: id })); });
        this.updateItem = sinon_1.stub().callsFake(function (id, item) { return of_1.of(__assign({}, item, { id: id })); });
    }
    return MockAdapter;
}());
exports.MockAdapter = MockAdapter;
//# sourceMappingURL=MockAdapter.js.map