"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_dsl_1 = require("../query_dsl");
var lodash_1 = require("lodash");
var NestedFieldContext = (function () {
    function NestedFieldContext(fieldOptions) {
        if (!lodash_1.get(this.fieldOptions, 'options.path')) {
            throw new Error('fieldOptions type:nested requires options.path');
        }
    }
    NestedFieldContext.prototype.getAggregationPath = function () {
        return 'inner';
    };
    NestedFieldContext.prototype.wrapAggregations = function () {
        var aggregations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            aggregations[_i] = arguments[_i];
        }
        return [
            query_dsl_1.NestedBucket.apply(void 0, ['inner',
                this.fieldOptions.options.path].concat(aggregations))
        ];
    };
    NestedFieldContext.prototype.wrapFilter = function (filter) {
        return query_dsl_1.NestedQuery(this.fieldOptions.options.path, filter, this.fieldOptions.options);
    };
    return NestedFieldContext;
}());
exports.NestedFieldContext = NestedFieldContext;
//# sourceMappingURL=NestedFieldContext.js.map