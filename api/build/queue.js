"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        var _this = this;
        this.getQueue = function () {
            return _this.queue.map(function (person) {
                return person.name;
            });
        };
        this.add = function (person) {
            _this.queue.push(person);
        };
        this.remove = function () {
            _this.queue = _this.queue.slice(1, _this.queue.length);
        };
        this.cleanUp = function () {
            _this.queue = _this.queue.filter(function (person) {
                return new Date().getTime() - person.createdAt < 20 * 60000;
            });
        };
        this.queue = [];
    }
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map