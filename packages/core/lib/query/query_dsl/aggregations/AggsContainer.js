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
var lodash_1 = require("lodash");
/**
 * @name AggsContainer
 * @description
 *
 * Aggregations help provide aggregated data based on a search query.
 * It is based on simple building blocks called aggregations, that can be
 * composed in order to build complex summaries of the data.
 *
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html
 *
 * @param key
 * @param inner
 * @param aggsArray
 */
function AggsContainer(key, inner, aggsArray) {
    if (aggsArray === void 0) { aggsArray = []; }
    var aggs = lodash_1.compact(aggsArray);
    return _a = {},
        _a[key] = __assign({}, inner, { aggs: aggs.length > 0 ? lodash_1.reduce(aggs, lodash_1.assign, {}) : inner.aggs }),
        _a;
    var _a;
}
exports.AggsContainer = AggsContainer;
//# sourceMappingURL=AggsContainer.js.map