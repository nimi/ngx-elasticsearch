import { pick } from 'lodash';

const allowedOptions = ['score_mode', 'inner_hits', 'min_children', 'max_children'];

/**
 * @name HasChildQuery
 * @description
 *
 * The has_child filter accepts a query and the child type to run against,
 * and results in parent documents that have child docs matching the query
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-child-query.html
 * 
 */
export const HasChildQuery = (type: string, query: any, options = {})  =>
  ({ has_child: { type, query, ...(pick(options, allowedOptions) || {}) }});

