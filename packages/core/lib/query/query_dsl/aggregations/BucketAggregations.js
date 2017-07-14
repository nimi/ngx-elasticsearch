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
var AggsContainer_1 = require("./AggsContainer");
/**
 * @name TermsBucket
 * @description
 *
 * The terms aggregation will return the buckets for the top terms ordered by the doc_count
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html
 *
 * @param key
 * @param field
 * @param options
 * @param childAggs
 */
function TermsBucket(key, field, options) {
    if (options === void 0) { options = {}; }
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { terms: __assign({ field: field }, options) }, childAggs);
}
exports.TermsBucket = TermsBucket;
/**
 * @name SignificantTermsBucket
 * @description
 *
 * The significant terms aggregation will return the terms that have undergone a
 * significant change in popularity measured between a foreground and background set.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significantterms-aggregation.html
 *
 * @param key
 * @param field
 * @param options
 * @param childAggs
 */
function SignificantTermsBucket(key, field, options) {
    if (options === void 0) { options = {}; }
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { significant_terms: __assign({ field: field }, options) }, childAggs);
}
exports.SignificantTermsBucket = SignificantTermsBucket;
/**
 * @name RangeBucket
 * @description
 *
 * A multi-bucket value source based aggregation that enables the user
 * to define a set of ranges - each representing a bucket.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-range-aggregation.html
 *
 * @param key
 * @param field
 * @param ranges
 * @param childAggs
 */
function RangeBucket(key, field, ranges) {
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { range: { field: field, ranges: ranges } }, childAggs);
}
exports.RangeBucket = RangeBucket;
/**
 * @name DateRangeBucket
 * @description
 *
 * A multi-bucket value source based aggregation that enables the user
 * to define a set of date ranges - each representing a bucket.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-range-aggregation.html
 *
 * @param key
 * @param field
 * @param ranges
 * @param childAggs
 */
function DateRangeBucket(key, field, ranges) {
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { date_range: { field: field, ranges: ranges } }, childAggs);
}
exports.DateRangeBucket = DateRangeBucket;
/**
 * @name ChildrenBucket
 * @description
 *
 * A special single bucket aggregation that enables aggregating from buckets
 * on parent document types to buckets on child documents.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-children-aggregation.html
 *
 * @param key
 * @param field
 * @param childAggs
 */
function ChildrenBucket(key, type) {
    var childAggs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        childAggs[_i - 2] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { children: { type: type } }, childAggs);
}
exports.ChildrenBucket = ChildrenBucket;
/**
 * @name FilterBucket
 * @description
 *
 * Defines a single bucket of all the documents in the current document set context
 * that match a specified filter. Often this will be used to narrow down the current
 * aggregation context to a specific set of documents.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html
 *
 * @param key
 * @param field
 * @param childAggs
 */
function FilterBucket(key, filter) {
    var childAggs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        childAggs[_i - 2] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { filter: filter }, childAggs);
}
exports.FilterBucket = FilterBucket;
/**
 * @name NestedBucket
 * @description
 *
 * A special single bucket aggregation that enables aggregating nested documents.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-nested-aggregation.html
 *
 * @param key
 * @param field
 * @param childAggs
 */
function NestedBucket(key, path) {
    var childAggs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        childAggs[_i - 2] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { nested: { path: path } }, childAggs);
}
exports.NestedBucket = NestedBucket;
/**
 * @name GeohashBucket
 * @description
 *
 * A multi-bucket aggregation that works on geo_point fields and groups
 * points into buckets that represent cells in a grid.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geohashgrid-aggregation.html
 *
 * @param key
 * @param field
 * @param options
 * @param childAggs
 */
function GeohashBucket(key, field, options) {
    if (options === void 0) { options = {}; }
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { geohash_grid: __assign({ field: field }, options) }, childAggs);
}
exports.GeohashBucket = GeohashBucket;
/**
 * @name HistogramBucket
 * @description
 *
 * A multi-bucket values source based aggregation that can be applied on numeric
 * values extracted from the documents. It dynamically builds fixed size (a.k.a. interval)
 * buckets over the values
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-histogram-aggregation.html
 *
 * @param key
 * @param field
 * @param options
 * @param childAggs
 */
function HistogramBucket(key, field, options) {
    if (options === void 0) { options = {}; }
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { histogram: __assign({ field: field }, options) }, childAggs);
}
exports.HistogramBucket = HistogramBucket;
/**
 * @name DateHistogramBucket
 * @description
 *
 * A multi-bucket aggregation similar to the histogram except it can only be applied on date values.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html
 *
 * @param key
 * @param field
 * @param options
 * @param childAggs
 */
function DateHistogramBucket(key, field, options) {
    if (options === void 0) { options = {}; }
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { date_histogram: __assign({ field: field }, options) }, childAggs);
}
exports.DateHistogramBucket = DateHistogramBucket;
//# sourceMappingURL=BucketAggregations.js.map