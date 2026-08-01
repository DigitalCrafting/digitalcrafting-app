export namespace DateTimeUtils {
    /* For now only yyyy-MM-ddTHH:mm */
    export const split = (value: string): [string, string] => {
        const [date, time] = value.split('T');
        return [date, time?.slice(0, 5)];
    }

    /* For now only yyyy-MM-ddTHH:mm:00 */
    export const join = (date?: string, time?: string): string => {
        if (!date || !time) {
            return '';
        }

        return `${date}T${time}`
    }

    export const toDisplay = (isoString?: string): string => {
        if (!isoString) {
            return '';
        }

        return isoString.replace('T', ' ');
    }

    export const toValue = (display?: string): string | undefined => {
        if (!display) {
            return undefined;
        }

        return display.replace(' ', 'T');
    }
}