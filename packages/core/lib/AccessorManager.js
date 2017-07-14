"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var accessors_1 = require("./accessors");
var utils_1 = require("./utils");
var query_1 = require("./query");
var lodash_1 = require("lodash");
/**
 * @name AccessorManager
 * @description
 *
 * The accessor manager handles adding, removing, getting and building
 * queries with accessors. It's used by the SearchManager
 *
 */
var AccessorManager = (function () {
    function AccessorManager() {
        this.accessors = [];
        this.statefulAccessors = {};
        this.queryAccessor = accessors_1.noopQueryAccessor;
    }
    /**
     * @name getAccessors
     * @description Getter for the accessors state
     */
    AccessorManager.prototype.getAccessors = function () {
        return this.accessors;
    };
    /**
     * @name getActiveAccessors
     * @description Getter for accessors that are currently active
     */
    AccessorManager.prototype.getActiveAccessors = function () {
        return lodash_1.filter(this.accessors, { active: true });
    };
    /**
     * @name getStatefulAccessors
     * @description Getter for accessors that are stateful
     */
    AccessorManager.prototype.getStatefulAccessors = function () {
        return lodash_1.values(this.statefulAccessors);
    };
    /**
     * @name getAccessorsByType
     * @description Getter for accessors of a certain type
     */
    AccessorManager.prototype.getAccessorsByType = function (type) {
        return lodash_1.filter(this.accessors, utils_1.instanceOf(type));
    };
    /**
     * @name getAccessorByType
     * @description Getter for accessors of certain type
     */
    AccessorManager.prototype.getAccessorByType = function (type) {
        return lodash_1.find(this.accessors, utils_1.instanceOf(type));
    };
    /**
     * @name add
     * @description Adds an accessor to internal accessors state
     */
    AccessorManager.prototype.add = function (accessor) {
        if (accessor instanceof accessors_1.StatefulAccessor) {
            if (accessor instanceof accessors_1.BaseQueryAccessor && accessor.key === 'q') {
                if (this.queryAccessor !== accessors_1.noopQueryAccessor) {
                    throw new Error('Only a single instance of BaseQueryAccessor is allowed');
                }
                else {
                    this.queryAccessor = accessor;
                }
            }
            var existingAccessor = this.statefulAccessors[accessor.key];
            if (existingAccessor) {
                existingAccessor.incrementRef();
                return existingAccessor;
            }
            else {
                this.statefulAccessors[accessor.key] = accessor;
            }
        }
        accessor.incrementRef();
        this.accessors.push(accessor);
        return accessor;
    };
    /**
     * @name remove
     * @description Removes an accessor from the list accessors state
     */
    AccessorManager.prototype.remove = function (accessor) {
        if (!accessor) {
            return;
        }
        accessor.decrementRef();
        if (accessor.refCount === 0) {
            if (accessor instanceof accessors_1.StatefulAccessor) {
                if (this.queryAccessor == accessor) {
                    this.queryAccessor = accessors_1.noopQueryAccessor;
                }
                delete this.statefulAccessors[accessor.key];
            }
            this.accessors = lodash_1.without(this.accessors, accessor);
        }
    };
    /**
     * @name getState
     * @description Gets the state of the query from stateful accessors
     */
    AccessorManager.prototype.getState = function () {
        return lodash_1.reduce(this.getStatefulAccessors(), function (state, accessor) {
            return lodash_1.assign(state, accessor.getQueryObject());
        }, {});
    };
    /**
     * @name setState
     * @description Sets the state of the stateful accessors
     * @param state
     */
    AccessorManager.prototype.setState = function (state) {
        lodash_1.each(this.getStatefulAccessors(), function (accessor) { return accessor.fromQueryObject(state); });
    };
    /**
     * @name notifyStateChange
     * @description Notify stateful accessors of state change
     * @param oldState
     */
    AccessorManager.prototype.notifyStateChange = function (oldState) {
        lodash_1.each(this.getStatefulAccessors(), function (accessor) { return accessor.onStateChange(oldState); });
    };
    /**
     * @name getQueryAccessor
     * @description Get the query accessor state
     */
    AccessorManager.prototype.getQueryAccessor = function () {
        return this.queryAccessor;
    };
    /**
     * @name buildSharedQuery
     * @description Builds a shared query
     * @param query
     */
    AccessorManager.prototype.buildSharedQuery = function (query) {
        return lodash_1.reduce(this.getActiveAccessors(), function (query, accessor) {
            return accessor.buildSharedQuery(query);
        }, query);
    };
    /**
     * @name buildSharedQuery
     * @description Builds a shared query
     * @param query
     */
    AccessorManager.prototype.buildOwnQuery = function (query) {
        return lodash_1.reduce(this.getActiveAccessors(), function (query, accessor) {
            return accessor.buildOwnQuery(query);
        }, query);
    };
    /**
     * @name buildQuery
     * @description Builds a shared query
     * @param query
     */
    AccessorManager.prototype.buildQuery = function () {
        lodash_1.each(this.getActiveAccessors(), function (accessor) { return accessor.beforeBuildQuery(); });
        return this.buildOwnQuery(this.buildSharedQuery(new query_1.ImmutableQuery()));
    };
    /**
     * @name setResults
     * @description Sets the result state of all accessors
     * @param results
     */
    AccessorManager.prototype.setResults = function (results) {
        lodash_1.each(this.accessors, function (a) { return a.setResults(results); });
    };
    /**
     * @name resetState
     * @description Resets the state of all stateful accessors
     */
    AccessorManager.prototype.resetState = function () {
        lodash_1.each(this.getStatefulAccessors(), function (a) { return a.resetState(); });
    };
    return AccessorManager;
}());
exports.AccessorManager = AccessorManager;
//# sourceMappingURL=AccessorManager.js.map