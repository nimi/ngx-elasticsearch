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
    function NgxElasticsearchComponent(service) {
        this.service = service;
        this.unmounted = false;
        this.manager = service.manager;
    }
    NgxElasticsearchComponent.prototype.ngOnInit = function () {
        this.accessor = this.defineAccessor();
        if (this.accessor) {
            this.accessor = this.manager.addAccessor(this.accessor);
        }
    };
    NgxElasticsearchComponent.prototype.ngOnDestroy = function () {
        if (this.manager && this.accessor) {
            this.manager.removeAccessor(this.accessor);
        }
        this.unmounted = true;
    };
    NgxElasticsearchComponent.prototype.defineAccessor = function () { };
    NgxElasticsearchComponent.prototype.getResults = function () {
        return this.manager.results;
    };
    NgxElasticsearchComponent.prototype.getHits = function () {
        return this.manager.getHits();
    };
    NgxElasticsearchComponent.prototype.getHitsCount = function () {
        return this.manager.getHitsCount();
    };
    NgxElasticsearchComponent.prototype.hasHits = function () {
        return this.manager.hasHits();
    };
    NgxElasticsearchComponent.prototype.hasHitsChanged = function () {
        return this.manager.hasHitsChanged();
    };
    NgxElasticsearchComponent.prototype.getQuery = function () {
        return this.manager.query;
    };
    NgxElasticsearchComponent.prototype.isInitialLoading = function () {
        return this.manager.initialLoading;
    };
    NgxElasticsearchComponent.prototype.isLoading = function () {
        return this.manager.loading;
    };
    NgxElasticsearchComponent.prototype.getError = function () {
        return this.manager.error;
    };
    return NgxElasticsearchComponent;
}());
NgxElasticsearchComponent = __decorate([
    core_1.Component({
        selector: 'ngx-search-component',
        template: ''
    }),
    __metadata("design:paramtypes", [SearchManagerService_1.NgxSearchManagerService])
], NgxElasticsearchComponent);
exports.NgxElasticsearchComponent = NgxElasticsearchComponent;
//# sourceMappingURL=SearchComponent.js.map