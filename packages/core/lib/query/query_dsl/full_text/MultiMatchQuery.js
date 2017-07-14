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
 * @name MultiMatchQuery
 * @description
 *
 * The multi_match query builds on the match query to allow multi-field queries
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
 *
 */
exports.MultiMatchQuery = function (query, options) {
    return query ? ({ multi_match: __assign({ query: query }, (options || {})) }) : void 0;
};
//# sourceMappingURL=MultiMatchQuery.js.map