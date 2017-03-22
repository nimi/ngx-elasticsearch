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
function QueryString(query, options) {
    if (options === void 0) { options = {}; }
    if (!query) {
        return;
    }
    return { "query_string": __assign({ query: query }, options) };
}
exports.QueryString = QueryString;
//# sourceMappingURL=QueryString.js.map