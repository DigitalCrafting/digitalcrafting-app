import {DateUtils} from "../../utils/DateUtils";
import * as React from "react";
import {useMemo, useRef, useState} from "react";
import {IconButton} from "../buttons/IconButton";
import {ChevronLeftIcon, ChevronRightIcon} from "../icons/Icons";
import {CalendarUtils} from "./CalendarUtils";
import {SelectInput, type SelectOption} from "../inputs/select/SelectInput";

interface DayProps {
    day: number
    disabled?: boolean
    isSelected?: boolean
    isInRange?: boolean
    isToday?: boolean
    'data-testid'?: string
    onSelect?: (day: number) => void
}

const Day = React.memo(({
    day,
    disabled = false,
    isSelected = false,
    isInRange = false,
    isToday = false,
    'data-testid': dataTestId,
    onSelect = () => {
    }
}: DayProps) => {
    let classNames = 'day';
    if (isSelected) {
        classNames += ' is-selected';
    }
    if (isToday) {
        classNames += ' day-today';
    }
    if (isInRange) {
        classNames += ' is-in-range';
    }
    if (!disabled && !dataTestId) {
        dataTestId = `calendar-day-${day}`
    }

    return <button
        onClick={() => onSelect(day)}
        className={classNames}
        disabled={disabled}
        data-testid={dataTestId}
        role='gridcell'>
        <span className='day-inner'>
            {day}
        </span>
    </button>
});

interface CalendarProps {
    id?: string
    value?: string
    onChange?: (value: string) => void
    className?: string
    startingDay?: string
    yearRangeStart?: number
    yearRangeEnd?: number
    weekdays?: string[]
    months?: string[]
}

export const Calendar = React.memo((
    {
        startingDay = 'Sun',
        value,
        onChange,
        className: externalClassName = '',
        yearRangeStart = 1990,
        yearRangeEnd = 2050,
        weekdays = CalendarUtils.WEEKDAYS,
        months = CalendarUtils.MONTHS
    }: CalendarProps) => {
    const todayDate = useRef<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState(value ? DateUtils.fromISODate(value) : undefined);
    const [visibleDate, setVisibleDate] = useState(value ? DateUtils.fromISODate(value) : new Date());

    const onYearSelected = (inputValue: string) => {
        const year = Number(inputValue);
        const newDate = DateUtils.atMidnight(visibleDate);
        newDate.setFullYear(year);
        setVisibleDate(newDate);
    }

    const onNextMonth = () => {
        const currentMonth = visibleDate.getMonth();
        const newMonth = (currentMonth + 1) % 12;
        const newDate = DateUtils.atMidnight(visibleDate);
        newDate.setMonth(newMonth);
        setVisibleDate(newDate);
    }

    const onPrevMonth = () => {
        const currentMonth = visibleDate.getMonth();
        const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const newDate = DateUtils.atMidnight(visibleDate);
        newDate.setMonth(newMonth);
        setVisibleDate(newDate);
    }

    const onDaySelected = (day: number) => {
        const newDate = DateUtils.atMidnight(visibleDate);
        newDate.setDate(day);
        setSelectedDate(newDate);
        setVisibleDate(newDate);
        onChange?.(DateUtils.toISODate(newDate));
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
            isSelected={DateUtils.isTheSameDate(selectedDate, visibleDate) && selectedDate?.getDate() === day}
            isToday={CalendarUtils.isToday(todayDate, visibleDate, day, 'current')}
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
        for (let i = yearRangeStart; i <= yearRangeEnd; i++) {
            years.push(i);
        }
        return years;
    }, [yearRangeStart, yearRangeEnd]);

    const yearOptions: SelectOption<number, number>[] = useMemo(() => {
        return yearsRange.map(year => ({
            value: year,
            display: year
        }))
    }, [])

    return <div className={`z-calendar ${externalClassName}`.trim()}>
        <div className='z-calendar-header'>
            <div className='year-picker'>
                <SelectInput hideLabel onChange={onYearSelected} options={yearOptions} value={visibleDate.getFullYear()} compact />
            </div>
            <div className='month-picker'>
                <IconButton onClick={onPrevMonth}><ChevronLeftIcon/></IconButton>
                <span>{monthLabel}</span>
                <IconButton onClick={onNextMonth}><ChevronRightIcon/></IconButton>
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