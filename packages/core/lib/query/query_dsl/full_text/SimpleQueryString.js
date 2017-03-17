"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function SimpleQueryString(query, options) {
    if (options === void 0) { options = {}; }
    if (!query) {
        return;
    }
    return {
        "simple_query_string": lodash_1.assign({ query: query }, options)
    };
}
exports.SimpleQueryString = SimpleQueryString;
//# sourceMappingURL=SimpleQueryString.js.map