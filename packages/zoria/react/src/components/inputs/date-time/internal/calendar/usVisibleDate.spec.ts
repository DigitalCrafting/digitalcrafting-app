import {describe, expect, it} from 'vitest';
import {DateUtils} from "../../../../../utils/DateUtils";
import {calculateVisibleDateBoundaries} from "./useVisibleDate";

describe('useVisibleDate', () => {
    describe('calculateVisibleDateBoundaries', () => {
        it('should return no boundaries', () => {
            // given
            const visibleDate = DateUtils.isoStringToDate('2026-07-07');

            // when
            const actual = calculateVisibleDateBoundaries(visibleDate);

            // then
            expect(actual).toBeTruthy();
            expect(actual.minYear).toBeFalsy();
            expect(actual.maxYear).toBeFalsy();
            expect(actual.prevMonthDisabled).toBeFalsy();
            expect(actual.nextMonthDisabled).toBeFalsy();
        })

        it('should return year boundaries', () => {
            // given
            const visibleDate = DateUtils.isoStringToDate('2026-07-07');

            // when
            const actual = calculateVisibleDateBoundaries(visibleDate, '2024-05-05', '2028-05-05');

            // then
            expect(actual).toBeTruthy();
            expect(actual.minYear).toBe(2024);
            expect(actual.maxYear).toBe(2028);
            expect(actual.prevMonthDisabled).toBeFalsy();
            expect(actual.nextMonthDisabled).toBeFalsy();
        })

        it('should return prev month disabled', () => {
            // given
            const visibleDate = DateUtils.isoStringToDate('2026-07-07');

            // when
            const actual = calculateVisibleDateBoundaries(visibleDate, '2026-07-05', '2028-05-05');

            // then
            expect(actual).toBeTruthy();
            expect(actual.minYear).toBe(2026);
            expect(actual.maxYear).toBe(2028);
            expect(actual.prevMonthDisabled).toBeTruthy();
            expect(actual.nextMonthDisabled).toBeFalsy();
        })

        it('should return next month disabled', () => {
            // given
            const visibleDate = DateUtils.isoStringToDate('2026-07-07');

            // when
            const actual = calculateVisibleDateBoundaries(visibleDate, '2024-07-05', '2026-07-25');

            // then
            expect(actual).toBeTruthy();
            expect(actual.minYear).toBe(2024);
            expect(actual.maxYear).toBe(2026);
            expect(actual.prevMonthDisabled).toBeFalsy();
            expect(actual.nextMonthDisabled).toBeTruthy();
        })


    })
})