export function MatchPhrasePrefix(query: any, str: string) {
  if (!query) { return; }
  const tokens = str.split('^');
  const field = tokens[0];
  const boost = Number(tokens[1] || 1);
  return {
    match_phrase_prefix: { [field]: { query, boost } }
  };
}
