"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@ngx-elasticsearch/core");
var search_box_component_1 = require("./search-box/search-box.component");
var url = "http://localhost:9200/";
var options = { useHistory: false };
exports.esModule = core_2.NgxElasticsearchModule.forRoot({ url: url, options: options });
var NgxSearchBoxModule = NgxSearchBoxModule_1 = (function () {
    function NgxSearchBoxModule() {
    }
    NgxSearchBoxModule.forRoot = function () {
        return {
            ngModule: NgxSearchBoxModule_1
        };
    };
    return NgxSearchBoxModule;
}());
NgxSearchBoxModule = NgxSearchBoxModule_1 = __decorate([
    core_1.NgModule({
        declarations: [
            search_box_component_1.SearchBoxComponent
        ],
        imports: [
            forms_1.FormsModule,
            exports.esModule
        ],
        exports: [
            search_box_component_1.SearchBoxComponent
        ]
    })
], NgxSearchBoxModule);
exports.NgxSearchBoxModule = NgxSearchBoxModule;
var NgxSearchBoxModule_1;
//# sourceMappingURL=app.module.js.map