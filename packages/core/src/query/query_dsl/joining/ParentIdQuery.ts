/**
 * @name ParentIdQuery
 * @description
 *
 * The parent_id query can be used to find child documents which belong to a particular parent.
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-parent-id-query.html
 * 
 */
export const ParentIdQuery = (type: string, id: string | number)  =>
  ({ parent_id: { type, id } });