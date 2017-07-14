
/**
 * @name MatchPhrasePrefix
 * @description
 *
 * The match_phrase_prefix is the same as match_phrase,
 * except that it allows for prefix matches on the last term in the text
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html
 * 
 */
export const MatchPhrasePrefix = (query: any, str: string) => {
  query 
    ? tokens(str).map(({ field, boost }) => ({ match_phrase_prefix: { [field]: { query, boost } } }))[0]
    : void 0;
}

function tokens(str: string) {
  const ts = str.split('^');
  return [{ field: ts[0], boost: Number(ts[1] || 1) }];
}
