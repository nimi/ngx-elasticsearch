/**
 * @name TermsQuery
 * @description
 *
 * The terms query finds documents that contain the exact terms specified in the inverted index
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html
 * 
 */
export const TermsQuery = (key: string, value: any[]) =>
  ({ terms: { [key]: value } });
