"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NgxSearchManagerService = (function () {
    function NgxSearchManagerService() {
        this.initialized = false;
    }
    Object.defineProperty(NgxSearchManagerService.prototype, "searchManager", {
        get: function () { return this.manager; },
        enumerable: true,
        configurable: true
    });
    ;
    NgxSearchManagerService.prototype.initialize = function (manager) {
        if (!this.manager && manager) {
            this.manager = manager;
            this.initialized = true;
        }
    };
    NgxSearchManagerService.prototype.register = function () {
        if (this.manager) {
            this.manager.setupListeners();
            this.manager.completeRegistration();
        }
    };
    NgxSearchManagerService.prototype.destroy = function () {
        if (this.manager) {
            this.manager.unlistenHistory();
            this.initialized = false;
            delete this.manager;
        }
    };
    return NgxSearchManagerService;
}());
NgxSearchManagerService = __decorate([
    core_1.Injectable()
], NgxSearchManagerService);
exports.NgxSearchManagerService = NgxSearchManagerService;
//# sourceMappingURL=SearchManagerService.js.map