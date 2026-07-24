/**
 * Expected format: ISO Date -> yyyy-MM-dd
 * */
export type DateRangeValue = {
    start: string;
    end: string;
    /* This one is for DateTimeRange only */
    isSameDay?: false | null
} | {
    start: string;
    end?: string;
    /* This one is for DateTimeRange only */
    isSameDay: true
}

/**
 * Expected format: ISO Time -> HH:mm:ss
 * */
export type TimeRangeValue = {
    start: string;
    end: string;
}