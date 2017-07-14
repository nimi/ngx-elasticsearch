"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hasOwnProperty = {}.hasOwnProperty;
/**
 * Create a shallow copy of either an object or array
 * @param x
 */
function shallowCopy(x) {
    if (Array.isArray(x)) {
        return x.concat();
    }
    else if (x && typeof x === 'object') {
        return Object.assign(new x.constructor(), x);
    }
    else {
        return x;
    }
}
exports.shallowCopy = shallowCopy;
var COMMAND_PUSH = '$push';
var COMMAND_UNSHIFT = '$unshift';
var COMMAND_SPLICE = '$splice';
var COMMAND_SET = '$set';
var COMMAND_MERGE = '$merge';
var COMMAND_APPLY = '$apply';
var ALL_COMMANDS_SET = new Set([
    COMMAND_PUSH,
    COMMAND_UNSHIFT,
    COMMAND_SPLICE,
    COMMAND_SET,
    COMMAND_MERGE,
    COMMAND_APPLY
]);
/**
 * @name update
 *
 * Returns a updated shallow copy of an object without mutating the original.
 * @param value
 * @param spec
 */
function update(value, spec) {
    if (hasOwnProperty.call(spec, COMMAND_SET)) {
        return spec[COMMAND_SET];
    }
    var nextValue = shallowCopy(value);
    if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
        Object.assign(nextValue, spec[COMMAND_MERGE]);
    }
    if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
        spec[COMMAND_PUSH].forEach(function (item) { return nextValue.push(item); });
    }
    if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
        spec[COMMAND_UNSHIFT].forEach(function (item) { return nextValue.unshift(item); });
    }
    if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
        spec[COMMAND_SPLICE].forEach(function (args) { return nextValue.splice.apply(nextValue, args); });
    }
    if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
        nextValue = spec[COMMAND_APPLY](nextValue);
    }
    Object.keys(spec)
        .filter(function (k) { return !ALL_COMMANDS_SET.has(k); })
        .forEach(function (k) { return nextValue[k] = update(value[k], spec[k]); });
    return nextValue;
}
exports.update = update;
//# sourceMappingURL=immutability-helper.js.map