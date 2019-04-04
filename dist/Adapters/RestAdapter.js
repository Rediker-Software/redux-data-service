"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
var ajax_1 = require("rxjs/observable/dom/ajax");
var lodash_1 = require("lodash");
var RestAdapter = (function () {
    function RestAdapter(pathName, options) {
        if (options === void 0) { options = {}; }
        this.pathName = pathName;
        this.apiUrl = options.apiUrl || process.env.API_URL;
    }
    RestAdapter.prototype.getRestURL = function (id) {
        var url = this.apiUrl + "/" + this.pathName;
        if (id) {
            url += "/" + id;
        }
        return url;
    };
    RestAdapter.prototype.fetchAll = function (requestParams, progressSubscriber) {
        return this.makeAjaxRequest("GET", this.getRestURL(), requestParams, progressSubscriber);
    };
    RestAdapter.prototype.fetchItem = function (id, progressSubscriber) {
        return this.makeAjaxRequest("GET", this.getRestURL(id), undefined, progressSubscriber);
    };
    RestAdapter.prototype.createItem = function (item, progressSubscriber) {
        return this.makeAjaxRequest("POST", this.getRestURL(), item, progressSubscriber);
    };
    RestAdapter.prototype.updateItem = function (id, item, progressSubscriber) {
        return this.makeAjaxRequest("PUT", this.getRestURL(id), item, progressSubscriber);
    };
    RestAdapter.prototype.patchItem = function (id, item, progressSubscriber) {
        return this.makeAjaxRequest("PATCH", this.getRestURL() + "/" + id, item, progressSubscriber);
    };
    RestAdapter.prototype.deleteItem = function (id, progressSubscriber) {
        return this.makeAjaxRequest("DELETE", this.getRestURL(id), undefined, progressSubscriber);
    };
    RestAdapter.prototype.makeAjaxRequest = function (method, url, payload, progressSubscriber, headers) {
        if (headers === void 0) { headers = {}; }
        var ajaxRequest = {
            body: method !== "GET" ? payload : undefined,
            headers: this.buildHeaders(headers),
            method: method,
            responseType: "json",
            url: (method !== "GET" || lodash_1.isEmpty(payload) ? url : url + "?" + payload),
        };
        if (progressSubscriber) {
            ajaxRequest.progressSubscriber = progressSubscriber;
        }
        return ajax_1.ajax(ajaxRequest).map(function (x) { return x.response; });
    };
    RestAdapter.prototype.buildHeaders = function (headers) {
        return __assign({}, headers, { "Content-Type": "application/json" });
    };
    return RestAdapter;
}());
exports.RestAdapter = RestAdapter;
