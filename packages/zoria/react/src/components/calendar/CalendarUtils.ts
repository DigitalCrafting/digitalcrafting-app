import {DateUtils} from "../../utils/DateUtils";
import type {RefObject} from "react";

type MonthView = 'prev' | 'current' | 'next';

export type CalendarDayRangeStatusType = 0 | 1 | 2 | 3;

export class CalendarUtils {
    // TODO i18n
    static readonly WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    static readonly MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    static prevMonthDayNumbers(d: Date, offset: number) {
        const currentMonth = new Date(d.getFullYear(), d.getMonth(), 1);
        const firstDow = currentMonth.getDay();
        const column = (firstDow - offset + 7) % 7;

        if (column === 0) {
            return [];
        }

        const prevMonth = DateUtils.subtractDays(currentMonth, 1);
        const days = [];
        const daysInMonth = prevMonth.getDate();

        for (let i = daysInMonth - column + 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    }

    static currentMonthDays(d: Date) {
        const lastOfMonth = DateUtils.atMidnight(d);
        lastOfMonth.setDate(1);
        lastOfMonth.setMonth(d.getMonth() + 1);
        lastOfMonth.setDate(lastOfMonth.getDate() - 1);
        return lastOfMonth.getDate();
    }

    static nextMonthDayNumbers(d: Date, offset: number) {
        const lastOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
        lastOfMonth.setMonth(lastOfMonth.getMonth() + 1);
        lastOfMonth.setDate(0);
        const lastDow = lastOfMonth.getDay();
        const column = (lastDow - offset + 7) % 7;
        if (column === 6) {
            return []
        }

        const days = [];
        for (let i = 1; i <= 6 - column; i++) {
            days.push(i);
        }

        return days;
    }

    static getWeekdaysLabels(weekdays: string[], offset: number) {
        if (offset === 0 || Number.isNaN(offset)) {
            return weekdays;
        }

        return weekdays.slice(offset).concat(weekdays.slice(0, offset));
    }


    static isToday = (todayRef: RefObject<Date>, visibleDate: Date, currentDay: number, monthView: MonthView): boolean => {
        const todayDate = todayRef.current;
        const currentDate = DateUtils.atMidnight(visibleDate);

        if (monthView === 'prev') {
            currentDate.setMonth(currentDate.getMonth() - 1);
        } else if (monthView === 'next') {
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        currentDate.setDate(currentDay);
        return DateUtils.isTheSameDate(todayDate, currentDate);
    }

    static isDayDisabled = (visibleDate: Date, currentDay: number, min?: string, max?: string): boolean => {
        if (!min && !max) {
            return false;
        }

        const currentDate = DateUtils.atMidnight(visibleDate);
        currentDate.setDate(currentDay);
        const currentDateStr = DateUtils.toISODate(currentDate);

        return DateUtils.isBefore(currentDateStr, min) || DateUtils.isAfter(currentDateStr, max);
    }

    /**
     * @returns
     * - 0 -> not in range
     * - 1 -> rangeStart
     * - 2 -> in range
     * - 3 -> rangeEnd
     * */
    static getDayRangeStatus = (visibleDate: Date, currentDay: number, rangeStart?: string, rangeEnd?: string): CalendarDayRangeStatusType => {
        if (!rangeStart && !rangeEnd) {
            return 0;
        }

        const currentDate = DateUtils.atMidnight(visibleDate);
        currentDate.setDate(currentDay);
        const currentDateStr = DateUtils.toISODate(currentDate);
        const rangeStartAsDate = rangeStart ? DateUtils.fromISODate(rangeStart) : undefined;
        const rangeEndAsDate = rangeEnd ? DateUtils.fromISODate(rangeEnd) : undefined;

        if (rangeStart === rangeEnd) {
            return 0;
        }

        if (rangeStart && DateUtils.isTheSameDate(currentDate, rangeStartAsDate)) {
            return 1;
        }

        if (rangeEnd && DateUtils.isTheSameDate(currentDate, rangeEndAsDate)) {
            return 3;
        }

        if (DateUtils.isBefore(currentDateStr, rangeStart) || DateUtils.isAfter(currentDateStr, rangeEnd)) {
            return 0;
        }

        return 2;
    }
}