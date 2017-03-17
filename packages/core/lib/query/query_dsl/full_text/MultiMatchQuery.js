"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function MultiMatchQuery(query, options) {
    if (!query) {
        return;
    }
    return {
        multi_match: lodash_1.assign({ query: query }, options)
    };
}
exports.MultiMatchQuery = MultiMatchQuery;
//# sourceMappingURL=MultiMatchQuery.js.map