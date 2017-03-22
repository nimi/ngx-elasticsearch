import { AggsContainer } from './AggsContainer';

export interface TermsBucketOptions {
  size?: number
  order?: any
  include?: Array<string> | string
  exclude?: Array<string> | string
  min_doc_count?: number
}

export function TermsBucket(key: string, field: string, options:TermsBucketOptions={}, ...childAggs: any[]) {
  return AggsContainer(key, {
    terms: { field, ...options }
  }, childAggs);
}

export function RangeBucket(key: string, field: string, ranges: any, ...childAggs: any[]) {
  return AggsContainer(key, {
    range: { field, ranges }
  }, childAggs);
}

export function ChildrenBucket(key: string, type: string, ...childAggs: any[]) {
  return AggsContainer(key, { children: { type } }, childAggs)
}

export function FilterBucket(key: string, filter: string, ...childAggs: any[]) {
  return AggsContainer(key, { filter }, childAggs);
}

export function NestedBucket(key: string, path: string, ...childAggs: any[]) {
  return AggsContainer(key, { nested: { path } }, childAggs);
}

export function SignificantTermsBucket(key: string, field: string, options: any = {}, ...childAggs: any[]) {
  return AggsContainer(key, {significant_terms: { field, ...options } }, childAggs);
}

export function GeohashBucket(key: string, field: string, options: any = {}, ...childAggs: any[]) {
  return AggsContainer(key, {geohash_grid: { field, ...options } }, childAggs);
}

export function HistogramBucket(key: string, field: string, options: any = {}, ...childAggs: any[]) {
  return AggsContainer(key, {histogram: { field, ...options } }, childAggs);
}
