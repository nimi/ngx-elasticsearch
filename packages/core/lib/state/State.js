"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name State
 * @description
 *
 * Wrapper for managing stateful values
 */
var State = (function () {
    function State(value) {
        if (value === void 0) { value = null; }
        this.value = value;
    }
    /**
     * Creates a new stateful wrapper around the value
     * @param value
     */
    State.prototype.create = function (value) {
        return new this.constructor(value);
    };
    /**
     * Updates the state value
     * @param value
     */
    State.prototype.setValue = function (value) {
        return this.create(value);
    };
    /**
     * Clear the current state
     */
    State.prototype.clear = function () {
        return this.create(null);
    };
    /**
     * Get the internal state value
     */
    State.prototype.getValue = function () {
        return this.value;
    };
    /**
     * Has a value in state wrapper
     */
    State.prototype.hasValue = function () {
        return Boolean(this.value);
    };
    return State;
}());
exports.State = State;
//# sourceMappingURL=State.js.map