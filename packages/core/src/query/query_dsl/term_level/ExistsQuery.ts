/**
 * @name ExistsQuery
 * @description
 *
 * Returns documents that have at least one non-null value in the original field
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html
 * 
 */
export const ExistsQuery = (key: string) => ({ exists: { field: key } });