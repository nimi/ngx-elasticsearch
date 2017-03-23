"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var core_2 = require("@ngx-elasticsearch/core");
var SearchBoxComponent = (function (_super) {
    __extends(SearchBoxComponent, _super);
    function SearchBoxComponent(service) {
        var _this = _super.call(this, service) || this;
        /**
         * Updates search results as you type. Will be false by default.
         * use with prefixQueryFields to get a better search as you type behaviour.
         * @type {boolean}
         */
        _this.searchOnChange = true;
        /**
         * Default is 200ms. Is used when searchOnChange prop is true.
         * A search to elasticsearch will only be invoked once every searchThrottleTime ms.
         * @type {number}
         */
        _this.searchOnThrottleTime = 200;
        /**
         * Placeholder for the input box
         * @type {string}
         */
        _this.placeholder = 'Search';
        /**
         * An array of elasticsearch fields to search within. Can specify boosting on particular fields.
         * Will search _all by default. Will only be used if searchOnChange is true.
         * @type {string[]}
         */
        _this.prefixQueryFields = ['_all'];
        /**
         * When searchOnChange={false} Configure behavior of the SearchBox when
         * the user blur's out of the field. Defaults to search
         * @type {string}
         */
        _this.blurAction = 'search';
        /**
         * autofocus to search input
         * @type {boolean}
         */
        _this.autofocus = false;
        /**
         * Id for the query accessor
         * @type {string}
         */
        _this.id = 'q';
        _this.service = service;
        return _this;
    }
    SearchBoxComponent.prototype.defineAccessor = function () {
        var _a = this, id = _a.id, prefixQueryFields = _a.prefixQueryFields, queryFields = _a.queryFields, queryBuilder = _a.queryBuilder, queryOptions = _a.queryOptions, prefixQueryOptions = _a.prefixQueryOptions;
        return new core_2.QueryAccessor(id, {
            prefixQueryFields: prefixQueryFields,
            prefixQueryOptions: Object.assign({}, prefixQueryOptions),
            queryFields: queryFields || ['_all'],
            queryOptions: Object.assign({}, queryOptions),
            queryBuilder: queryBuilder,
            onQueryStateChange: function () {
                console.log('query state change');
                // if (!this.unmounted && this.state.input){
                //   this.setState({input: undefined})
                // }
            }
        });
    };
    SearchBoxComponent.prototype.handleChange = function (value) {
        if (this.searchOnChange && value.length > 3) {
            this.searchQuery(value);
        }
    };
    SearchBoxComponent.prototype.handleSubmit = function (value) {
        event.preventDefault();
        this.searchQuery(value);
    };
    SearchBoxComponent.prototype.handleBlur = function (event) { };
    SearchBoxComponent.prototype.handleFocus = function (event) { };
    SearchBoxComponent.prototype.getValue = function () {
    };
    SearchBoxComponent.prototype.searchQuery = function (query) {
        var shouldResetOtherState = false;
        this.accessor.setQueryString(query);
        this.service.searchManager.performSearch(true);
    };
    return SearchBoxComponent;
}(core_2.NgxElasticsearchComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SearchBoxComponent.prototype, "searchOnChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SearchBoxComponent.prototype, "searchOnThrottleTime", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SearchBoxComponent.prototype, "queryFields", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], SearchBoxComponent.prototype, "queryBuilder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SearchBoxComponent.prototype, "queryOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SearchBoxComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SearchBoxComponent.prototype, "prefixQueryFields", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SearchBoxComponent.prototype, "prefixQueryOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SearchBoxComponent.prototype, "blurAction", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SearchBoxComponent.prototype, "autofocus", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SearchBoxComponent.prototype, "id", void 0);
SearchBoxComponent = __decorate([
    core_1.Component({
        selector: 'ngx-search-box',
        template: "\n    <div class=\"esx-searchbox\">\n      <form (submit)=\"handleSubmit(search.value)\">\n        <label [for]=\"'searchbox'\">Search</label>\n        <input\n          #search\n          (focus)=\"handleFocus($event)\"\n          (blur)=\"handleBlur($event)\"\n          (input)=\"handleChange(search.value)\"\n          [attr.id]=\"'searchbox'\"\n          [attr.type]=\"'text'\"\n        />\n        <button type=\"submit\">Search Now!</button>\n      </form>\n    </div>\n  ",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_2.NgxSearchManagerService !== "undefined" && core_2.NgxSearchManagerService) === "function" && _a || Object])
], SearchBoxComponent);
exports.SearchBoxComponent = SearchBoxComponent;
var _a;
//# sourceMappingURL=search-box.component.js.map