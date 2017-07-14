"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name TermsQuery
 * @description
 *
 * The terms query finds documents that contain the exact terms specified in the inverted index
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html
 *
 */
exports.TermsQuery = function (key, value) {
    return ({ terms: (_a = {}, _a[key] = value, _a) });
    var _a;
};
//# sourceMappingURL=TermsQuery.js.map