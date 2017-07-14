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
var HitsAccessor = (function (_super) {
    __extends(HitsAccessor, _super);
    function HitsAccessor(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        return _this;
    }
    HitsAccessor.prototype.setResults = function (results) {
        _super.prototype.setResults.call(this, results);
        this.scrollIfNeeded();
    };
    HitsAccessor.prototype.scrollIfNeeded = function () {
        if (this.searchManager.hasHitsChanged() && this.options.scrollTo) {
            var el = document.querySelector(this.getScrollSelector());
            if (el) {
                el.scrollTop = 0;
            }
        }
    };
    HitsAccessor.prototype.getScrollSelector = function () {
        return (this.options.scrollTo == true)
            ? 'body'
            : this.options.scrollTo.toString();
    };
    return HitsAccessor;
}(Accessor_1.Accessor));
exports.HitsAccessor = HitsAccessor;
//# sourceMappingURL=HitsAccessor.js.map