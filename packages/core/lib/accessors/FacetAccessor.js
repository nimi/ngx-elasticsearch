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
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var FilterBasedAccessor_1 = require("./FilterBasedAccessor");
var query_1 = require("../query");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var lodash_4 = require("lodash");
var lodash_5 = require("lodash");
var lodash_6 = require("lodash");
var FacetAccessor = (function (_super) {
    __extends(FacetAccessor, _super);
    function FacetAccessor(key, options) {
        var _this = _super.call(this, key, options.id) || this;
        _this.state = new state_1.ArrayState();
        _this.translations = FacetAccessor.translations;
        _this.options = options;
        _this.defaultSize = options.size;
        _this.options.facetsPerPage = _this.options.facetsPerPage || 50;
        _this.size = _this.defaultSize;
        _this.loadAggregations = lodash_4.isUndefined(_this.options.loadAggregations) ? true : _this.options.loadAggregations;
        if (options.translations) {
            _this.translations = lodash_1.assign({}, _this.translations, options.translations);
        }
        _this.options.fieldOptions = _this.options.fieldOptions || { type: "embedded" };
        _this.options.fieldOptions.field = _this.key;
        _this.fieldContext = query_1.FieldContextFactory(_this.options.fieldOptions);
        return _this;
    }
    FacetAccessor.prototype.getRawBuckets = function () {
        return this.getAggregations([
            this.uuid,
            this.fieldContext.getAggregationPath(),
            this.key, "buckets"
        ], []);
    };
    FacetAccessor.prototype.getBuckets = function () {
        var rawBuckets = this.getRawBuckets();
        var keyIndex = lodash_5.keyBy(rawBuckets, "key");
        var inIndex = function (filter) { return !!keyIndex[filter]; };
        var missingFilters = [];
        lodash_6.each(this.state.getValue(), function (filterKey) {
            if (keyIndex[filterKey]) {
                var filter = keyIndex[filterKey];
                filter.selected = true;
            }
            else {
                missingFilters.push({
                    key: filterKey, missing: true, selected: true
                });
            }
        });
        var buckets = (missingFilters.length > 0) ?
            missingFilters.concat(rawBuckets) : rawBuckets;
        return buckets;
    };
    FacetAccessor.prototype.getDocCount = function () {
        return this.getAggregations([
            this.uuid,
            this.fieldContext.getAggregationPath(),
            "doc_count"
        ], 0);
    };
    FacetAccessor.prototype.getCount = function () {
        return this.getAggregations([
            this.uuid,
            this.fieldContext.getAggregationPath(),
            this.key + "_count", "value"
        ], 0);
    };
    FacetAccessor.prototype.setViewMoreOption = function (option) {
        this.size = option.size;
    };
    FacetAccessor.prototype.getMoreSizeOption = function () {
        var option = { size: 0, label: "" };
        var total = this.getCount();
        var facetsPerPage = this.options.facetsPerPage;
        if (total <= this.defaultSize)
            return null;
        if (total <= this.size) {
            option = { size: this.defaultSize, label: this.translate("facets.view_less") };
        }
        else if ((this.size + facetsPerPage) >= total) {
            option = { size: total, label: this.translate("facets.view_all") };
        }
        else if ((this.size + facetsPerPage) < total) {
            option = { size: this.size + facetsPerPage, label: this.translate("facets.view_more") };
        }
        else if (total) {
            option = null;
        }
        return option;
    };
    FacetAccessor.prototype.isOrOperator = function () {
        return this.options.operator === "OR";
    };
    FacetAccessor.prototype.getBoolBuilder = function () {
        return this.isOrOperator() ? query_1.BoolShould : query_1.BoolMust;
    };
    FacetAccessor.prototype.getOrder = function () {
        if (this.options.orderKey) {
            var orderDirection = this.options.orderDirection || "asc";
            return _a = {}, _a[this.options.orderKey] = orderDirection, _a;
        }
        var _a;
    };
    FacetAccessor.prototype.buildSharedQuery = function (query) {
        var _this = this;
        var filters = this.state.getValue();
        var filterTerms = lodash_2.map(filters, function (filter) {
            return _this.fieldContext.wrapFilter(query_1.TermQuery(_this.key, filter));
        });
        var selectedFilters = lodash_2.map(filters, function (filter) {
            return {
                name: _this.options.title || _this.translate(_this.key),
                value: _this.translate(filter),
                id: _this.options.id,
                remove: function () { return _this.state = _this.state.remove(filter); }
            };
        });
        var boolBuilder = this.getBoolBuilder();
        if (filterTerms.length > 0) {
            query = query.addFilter(this.uuid, boolBuilder(filterTerms))
                .addSelectedFilters(selectedFilters);
        }
        return query;
    };
    FacetAccessor.prototype.buildOwnQuery = function (query) {
        if (!this.loadAggregations) {
            return query;
        }
        else {
            var filters = this.state.getValue();
            var excludedKey = (this.isOrOperator()) ? this.uuid : undefined;
            return query
                .setAggs(query_1.FilterBucket.apply(void 0, [this.uuid,
                query.getFiltersWithoutKeys(excludedKey)].concat(this.fieldContext.wrapAggregations(query_1.TermsBucket(this.key, this.key, lodash_3.omitBy({
                size: this.size,
                order: this.getOrder(),
                include: this.options.include,
                exclude: this.options.exclude,
                min_doc_count: this.options.min_doc_count
            }, lodash_4.isUndefined)), query_1.CardinalityMetric(this.key + "_count", this.key)))));
        }
    };
    return FacetAccessor;
}(FilterBasedAccessor_1.FilterBasedAccessor));
FacetAccessor.translations = {
    "facets.view_more": "View more",
    "facets.view_less": "View less",
    "facets.view_all": "View all"
};
exports.FacetAccessor = FacetAccessor;
//# sourceMappingURL=FacetAccessor.js.map