import type {DateTimeRangeValue} from "../types/DateTimeTypes";
import {EN_DASH} from "../../../../types/CommonTypes";

export namespace DateTimeRangeUtils {
    export const DATE_TIME_RANGE_REGEX = /^(\d{4}-\d{2}-\d{2}\s+\d{1,2}:\d{2}(?::\d{2})?)\s*[–—\-]\s*(\d{4}-\d{2}-\d{2}\s+\d{1,2}:\d{2}(?::\d{2})?)$/;

    export function toDisplay(value?: DateTimeRangeValue): string | undefined {
        if (!value) {
            return undefined;
        }

        return `${value.startDate} ${value.startTime} ${EN_DASH} ${value.endDate} ${value.endTime}`;
    }

    export function toValue(display: string): DateTimeRangeValue | undefined {
        const match = display.trim().match(DateTimeRangeUtils.DATE_TIME_RANGE_REGEX);
        if (!match) return undefined;

        const [, startRaw, endRaw] = match;

        // Replace space with 'T' so standard JS Date parser handles it safely
        const startDateAsDate = new Date(startRaw.replace(' ', 'T'));
        const endDateAsDate = new Date(endRaw.replace(' ', 'T'));

        if (isNaN(startDateAsDate.getTime()) || isNaN(endDateAsDate.getTime())) {
            return undefined;
        }

        const [startDate, startTime] = startRaw.trim().split(' ');
        const [endDate, endTime] = endRaw.trim().split(' ');

        return {
            startDate,
            endDate,
            startTime,
            endTime,
            isSameDay: startDate === endDate
        };
    }
}