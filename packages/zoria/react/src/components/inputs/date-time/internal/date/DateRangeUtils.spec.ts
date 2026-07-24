import {describe, expect, it} from 'vitest';
import {DateRangeValue} from "../../types/DateTimeTypes";
import {DateRangeUtils} from "./DateRangeUtils";
import {EN_DASH} from "../../../../../types/CommonTypes";

describe('DateRangeUtils', () => {
    describe('toDisplay', () => {
        it('should return same day display', () => {
            // given
            const value: DateRangeValue = {
                start: '2026-12-12',
                end: null,
                isSameDay: true
            }

            // when
            const actual = DateRangeUtils.toDisplay(value);

            // then
            expect(actual).toBe('2026-12-12')
        })

        it('should return range display', () => {
            // given
            const value: DateRangeValue = {
                start: '2026-12-12',
                end: '2026-12-25',
            }

            // when
            const actual = DateRangeUtils.toDisplay(value);

            // then
            expect(actual).toBe(`2026-12-12 ${EN_DASH} 2026-12-25`)
        })
    })

    describe('toValue', () => {
        it('should return same day value', () => {
            // given
            const display = '2026-12-12';
            const expected: DateRangeValue = {
                start: '2026-12-12',
                end: null,
                isSameDay: true
            }

            // when
            const actual = DateRangeUtils.toValue(display);

            // then
            expect(actual).toEqual(expected)
        })

        it('should return range value', () => {
            // given
            const display = `2026-12-12 ${EN_DASH} 2026-12-25`;
            const expected: DateRangeValue = {
                start: '2026-12-12',
                end: '2026-12-25',
            }

            // when
            const actual = DateRangeUtils.toValue(display);

            // then
            expect(actual).toEqual(expected)
        })
    })
})