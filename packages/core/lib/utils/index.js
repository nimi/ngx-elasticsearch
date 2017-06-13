"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
__export(require("./http"));
__export(require("./immutability-helper"));
__export(require("./bem-helper"));
var guidCounter = 0;
exports.guid = function (prefix) {
    if (prefix === void 0) { prefix = ''; }
    var id = ++guidCounter;
    return prefix.toString() + id;
};
exports.collapse = function (collection, seed) {
    var reducer = function (current, fn) { return fn(current); };
    return lodash_1.reduce(collection, reducer, seed);
};
exports.instanceOf = function (klass) {
    return function (val) { return val instanceof klass; };
};
exports.interpolate = function (str, interpolations) {
    return str.replace(/{([^{}]*)}/g, function (a, b) {
        var r = interpolations[b];
        return typeof r === 'string' ? r : a;
    });
};
exports.translate = function (key, interpolations) {
    if (interpolations) {
        return exports.interpolate(key, interpolations);
    }
    else {
        return key;
    }
};
exports.computeOptionKeys = function (options, fields, defaultKey) {
    return lodash_1.map(options, function (option) {
        return exports.generateKeyFromFields(option, fields, defaultKey);
    });
};
exports.generateKeyFromFields = function (ob, fields, defaultKey) {
    if (ob.key) {
        return ob;
    }
    var fieldValues = lodash_1.reject(lodash_1.map(fields, function (field) { return ob[field]; }), lodash_1.isUndefined);
    if (fieldValues.length > 0) {
        ob.key = fieldValues.join('_');
    }
    else {
        ob.key = defaultKey;
    }
    return ob;
};
//# sourceMappingURL=index.js.map