"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function QueryString(query, options) {
    if (options === void 0) { options = {}; }
    if (!query) {
        return;
    }
    return {
        "query_string": lodash_1.assign({ query: query }, options)
    };
}
exports.QueryString = QueryString;
//# sourceMappingURL=QueryString.js.map