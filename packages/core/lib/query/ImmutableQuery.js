"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_dsl_1 = require("./query_dsl");
var utils_1 = require("../utils");
var lodash_1 = require("lodash");
var immutability_helper_1 = require("../utils/immutability-helper");
/**
 * @name ImmutableQuery
 * @description
 *
 * This class is responsible for building, storing and accessing
 * query objects. It manages the query object as the class name implies
 * by making updates via immutable transactions
 *
 */
var ImmutableQuery = (function () {
    function ImmutableQuery(index) {
        if (index === void 0) { index = ImmutableQuery.defaultIndex; }
        this.index = index;
        this.buildQuery();
    }
    /**
     * @name buildQuery
     * @description Create a query from the index state
     */
    ImmutableQuery.prototype.buildQuery = function () {
        var q = {};
        if (this.index.queries.length > 0) {
            q.query = query_dsl_1.BoolMust(this.index.queries);
        }
        if (this.index.filters.length > 0) {
            q.post_filter = query_dsl_1.BoolMust(this.index.filters);
        }
        q.aggs = this.index.aggs;
        q.size = this.index.size;
        q.from = this.index.from;
        q.sort = this.index.sort;
        q.highlight = this.index.highlight;
        q.suggest = this.index.suggest;
        if (this.index._source) {
            q._source = this.index._source;
        }
        this.query = lodash_1.omitBy(q, lodash_1.isUndefined);
    };
    /**
     * @name hasFilters
     * @description Check if index has any filters
     */
    ImmutableQuery.prototype.hasFilters = function () {
        return this.index.filters.length > 0;
    };
    /**
     * @name buildFiltersOrQuery
     * @description Check if index has filters or queries
     */
    ImmutableQuery.prototype.hasFiltersOrQuery = function () {
        return (this.index.queries.length +
            this.index.filters.length) > 0 || !!this.index.sort;
    };
    /**
     * @name addQuery
     * @description Add a new query to the index
     * @param query
     */
    ImmutableQuery.prototype.addQuery = function (query) {
        if (!query) {
            return this;
        }
        return this.update({
            queries: { $push: [query] }
        });
    };
    /**
     * @name setQueryString
     * @description Set the query string on the index
     * @param queryString
     */
    ImmutableQuery.prototype.setQueryString = function (queryString) {
        return this.update({ $merge: { queryString: queryString } });
    };
    /**
     * @name getQueryString
     * @description Get query string from the index state
     */
    ImmutableQuery.prototype.getQueryString = function () {
        return this.index.queryString;
    };
    /**
     * @name addSelectedFilter
     * @description Add a single filter to index filters
     * @param selectedFilter
     */
    ImmutableQuery.prototype.addSelectedFilter = function (selectedFilter) {
        return this.addSelectedFilters([selectedFilter]);
    };
    /**
     * @name addSelectedFilters
     * @description Add a set of filters to index selected filters
     * @param selectedFilters
     */
    ImmutableQuery.prototype.addSelectedFilters = function (selectedFilters) {
        return this.update({
            selectedFilters: { $push: selectedFilters }
        });
    };
    /**
     * @name setSelectedFilters
     * @description Get the current set of selected filters
     */
    ImmutableQuery.prototype.getSelectedFilters = function () {
        return this.index.selectedFilters;
    };
    /**
     * @name addAnonymousFilter
     * @description Add an unnamed filter
     * @param filter
     */
    ImmutableQuery.prototype.addAnonymousFilter = function (filter) {
        return this.addFilter(utils_1.guid(), filter);
    };
    /**
     * @name addFilter
     * @description Add filters to index filter set
     * @param key
     * @param filter
     */
    ImmutableQuery.prototype.addFilter = function (key, filter) {
        return this.update({
            filters: { $push: [filter] },
            filtersMap: { $merge: (_a = {}, _a[key] = filter, _a) }
        });
        var _a;
    };
    /**
     * @name setAggs
     * @description Set the aggs on the index
     * @param aggs
     */
    ImmutableQuery.prototype.setAggs = function (aggs) {
        return this.deepUpdate('aggs', aggs);
    };
    /**
     * @name getFilters
     * @description Get a list of filters
     * @param keys
     */
    ImmutableQuery.prototype.getFilters = function (keys) {
        if (keys === void 0) { keys = []; }
        return this.getFiltersWithoutKeys(keys);
    };
    /**
     * @name _getFilters
     * @description Internal method for getting filters
     * @param keys
     * @param method
     */
    ImmutableQuery.prototype._getFilters = function (keys, method) {
        keys = [].concat(keys);
        var filters = lodash_1.values(method(this.index.filtersMap || {}, keys));
        return query_dsl_1.BoolMust(filters);
    };
    /**
     * @name getFiltersWithKeys
     * @description Get filters with a certain set of keys
     * @param keys
     */
    ImmutableQuery.prototype.getFiltersWithKeys = function (keys) {
        return this._getFilters(keys, lodash_1.pick);
    };
    /**
     * @name getFiltersWithoutKeys
     * @description Get filters without a specified set included
     * @param keys
     */
    ImmutableQuery.prototype.getFiltersWithoutKeys = function (keys) {
        return this._getFilters(keys, lodash_1.omit);
    };
    /**
     * @name setSize
     * @description Set the index size
     * @param size
     */
    ImmutableQuery.prototype.setSize = function (size) {
        return this.update({ $merge: { size: size } });
    };
    /**
     * @name setSort
     * @description Set the index state for sort order
     * @param sort
     */
    ImmutableQuery.prototype.setSort = function (sort) {
        return this.update({ $merge: { sort: sort } });
    };
    /**
     * @name setSource
     * @description Set source property for the index
     * @param _source
     */
    ImmutableQuery.prototype.setSource = function (_source) {
        return this.update({ $merge: { _source: _source } });
    };
    /**
     * @name setQueryString
     * @description Set the highlight prop on the index
     * @param highlight
     */
    ImmutableQuery.prototype.setHighlight = function (highlight) {
        return this.deepUpdate('highlight', highlight);
    };
    /**
     * @name getSize
     * @description Get the query size
     */
    ImmutableQuery.prototype.getSize = function () {
        return this.query.size;
    };
    /**
     * @name setFrom
     * @description Set the from prop on the index
     * @param from
     */
    ImmutableQuery.prototype.setFrom = function (from) {
        return this.update({ $merge: { from: from } });
    };
    /**
     * @name getFrom
     * @description Get the from prop of the query
     */
    ImmutableQuery.prototype.getFrom = function () {
        return this.query.from;
    };
    /**
     * @name getPage
     * @description Get the page based on size and from state
     */
    ImmutableQuery.prototype.getPage = function () {
        return 1 + Math.floor((this.getFrom() || 0) / (this.getSize() || 10));
    };
    /**
     * @name deepUpdate
     * @description Update index state prop deeply
     * @param key
     * @param ob
     */
    ImmutableQuery.prototype.deepUpdate = function (key, ob) {
        return this.update({
            $merge: (_a = {},
                _a[key] = lodash_1.merge({}, this.index[key] || {}, ob),
                _a)
        });
        var _a;
    };
    /**
     * @name setSuggestions
     * @description Set the suggestions state on the index
     * @param suggestions
     */
    ImmutableQuery.prototype.setSuggestions = function (suggestions) {
        return this.update({
            $merge: { suggest: suggestions }
        });
    };
    /**
     * @name update
     * @description Apply a new query to the index state
     * @param updateDef immutable operation to be applied
     */
    ImmutableQuery.prototype.update = function (updateDef) {
        return new ImmutableQuery(immutability_helper_1.update(this.index, updateDef));
    };
    /**
     * @name getJSON
     * @description Get the JSON query
     */
    ImmutableQuery.prototype.getJSON = function () {
        return this.query;
    };
    /**
     * @name printJSON
     * @description Print the JSON query
     */
    ImmutableQuery.prototype.printJSON = function () {
        console.log(JSON.stringify(this.getJSON(), null, 2));
    };
    return ImmutableQuery;
}());
/**
 * Default state of the index of none is provided
 */
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