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
var selector = 'search-box';
var NgxSearchBoxComponent = (function (_super) {
    __extends(NgxSearchBoxComponent, _super);
    function NgxSearchBoxComponent(service) {
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
         * An array of elasticsearch fields to search within.
         * Can specify boosting on particular fields. Will search _all by default.
         */
        _this.queryFields = ['_all'];
        /**
         * Placeholder for the input box
         * @type {string}
         */
        _this.placeholder = 'Search';
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
        /**
         * Minimum character length for search action
         * @type {number}
         */
        _this.minLength = 0;
        /**
         * Default search string on empty input
         * @type {number}
         */
        _this.defaultOnEmpty = '*';
        /**
         * Output for searching state
         */
        _this.onSearching = new core_1.EventEmitter();
        _this.className = core_2.block(selector);
        _this.spinnerClassName = core_2.block('spinning-loader');
        _this.service = service;
        return _this;
    }
    NgxSearchBoxComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
    };
    NgxSearchBoxComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.onSearchingSub = this.service.searching$
            .subscribe(function (isSearching) {
            _this.onSearching.emit(isSearching);
        });
    };
    NgxSearchBoxComponent.prototype.ngOnDestroy = function () {
        this.onSearchingSub.unsubscribe();
    };
    NgxSearchBoxComponent.prototype.defineAccessor = function () {
        var _a = this, id = _a.id, prefixQueryFields = _a.prefixQueryFields, queryFields = _a.queryFields, queryBuilder = _a.queryBuilder, queryOptions = _a.queryOptions, prefixQueryOptions = _a.prefixQueryOptions;
        return new core_2.QueryAccessor(id, {
            prefixQueryFields: prefixQueryFields,
            prefixQueryOptions: Object.assign({}, prefixQueryOptions),
            queryFields: queryFields,
            queryOptions: Object.assign({}, queryOptions),
            queryBuilder: queryBuilder,
            onQueryStateChange: function () {
                console.log('query state changed!');
                // if (!this.unmounted && this.state.input){
                //   this.setState({input: undefined})
                // }
            }
        });
    };
    NgxSearchBoxComponent.prototype.handleChange = function (value) {
        if (this.searchOnChange) {
            if (value.length > this.minLength) {
                this.searchQuery(value);
            }
            else {
                this.searchQuery(this.defaultOnEmpty);
            }
        }
    };
    NgxSearchBoxComponent.prototype.handleSubmit = function (value) {
        event.preventDefault();
        this.searchQuery(value);
    };
    NgxSearchBoxComponent.prototype.handleBlur = function (event) { };
    NgxSearchBoxComponent.prototype.handleFocus = function (event) { };
    NgxSearchBoxComponent.prototype.getValue = function () {
    };
    NgxSearchBoxComponent.prototype.searchQuery = function (query) {
        this.accessor.setQueryString(query);
        this.service.searchManager.performSearch(true);
    };
    return NgxSearchBoxComponent;
}(core_2.NgxElasticsearchComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NgxSearchBoxComponent.prototype, "searchOnChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], NgxSearchBoxComponent.prototype, "searchOnThrottleTime", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], NgxSearchBoxComponent.prototype, "queryFields", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], NgxSearchBoxComponent.prototype, "queryBuilder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgxSearchBoxComponent.prototype, "queryOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgxSearchBoxComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], NgxSearchBoxComponent.prototype, "prefixQueryFields", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgxSearchBoxComponent.prototype, "prefixQueryOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgxSearchBoxComponent.prototype, "blurAction", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NgxSearchBoxComponent.prototype, "autofocus", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgxSearchBoxComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], NgxSearchBoxComponent.prototype, "minLength", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgxSearchBoxComponent.prototype, "defaultOnEmpty", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NgxSearchBoxComponent.prototype, "onSearching", void 0);
NgxSearchBoxComponent = __decorate([
    core_1.Component({
        selector: 'ngx-search-box',
        template: "\n    <div [attr.class]=\"className\">\n      <form (submit)=\"handleSubmit(search.value)\">\n        <div [attr.class]=\"className('icon')\"></div>\n        <label [attr.for]=\"'searchbox'\"></label>\n        <input\n          #search\n          [attr.class]=\"className('text')\"\n          (focus)=\"handleFocus($event)\"\n          (blur)=\"handleBlur($event)\"\n          (input)=\"handleChange(search.value)\"\n          [attr.id]=\"'searchbox'\"\n          [attr.type]=\"'text'\"\n          [attr.placeholder]=\"placeholder\"\n        />\n        <input\n          [attr.class]=\"className('action')\"\n          type=\"submit\"\n        />\n        <div \n          class=\"{{ className('loader') + ' ' + spinnerClassName }}\"\n          [ngClass]=\"{ 'is-hidden': true }\"\n        ></div>\n      </form>\n    </div>\n  ",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_2.NgxSearchManagerService !== "undefined" && core_2.NgxSearchManagerService) === "function" && _a || Object])
], NgxSearchBoxComponent);
exports.NgxSearchBoxComponent = NgxSearchBoxComponent;
var _a;
//# sourceMappingURL=search-box.component.js.map