/**
 * @name TermQuery
 * @description
 *
 * The term query finds documents that contain the exact term specified in the inverted index
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html
 * 
 */
export const TermQuery = (key: string, value: any) =>
  ({ term: { [key]: value } });

