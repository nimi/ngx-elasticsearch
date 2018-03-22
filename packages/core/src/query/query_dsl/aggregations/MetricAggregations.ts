import { AggsContainer } from './AggsContainer';

export interface TopHitsMetricOptions {
  size: number
  from?: number
  _source?: any
  sort?: any
  [prop:string]: any
}

export const FieldMetricFactory = (metricOp: string) =>
  (key: string, field: string) => AggsContainer(key, { [metricOp]: { field } });

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
export const CardinalityMetric = FieldMetricFactory('cardinality');

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
export const MinMetric = FieldMetricFactory('min');

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
export const MaxMetric = FieldMetricFactory('max');

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
export const AvgMetric = FieldMetricFactory('avg');

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
export const SumMetric = FieldMetricFactory('sum');

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
export const StatsMetric = FieldMetricFactory('stats');

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
export function TopHitsMetric(key: string, top_hits: TopHitsMetricOptions) {
  return AggsContainer(key, { top_hits });
}

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
export function GeoBoundsMetric(key: string, field: string, options = {}) {
  return AggsContainer(key, { geo_bounds: { field, ...options } } );
}
