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
 * @name SimpleQueryString
 * @description
 *
 * A query that uses the SimpleQueryParser to parse its context.
 * Unlike the regular query_string query, the simple_query_string query
 * will never throw an exception, and discards invalid parts of the query.
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html
 *
 */
exports.SimpleQueryString = function (query, options) {
    if (options === void 0) { options = {}; }
    return query ? ({ simple_query_string: __assign({ query: query }, options) }) : void 0;
};
//# sourceMappingURL=SimpleQueryString.js.map