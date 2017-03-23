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
var lodash_1 = require("lodash");
var state_1 = require("../state");
var FilterBasedAccessor_1 = require("./FilterBasedAccessor");
var utils_1 = require("../utils");
var query_1 = require("../query");
var NumericOptionsAccessor = (function (_super) {
    __extends(NumericOptionsAccessor, _super);
    function NumericOptionsAccessor(key, options) {
        var _this = _super.call(this, key) || this;
        _this.state = new state_1.ArrayState();
        _this.options = options;
        _this.options.options = utils_1.computeOptionKeys(options.options, ['from', 'to'], 'all');
        _this.options.fieldOptions = _this.options.fieldOptions || { type: 'embedded' };
        _this.options.fieldOptions.field = _this.options.field;
        _this.fieldContext = query_1.FieldContextFactory(_this.options.fieldOptions);
        return _this;
    }
    NumericOptionsAccessor.prototype.getDefaultOption = function () {
        return lodash_1.find(this.options.options, function (it) { return lodash_1.isUndefined(it.from) && lodash_1.isUndefined(it.to); });
    };
    NumericOptionsAccessor.prototype.getSelectedOptions = function () {
        var keys = this.state.getValue();
        return lodash_1.filter(this.options.options, function (opt) { return lodash_1.includes(keys, opt.key); });
    };
    NumericOptionsAccessor.prototype.getSelectedOrDefaultOptions = function () {
        var selectedOptions = this.getSelectedOptions();
        if (selectedOptions && selectedOptions.length > 0)
            return selectedOptions;
        var defaultOption = this.getDefaultOption();
        if (defaultOption)
            return [defaultOption];
        return [];
    };
    NumericOptionsAccessor.prototype.setOptions = function (titles) {
        if (titles.length === 1) {
            this.state = this.state.clear();
            this.toggleOption(titles[0]);
        }
        else {
            var keys = lodash_1.map(lodash_1.filter(this.options.options, function (opt) { return lodash_1.includes(titles, opt.title); }), 'key');
            this.state = this.state.setValue(keys);
            this.searchManager.performSearch();
        }
    };
    NumericOptionsAccessor.prototype.toggleOption = function (key) {
        var option = lodash_1.find(this.options.options, { title: key }) || {};
        if (option) {
            if (option === this.getDefaultOption()) {
                this.state = this.state.clear();
            }
            else if (this.options.multiselect) {
                this.state = this.state.toggle(option.key);
            }
            else {
                this.state = this.state.setValue([option.key]);
            }
            this.searchManager.performSearch();
        }
    };
    NumericOptionsAccessor.prototype.getBuckets = function () {
        return lodash_1.filter(this.getAggregations([
            this.uuid,
            this.fieldContext.getAggregationPath(),
            this.key, 'buckets'
        ], []), this.emptyOptionsFilter);
    };
    NumericOptionsAccessor.prototype.getDocCount = function () {
        return this.getAggregations([
            this.uuid,
            this.fieldContext.getAggregationPath(),
            'doc_count'
        ], 0);
    };
    NumericOptionsAccessor.prototype.emptyOptionsFilter = function (option) {
        return option.doc_count > 0;
    };
    NumericOptionsAccessor.prototype.buildSharedQuery = function (query) {
        var _this = this;
        var filters = this.getSelectedOptions();
        var filterRanges = lodash_1.map(filters, function (filter) {
            return _this.fieldContext.wrapFilter(query_1.RangeQuery(_this.options.field, {
                gte: filter.from, lt: filter.to
            }));
        });
        var selectedFilters = lodash_1.map(filters, function (filter) {
            return {
                name: _this.translate(_this.options.title),
                value: _this.translate(filter.title),
                id: _this.options.id,
                remove: function () { return _this.state = _this.state.remove(filter.key); }
            };
        });
        if (filterRanges.length > 0) {
            query = query.addFilter(this.uuid, query_1.BoolShould(filterRanges))
                .addSelectedFilters(selectedFilters);
        }
        return query;
    };
    NumericOptionsAccessor.prototype.getRanges = function () {
        return lodash_1.compact(lodash_1.map(this.options.options, function (range) {
            return lodash_1.omitBy({
                key: range.title,
                from: range.from,
                to: range.to
            }, lodash_1.isUndefined);
        }));
    };
    NumericOptionsAccessor.prototype.buildOwnQuery = function (query) {
        return query.setAggs(query_1.FilterBucket.apply(void 0, [this.uuid,
            query.getFiltersWithoutKeys(this.uuid)].concat(this.fieldContext.wrapAggregations(query_1.RangeBucket(this.key, this.options.field, this.getRanges())))));
    };
    return NumericOptionsAccessor;
}(FilterBasedAccessor_1.FilterBasedAccessor));
exports.NumericOptionsAccessor = NumericOptionsAccessor;
//# sourceMappingURL=NumericOptionsAccessor.js.map