"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var accessors_1 = require("./accessors");
var Utils = require("./utils");
var query_1 = require("./query");
var lodash_1 = require("lodash");
var AccessorManager = (function () {
    function AccessorManager() {
        this.accessors = [];
        this.statefulAccessors = {};
        this.queryAccessor = accessors_1.noopQueryAccessor;
    }
    AccessorManager.prototype.getAccessors = function () {
        return this.accessors;
    };
    AccessorManager.prototype.getActiveAccessors = function () {
        return lodash_1.filter(this.accessors, { active: true });
    };
    AccessorManager.prototype.getStatefulAccessors = function () {
        return lodash_1.values(this.statefulAccessors);
    };
    AccessorManager.prototype.getAccessorsByType = function (type) {
        return lodash_1.filter(this.accessors, Utils.instanceOf(type));
    };
    AccessorManager.prototype.getAccessorByType = function (type) {
        return lodash_1.find(this.accessors, Utils.instanceOf(type));
    };
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
    AccessorManager.prototype.getState = function () {
        return lodash_1.reduce(this.getStatefulAccessors(), function (state, accessor) {
            return lodash_1.assign(state, accessor.getQueryObject());
        }, {});
    };
    AccessorManager.prototype.setState = function (state) {
        lodash_1.each(this.getStatefulAccessors(), function (accessor) { return accessor.fromQueryObject(state); });
    };
    AccessorManager.prototype.notifyStateChange = function (oldState) {
        lodash_1.each(this.getStatefulAccessors(), function (accessor) { return accessor.onStateChange(oldState); });
    };
    AccessorManager.prototype.getQueryAccessor = function () {
        return this.queryAccessor;
    };
    AccessorManager.prototype.buildSharedQuery = function (query) {
        return lodash_1.reduce(this.getActiveAccessors(), function (query, accessor) {
            return accessor.buildSharedQuery(query);
        }, query);
    };
    AccessorManager.prototype.buildOwnQuery = function (query) {
        return lodash_1.reduce(this.getActiveAccessors(), function (query, accessor) {
            return accessor.buildOwnQuery(query);
        }, query);
    };
    AccessorManager.prototype.buildQuery = function () {
        lodash_1.each(this.getActiveAccessors(), function (accessor) { return accessor.beforeBuildQuery(); });
        return this.buildOwnQuery(this.buildSharedQuery(new query_1.ImmutableQuery()));
    };
    AccessorManager.prototype.setResults = function (results) {
        lodash_1.each(this.accessors, function (a) { return a.setResults(results); });
    };
    AccessorManager.prototype.resetState = function () {
        lodash_1.each(this.getStatefulAccessors(), function (a) { return a.resetState(); });
    };
    return AccessorManager;
}());
exports.AccessorManager = AccessorManager;
//# sourceMappingURL=AccessorManager.js.map