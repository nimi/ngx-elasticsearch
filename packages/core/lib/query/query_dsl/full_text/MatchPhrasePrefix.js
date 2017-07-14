"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name MatchPhrasePrefix
 * @description
 *
 * The match_phrase_prefix is the same as match_phrase,
 * except that it allows for prefix matches on the last term in the text
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html
 *
 */
exports.MatchPhrasePrefix = function (query, str) {
    query
        ? tokens(str).map(function (_a) {
            var field = _a.field, boost = _a.boost;
            return ({ match_phrase_prefix: (_b = {}, _b[field] = { query: query, boost: boost }, _b) });
            var _b;
        })[0]
        : void 0;
};
function tokens(str) {
    var ts = str.split('^');
    return [{ field: ts[0], boost: Number(ts[1] || 1) }];
}
//# sourceMappingURL=MatchPhrasePrefix.js.map