"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var history_1 = require("history");
var qs_1 = require("qs");
exports.encodeObjUrl = function (obj) {
    return qs_1.stringify(obj, { encode: true, encodeValuesOnly: true });
};
exports.decodeObjString = function (str) {
    return qs_1.parse(str);
};
exports.createHistoryInstance = function () {
    return history_1.createBrowserHistory();
};
//# sourceMappingURL=history.js.map