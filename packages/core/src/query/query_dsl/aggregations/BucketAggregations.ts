import { AggsContainer } from './AggsContainer';

export interface TermsBucketOptions {
  size?: number
  order?: any
  include?: Array<string> | string
  exclude?: Array<string> | string
  min_doc_count?: number
}

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
export function TermsBucket(key: string, field: string, options: TermsBucketOptions = {}, ...childAggs: any[]) {
  return AggsContainer(key, { terms: { field, ...options } }, childAggs);
}

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
export function SignificantTermsBucket(key: string, field: string, options: any = {}, ...childAggs: any[]) {
  return AggsContainer(key, {significant_terms: { field, ...options } }, childAggs);
}

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
export function RangeBucket(key: string, field: string, ranges: any, ...childAggs: any[]) {
  return AggsContainer(key, { range: { field, ranges } }, childAggs);
}

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
export function DateRangeBucket(key: string, field: string, ranges: any, ...childAggs: any[]) {
  return AggsContainer(key, { date_range: { field, ranges } }, childAggs);
}

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
export function ChildrenBucket(key: string, type: string, ...childAggs: any[]) {
  return AggsContainer(key, { children: { type } }, childAggs)
}

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
export function FilterBucket(key: string, filter: string, ...childAggs: any[]) {
  return AggsContainer(key, { filter }, childAggs);
}

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
export function NestedBucket(key: string, path: string, ...childAggs: any[]) {
  return AggsContainer(key, { nested: { path } }, childAggs);
}

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
export function GeohashBucket(key: string, field: string, options: any = {}, ...childAggs: any[]) {
  return AggsContainer(key, {geohash_grid: { field, ...options } }, childAggs);
}

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
export function HistogramBucket(key: string, field: string, options: any = {}, ...childAggs: any[]) {
  return AggsContainer(key, {histogram: { field, ...options } }, childAggs);
}

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
export function DateHistogramBucket(key: string, field: string, options: any = {}, ...childAggs: any[]) {
  return AggsContainer(key, {date_histogram: { field, ...options } }, childAggs);
}
