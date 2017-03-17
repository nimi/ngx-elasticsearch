"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var accessors_1 = require("./accessors");
var support_1 = require("./support");
var query_1 = require("./query");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var lodash_4 = require("lodash");
var lodash_5 = require("lodash");
var lodash_6 = require("lodash");
var lodash_7 = require("lodash");
var AccessorManager = (function () {
    function AccessorManager() {
        this.accessors = [];
        this.queryAccessor = accessors_1.noopQueryAccessor;
        this.statefulAccessors = {};
    }
    AccessorManager.prototype.getAccessors = function () {
        return this.accessors;
    };
    AccessorManager.prototype.getActiveAccessors = function () {
        return lodash_1.filter(this.accessors, { active: true });
    };
    AccessorManager.prototype.getStatefulAccessors = function () {
        return lodash_2.values(this.statefulAccessors);
    };
    AccessorManager.prototype.getAccessorsByType = function (type) {
        return lodash_1.filter(this.accessors, support_1.Utils.instanceOf(type));
    };
    AccessorManager.prototype.getAccessorByType = function (type) {
        return lodash_7.find(this.accessors, support_1.Utils.instanceOf(type));
    };
    AccessorManager.prototype.add = function (accessor) {
        if (accessor instanceof accessors_1.StatefulAccessor) {
            if (accessor instanceof accessors_1.BaseQueryAccessor && accessor.key == "q") {
                if (this.queryAccessor !== accessors_1.noopQueryAccessor) {
                    throw new Error("Only a single instance of BaseQueryAccessor is allowed");
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
            this.accessors = lodash_6.without(this.accessors, accessor);
        }
    };
    AccessorManager.prototype.getState = function () {
        return lodash_3.reduce(this.getStatefulAccessors(), function (state, accessor) {
            return lodash_4.assign(state, accessor.getQueryObject());
        }, {});
    };
    AccessorManager.prototype.setState = function (state) {
        lodash_5.each(this.getStatefulAccessors(), function (accessor) { return accessor.fromQueryObject(state); });
    };
    AccessorManager.prototype.notifyStateChange = function (oldState) {
        lodash_5.each(this.getStatefulAccessors(), function (accessor) { return accessor.onStateChange(oldState); });
    };
    AccessorManager.prototype.getQueryAccessor = function () {
        return this.queryAccessor;
    };
    AccessorManager.prototype.buildSharedQuery = function (query) {
        return lodash_3.reduce(this.getActiveAccessors(), function (query, accessor) {
            return accessor.buildSharedQuery(query);
        }, query);
    };
    AccessorManager.prototype.buildOwnQuery = function (query) {
        return lodash_3.reduce(this.getActiveAccessors(), function (query, accessor) {
            return accessor.buildOwnQuery(query);
        }, query);
    };
    AccessorManager.prototype.buildQuery = function () {
        lodash_5.each(this.getActiveAccessors(), function (accessor) { return accessor.beforeBuildQuery(); });
        return this.buildOwnQuery(this.buildSharedQuery(new query_1.ImmutableQuery()));
    };
    AccessorManager.prototype.setResults = function (results) {
        lodash_5.each(this.accessors, function (a) { return a.setResults(results); });
    };
    AccessorManager.prototype.resetState = function () {
        lodash_5.each(this.getStatefulAccessors(), function (a) { return a.resetState(); });
    };
    return AccessorManager;
}());
exports.AccessorManager = AccessorManager;
//# sourceMappingURL=AccessorManager.js.map