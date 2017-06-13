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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var search_box_component_1 = require("./components/search-box/search-box.component");
__export(require("./components/search-box/search-box.component"));
var NgxSearchBoxModule = (function () {
    function NgxSearchBoxModule() {
    }
    return NgxSearchBoxModule;
}());
NgxSearchBoxModule = __decorate([
    core_1.NgModule({
        declarations: [
            search_box_component_1.NgxSearchBoxComponent
        ],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule
        ],
        exports: [
            search_box_component_1.NgxSearchBoxComponent
        ]
    })
], NgxSearchBoxModule);
exports.NgxSearchBoxModule = NgxSearchBoxModule;
//# sourceMappingURL=search-box.module.js.map