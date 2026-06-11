import {describe, expect, it} from 'vitest';
import {Validators} from "./Validators.ts";
import {DEFAULT_VALIDATION_ERRORS} from "./ValidatorsTypes.ts";

describe('Validators', () => {
    describe('required', () => {
        it('should correctly determine valid', () => {
            // given
            const testedValue = 'I exist!'

            // when
            const testResult = Validators.required()(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should correctly determine invalid', () => {
            // given
            const testedValue = ''

            // when
            const testResult = Validators.required()(testedValue)

            // then
            expect(testResult).eq(DEFAULT_VALIDATION_ERRORS.REQUIRED)
        })
    })
    describe('minLength', () => {
        it('should correctly determine valid', () => {
            // given
            const testedValue = [5, 6, 7]

            // when
            const testResult = Validators.minLength(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should correctly determine invalid', () => {
            // given
            const testedValue = [5, 6, 7]

            // when
            const testResult = Validators.minLength(5)(testedValue)

            // then
            expect(testResult).eq(DEFAULT_VALIDATION_ERRORS.MIN_LENGTH)
        })

        it('should ignore null value', () => {
            // given
            const testedValue = null

            // when
            const testResult = Validators.minLength(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })
    })

    describe('maxLength', () => {
        it('should correctly determine valid', () => {
            // given
            const testedValue = [5, 6, 7]

            // when
            const testResult = Validators.maxLength(5)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should correctly determine invalid', () => {
            // given
            const testedValue = [5, 6, 7]

            // when
            const testResult = Validators.maxLength(2)(testedValue)

            // then
            expect(testResult).eq(DEFAULT_VALIDATION_ERRORS.MAX_LENGTH)
        })

        it('should ignore null value', () => {
            // given
            const testedValue = null

            // when
            const testResult = Validators.maxLength(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })
    })

    describe('min', () => {
        it('should correctly determine valid', () => {
            // given
            const testedValue = 5

            // when
            const testResult = Validators.min(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should correctly determine invalid', () => {
            // given
            const testedValue = 5

            // when
            const testResult = Validators.min(10)(testedValue)

            // then
            expect(testResult).eq(DEFAULT_VALIDATION_ERRORS.MIN_VALUE)
        })

        it('should ignore null value', () => {
            // given
            const testedValue = null

            // when
            const testResult = Validators.min(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should detect incorrect value type', () => {
            // given
            const testedValue = 'I am a number ;)'

            // then
            expect(() => Validators.min(2)(testedValue)).toThrowError(/Expected number/)
        })
    })
    describe('max', () => {
        it('should correctly determine valid', () => {
            // given
            const testedValue = 5

            // when
            const testResult = Validators.max(10)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should correctly determine invalid', () => {
            // given
            const testedValue = 5

            // when
            const testResult = Validators.max(2)(testedValue)

            // then
            expect(testResult).eq(DEFAULT_VALIDATION_ERRORS.MAX_VALUE)
        })

        it('should ignore null value', () => {
            // given
            const testedValue = null

            // when
            const testResult = Validators.max(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should detect incorrect value type', () => {
            // given
            const testedValue = 'I am a number ;)'

            // then
            expect(() => Validators.max(2)(testedValue)).toThrowError(/Expected number/)
        })
    })
})