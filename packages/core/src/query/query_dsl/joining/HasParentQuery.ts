import { pick } from 'lodash';

const allowedOptions = ['score_mode', 'inner_hits'];

export function HasParentQuery(parent_type: string, query: any, options = {}){
  return {
    has_parent: { parent_type, query, ...(pick(options, allowedOptions) || {}) }
  };
}
