import {DateUtils} from "../../../../utils/DateUtils";
import * as React from "react";
import {useMemo, useRef, useState} from "react";
import {IconButton} from "../../../buttons/IconButton";
import {ChevronLeftIcon, ChevronRightIcon} from "../../../icons/Icons";
import {type CalendarDayRangeStatusType, CalendarUtils} from "../internal/calendar/CalendarUtils";
import {SelectInput} from "../../select/SelectInput";
import {type ZoriaSelectOption} from "../../select/SelectInputTypes";
import {useVisibleDate} from "../internal/calendar/useVisibleDate";

interface DayProps {
    day: number
    disabled?: boolean
    isSelected?: boolean
    isToday?: boolean
    rangeStatus?: CalendarDayRangeStatusType
    'data-testid'?: string
    onSelect?: (day: number) => void
}

const Day = React.memo(({
    day,
    disabled = false,
    isSelected = false,
    isToday = false,
    rangeStatus = 0,
    'data-testid': dataTestId,
    onSelect = () => {
    }
}: DayProps) => {
    let classNames = 'day';
    if (isSelected || rangeStatus === 1 || rangeStatus === 3) {
        classNames += ' is-selected';
    }
    if (isToday) {
        classNames += ' day-today';
    }
    if (!disabled && !dataTestId) {
        dataTestId = `calendar-day-${day}`
    }

    let wrapperClassNames = 'day-wrapper'
    switch (rangeStatus) {
        case 0:
            break;
        case 1: {
            wrapperClassNames += ' is-range-start';
            break;
        }
        case 2: {
            wrapperClassNames += ' is-in-range';
            break;
        }
        case 3: {
            wrapperClassNames += ' is-range-end';
            break;
        }

    }

    return <span
        className={wrapperClassNames}
        role='gridcell'
    >
        <button
            type='button'
            onClick={() => onSelect(day)}
            className={classNames}
            disabled={disabled}
            data-testid={dataTestId}>
            {day}
        </button>
    </span>
});

export interface CalendarProps {
    id?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    isControlled?: boolean;
    minDate?: string;
    maxDate?: string;
    className?: string;

    visibleDate?: string;
    onVisibleDateChange?: (value: string) => void;

    startingDay?: string;
    weekdays?: string[];
    months?: string[];

    yearRangeStart?: number;
    yearRangeEnd?: number;

    rangeStart?: string;
    rangeEnd?: string;
}

