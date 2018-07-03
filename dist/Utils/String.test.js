"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var String_1 = require("./String");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("String utils", function () {
    describe("getNestedFieldName", function () {
        it("returns the last item at the end of a dot-notated string", function () {
            var example = "a.b.c";
            var output = String_1.getNestedFieldName(example);
            expect(output).to.equal("c");
        });
    });
});
