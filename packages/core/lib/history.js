"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("history/index");
var qs = require('qs');
exports.encodeObjUrl = function (obj) {
    return qs.stringify(obj, { encode: true, encodeValuesOnly: true });
};
exports.decodeObjString = function (str) {
    return qs.parse(str);
};
exports.createHistoryInstance = function () {
    return index_1.useQueries(index_1.createHistory)({
        stringifyQuery: function (ob) { return exports.encodeObjUrl(ob); },
        parseQueryString: function (str) { return exports.decodeObjString(str); }
    });
};
//# sourceMappingURL=history.js.map