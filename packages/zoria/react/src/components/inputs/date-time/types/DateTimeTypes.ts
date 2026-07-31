export type RangeValue = {
    start: string;
    end: string;
}

/**
 * Expected format: ISO Date -> yyyy-MM-dd
 * */
export type DateRangeValue = {
    start?: string;
    end?: string;
    /* This one is for DateTimeRange only */
    isSameDay?: false | null
} | {
    start?: string;
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

export type InternalDateTimeRangeValue = {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    /* This one is for DateTimeRange only */
    isSameDay?: boolean
}

export type DateTimeRangeValue = {
    start: string;
    end: string;
    /* This one is for DateTimeRange only */
    isSameDay?: boolean
}

export const DatePickingStageEnum = {
    START: 'START',
    END: 'END'
} as const;
export type DatePickingStageEnumType = (typeof DatePickingStageEnum)[keyof typeof DatePickingStageEnum];
