import { pick } from 'lodash';

const allowedOptions = ['score_mode', 'inner_hits'];

/**
 * @name NestedQuery
 * @description
 *
 * Nested query allows to query nested objects
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html
 * 
 */
export const NestedQuery = (path: string, query: any, options = {}) =>
  ({ nested: { path, query, ...(pick(options, allowedOptions) || {}) } });
