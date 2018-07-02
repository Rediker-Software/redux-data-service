"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lodash_1 = require("./Lodash");
var faker_1 = require("faker");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("Lodash FP", function () {
    describe("mapValuesWithKeys", function () {
        it("it includes the key when mapping values using fp syntax", function () {
            var hello = faker_1.random.number();
            var world = faker_1.random.number();
            var example = { hello: hello, world: world };
            var output = Lodash_1.mapValuesWithKeys(function (value, key) { return value + key; })(example);
            expect(output).to.deep.equal({
                hello: hello + "hello",
                world: world + "world",
            });
        });
    });
    describe("flattenObjectKeys", function () {
        var example;
        var b;
        var c;
        var x;
        var y;
        var name;
        beforeEach(function () {
            b = faker_1.random.number();
            c = faker_1.random.number();
            x = faker_1.lorem.word();
            y = faker_1.lorem.word();
            name = faker_1.lorem.word();
            example = {
                a: {
                    b: b,
                    c: c,
                    d: {
                        x: x,
                        y: y,
                    },
                },
                name: name,
            };
        });
        it("flattens the keys of an an object's children onto a copy of the parent object", function () {
            var output = Lodash_1.flattenObjectKeys(example);
            expect(output).to.deep.equal({
                "a.b": b,
                "a.c": c,
                "a.d": {
                    x: x,
                    y: y,
                },
                name: name,
            });
        });
        it("does not mutate the parent object", function () {
            var output = Lodash_1.flattenObjectKeys(example);
            expect(example).to.not.equal(output);
        });
    });
});
//# sourceMappingURL=Lodash.test.js.map