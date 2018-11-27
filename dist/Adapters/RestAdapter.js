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
    RestAdapter.prototype.fetchAll = function (requestParams) {
        return this.makeAjaxRequest("GET", this.getRestURL(), requestParams);
    };
    RestAdapter.prototype.fetchItem = function (id) {
        return this.makeAjaxRequest("GET", this.getRestURL(id));
    };
    RestAdapter.prototype.createItem = function (item) {
        return this.makeAjaxRequest("POST", this.getRestURL(), item);
    };
    RestAdapter.prototype.updateItem = function (id, item) {
        return this.makeAjaxRequest("PUT", this.getRestURL(id), item);
    };
    RestAdapter.prototype.patchItem = function (id, item) {
        return this.makeAjaxRequest("PATCH", this.getRestURL() + "/" + id, item);
    };
    RestAdapter.prototype.deleteItem = function (id) {
        return this.makeAjaxRequest("DELETE", this.getRestURL(id));
    };
    RestAdapter.prototype.makeAjaxRequest = function (method, url, payload, headers) {
        if (headers === void 0) { headers = {}; }
        return ajax_1.ajax({
            body: method !== "GET" ? payload : undefined,
            headers: this.buildHeaders(headers),
            method: method,
            responseType: "json",
            url: (method !== "GET" || lodash_1.isEmpty(payload) ? url : url + "?" + this.buildQueryParams(payload)),
        }).map(function (x) { return x.response; });
    };
    RestAdapter.prototype.buildHeaders = function (headers) {
        return __assign({}, headers, { "Content-Type": "application/json" });
    };
    RestAdapter.prototype.buildQueryParams = function (payload) {
        return Object.keys(payload)
            .map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(payload[k]); })
            .join("&");
    };
    return RestAdapter;
}());
exports.RestAdapter = RestAdapter;
