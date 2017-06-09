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
var NgxHitsListComponent = (function (_super) {
    __extends(NgxHitsListComponent, _super);
    function NgxHitsListComponent(service) {
        var _this = _super.call(this, service) || this;
        /**
         * Number of results per page
         * @type {number}
         */
        _this.hitsPerPage = 10;
        _this.service = service;
        return _this;
    }
    NgxHitsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.service.searchManager.emitter.addListener(function () {
            _this.hits = _this.service.searchManager.getHits();
        });
        // this.hits = this.service.manager.getHits();
    };
    NgxHitsListComponent.prototype.defineAccessor = function () {
        return new core_2.PageSizeAccessor(this.hitsPerPage);
    };
    return NgxHitsListComponent;
}(core_2.NgxElasticsearchComponent));
__decorate([
    core_1.ViewChild('defaultItem'),
    __metadata("design:type", Object)
], NgxHitsListComponent.prototype, "defaultItemTemplate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], NgxHitsListComponent.prototype, "hitsPerPage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], NgxHitsListComponent.prototype, "itemTemplate", void 0);
NgxHitsListComponent = __decorate([
    core_1.Component({
        selector: 'ngx-hits-list',
        template: "\n    <div class=\"ngx-hits-list\">\n      <div *ngFor=\"let hit of hits\">\n        <ng-container *ngTemplateOutlet=\"itemTemplate || defaultItem; context: { $implicit: hit }\"></ng-container>\n      </div>\n    </div>\n    <ng-template #defaultItem let-hit>\n      <ngx-hits-list-item [item]=\"hit\"></ngx-hits-list-item>\n    </ng-template>\n  ",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_2.NgxSearchManagerService !== "undefined" && core_2.NgxSearchManagerService) === "function" && _a || Object])
], NgxHitsListComponent);
exports.NgxHitsListComponent = NgxHitsListComponent;
var _a;
//# sourceMappingURL=hits-list.component.js.map