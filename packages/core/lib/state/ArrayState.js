"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("./State");
var lodash_1 = require("lodash");
/**
 * @name ArrayState
 * @description
 *
 * State wrapper around arrays of primitive values
 */
var ArrayState = (function (_super) {
    __extends(ArrayState, _super);
    function ArrayState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @name getValue
     * @description Gets the state value or an empty array
     */
    ArrayState.prototype.getValue = function () {
        return this.value || [];
    };
    /**
     * @name toggle
     * @description Toggles the value provided in the state
     * @param val
     */
    ArrayState.prototype.toggle = function (val) {
        if (this.contains(val)) {
            return this.remove(val);
        }
        else {
            return this.add(val);
        }
    };
    /**
     * @name clear
     * @description Resets the state to an empty array
     */
    ArrayState.prototype.clear = function () {
        return this.create([]);
    };
    /**
     * @name remove
     * @description Removes a value from the internal array
     * @param val
     */
    ArrayState.prototype.remove = function (val) {
        return this.create(lodash_1.without(this.getValue(), val));
    };
    /**
     * @name add
     * @description Adds a value to the array state
     * @param val
     */
    ArrayState.prototype.add = function (val) {
        return this.create(this.getValue().concat(val));
    };
    /**
     * @name contains
     * @description Checks for an existing value in the array
     * @param val
     */
    ArrayState.prototype.contains = function (val) {
        return lodash_1.indexOf(this.value, val) !== -1;
    };
    return ArrayState;
}(State_1.State));
exports.ArrayState = ArrayState;
//# sourceMappingURL=ArrayState.js.map