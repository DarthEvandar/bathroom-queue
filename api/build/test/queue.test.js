"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockDate = require("mockdate");
var person_1 = require("../person");
var queue_1 = require("../queue");
test('queue should properly clean up', function () {
    MockDate.set(0);
    var queue = new queue_1.Queue();
    queue.add(new person_1.Person('ders'));
    expect(queue.getQueue().length).toBe(1);
    MockDate.set(21 * 60000);
    queue.cleanUp();
    expect(queue.getQueue().length).toBe(0);
    queue.add(new person_1.Person('ders'));
    MockDate.set(19 * 60000);
    queue.cleanUp();
    expect(queue.getQueue().length).toBe(1);
    MockDate.reset();
});
test('queue should properly add', function () {
    var queue = new queue_1.Queue();
    queue.add(new person_1.Person('ders'));
    queue.add(new person_1.Person('and'));
    queue.add(new person_1.Person('sund'));
    expect(queue.getQueue()).toEqual(['ders', 'and', 'sund']);
});
test('queue should properly pop', function () {
    var queue = new queue_1.Queue();
    queue.add(new person_1.Person('ders'));
    queue.add(new person_1.Person('and'));
    queue.remove();
    expect(queue.getQueue()).toEqual(['and']);
});
//# sourceMappingURL=queue.test.js.map