export interface MatchQueryOptions {
  operator?: string,
  zero_terms_query?: string,
  analyzer?: string,
  type?: string,
  cutoff_frequency?: number,
  max_expansions?: number
}

export function MatchQuery(field: string, query: any, options: MatchQueryOptions = {}) {
  if (!query || !field) { return; }

  return {
    match:{ [field]: { query, ...options } }
  };
}
