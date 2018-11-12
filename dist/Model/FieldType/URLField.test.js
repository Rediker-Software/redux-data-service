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
var validate_js_1 = require("validate.js");
var faker_1 = require("faker");
var URLField_1 = require("./URLField");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("FieldType: URLField", function () {
    it("has correct default value", function () {
        expect(URLField_1.URLField).to.have.property("defaultValue").to.equal("");
    });
    it("provides default form validation rules which require the value to be a valid url", function () {
        var value = "http://example.com";
        expect(validate_js_1.validate({ website: value }, { website: URLField_1.URLField.defaultValidationRules })).to.be.undefined;
    });
    it("provides default form validation rules which do not allow invalid url", function () {
        var value = "asdfasdf";
        expect(validate_js_1.validate({ website: value }, { website: URLField_1.URLField.defaultValidationRules })).to.deep.equal({
            website: ["Website is not a valid url"],
        });
    });
    it("considers null to be a valid type", function () {
        var value = null;
        expect(URLField_1.URLField.isValidType(value)).to.be.true;
    });
    it("considers a string to be a valid type", function () {
        var value = "asdf";
        expect(URLField_1.URLField.isValidType(value)).to.be.true;
    });
    it("does not consider a non-null non-url instance to be a valid type", function () {
        var value = 7;
        expect(URLField_1.URLField.isValidType(value)).to.be.false;
    });
    it("should be serialized", function () {
        expect(URLField_1.URLField.serialize).to.be.true;
    });
    it("declares its type", function () {
        return expect(URLField_1.URLField.type).to.eq("URL");
    });
    it("normalizes any value into a string", function () { return __awaiter(_this, void 0, void 0, function () {
        var randomNumber, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    randomNumber = faker_1.random.number();
                    _a = expect;
                    return [4, URLField_1.URLField.normalize(randomNumber)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).to.be.a("string").and.to.equal(String(randomNumber));
                    return [2];
            }
        });
    }); });
});
