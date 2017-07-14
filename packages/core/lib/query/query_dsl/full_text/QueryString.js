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
 * @name QueryString
 * @description
 *
 * A query that uses a query parser in order to parse its content.
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html
 *
 */
exports.QueryString = function (query, options) {
    if (options === void 0) { options = {}; }
    return query ? ({ query_string: __assign({ query: query }, options) }) : void 0;
};
//# sourceMappingURL=QueryString.js.map