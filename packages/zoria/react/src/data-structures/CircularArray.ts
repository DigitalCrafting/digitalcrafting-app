/**
 * CircularArray
 *
 * Hold a list of values, allows you to navigate it in a circular manner:
 * - getNext() will return next element of the array starting with first one,
 * - when you reach last element and call .getNext() it will go back to the first one,
 * - creates a shallow copy of the initial array.
 * */
export class CircularArray<T> {
    private readonly items: T[] = [];
    private currentPointer: number = 0;

    private constructor(_items: T[]) {
        this.items = _items;
    }

    static of<T>(items: T[]) {
        return new CircularArray<T>([...items]);
    }

    public setCurrent(element: T) {
        this.currentPointer = this.items.indexOf(element);
    }

    public getCurrent(): T {
        return this.items[this.currentPointer];
    }

    public length(): number {
        return this.items.length;
    }

    public getItems(): T[] {
        return this.items;
    }

    public getFirst(): T {
        this.currentPointer = 0;
        return this.items[0];
    }

    public getLast(): T {
        this.currentPointer = this.items.length - 1;
        return this.items[this.currentPointer];
    }

    public getPrev(): T {
        const lastIdx = this.items.length - 1;
        if (this.currentPointer === 0) {
            this.currentPointer = lastIdx;
            return this.items[this.currentPointer];
        }

        return this.items[--this.currentPointer];
    }

    public getNext(): T {
        const lastIdx = this.items.length - 1;
        if (this.currentPointer === lastIdx) {
            this.currentPointer = 0;
            return this.items[this.currentPointer];
        }

        return this.items[++this.currentPointer];
    }
}