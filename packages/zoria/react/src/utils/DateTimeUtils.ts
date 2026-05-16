export const DateTimeUtils = {
    /* For now only yyyy-MM-ddTHH:mm */
    split: (value: string): [string, string] => {
        const [date, time] = value.split('T');
        return [date, time?.slice(0, 5)];
    },

    /* For now only yyyy-MM-ddTHH:mm:00 */
    join: (date: string, time: string): string => {
        return `${date}T${time}:00`
    }
}