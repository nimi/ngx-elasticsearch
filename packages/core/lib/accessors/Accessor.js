"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var lodash_1 = require("lodash");
var Accessor = (function () {
    function Accessor() {
        this.uuid = utils_1.guid();
        this.active = true;
        this.translations = {};
        this.refCount = 0;
    }
    Accessor.prototype.incrementRef = function () {
        this.refCount++;
    };
    Accessor.prototype.decrementRef = function () {
        this.refCount--;
    };
    Accessor.prototype.setActive = function (active) {
        this.active = active;
        return this;
    };
    Accessor.prototype.setSearchManager = function (search) {
        this.searchManager = search;
    };
    Accessor.prototype.translate = function (key, interpolations) {
        var translation = ((this.searchManager && this.searchManager.translate(key)) ||
            this.translations[key] || key);
        return utils_1.translate(translation, interpolations);
    };
    Accessor.prototype.getResults = function () {
        return this.results;
    };
    Accessor.prototype.setResults = function (results) {
        this.results = results;
    };
    Accessor.prototype.getAggregations = function (path, defaultValue) {
        var results = this.getResults();
        console.log(results);
        var getPath = lodash_1.compact(['aggregations'].concat(path));
        return lodash_1.get(results, getPath, defaultValue);
    };
    Accessor.prototype.beforeBuildQuery = function () { };
    Accessor.prototype.buildSharedQuery = function (query) {
        return query;
    };
    Accessor.prototype.buildOwnQuery = function (query) {
        return query;
    };
    return Accessor;
}());
exports.Accessor = Accessor;
//# sourceMappingURL=Accessor.js.map