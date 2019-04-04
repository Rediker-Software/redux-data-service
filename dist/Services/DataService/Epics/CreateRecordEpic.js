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
require("rxjs/add/operator/catch");
require("rxjs/add/operator/concat");
require("rxjs/add/operator/do");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/mapTo");
require("rxjs/add/operator/skipUntil");
require("rxjs/add/operator/take");
var of_1 = require("rxjs/observable/of");
var race_1 = require("rxjs/observable/race");
exports.createRecordEpic = function (_a) {
    var actions = _a.actions, adapter = _a.adapter, mapper = _a.mapper, name = _a.name, serializer = _a.serializer, types = _a.types;
    return function (action$, store) {
        return action$.ofType(types.CREATE_RECORD)
            .mergeMap(function (action) {
            return of_1.of(store.getState()[name].items.get(action.payload.id))
                .mergeMap(function (model) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, mapper.transform(model)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .mergeMap(function (mappedModel) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, serializer.serialize(mappedModel)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .mergeMap(function (serializedModel) { return (race_1.race(adapter.createItem(serializedModel, action.meta.progressSubscriber), action$.ofType(types.CANCEL_REQUEST)
                .filter(function (filteredAction) { return filteredAction.payload.id === action.payload.id; })
                .mapTo(null)).take(1).filter(function (response) { return response != null; })); })
                .mergeMap(function (response) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, serializer.deserialize(response)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .mergeMap(function (normalizedResponse) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, mapper.normalize(normalizedResponse)];
                    case 1: return [2, _a.sent()];
                }
            }); }); })
                .do(action.meta.onSuccess, action.meta.onError)
                .map(actions.pushRecord)
                .concat(of_1.of(actions.unloadRecord(action.payload)))
                .catch(function (e) { return of_1.of(actions.setMetaField({ id: action.payload.id, errors: e })); });
        });
    };
};
