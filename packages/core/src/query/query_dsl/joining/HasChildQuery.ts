import { pick } from 'lodash';

const allowedOptions = ['score_mode', 'inner_hits', 'min_children', 'max_children'];

export function HasChildQuery(type: string, query: any, options = {}){
  return {
    has_child: { type, query, ...(pick(options, allowedOptions) || {}) }
  };
}

