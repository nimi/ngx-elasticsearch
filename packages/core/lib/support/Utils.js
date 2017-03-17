"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var Utils = (function () {
    function Utils() {
    }
    Utils.guid = function (prefix) {
        if (prefix === void 0) { prefix = ''; }
        var id = ++Utils.guidCounter;
        return prefix.toString() + id;
    };
    Utils.collapse = function (collection, seed) {
        var reducer = function (current, fn) { return fn(current); };
        return lodash_1.reduce(collection, reducer, seed);
    };
    Utils.instanceOf = function (klass) {
        return function (val) { return val instanceof klass; };
    };
    Utils.interpolate = function (str, interpolations) {
        return str.replace(/{([^{}]*)}/g, function (a, b) {
            var r = interpolations[b];
            return typeof r === 'string' ? r : a;
        });
    };
    Utils.translate = function (key, interpolations) {
        if (interpolations) {
            return Utils.interpolate(key, interpolations);
        }
        else {
            return key;
        }
    };
    Utils.computeOptionKeys = function (options, fields, defaultKey) {
        return lodash_1.map(options, function (option) {
            return Utils.generateKeyFromFields(option, fields, defaultKey);
        });
    };
    Utils.generateKeyFromFields = function (ob, fields, defaultKey) {
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
    ;
    return Utils;
}());
Utils.guidCounter = 0;
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map