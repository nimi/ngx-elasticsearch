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
function MatchQuery(field, query, options) {
    if (options === void 0) { options = {}; }
    if (!query || !field) {
        return;
    }
    return {
        match: (_a = {}, _a[field] = __assign({ query: query }, options), _a)
    };
    var _a;
}
exports.MatchQuery = MatchQuery;
//# sourceMappingURL=MatchQuery.js.map