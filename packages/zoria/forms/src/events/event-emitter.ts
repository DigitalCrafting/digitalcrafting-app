export type Observer<T> = (value: T) => void

export interface Subscription {
    unsubscribe(): void
}

export class EventEmitter<T> {
    private observers = new Set<Observer<T>>;

    subscribe(observer: Observer<T>): Subscription {
        this.observers.add(observer);

        return {
            unsubscribe: () => {
                this.observers.delete(observer);
            }
        }
    }

    emit(value: T): void {
        for (const observer of this.observers) {
            observer(value);
        }
    }

    complete(): void {
        this.observers.clear();
    }
}