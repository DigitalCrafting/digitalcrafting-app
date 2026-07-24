import {useState} from "react";
import {DateUtils} from "../../../../../utils/DateUtils";

export type VisibleDateBoundariesType = {
    minYear?: number,
    maxYear?: number,
    prevMonthDisabled?: boolean,
    nextMonthDisabled?: boolean
}

export type UseVisibleDateReturnType = {
    visibleDate: Date,
    setVisibleDate: (value: Date) => void
} & VisibleDateBoundariesType

export function calculateVisibleDateBoundaries(visibleDate: Date, minDate?: string, maxDate?: string): VisibleDateBoundariesType {
    const [minYearPart] = DateUtils.isoStringToParts(minDate);
    const minYear = minYearPart ? Number(minYearPart) : undefined;
    const [maxYearPart] = DateUtils.isoStringToParts(maxDate);
    const maxYear = maxYearPart ? Number(maxYearPart) : undefined;

    let visibleDateAsIsoString = DateUtils.dateToIsoString(visibleDate);
    const prevMonthDisabled = minDate ? minDate?.substring(0, 7) >= visibleDateAsIsoString.substring(0, 7) : false;
    const nextMonthDisabled = maxDate ? maxDate?.substring(0, 7) <= visibleDateAsIsoString.substring(0, 7) : false;

    return {
        minYear, maxYear, prevMonthDisabled, nextMonthDisabled
    }
}

export function useVisibleDate(
    value?: string,
    externalVisibleDate?: string,
    externalOnVisibleDateChange?: (value: string) => void,
    minDate?: string,
    maxDate?: string
): UseVisibleDateReturnType {
    const [internalVisibleDate, setInternalVisibleDate] = useState(value ? DateUtils.isoStringToDate(value) : new Date());

    const isVisibleDateControlled = !!externalVisibleDate;
    let visibleDate: Date;
    let setVisibleDate: (value: any) => void;

    if (isVisibleDateControlled) {
        visibleDate = DateUtils.isoStringToDate(externalVisibleDate);
        setVisibleDate = (date: Date) => {
            externalOnVisibleDateChange?.(DateUtils.dateToIsoString(date));
        };
    } else {
        visibleDate = internalVisibleDate;
        setVisibleDate = setInternalVisibleDate;
    }

    const boundaries = calculateVisibleDateBoundaries(visibleDate, minDate, maxDate);

    return {
        visibleDate,
        setVisibleDate,
        ...boundaries
    }
}