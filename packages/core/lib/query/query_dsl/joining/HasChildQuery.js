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
var allowedOptions = ['score_mode', 'inner_hits', 'min_children', 'max_children'];
/**
 * @name HasChildQuery
 * @description
 *
 * The has_child filter accepts a query and the child type to run against,
 * and results in parent documents that have child docs matching the query
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-child-query.html
 *
 */
exports.HasChildQuery = function (type, query, options) {
    if (options === void 0) { options = {}; }
    return ({ has_child: __assign({ type: type, query: query }, (lodash_1.pick(options, allowedOptions) || {})) });
};
//# sourceMappingURL=HasChildQuery.js.map