"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedFieldContext = (function () {
    function EmbeddedFieldContext(fieldOptions) {
        this.fieldOptions = fieldOptions;
    }
    EmbeddedFieldContext.prototype.getAggregationPath = function () { return; };
    EmbeddedFieldContext.prototype.wrapAggregations = function () {
        var aggregations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            aggregations[_i] = arguments[_i];
        }
        return aggregations;
    };
    EmbeddedFieldContext.prototype.wrapFilter = function (filter) { return filter; };
    return EmbeddedFieldContext;
}());
exports.EmbeddedFieldContext = EmbeddedFieldContext;
//# sourceMappingURL=EmbeddedFieldContext.js.map