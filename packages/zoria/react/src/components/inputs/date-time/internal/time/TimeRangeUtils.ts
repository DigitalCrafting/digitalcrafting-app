import {EN_DASH} from "../../../../../types/CommonTypes";
import {type TimeRangeValue} from "../../types/DateTimeTypes";

export namespace TimeRangeUtils {
    export function toDisplay(value?: TimeRangeValue): string | undefined {
        if (!value) {
            return undefined;
        }

        return `${value.start} ${EN_DASH} ${value.end}`;
    }

    export function toValue(display: string): TimeRangeValue {
        const parts = display.split(EN_DASH).map(part => part.trim()).filter(Boolean);

        return {
            start: parts[0],
            end: parts[1],
        };
    }
    export interface TimeValue {
        hours: number;
        minutes: number;
        seconds: number;
        formatted: string; // Guaranteed "HH:mm" or "HH:mm:ss"
    }

    export interface TimeRange {
        startTime: TimeValue;
        endTime: TimeValue;
    }

    const parseTime = (hStr: string, mStr: string, sStr?: string): TimeValue | undefined => {
        const hours = parseInt(hStr, 10);
        const minutes = parseInt(mStr, 10);
        const seconds = sStr ? parseInt(sStr, 10) : 0;

        // Validate bounds
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            return undefined;
        }

        const pad = (num: number) => num.toString().padStart(2, '0');

        // Include seconds in formatted output only if explicitly provided in input
        const formatted = sStr != undefined
            ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
            : `${pad(hours)}:${pad(minutes)}`;

        return { hours, minutes, seconds, formatted };
    };

    export function parseTimeRange(rangeString?: string): TimeRange | undefined {
        if (!rangeString) return undefined;

        // Pattern: H:m or HH:mm with optional :s or :ss
        const timePattern = '(\\d{1,2}):(\\d{1,2})(?::(\\d{1,2}))?';
        const rangeRegex = new RegExp(`^${timePattern}\\s*[\\-–—]\\s*${timePattern}$`);

        const match = rangeString.trim().match(rangeRegex);
        if (!match) return undefined;

        const [
            ,
            startH, startM, startS,
            endH, endM, endS
        ] = match;

        const startTime = parseTime(startH, startM, startS);
        const endTime = parseTime(endH, endM, endS);

        if (!startTime || !endTime) return undefined;

        return { startTime, endTime };
    }
}
