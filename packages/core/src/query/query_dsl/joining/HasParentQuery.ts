import { pick } from 'lodash';

const allowedOptions = ['score_mode', 'inner_hits'];

/**
 * @name HasParentQuery
 * @description
 *
 * The has_parent query accepts a query and a parent type.
 * The query is executed in the parent document space, which is specified by the parent type.
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-parent-query.html
 * 
 */
export const HasParentQuery = (parent_type: string, query: any, options = {})  =>
  ({ has_parent: { parent_type, query, ...(pick(options, allowedOptions) || {}) } });
