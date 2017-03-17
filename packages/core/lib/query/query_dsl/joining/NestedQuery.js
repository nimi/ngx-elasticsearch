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
function NestedQuery(path, query, options) {
    if (options === void 0) { options = {}; }
    return {
        nested: __assign({ path: path, query: query }, (lodash_1.pick(options, allowedOptions) || {}))
    };
}
exports.NestedQuery = NestedQuery;
//# sourceMappingURL=NestedQuery.js.map