export const Calendar = React.memo((
    {
        startingDay = 'Sun',
        value,
        onChange,
        isControlled = false,
        defaultValue,
        minDate,
        maxDate,
        className: externalClassName = '',

        visibleDate: externalVisibleDate = undefined,
        onVisibleDateChange: externalOnVisibleDateChange,

        yearRangeStart = 1990,
        yearRangeEnd = 2050,
        weekdays = CalendarUtils.WEEKDAYS,
        months = CalendarUtils.MONTHS,

        rangeStart,
        rangeEnd
    }: CalendarProps) => {
    const todayDate = useRef<Date>(new Date());

    const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue ? DateUtils.isoStringToDate(defaultValue) : undefined);

    let selectedDate: Date | undefined;
    let setSelectedDate: (value: Date) => void;

    if (isControlled) {
        selectedDate = value ? DateUtils.isoStringToDate(value) : undefined;
        setSelectedDate = (date: Date) => {
            onChange?.(DateUtils.dateToIsoString(date));
        };
    } else {
        selectedDate = internalValue;
        setSelectedDate = (date: Date) => {
            setInternalValue(date);
            onChange?.(DateUtils.dateToIsoString(date))
        };
    }

    const {
        visibleDate,
        setVisibleDate,
        minYear,
        maxYear,
        prevMonthDisabled,
        nextMonthDisabled
    } = useVisibleDate(value, externalVisibleDate, externalOnVisibleDateChange, minDate, maxDate);

    const onYearSelected = (inputValue: string) => {
        const year = Number(inputValue);
        const newDate = DateUtils.atMidnight(visibleDate);
        newDate.setFullYear(year);
        setVisibleDate(newDate);
    }

    const onNextMonth = () => {
        const currentMonth = visibleDate.getMonth();
        const newMonth = currentMonth + 1;
        const newDate = DateUtils.atMidnight(visibleDate);
        newDate.setMonth(newMonth);
        setVisibleDate(newDate);
    }

    const onPrevMonth = () => {
        const currentMonth = visibleDate.getMonth();
        const newMonth = currentMonth - 1;
        const newDate = DateUtils.atMidnight(visibleDate);
        newDate.setMonth(newMonth);
        setVisibleDate(newDate);
    }

    const onDaySelected = (day: number) => {
        const newDate = DateUtils.atMidnight(visibleDate);
        newDate.setDate(day);
        setSelectedDate(newDate);
        setVisibleDate(newDate);
        onChange?.(DateUtils.dateToIsoString(newDate));
    }

    const dayOffset = weekdays.indexOf(startingDay);
    const weekdaysLabels = CalendarUtils.getWeekdaysLabels(weekdays, dayOffset);

    const prevMonthDaysArray = CalendarUtils.prevMonthDayNumbers(visibleDate, dayOffset);
    const currMonthDays = CalendarUtils.currentMonthDays(visibleDate);
    const nextMonthDaysArray = CalendarUtils.nextMonthDayNumbers(visibleDate, dayOffset);

    const monthNmbr = visibleDate.getMonth();
    const monthLabel = months[monthNmbr];

    const days = [];
    for (let i = 0; i < prevMonthDaysArray.length; i++) {
        days.push(<Day isToday={CalendarUtils.isToday(todayDate, visibleDate, prevMonthDaysArray[i], 'prev')}
                       key={`prev-month-${i}`}
                       disabled={true}
                       day={prevMonthDaysArray[i]}
        />);
    }
    for (let day = 1; day <= currMonthDays; day++) {
        days.push(<Day
            key={`curr-month-${day}`}
            onSelect={onDaySelected}
            disabled={CalendarUtils.isDayDisabled(visibleDate, day, minDate, maxDate)}
            isSelected={DateUtils.isTheSameDate(selectedDate, visibleDate) && selectedDate?.getDate() === day}
            isToday={CalendarUtils.isToday(todayDate, visibleDate, day, 'current')}
            rangeStatus={CalendarUtils.getDayRangeStatus(visibleDate, day, rangeStart, rangeEnd)}
            day={day}/>
        );
    }
    for (let i = 0; i < nextMonthDaysArray.length; i++) {
        days.push(<Day isToday={CalendarUtils.isToday(todayDate, visibleDate, nextMonthDaysArray[i], 'next')}
                       key={`next-month-${i}`}
                       disabled={true}
                       day={nextMonthDaysArray[i]}
        />);
    }

    const yearsRange = React.useMemo(() => {
        const years = [];
        const startYear = minYear ? Math.max(yearRangeStart, Number(minYear)) : yearRangeStart;
        const endYear = maxYear ? Math.min(yearRangeEnd, Number(maxYear)) : yearRangeEnd;

        for (let i = startYear; i <= endYear; i++) {
            years.push(i);
        }
        return years;
    }, [yearRangeStart, yearRangeEnd, minYear, maxYear]);

    const yearOptions: ZoriaSelectOption<number, number>[] = useMemo(() => {
        return yearsRange.map(year => ({
            value: year,
            display: year,
            searchValue: String(year)
        }))
    }, [yearsRange])

    return <div className={`z-calendar ${externalClassName}`.trim()}>
        <div className='z-calendar-header'>
            <div className='year-picker'>
                <SelectInput hideLabel valueDecoration={monthLabel}
                             value={visibleDate.getFullYear()}
                             onChange={onYearSelected} options={yearOptions}
                             defaultValue={visibleDate.getFullYear()}
                             isControlled
                             compact/>
            </div>
            <div className='month-picker'>
                <IconButton disabled={prevMonthDisabled} onClick={onPrevMonth}><ChevronLeftIcon/></IconButton>
                <IconButton disabled={nextMonthDisabled} onClick={onNextMonth}><ChevronRightIcon/></IconButton>
            </div>
        </div>
        <div className={`z-calendar-page`} role='grid'>
            {weekdaysLabels.map((label, idx) => (
                <div key={`weekday-${idx}`} role="columnheader" className='weekday'>{label}</div>
            ))}
            {days.map(day => day)}
        </div>
    </div>
})