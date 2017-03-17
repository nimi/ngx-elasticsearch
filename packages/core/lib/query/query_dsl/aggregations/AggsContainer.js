"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
function AggsContainer(key, inner, aggsArray) {
    if (aggsArray === void 0) { aggsArray = []; }
    aggsArray = lodash_3.compact(aggsArray);
    if (aggsArray.length > 0) {
        inner.aggs = lodash_2.reduce(aggsArray, lodash_1.assign, {});
    }
    return _a = {},
        _a[key] = inner,
        _a;
    var _a;
}
exports.AggsContainer = AggsContainer;
//# sourceMappingURL=AggsContainer.js.map