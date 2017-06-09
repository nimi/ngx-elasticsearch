"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_dsl_1 = require("./query_dsl");
var utils_1 = require("../utils");
var lodash_1 = require("lodash");
var immutability_helper_1 = require("../utils/immutability-helper");
var ImmutableQuery = (function () {
    function ImmutableQuery(index) {
        if (index === void 0) { index = ImmutableQuery.defaultIndex; }
        this.index = index;
        this.buildQuery();
    }
    ImmutableQuery.prototype.buildQuery = function () {
        var query = {};
        if (this.index.queries.length > 0) {
            query.query = query_dsl_1.BoolMust(this.index.queries);
        }
        if (this.index.filters.length > 0) {
            query.post_filter = query_dsl_1.BoolMust(this.index.filters);
        }
        query.aggs = this.index.aggs;
        query.size = this.index.size;
        query.from = this.index.from;
        query.sort = this.index.sort;
        query.highlight = this.index.highlight;
        query.suggest = this.index.suggest;
        if (this.index._source) {
            query._source = this.index._source;
        }
        this.query = lodash_1.omitBy(query, lodash_1.isUndefined);
    };
    ImmutableQuery.prototype.hasFilters = function () {
        return this.index.filters.length > 0;
    };
    ImmutableQuery.prototype.hasFiltersOrQuery = function () {
        return (this.index.queries.length +
            this.index.filters.length) > 0 || !!this.index.sort;
    };
    ImmutableQuery.prototype.addQuery = function (query) {
        if (!query) {
            return this;
        }
        return this.update({
            queries: { $push: [query] }
        });
    };
    ImmutableQuery.prototype.setQueryString = function (queryString) {
        return this.update({ $merge: { queryString: queryString } });
    };
    ImmutableQuery.prototype.getQueryString = function () {
        return this.index.queryString;
    };
    ImmutableQuery.prototype.addSelectedFilter = function (selectedFilter) {
        return this.addSelectedFilters([selectedFilter]);
    };
    ImmutableQuery.prototype.addSelectedFilters = function (selectedFilters) {
        return this.update({
            selectedFilters: { $push: selectedFilters }
        });
    };
    ImmutableQuery.prototype.getSelectedFilters = function () {
        return this.index.selectedFilters;
    };
    ImmutableQuery.prototype.addAnonymousFilter = function (bool) {
        return this.addFilter(utils_1.guid(), bool);
    };
    ImmutableQuery.prototype.addFilter = function (key, filter) {
        return this.update({
            filters: { $push: [filter] },
            filtersMap: { $merge: (_a = {}, _a[key] = filter, _a) }
        });
        var _a;
    };
    ImmutableQuery.prototype.setAggs = function (aggs) {
        return this.deepUpdate('aggs', aggs);
    };
    ImmutableQuery.prototype.getFilters = function (keys) {
        if (keys === void 0) { keys = []; }
        return this.getFiltersWithoutKeys(keys);
    };
    ImmutableQuery.prototype._getFilters = function (keys, method) {
        keys = [].concat(keys);
        var filters = lodash_1.values(method(this.index.filtersMap || {}, keys));
        return query_dsl_1.BoolMust(filters);
    };
    ImmutableQuery.prototype.getFiltersWithKeys = function (keys) {
        return this._getFilters(keys, lodash_1.pick);
    };
    ImmutableQuery.prototype.getFiltersWithoutKeys = function (keys) {
        return this._getFilters(keys, lodash_1.omit);
    };
    ImmutableQuery.prototype.setSize = function (size) {
        return this.update({ $merge: { size: size } });
    };
    ImmutableQuery.prototype.setSort = function (sort) {
        return this.update({ $merge: { sort: sort } });
    };
    ImmutableQuery.prototype.setSource = function (_source) {
        return this.update({ $merge: { _source: _source } });
    };
    ImmutableQuery.prototype.setHighlight = function (highlight) {
        return this.deepUpdate('highlight', highlight);
    };
    ImmutableQuery.prototype.getSize = function () {
        return this.query.size;
    };
    ImmutableQuery.prototype.setFrom = function (from) {
        return this.update({ $merge: { from: from } });
    };
    ImmutableQuery.prototype.getFrom = function () {
        return this.query.from;
    };
    ImmutableQuery.prototype.getPage = function () {
        return 1 + Math.floor((this.getFrom() || 0) / (this.getSize() || 10));
    };
    ImmutableQuery.prototype.deepUpdate = function (key, ob) {
        return this.update({
            $merge: (_a = {},
                _a[key] = lodash_1.merge({}, this.index[key] || {}, ob),
                _a)
        });
        var _a;
    };
    ImmutableQuery.prototype.setSuggestions = function (suggestions) {
        return this.update({
            $merge: { suggest: suggestions }
        });
    };
    ImmutableQuery.prototype.update = function (updateDef) {
        return new ImmutableQuery(immutability_helper_1.update(this.index, updateDef));
    };
    ImmutableQuery.prototype.getJSON = function () {
        return this.query;
    };
    ImmutableQuery.prototype.printJSON = function () {
        console.log(JSON.stringify(this.getJSON(), null, 2));
    };
    return ImmutableQuery;
}());
ImmutableQuery.defaultIndex = {
    queryString: '',
    filtersMap: {},
    selectedFilters: [],
    queries: [],
    filters: [],
    _source: null,
    size: 10
};
exports.ImmutableQuery = ImmutableQuery;
//# sourceMappingURL=ImmutableQuery.js.map