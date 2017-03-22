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
var Accessor_1 = require("./Accessor");
var lodash_1 = require("lodash");
var HighlightAccessor = (function (_super) {
    __extends(HighlightAccessor, _super);
    function HighlightAccessor(fields) {
        var _this = _super.call(this) || this;
        _this.fields = fields;
        _this.highlightFields = _this.computeHighlightedFields(fields);
        return _this;
    }
    HighlightAccessor.prototype.computeHighlightedFields = function (fields) {
        return {
            fields: lodash_1.mapValues(lodash_1.zipObject(fields), lodash_1.constant({}))
        };
    };
    HighlightAccessor.prototype.buildOwnQuery = function (query) {
        return query.setHighlight(this.highlightFields);
    };
    return HighlightAccessor;
}(Accessor_1.Accessor));
exports.HighlightAccessor = HighlightAccessor;
//# sourceMappingURL=HighlightAccessor.js.map