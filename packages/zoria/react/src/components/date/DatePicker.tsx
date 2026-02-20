import {DateUtils} from "../../utils/DateUtils";
import * as React from "react";
import {useState} from "react";
import {IconButton} from "../buttons/IconButton";
import {ChevronLeftIcon, ChevronRightIcon} from "../icons/Icons";
import {CalendarUtils} from "./CalendarUtils";

interface DayProps {
    day: number
    disabled?: boolean
    isSelected?: boolean
    isInRange?: boolean
    'data-testid'?: string
    onSelect?: (day: number) => void
}

const Day = React.memo(({
    day,
    disabled = false,
    isSelected = false,
    isInRange = false,
    'data-testid': dataTestId,
    onSelect = () => {
    }
}: DayProps) => {
    let classNames = 'day';
    if (isSelected) {
        classNames += ' is-selected';
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
        yearRangeStart = 1950,
        yearRangeEnd = 2050,
        weekdays = CalendarUtils.WEEKDAYS,
        months = CalendarUtils.MONTHS
    }: CalendarProps) => {
    const currentDate = value ? DateUtils.fromISODate(value) : new Date();
    const [selectedDate, setSelectedDate] = useState(currentDate);

    const yearsRange = React.useMemo(() => {
        const years = [];
        for (let i = yearRangeStart; i <= yearRangeEnd; i++) {
            years.push(i);
        }
        return years;
    }, [yearRangeStart, yearRangeEnd]);

    const onYearSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = Number(event.target.value);
        const newDate = DateUtils.atMidnight(selectedDate);
        newDate.setFullYear(year);
        setSelectedDate(newDate);
        onChange?.(DateUtils.toISODate(newDate));
    }

    const onNextMonth = () => {
        const currentMonth = selectedDate.getMonth();
        const newMonth = (currentMonth + 1) % 12;
        const newDate = DateUtils.atMidnight(selectedDate);
        newDate.setMonth(newMonth);
        setSelectedDate(newDate);
        onChange?.(DateUtils.toISODate(newDate));
    }

    const onPrevMonth = () => {
        const currentMonth = selectedDate.getMonth();
        const newMonth = currentMonth === 0 ? 11: currentMonth - 1;
        const newDate = DateUtils.atMidnight(selectedDate);
        newDate.setMonth(newMonth);
        setSelectedDate(newDate);
        onChange?.(DateUtils.toISODate(newDate));
    }

    const onDaySelected = (day: number) => {
        const newDate = DateUtils.atMidnight(selectedDate);
        newDate.setDate(day);
        setSelectedDate(newDate);
        onChange?.(DateUtils.toISODate(newDate));
    }

    const dayOffset = weekdays.indexOf(startingDay);
    const weekdaysLabels = CalendarUtils.getWeekdaysLabels(weekdays, dayOffset);

    const prevMonthDaysArray = CalendarUtils.prevMonthDayNumbers(selectedDate, dayOffset);
    const currMonthDays = CalendarUtils.currentMonthDays(selectedDate);
    const nextMonthDaysArray = CalendarUtils.nextMonthDayNumbers(selectedDate, dayOffset);

    const monthNmbr = selectedDate.getMonth();
    const monthLabel = months[monthNmbr];

    const days = [];
    for (let i = 0; i < prevMonthDaysArray.length; i++) {
        days.push(<Day key={`prev-month-${i}`} disabled={true} day={prevMonthDaysArray[i]}/>);
    }
    for (let day = 1; day <= currMonthDays; day++) {
        days.push(<Day
            key={`curr-month-${day}`}
            onSelect={onDaySelected}
            isSelected={selectedDate.getDate() === day}
            day={day}/>
        );
    }
    for (let i = 0; i < nextMonthDaysArray.length; i++) {
        days.push(<Day key={`next-month-${i}`} disabled={true} day={nextMonthDaysArray[i]}/>);
    }

    return <div className={'z-calendar'}>
        <div className='z-calendar-header'>
            <div className='year-picker'>
                <select onChange={onYearSelected} value={selectedDate.getFullYear()}>
                    {yearsRange.map(year => {
                        return <option key={year} value={year}>{year}</option>
                    })}
                </select>
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