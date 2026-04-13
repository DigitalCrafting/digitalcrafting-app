import {DateUtils} from "../../utils/DateUtils";
import type {RefObject} from "react";

type MonthView = 'prev' | 'current' | 'next';

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
}