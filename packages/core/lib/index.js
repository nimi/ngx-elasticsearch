"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchComponent_1 = require("./SearchComponent");
var SearchManagerService_1 = require("./SearchManagerService");
var SearchManager_1 = require("./SearchManager");
__export(require("./history"));
__export(require("./SearchManager"));
__export(require("./AccessorManager"));
__export(require("./SearchRequest"));
__export(require("./accessors"));
__export(require("./query"));
__export(require("./state"));
__export(require("./transport"));
__export(require("./SearchManagerService"));
__export(require("./SearchComponent"));
__export(require("./utils"));
exports.config = { url: '', options: {} };
function searchManagerFactory() {
    return function (c) {
        var searchManager = new SearchManager_1.SearchManager(exports.config.url, exports.config.options);
        var service = new SearchManagerService_1.NgxSearchManagerService();
        service.initialize(searchManager);
        return service;
    };
}
exports.searchManagerFactory = searchManagerFactory;
var NgxElasticsearchModule = NgxElasticsearchModule_1 = (function () {
    function NgxElasticsearchModule() {
    }
    NgxElasticsearchModule.forRoot = function (conf) {
        Object.assign(exports.config, conf || {});
        return {
            ngModule: NgxElasticsearchModule_1,
            providers: [
                {
                    provide: SearchManagerService_1.NgxSearchManagerService,
                    useFactory: searchManagerFactory
                }
            ]
        };
    };
    return NgxElasticsearchModule;
}());
NgxElasticsearchModule = NgxElasticsearchModule_1 = __decorate([
    core_1.NgModule({
        declarations: [
            SearchComponent_1.NgxElasticsearchComponent
        ],
        exports: [
            SearchComponent_1.NgxElasticsearchComponent
        ],
        providers: [
            SearchManagerService_1.NgxSearchManagerService
        ]
    })
], NgxElasticsearchModule);
exports.NgxElasticsearchModule = NgxElasticsearchModule;
var NgxElasticsearchModule_1;
//# sourceMappingURL=index.js.map