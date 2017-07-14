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
var allowedOptions = ['score_mode', 'inner_hits'];
/**
 * @name HasParentQuery
 * @description
 *
 * The has_parent query accepts a query and a parent type.
 * The query is executed in the parent document space, which is specified by the parent type.
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-parent-query.html
 *
 */
exports.HasParentQuery = function (parent_type, query, options) {
    if (options === void 0) { options = {}; }
    return ({ has_parent: __assign({ parent_type: parent_type, query: query }, (lodash_1.pick(options, allowedOptions) || {})) });
};
//# sourceMappingURL=HasParentQuery.js.map