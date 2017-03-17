import { pick } from 'lodash';

const allowedOptions = ['score_mode', 'inner_hits'];

export function NestedQuery(path: string, query: any, options = {}) {
  return {
    nested: { path, query, ...(pick(options, allowedOptions) || {}) }
  };
}
