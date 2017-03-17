"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var lodash_4 = require("lodash");
var lodash_5 = require("lodash");
var lodash_6 = require("lodash");
function isBoolOp(operator, val) {
    // Has {bool: must: []} ?
    if (!val.bool || !val.bool[operator])
        return false;
    // Doesn't have other stuff ?
    return (lodash_6.keys(val).length == 1) && (lodash_6.keys(val.bool).length == 1);
}
function flattenBool(operator, arr) {
    // Flatten bool.must
    var newArr = [];
    lodash_3.forEach(arr, function (node) {
        if (isBoolOp(operator, node)) {
            newArr.push.apply(newArr, node.bool[operator]);
        }
        else {
            newArr.push(node);
        }
    });
    return newArr;
}
function boolHelper(val, operator) {
    var isArr = lodash_1.isArray(val);
    if (isArr) {
        // Remove empty filters
        val = lodash_5.filter(val, function (f) { return !lodash_4.isEmpty(f); });
        if (val.length === 1) {
            if (operator != "must_not")
                return val[0];
            else
                val = val[0]; // Unbox array
        }
        else if (val.length === 0) {
            return {};
        }
        else if ((operator == "must" || operator == "should")
            && (lodash_2.findIndex(val, isBoolOp.bind(null, operator)) != -1)) {
            val = flattenBool(operator, val);
        }
    }
    return {
        bool: (_a = {},
            _a[operator] = val,
            _a)
    };
    var _a;
}
function BoolMust(val) {
    return boolHelper(val, "must");
}
exports.BoolMust = BoolMust;
function BoolMustNot(val) {
    return boolHelper(val, "must_not");
}
exports.BoolMustNot = BoolMustNot;
function BoolShould(val) {
    return boolHelper(val, "should");
}
exports.BoolShould = BoolShould;
//# sourceMappingURL=BoolQueries.js.map