"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name RangeQuery
 * @description
 *
 * Matches documents with fields that have terms within a certain range.
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html
 *
 */
exports.RangeQuery = function (key, options) {
    return ({ range: (_a = {}, _a[key] = options, _a) });
    var _a;
};
//# sourceMappingURL=RangeQuery.js.map