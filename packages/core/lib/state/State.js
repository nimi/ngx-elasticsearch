"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State = (function () {
    function State(value) {
        if (value === void 0) { value = null; }
        this.value = value;
    }
    State.prototype.create = function (value) {
        var item = new this.constructor(value);
        console.log(item, value);
        item.value = value;
        return item;
    };
    State.prototype.setValue = function (value) {
        return this.create(value);
    };
    State.prototype.clear = function () {
        return this.create(null);
    };
    State.prototype.getValue = function () {
        return this.value;
    };
    State.prototype.hasValue = function () {
        return !!(this.value);
    };
    return State;
}());
exports.State = State;
//# sourceMappingURL=State.js.map