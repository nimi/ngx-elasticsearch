"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchManagerService_1 = require("./SearchManagerService");
var NgxElasticsearchComponent = (function () {
    function NgxElasticsearchComponent(esx) {
        this.esx = esx;
        this.unmounted = false;
    }
    NgxElasticsearchComponent.prototype.ngOnInit = function () {
        console.log(this);
    };
    NgxElasticsearchComponent.prototype.ngOnDestroy = function () {
        if (this.esx && this.accessor) {
            this.esx.searchManager.removeAccessor(this.accessor);
        }
        this.unmounted = true;
    };
    NgxElasticsearchComponent.prototype.defineAccessor = function () { };
    NgxElasticsearchComponent.prototype.getResults = function () {
        return this.esx.searchManager.results;
    };
    NgxElasticsearchComponent.prototype.getHits = function () {
        return this.esx.searchManager.getHits();
    };
    NgxElasticsearchComponent.prototype.getHitsCount = function () {
        return this.esx.searchManager.getHitsCount();
    };
    NgxElasticsearchComponent.prototype.hasHits = function () {
        return this.esx.searchManager.hasHits();
    };
    NgxElasticsearchComponent.prototype.hasHitsChanged = function () {
        return this.esx.searchManager.hasHitsChanged();
    };
    NgxElasticsearchComponent.prototype.getQuery = function () {
        return this.esx.searchManager.query;
    };
    NgxElasticsearchComponent.prototype.isInitialLoading = function () {
        return this.esx.searchManager.initialLoading;
    };
    NgxElasticsearchComponent.prototype.isLoading = function () {
        return this.esx.searchManager.loading;
    };
    NgxElasticsearchComponent.prototype.getError = function () {
        return this.esx.searchManager.error;
    };
    return NgxElasticsearchComponent;
}());
NgxElasticsearchComponent = __decorate([
    core_1.Component({
        selector: 'ngx-search-component',
        template: 'test'
    }),
    __metadata("design:paramtypes", [SearchManagerService_1.NgxSearchManagerService])
], NgxElasticsearchComponent);
exports.NgxElasticsearchComponent = NgxElasticsearchComponent;
//# sourceMappingURL=SearchComponent.js.map