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
var immutability_helper_1 = require("../utils/immutability-helper");
/**
 * @name LevelState
 * @description
 *
 * State wrapper tree structures, trees are mutated
 * with a set of immutability helpers.
 */
var LevelState = (function (_super) {
    __extends(LevelState, _super);
    function LevelState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the current value or default to an empty array
     */
    LevelState.prototype.getValue = function () {
        return this.value || [];
    };
    /**
     * @name add
     * @description Update array state
     * @param level
     * @param val
     */
    LevelState.prototype.add = function (level, val) {
        var arr = this.getValue();
        // create array state at index if it doesn't exist
        if (!lodash_1.isArray(arr[level])) {
            arr = immutability_helper_1.update(arr, (_a = {},
                _a[level] = { $set: [] },
                _a));
        }
        // create an updated array state
        return this.create(immutability_helper_1.update(arr, (_b = {},
            _b[level] = { $push: [val] },
            _b)));
        var _a, _b;
    };
    /**
     * @name contains
     * @description
     * Check if value exists at specified index/level
     * @param level
     * @param val
     */
    LevelState.prototype.contains = function (level, val) {
        return lodash_1.indexOf(this.getValue()[level], val) !== -1;
    };
    /**
     * @name clear
     * @description
     * Clear levels beyond provided level/index
     * @param level
     */
    LevelState.prototype.clear = function (level) {
        if (level === void 0) { level = 0; }
        return this.create(lodash_1.take(this.getValue(), level));
    };
    /**
     * @name remove
     * @description
     * Remove values stored at a specified level/index
     * @param level
     * @param val
     */
    LevelState.prototype.remove = function (level, val) {
        return this.create(immutability_helper_1.update(this.getValue(), (_a = {},
            _a[level] = { $set: lodash_1.without(this.getValue()[level], val) },
            _a)));
        var _a;
    };
    /**
     * @name toggle
     * @description Toggle value within a given level/index
     * @param level
     * @param val
     */
    LevelState.prototype.toggle = function (level, val) {
        return this.contains(level, val)
            ? this.remove(level, val)
            : this.add(level, val);
    };
    /**
     * @name getLevel
     * @description Get level by level number
     * @param level
     */
    LevelState.prototype.getLevel = function (level) {
        return this.getValue()[level] || [];
    };
    /**
     * @name levelHasFilters
     * @description Check if level has any existing filters
     * @param level
     */
    LevelState.prototype.levelHasFilters = function (level) {
        return this.getLevel(level).length > 0;
    };
    /**
     * @name getLeafLevel
     * @description Get the size of the level state value
     */
    LevelState.prototype.getLeafLevel = function () {
        return lodash_1.size(this.value) - 1;
    };
    /**
     * @name isLeafLevel
     * @description Checks if the level is the leaf
     * @param level
     */
    LevelState.prototype.isLeafLevel = function (level) {
        return level === this.getLeafLevel();
    };
    /**
     * @name toggleLevel
     * @description Toggles the level
     * @param level
     * @param key
     */
    LevelState.prototype.toggleLevel = function (level, key) {
        if (this.contains(level, key)) {
            if (this.isLeafLevel(level)) {
                return this.clear(level);
            }
            else {
                return this.clear(level + 1);
            }
        }
        else {
            return this.clear(level)
                .add(level, key);
        }
    };
    return LevelState;
}(State_1.State));
exports.LevelState = LevelState;
//# sourceMappingURL=LevelState.js.map