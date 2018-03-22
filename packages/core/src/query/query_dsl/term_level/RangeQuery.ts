export interface RangeQueryOptions {
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  boost?: number
  format?: string
  time_zone?: string
}

/**
 * @name RangeQuery
 * @description
 *
 * Matches documents with fields that have terms within a certain range.
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html
 * 
 */
export const RangeQuery = (key: string, options: RangeQueryOptions) => 
  ({ range: { [key]: options } })

