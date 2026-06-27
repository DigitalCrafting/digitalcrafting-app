import {describe, expect, it} from 'vitest';
import {ZoriaFormArray} from "./ZoriaFormArray.ts";
import {ZoriaFormControl} from "./ZoriaFormControl.ts";
import {ZoriaValidators} from "../validators/ZoriaValidators.ts";

describe('FormArray', () => {
    it('should correctly store value', () => {
        // given
        const control = new ZoriaFormArray([
            new ZoriaFormControl('first value', [ZoriaValidators.required()]),
            new ZoriaFormControl('second value')
        ])
        const expectedValue = ['first value', 'second value'];

        // when
        const actualValue = control.getValue();

        // then
        expect(actualValue.sort()).toEqual(expectedValue.sort())
    })

    it('should correctly set value in all sub-elements', () => {
        // given
        const control = new ZoriaFormArray([
            new ZoriaFormControl('first value', [ZoriaValidators.required()]),
            new ZoriaFormControl('second value')
        ])
        const expectedValue = ['new first value', 'new second value'];

        // when
        control.setValue(expectedValue)
        const actualValue = control.getValue();

        // then
        expect(actualValue.sort()).toEqual(expectedValue.sort())
    })

    it('should correctly emit and bubble-up value change event', () => {
        // given
        const control = new ZoriaFormControl('first value', [ZoriaValidators.required()]);
        const controlArray = new ZoriaFormArray([
            control,
            new ZoriaFormControl('second value')
        ])
        let actualValue: string[] | null = null
        controlArray.onValueChanges((value) => {
            actualValue = value
        })
        const expectedValue = ['new first value', 'second value'];

        // when
        control.setValue('new first value')

        // then
        expect(actualValue).not.toBe(null)
        // @ts-ignore
        expect(actualValue.sort()).toEqual(expectedValue.sort())
    })

    it('should correctly validate and emit value', () => {
        // given
        const controlArray = new ZoriaFormArray([
            new ZoriaFormControl('', [ZoriaValidators.required()]),
            new ZoriaFormControl('second value')
        ])
        const initialValid = controlArray.getIsValid()

        let emittedValid = false
        controlArray.onValidityChanges((isValid) => {
            emittedValid = isValid
        })

        // when
        controlArray.getElement('0').setValue('new first value')
        const currentValid = controlArray.getIsValid()

        // then
        expect(initialValid).eq(false);
        expect(currentValid).eq(true);
        expect(emittedValid).eq(true);
    })

    describe('remove', () => {
        it('should correctly remove element', () => {
            // given
            const controlArray = new ZoriaFormArray([
                new ZoriaFormControl('', [ZoriaValidators.required()]),
                new ZoriaFormControl('second value')
            ])

            // when
            controlArray.remove(0)

            // then
            expect(controlArray.length).eq(1)
        })

        it('should correctly update and emit value change', () => {
            // given
            const controlArray = new ZoriaFormArray([
                new ZoriaFormControl('', [ZoriaValidators.required()]),
                new ZoriaFormControl('second value')
            ])
            const oldValue = controlArray.getValue()
            let emittedValue: any[] | null = null

            controlArray.onValueChanges((value) => {
                emittedValue = value
            })
            const expectedValue = ['second value'];

            // when
            controlArray.remove(0)

            // then
            expect(oldValue.sort()).not.toEqual(expectedValue)
            expect(emittedValue).not.eq(null)
            // @ts-ignore
            expect(emittedValue).toEqual(expectedValue)
            expect(controlArray.getValue().sort()).toEqual(expectedValue)
        })

        it('should correctly update and emit validity change', () => {
            // given
            const controlArray = new ZoriaFormArray([
                new ZoriaFormControl('', [ZoriaValidators.required()]),
                new ZoriaFormControl('second value')
            ])

            const currentValidity = controlArray.getIsValid()
            let emittedValidity: boolean | null = null
            controlArray.onValidityChanges((isValid) => {
                emittedValidity = isValid
            })

            // when
            controlArray.remove(0)

            // then
            expect(currentValidity).toBe(false);
            expect(emittedValidity).toBe(true);
            expect(controlArray.getIsValid()).toBe(true);
        })
    })

    describe('pushElement', () => {
        it('should correctly add element', () => {
            // given
            const controlArray = new ZoriaFormArray([
                new ZoriaFormControl('', [ZoriaValidators.required()]),
            ])

            // when
            controlArray.pushElement(new ZoriaFormControl('second value'))

            // then
            expect(controlArray.length).eq(2)
        })

        it('should correctly update and emit value change', () => {
            // given
            const controlArray = new ZoriaFormArray([
                new ZoriaFormControl('first value', [ZoriaValidators.required()])
            ])
            const oldValue = controlArray.getValue()
            let emittedValue: any[] | null = null

            controlArray.onValueChanges((value) => {
                emittedValue = value
            })
            const expectedValue = ['first value', 'second value'];

            // when
            controlArray.pushElement(new ZoriaFormControl('second value'))

            // then
            expect(oldValue.sort()).not.toEqual(expectedValue)
            expect(emittedValue).not.eq(null)
            // @ts-ignore
            expect(emittedValue).toEqual(expectedValue)
            expect(controlArray.getValue().sort()).toEqual(expectedValue)
        })

        it('should correctly update and emit validity change', () => {
            // given
            const controlArray = new ZoriaFormArray([
                new ZoriaFormControl('first value'),
                new ZoriaFormControl('second value')
            ])

            const currentValidity = controlArray.getIsValid()
            let emittedValidity: boolean | null = null
            controlArray.onValidityChanges((isValid) => {
                emittedValidity = isValid
            })

            // when
            controlArray.pushElement(new ZoriaFormControl('', [ZoriaValidators.required()]))

            // then
            expect(currentValidity).toBe(true);
            expect(emittedValidity).toBe(false);
            expect(controlArray.getIsValid()).toBe(false);
        })
    })
})