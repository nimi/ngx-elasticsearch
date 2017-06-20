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
 * @name ObjectState
 * @description
 *
 * State wrapper for simple object type values
 */
var ObjectState = (function (_super) {
    __extends(ObjectState, _super);
    function ObjectState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the state vale or return an empty object
     */
    ObjectState.prototype.getValue = function () {
        return this.value || {};
    };
    /**
     * Checks for an empty value state
     */
    ObjectState.prototype.hasValue = function () {
        return !lodash_1.isEmpty(this.value);
    };
    return ObjectState;
}(State_1.State));
exports.ObjectState = ObjectState;
//# sourceMappingURL=ObjectState.js.map