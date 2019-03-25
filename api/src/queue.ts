import { Person } from './person';

export class Queue {
    private queue: Person[];

    constructor() {
        this.queue = [];
    }

    public getQueue = () => {
        return this.queue.map((person: Person) => {
            return person.name;
        });
    }

    public add = (person: Person) => {
        this.queue.push(person);
    }

    public remove = () => {
        this.queue = this.queue.slice(1, this.queue.length);
    }

    public cleanUp = () => {
        const size = this.queue.length;
        this.queue = this.queue.filter((person: Person) => {
            return new Date().getTime() - person.createdAt < 20 * 60000;
        });
        if (size - this.queue.length !== 0) {
            console.log(`removed ${size - this.queue.length} items`);
        }
    }
}
