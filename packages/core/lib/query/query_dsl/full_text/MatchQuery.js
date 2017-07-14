"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name MatchQuery
 * @description
 *
 * Match queries accept text/numerics/dates, analyzes them, and constructs a query
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html
 *
 */
exports.MatchQuery = function (field, query, options) {
    return query && field ? ({ match: (_a = {}, _a[field] = __assign({ query: query }, options), _a) }) : void 0;
    var _a;
};
//# sourceMappingURL=MatchQuery.js.map