"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var NgxSearchManagerService = (function () {
    function NgxSearchManagerService() {
        // Search manager initialization flag
        this.initialized = false;
    }
    Object.defineProperty(NgxSearchManagerService.prototype, "manager", {
        // Getter/setter for search manager instance
        get: function () { return this.searchManager; },
        set: function (manager) { this.searchManager = manager; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Initializes the service with a manager instance, registers
     * listeners and observables
     * @param {SearchManager} manager
     */
    NgxSearchManagerService.prototype.initialize = function (manager) {
        if (!this.manager && manager) {
            this.manager = manager;
            this.initialized = true;
            this.setObservables(this.manager);
            this.register();
        }
    };
    /**
     * Registers search manager instance
     */
    NgxSearchManagerService.prototype.register = function () {
        if (this.manager) {
            this.manager.setupListeners();
            this.manager.completeRegistration();
        }
    };
    /**
     * Destroys the search manager instance and unsets initialized state
     */
    NgxSearchManagerService.prototype.destroy = function () {
        if (this.manager) {
            this.manager.unlistenHistory();
            this.initialized = false;
        }
    };
    /**
     * Kick of a search on the search manager
     * @param {Boolean} replaceState
     * @param {Boolean} notifyState
     */
    NgxSearchManagerService.prototype.search = function (replaceState, notifyState) {
        if (replaceState === void 0) { replaceState = false; }
        if (notifyState === void 0) { notifyState = true; }
        this.manager.performSearch(replaceState, notifyState);
    };
    /**
     * Setup Observables for searching and results state
     * @param {SearchManager} manager
     * @private
     */
    NgxSearchManagerService.prototype.setObservables = function (manager) {
        this.searching$ = Observable_1.Observable.create(function (observer) {
            var listener = manager.searching$$
                .subscribe(function (val) {
                try {
                    observer.next(val);
                }
                catch (err) {
                    observer.error(err);
                }
            });
            return function unsubscribe() {
                listener.unsubscribe();
            };
        });
        this.results$ = Observable_1.Observable.create(function (observer) {
            var listener = manager.results$$
                .subscribe(function (val) {
                try {
                    observer.next(val);
                }
                catch (err) {
                    observer.error(err);
                }
            });
            return function unsubscribe() {
                listener.unsubscribe();
            };
        });
    };
    return NgxSearchManagerService;
}());
NgxSearchManagerService = __decorate([
    core_1.Injectable()
], NgxSearchManagerService);
exports.NgxSearchManagerService = NgxSearchManagerService;
//# sourceMappingURL=SearchManagerService.js.map