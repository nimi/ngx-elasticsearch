import { reduce, compact, flow, assign } from 'lodash';

/**
 * @name AggsContainer
 * @description
 * 
 * Aggregations help provide aggregated data based on a search query.
 * It is based on simple building blocks called aggregations, that can be
 * composed in order to build complex summaries of the data.
 * 
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html
 * 
 * @param key 
 * @param inner 
 * @param aggsArray 
 */
export function AggsContainer(key: string, inner: any, aggsArray: any[] = []) {
  const aggs = compact(aggsArray);
  return {
    [key]: { ...inner, aggs: aggs.length > 0 ? reduce(aggs, assign, {}) : inner.aggs }
  };
}
