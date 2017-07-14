"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_dsl_1 = require("../query_dsl");
var lodash_1 = require("lodash");
var ChildrenFieldContext = (function () {
    function ChildrenFieldContext(fieldOptions) {
        this.fieldOptions = fieldOptions;
        if (!lodash_1.get(this.fieldOptions, 'options.childType')) {
            throw new Error('fieldOptions of type "children" requires options.childType');
        }
    }
    ChildrenFieldContext.prototype.getAggregationPath = function () {
        return 'inner';
    };
    ChildrenFieldContext.prototype.wrapAggregations = function () {
        var aggregations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            aggregations[_i] = arguments[_i];
        }
        return [query_dsl_1.ChildrenBucket.apply(void 0, ['inner',
                this.fieldOptions.options.childType].concat(aggregations))];
    };
    ChildrenFieldContext.prototype.wrapFilter = function (filter) {
        return query_dsl_1.HasChildQuery(this.fieldOptions.options.childType, filter, this.fieldOptions.options);
    };
    return ChildrenFieldContext;
}());
exports.ChildrenFieldContext = ChildrenFieldContext;
//# sourceMappingURL=ChildrenFieldContext.js.map