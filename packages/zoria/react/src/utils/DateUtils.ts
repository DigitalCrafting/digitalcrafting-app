export namespace DateUtils {
    export function atMidnight(d: Date) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    export function addDays(d: Date, days: number) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
    }

    export function subtractDays(d: Date, days: number) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() - days);
    }

    export function isTheSameDay(a: Date, b:Date) {
        return a.getTime() === b.getTime();
    }

    export function toISODate(d: Date): string {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }

    export function fromISODate(value: string): Date {
        const [y, m, d] = value.split('-').map(Number)
        return new Date(y, m - 1, d)
    }
}