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
}

export namespace TimeRangeUtils {

}