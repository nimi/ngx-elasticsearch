export interface MultiMatchOptions {
  fields: Array<string>,
  type?: string,
  tie_breaker?: number,
  operator?: string,
  minimum_should_match?: string,
  analyzer?: string
}

/**
 * @name MultiMatchQuery
 * @description
 *
 * The multi_match query builds on the match query to allow multi-field queries
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
 * 
 */
export const MultiMatchQuery = (query: any, options: MultiMatchOptions) =>
  query ? ({ multi_match: { query, ...(options || {}) } }) : void 0;
