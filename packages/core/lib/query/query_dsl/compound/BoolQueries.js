"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
/**
 * @name isBoolOp
 * @description Check if the operator is a bool
 * @param operator
 * @param val
 */
function isBoolOp(operator, val) {
    return !!val.bool
        && !!val.bool[operator]
        && lodash_1.keys(val).length === 1
        && lodash_1.keys(val.bool).length === 1;
}
/**
 * @name flattenBool
 * @description Flatten bool operator
 * @param operator
 * @param arr
 */
function flattenBool(operator, arr) {
    // Flatten bool.must
    var newArr = [];
    lodash_1.forEach(arr, function (node) {
        if (isBoolOp(operator, node)) {
            newArr.push.apply(newArr, node.bool[operator]);
        }
        else {
            newArr.push(node);
        }
    });
    return newArr;
}
/**
 * @name boolHelper
 * @description Create bool query based on operator and value
 * @param val
 * @param operator
 */
function boolHelper(val, operator) {
    if (Array.isArray(val)) {
        // Remove empty filters
        val = lodash_1.filter(val, function (f) { return !lodash_1.isEmpty(f); });
        if (val.length === 1) {
            if (operator !== 'must_not') {
                return val[0];
            }
            else {
                val = val[0]; // Unbox array
            }
        }
        else if (val.length === 0) {
            return {};
        }
        else if ((operator === 'must' || operator === 'should')
            && (lodash_1.findIndex(val, isBoolOp.bind(null, operator)) != -1)) {
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
/**
 * @name BoolMust
 * @description
 *
 * A query that matches documents matching boolean combinations of other queries.
 * The bool query maps to Lucene BooleanQuery
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
 *
 * @param val
 */
function BoolMust(val) {
    return boolHelper(val, 'must');
}
exports.BoolMust = BoolMust;
/**
 * @name BoolMustNot
 * @description
 *
 * A query that matches documents matching boolean combinations of other queries.
 * The bool query maps to Lucene BooleanQuery
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
 *
 * @param val
 */
function BoolMustNot(val) {
    return boolHelper(val, 'must_not');
}
exports.BoolMustNot = BoolMustNot;
/**
 * @name BoolShould
 * @description
 *
 * A query that matches documents matching boolean combinations of other queries.
 * The bool query maps to Lucene BooleanQuery
 * See: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
 *
 * @param val
 */
function BoolShould(val) {
    return boolHelper(val, 'should');
}
exports.BoolShould = BoolShould;
//# sourceMappingURL=BoolQueries.js.map