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
function FieldMetricFactory(metricOp) {
    return function (key, field) {
        return AggsContainer_1.AggsContainer(key, (_a = {},
            _a[metricOp] = { field: field },
            _a));
        var _a;
    };
}
exports.FieldMetricFactory = FieldMetricFactory;
exports.CardinalityMetric = FieldMetricFactory('cardinality');
exports.MinMetric = FieldMetricFactory('min');
exports.MaxMetric = FieldMetricFactory('max');
exports.AvgMetric = FieldMetricFactory('avg');
exports.SumMetric = FieldMetricFactory('sum');
exports.StatsMetric = FieldMetricFactory('stats');
function TopHitsMetric(key, top_hits) {
    return AggsContainer_1.AggsContainer(key, { top_hits: top_hits });
}
exports.TopHitsMetric = TopHitsMetric;
function GeoBoundsMetric(key, field, options) {
    if (options === void 0) { options = {}; }
    return AggsContainer_1.AggsContainer(key, { geo_bounds: __assign({ field: field }, options) });
}
exports.GeoBoundsMetric = GeoBoundsMetric;
//# sourceMappingURL=MetricAggregations.js.map