import type {DateTimeRangeValue, InternalDateTimeRangeValue} from "../types/DateTimeTypes";
import {EN_DASH} from "../../../../types/CommonTypes";

export namespace DateTimeRangeUtils {
    export const DATE_TIME_RANGE_REGEX = /^(\d{4}-\d{2}-\d{2}\s+\d{1,2}:\d{2}(?::\d{2})?)\s*[–—\-]\s*(\d{4}-\d{2}-\d{2}\s+\d{1,2}:\d{2}(?::\d{2})?)$/;

    export function toDisplay(value?: InternalDateTimeRangeValue): string | undefined {
        if (!value) {
            return undefined;
        }

        return `${value.startDate} ${value.startTime} ${EN_DASH} ${value.endDate} ${value.endTime}`;
    }

    export function toInternalValue(display: string): InternalDateTimeRangeValue | undefined {
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

    export function toExternalValue(value: InternalDateTimeRangeValue): DateTimeRangeValue | undefined {
        if (!value) {
            return undefined;
        }

        const isoStartDateTime = `${value.startDate}T${value.startTime}`;
        const isoEndDateTime = `${value.endDate}T${value.endTime}`;

        const startDate = new Date(isoStartDateTime);
        const endDate = new Date(isoEndDateTime);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return undefined;
        }

        return {
            start: isoStartDateTime,
            end: isoEndDateTime
        }
    }

    export function fromExternalValue(value?: DateTimeRangeValue): InternalDateTimeRangeValue | undefined {
        if (!value || !value.start || !value.end) {
            return undefined;
        }

        const [startDate, startTime] = value.start.split('T');
        const [endDate, endTime] = value.end.split('T');

        return {
            startDate,
            startTime,
            endDate,
            endTime
        }
    }
}