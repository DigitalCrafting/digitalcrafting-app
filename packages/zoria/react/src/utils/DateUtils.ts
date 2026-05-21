export const DateUtils = {
    atMidnight: (d: Date) => {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    },

    addDays: (d: Date, days: number) => {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
    },

    subtractDays: (d: Date, days: number) => {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() - days);
    },

    isTheSameDate: (a?: Date, b?: Date) => {
        if (!a || !b) {
            return false;
        }

        return a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate();
    },

    isBefore: (dateAsStr: string, min?: string) => {
        if (!min) return false;

        if (!DateUtils.isValidIsoFormat(min)) {
            throw new TypeError(`[DateUtils.isBefore] min is not correct ISO Date format; ${min}`)
        }

        return dateAsStr < min;
    },

    isAfter: (dateAsStr: string, max?: string) => {
        if (!max) return false;

        if (!DateUtils.isValidIsoFormat(max)) {
            throw new TypeError(`[DateUtils.isAfter] max is not correct ISO Date format; ${max}`)
        }

        return dateAsStr > max;
    },

    toISODate: (d: Date): string => {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    },

    fromISODate: (value: string): Date => {
        const [y, m, d] = value.split('-').map(Number)
        return new Date(y, m - 1, d)
    },

    fromParts: (year?: number, month?: number, day?: number): Date | undefined => {
        if (!year || !month || !day) {
            return undefined;
        }
        return new Date(year, month, day);
    },

    isValidIsoFormat: (str: string) => /^\d{4}-\d{2}-\d{2}$/.test(str),

    validateDate: (str?: string) => {
        if (!str) return false;

        const parts = str.split('-');
        if (parts.length !== 3) return false;

        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const d = parseInt(parts[2], 10);

        const date = new Date(y, m, d);

        return (
            date.getFullYear() === y &&
            date.getMonth() === m &&
            date.getDate() === d
        );
    }
}