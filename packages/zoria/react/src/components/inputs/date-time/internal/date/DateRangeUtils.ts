import {type DateRangeValue} from "../../types/DateTimeTypes";
import {EN_DASH} from "../../../../../types/CommonTypes";

export namespace DateRangeUtils {
    export function toDisplay(value?: DateRangeValue): string | undefined {
        if (!value) {
            return undefined;
        }

        if (value.isSameDay) {
            return value.start;
        }

        return `${value.start} ${EN_DASH} ${value.end}`;
    }

    export function toValue(display: string): DateRangeValue {
        const parts = display.split(EN_DASH).map(part => part.trim()).filter(Boolean);

        if (parts.length === 1) {
            return {
                start: parts[0],
                end: undefined,
                isSameDay: true
            }
        }

        return {
            start: parts[0],
            end: parts[1],
        };
    }

    export interface DateRange {
        startDate: Date;
        endDate: Date;
    }

    export function parseDateRange(rangeString?: string): DateRange | undefined {
        if (!rangeString) return undefined;

        // Matches 2 ISO dates separated by -, –, or — with optional spaces (\s*) around the separator
        const match = rangeString.match(
            /^(\d{4}-\d{2}-\d{2})\s*[\-–—]\s*(\d{4}-\d{2}-\d{2})$/
        );

        if (!match) return undefined;

        const [, startStr, endStr] = match;

        const startDate = new Date(startStr);
        const endDate = new Date(endStr);

        // Validate that strings produced real, valid dates (e.g. catches invalid dates like 2026-02-31)
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return undefined;
        }

        return { startDate, endDate };
    }
}
