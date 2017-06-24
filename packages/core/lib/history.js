"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createBrowserHistory_1 = require("history/createBrowserHistory");
var qs_1 = require("qs");
exports.encodeObjUrl = function (obj) {
    return qs_1.stringify(obj, { encode: true, encodeValuesOnly: true });
};
exports.decodeObjString = function (str) {
    return qs_1.parse(str);
};
exports.createHistoryInstance = function () {
    return createBrowserHistory_1.createBrowserHistory();
};
//# sourceMappingURL=history.js.map