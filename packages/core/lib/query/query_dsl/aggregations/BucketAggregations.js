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
function TermsBucket(key, field, options) {
    if (options === void 0) { options = {}; }
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, {
        terms: __assign({ field: field }, options)
    }, childAggs);
}
exports.TermsBucket = TermsBucket;
function RangeBucket(key, field, ranges) {
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, {
        range: { field: field, ranges: ranges }
    }, childAggs);
}
exports.RangeBucket = RangeBucket;
function ChildrenBucket(key, type) {
    var childAggs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        childAggs[_i - 2] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { children: { type: type } }, childAggs);
}
exports.ChildrenBucket = ChildrenBucket;
function FilterBucket(key, filter) {
    var childAggs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        childAggs[_i - 2] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { filter: filter }, childAggs);
}
exports.FilterBucket = FilterBucket;
function NestedBucket(key, path) {
    var childAggs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        childAggs[_i - 2] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { nested: { path: path } }, childAggs);
}
exports.NestedBucket = NestedBucket;
function SignificantTermsBucket(key, field, options) {
    if (options === void 0) { options = {}; }
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { significant_terms: __assign({ field: field }, options) }, childAggs);
}
exports.SignificantTermsBucket = SignificantTermsBucket;
function GeohashBucket(key, field, options) {
    if (options === void 0) { options = {}; }
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { geohash_grid: __assign({ field: field }, options) }, childAggs);
}
exports.GeohashBucket = GeohashBucket;
function HistogramBucket(key, field, options) {
    if (options === void 0) { options = {}; }
    var childAggs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        childAggs[_i - 3] = arguments[_i];
    }
    return AggsContainer_1.AggsContainer(key, { histogram: __assign({ field: field }, options) }, childAggs);
}
exports.HistogramBucket = HistogramBucket;
//# sourceMappingURL=BucketAggregations.js.map