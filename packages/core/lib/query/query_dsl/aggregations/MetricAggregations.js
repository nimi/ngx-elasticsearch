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
exports.FieldMetricFactory = function (metricOp) {
    return function (key, field) {
        return AggsContainer_1.AggsContainer(key, (_a = {}, _a[metricOp] = { field: field }, _a));
        var _a;
    };
};
/**
 * @name CardinalityMetric
 * @description
 *
 * A single-value metrics aggregation that calculates an approximate count of distinct values.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html
 *
 * @param key
 * @param field
 */
exports.CardinalityMetric = exports.FieldMetricFactory('cardinality');
/**
 * @name MinMetric
 * @description
 *
 * A single-value metrics aggregation that keeps track and returns the minimum value among numeric
 * values extracted from the aggregated documents
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-min-aggregation.html
 *
 * @param key
 * @param field
 */
exports.MinMetric = exports.FieldMetricFactory('min');
/**
 * @name MaxMetric
 * @description
 *
 * A single-value metrics aggregation that keeps track and returns the maximum value among numeric
 * values extracted from the aggregated documents
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-max-aggregation.html
 *
 * @param key
 * @param field
 */
exports.MaxMetric = exports.FieldMetricFactory('max');
/**
 * @name AvgMetric
 * @description
 *
 * A single-value metrics aggregation that keeps track and returns the average value among numeric
 * values extracted from the aggregated documents
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-average-aggregation.html
 *
 * @param key
 * @param field
 */
exports.AvgMetric = exports.FieldMetricFactory('avg');
/**
 * @name SumMetric
 * @description
 *
 * A single-value metrics aggregation that sums up numeric values that are extracted from the aggregated documents.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html
 *
 * @param key
 * @param field
 */
exports.SumMetric = exports.FieldMetricFactory('sum');
/**
 * @name StatsMetric
 * @description
 *
 * A multi-value metrics aggregation that computes stats over numeric values extracted from the aggregated documents.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-stats-aggregation.html
 *
 * @param key
 * @param field
 */
exports.StatsMetric = exports.FieldMetricFactory('stats');
/**
 * @name TopHitsMetric
 * @description
 *
 * A top_hits metric aggregator keeps track of the most relevant document being aggregated.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html
 *
 * @param key
 * @param top_hits
 */
function TopHitsMetric(key, top_hits) {
    return AggsContainer_1.AggsContainer(key, { top_hits: top_hits });
}
exports.TopHitsMetric = TopHitsMetric;
/**
 * @name GeoboundsMetric
 * @description
 *
 * A metric aggregation that computes the bounding box containing all geo_point values for a field
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geobounds-aggregation.html
 *
 * @param key
 * @param field
 * @param options
 */
function GeoBoundsMetric(key, field, options) {
    if (options === void 0) { options = {}; }
    return AggsContainer_1.AggsContainer(key, { geo_bounds: __assign({ field: field }, options) });
}
exports.GeoBoundsMetric = GeoBoundsMetric;
//# sourceMappingURL=MetricAggregations.js.map