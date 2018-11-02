"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var FileField_1 = require("./FileField");
var faker_1 = require("faker");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, before = _a.before;
var expect = intern.getPlugin("chai").expect;
var fileData = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAA1JREFUCB1jYGBg+A8AAQQBAB5znEAAAAAASUVORK5CYII=";
describe("FieldType: FileField", function () {
    it("considers null to be a valid type", function () {
        var value = null;
        expect(FileField_1.FileField.isValidType(value)).to.be.true;
    });
    it("considers a File to be a valid type", function () {
        var value = new File([], "file");
        expect(FileField_1.FileField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-file to be a valid type", function () {
        var value = 7;
        expect(FileField_1.FileField.isValidType(value)).to.be.false;
    });
    it("transforms a File into a byte array", function () { return __awaiter(_this, void 0, void 0, function () {
        var file, encodedValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = new File([atob(fileData)], "dot.png", { type: "image/png" });
                    return [4, FileField_1.FileField.transform(file)];
                case 1:
                    encodedValue = _a.sent();
                    expect(encodedValue).to.deep.equal([
                        194, 137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 195, 132, 194, 137, 0, 0, 0, 4, 103, 65,
                        77, 65, 0, 0, 194, 177, 194, 143, 11, 195, 188, 97, 5, 0, 0, 0, 13, 73, 68, 65, 84, 8, 29, 99, 96, 96, 96, 195, 184, 15, 0, 1, 4, 1, 0, 30, 115, 194, 156,
                        64, 0, 0, 0, 0, 73, 69, 78, 68, 194, 174, 66, 96, 194, 130,
                    ]);
                    return [2];
            }
        });
    }); });
    it("should be serialized", function () {
        expect(FileField_1.FileField.serialize).to.be.true;
    });
    describe("normalize", function () {
        it("normalizes a File by returning the given value", function () { return __awaiter(_this, void 0, void 0, function () {
            var serializedValue, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        serializedValue = faker_1.random.word();
                        _a = expect;
                        return [4, FileField_1.FileField.normalize(serializedValue)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.equal(serializedValue);
                        return [2];
                }
            });
        }); });
    });
});
