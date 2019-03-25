export class Person {
    public createdAt: number;
    public name: string;

    constructor(name: string) {
        this.createdAt = new Date().getTime();
        this.name = name;
    }
}
