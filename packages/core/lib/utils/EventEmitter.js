"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var EventEmitter = (function () {
    function EventEmitter() {
        this.listeners = [];
    }
    EventEmitter.prototype.addListener = function (fn) {
        var _this = this;
        this.listeners.push(fn);
        return function () { return _this.listeners = lodash_1.without(_this.listeners, fn); };
    };
    EventEmitter.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        lodash_1.each(this.listeners, function (fn) { return fn.apply(null, args); });
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map