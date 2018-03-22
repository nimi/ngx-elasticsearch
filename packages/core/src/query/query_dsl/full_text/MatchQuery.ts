export interface MatchQueryOptions {
  operator?: string,
  zero_terms_query?: string,
  analyzer?: string,
  type?: string,
  cutoff_frequency?: number,
  max_expansions?: number
}

/**
 * @name MatchQuery
 * @description
 *
 * Match queries accept text/numerics/dates, analyzes them, and constructs a query
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html
 * 
 */
export const MatchQuery = (field: string, query: any, options: MatchQueryOptions) =>
  query && field ? ({ match:{ [field]: { query, ...options } } }) : void 0;
