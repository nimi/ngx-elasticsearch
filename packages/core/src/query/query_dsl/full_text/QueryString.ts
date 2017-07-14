
export interface QueryStringOptions {
  analyzer?: string
  fields?: Array<string>
  default_operator?: string
  flags?: string
  [str: string]: any
}

/**
 * @name QueryString
 * @description
 *
 * A query that uses a query parser in order to parse its content.
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html
 * 
 */
export const QueryString = (query: any, options: QueryStringOptions = {}) =>
  query ? ({ query_string: { query, ...options } }) : void 0;
