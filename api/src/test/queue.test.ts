import MockDate = require('mockdate');
import { Person } from '../person';
import { Queue } from '../queue';

test('queue should properly clean up', () => {
    MockDate.set(0);
    const queue: Queue = new Queue();
    queue.add(new Person('ders'));
    expect(queue.getQueue().length).toBe(1);
    MockDate.set(21 * 60000);
    queue.cleanUp();
    expect(queue.getQueue().length).toBe(0);
    queue.add(new Person('ders'));
    MockDate.set(19 * 60000);
    queue.cleanUp();
    expect(queue.getQueue().length).toBe(1);
    MockDate.reset();
});

test('queue should properly add', () => {
    const queue: Queue = new Queue();
    queue.add(new Person('ders'));
    queue.add(new Person('and'));
    queue.add(new Person('sund'));
    expect(queue.getQueue()).toEqual(['ders', 'and', 'sund']);
});

test('queue should properly pop', () => {
    const queue: Queue = new Queue();
    queue.add(new Person('ders'));
    queue.add(new Person('and'));
    queue.remove();
    expect(queue.getQueue()).toEqual(['and']);
});
