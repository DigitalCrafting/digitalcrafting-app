import {describe, expect, it} from 'vitest';
import {ZoriaValidators} from "./ZoriaValidators.ts";
import {DEFAULT_VALIDATION_ERRORS} from "./ZoriaValidatorsTypes.ts";

describe('ZoriaValidators', () => {
    describe('required', () => {
        it('should correctly determine valid', () => {
            // given
            const testedValue = 'I exist!'

            // when
            const testResult = ZoriaValidators.required()(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should correctly determine invalid', () => {
            // given
            const testedValue = ''

            // when
            const testResult = ZoriaValidators.required()(testedValue)

            // then
            expect(testResult).eq(DEFAULT_VALIDATION_ERRORS.REQUIRED)
        })
    })
    describe('minLength', () => {
        it('should correctly determine valid', () => {
            // given
            const testedValue = [5, 6, 7]

            // when
            const testResult = ZoriaValidators.minLength(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should correctly determine invalid', () => {
            // given
            const testedValue = [5, 6, 7]

            // when
            const testResult = ZoriaValidators.minLength(5)(testedValue)

            // then
            expect(testResult).eq(DEFAULT_VALIDATION_ERRORS.MIN_LENGTH)
        })

        it('should ignore null value', () => {
            // given
            const testedValue = null

            // when
            const testResult = ZoriaValidators.minLength(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })
    })

    describe('maxLength', () => {
        it('should correctly determine valid', () => {
            // given
            const testedValue = [5, 6, 7]

            // when
            const testResult = ZoriaValidators.maxLength(5)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should correctly determine invalid', () => {
            // given
            const testedValue = [5, 6, 7]

            // when
            const testResult = ZoriaValidators.maxLength(2)(testedValue)

            // then
            expect(testResult).eq(DEFAULT_VALIDATION_ERRORS.MAX_LENGTH)
        })

        it('should ignore null value', () => {
            // given
            const testedValue = null

            // when
            const testResult = ZoriaValidators.maxLength(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })
    })

    describe('min', () => {
        it('should correctly determine valid', () => {
            // given
            const testedValue = 5

            // when
            const testResult = ZoriaValidators.min(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should correctly determine invalid', () => {
            // given
            const testedValue = 5

            // when
            const testResult = ZoriaValidators.min(10)(testedValue)

            // then
            expect(testResult).eq(DEFAULT_VALIDATION_ERRORS.MIN_VALUE)
        })

        it('should ignore null value', () => {
            // given
            const testedValue = null

            // when
            const testResult = ZoriaValidators.min(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should detect incorrect value type', () => {
            // given
            const testedValue = 'I am a number ;)'

            // then
            expect(() => ZoriaValidators.min(2)(testedValue)).toThrowError(/Expected number/)
        })
    })
    describe('max', () => {
        it('should correctly determine valid', () => {
            // given
            const testedValue = 5

            // when
            const testResult = ZoriaValidators.max(10)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should correctly determine invalid', () => {
            // given
            const testedValue = 5

            // when
            const testResult = ZoriaValidators.max(2)(testedValue)

            // then
            expect(testResult).eq(DEFAULT_VALIDATION_ERRORS.MAX_VALUE)
        })

        it('should ignore null value', () => {
            // given
            const testedValue = null

            // when
            const testResult = ZoriaValidators.max(2)(testedValue)

            // then
            expect(testResult).eq(null)
        })

        it('should detect incorrect value type', () => {
            // given
            const testedValue = 'I am a number ;)'

            // then
            expect(() => ZoriaValidators.max(2)(testedValue)).toThrowError(/Expected number/)
        })
    })
})