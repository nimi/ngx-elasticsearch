"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name TermQuery
 * @description
 *
 * The term query finds documents that contain the exact term specified in the inverted index
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html
 *
 */
exports.TermQuery = function (key, value) {
    return ({ term: (_a = {}, _a[key] = value, _a) });
    var _a;
};
//# sourceMappingURL=TermQuery.js.map