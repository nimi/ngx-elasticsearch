export interface SimpleQueryStringOptions {
  analyzer?: string
  fields?: Array<string>
  default_operator?: string
  flags?: string
  [str: string]: any
}

/**
 * @name SimpleQueryString
 * @description
 *
 * A query that uses the SimpleQueryParser to parse its context.
 * Unlike the regular query_string query, the simple_query_string query 
 * will never throw an exception, and discards invalid parts of the query.
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html
 * 
 */
export const SimpleQueryString = (query: any, options: SimpleQueryStringOptions = {}) =>
  query ? ({ simple_query_string: { query, ...options } }) : void 0;
