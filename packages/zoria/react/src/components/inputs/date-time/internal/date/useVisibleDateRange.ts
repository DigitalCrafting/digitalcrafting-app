import {useState} from "react";
import {DateUtils} from "../../../../../utils/DateUtils";

export type UseVisibleDateRangeReturnType = {
    visibleStartDate: string,
    visibleEndDate: string,
    onVisibleStartDateChange: (newDate: string) => void,
    onVisibleEndDateChange: (newDate: string) => void,
    minStartDate?: string,
    maxStartDate?: string,
    minEndDate?: string,
    maxEndDate?: string,
}

// @ts-ignore
export function useVisibleDateRange(startDate?: string, endDate?: string, minDate?: string, maxDate?: string): UseVisibleDateRangeReturnType {
    const [visibleStartDate, setVisibleStartDate] = useState(startDate ? startDate : DateUtils.dateToIsoString(new Date()));
    const [visibleEndDate, setVisibleEndDate] = useState(endDate ? endDate : DateUtils.dateToIsoString(DateUtils.addMonths(new Date(), 1)));

    const onVisibleStartDateChange = (newDate: string) => {
        setVisibleStartDate(newDate);
        const [startYear, startMonth] = DateUtils.isoStringToParts(newDate);
        const [endYear, endMonth] = DateUtils.isoStringToParts(visibleEndDate);
        let newEndDate = visibleEndDate;

        if (startYear > endYear) {
            newEndDate = DateUtils.dateToIsoString(DateUtils.addMonths(DateUtils.isoStringToDate(newDate), 1))
        } else if (startYear < endYear) {
            return;
        } else if (startMonth >= endMonth) {
            const howMuchToAdd = Number(endMonth) - Number(startMonth) + 1;
            newEndDate = DateUtils.dateToIsoString(DateUtils.addMonths(DateUtils.isoStringToDate(visibleEndDate), howMuchToAdd));
        }

        setVisibleEndDate(newEndDate);
    }

    const onVisibleEndDateChange = (newDate: string) => {
        const [startYear, startMonth] = DateUtils.isoStringToParts(visibleStartDate);
        const [endYear, endMonth] = DateUtils.isoStringToParts(newDate);

        if ((endYear === startYear && startMonth < endMonth) || (endYear > startYear)) {
            setVisibleEndDate(newDate);
        }
    }

    const minStartDate = undefined;
    const maxStartDate = undefined;
    const minEndDateAsDate = DateUtils.addMonths(DateUtils.isoStringToDate(visibleStartDate), 1);
    minEndDateAsDate.setDate(1);
    const minEndDate = DateUtils.dateToIsoString(minEndDateAsDate);
    const maxEndDate = undefined;

    /* TODO disable month and year options */
    return {
        visibleStartDate,
        visibleEndDate,
        onVisibleStartDateChange,
        onVisibleEndDateChange,
        minStartDate,
        maxStartDate,
        minEndDate,
        maxEndDate
    }
}