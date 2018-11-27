"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseSerializer_1 = require("./BaseSerializer");
var RestSerializer = (function (_super) {
    __extends(RestSerializer, _super);
    function RestSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RestSerializer.prototype.serialize = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var modelData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.transform(model)];
                    case 1:
                        modelData = _a.sent();
                        return [2, JSON.stringify(modelData)];
                }
            });
        });
    };
    RestSerializer.prototype.deserialize = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = (typeof data === "string") ? JSON.parse(data) : data;
                        return [4, this.normalize(data)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    RestSerializer.prototype.serializeQueryParams = function (_a) {
        var sort = _a.sort, params = __rest(_a, ["sort"]);
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (sort && sort.length > 0) {
                    params.sort = sort.map(function (s) { return (s.direction === "desc" ? s.key + ":" + s.direction : s.key); });
                }
                return [2, Object.keys(params)
                        .map(function (key) {
                        var value = params[key];
                        var encodedValue = (value instanceof Array)
                            ? value.map(function (v) { return encodeURIComponent(v); }).join(",")
                            : encodeURIComponent(String(value));
                        return encodeURIComponent(key) + "=" + encodedValue;
                    })
                        .join("&")];
            });
        });
    };
    return RestSerializer;
}(BaseSerializer_1.BaseSerializer));
exports.RestSerializer = RestSerializer;
