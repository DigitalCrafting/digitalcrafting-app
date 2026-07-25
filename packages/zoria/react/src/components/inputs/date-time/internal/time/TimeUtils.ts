const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;

export const TimeUtils = {
    toISOTime: (d: Date, withSeconds: boolean = false): string => {
        const seconds = withSeconds ? `:${String(d.getSeconds()).padStart(2, '0')}` : '';
        return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}${seconds}`;
    },

    validateTime: (str: string): boolean => {
        return TIME_REGEX.test(str);
    },

    splitToNumbers: (isoTime?: string): [number | undefined, number | undefined, number | undefined] => {
        if (!isoTime || !TimeUtils.validateTime(isoTime)) {
            return [undefined, undefined, undefined];
        }

        const parts = isoTime.split(':');
        const [isoHours, isoMinutes, isoSeconds] = parts;
        const hoursNumber = Number(isoHours);
        const minutesNumber = Number(isoMinutes);
        const secondsNumber = Number(isoSeconds);
        return [hoursNumber, minutesNumber, secondsNumber];
    }
}