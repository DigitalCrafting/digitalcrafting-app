import {describe, expect, it} from 'vitest';
import {ZoriaFormControl} from "./ZoriaFormControl.ts";
import {ZoriaFormGroup} from "./ZoriaFormGroup.ts";
import {ZoriaValidators} from "../validators/ZoriaValidators.ts";
import {ZoriaFormArray} from "./ZoriaFormArray.ts";

describe('FormGroup', () => {
    it('should correctly store value', () => {
        // given
        const control = new ZoriaFormGroup({
            first: new ZoriaFormControl('first value'),
            second: new ZoriaFormControl('second value')
        })

        // when
        const actual = control.getValue()

        // then
        expect(JSON.stringify(actual)).eq(JSON.stringify({
            first: 'first value',
            second: 'second value'
        }))
    })

    it('should correctly set value in all sub-elements', () => {
        // given
        const control = new ZoriaFormGroup({
            first: new ZoriaFormControl('first value'),
            second: new ZoriaFormControl('second value')
        })

        // when
        control.setValue({
            first: 'new first value',
            second: 'new second value'
        })
        const actual = control.getValue()

        // then
        expect(JSON.stringify(actual)).eq(JSON.stringify({
            first: 'new first value',
            second: 'new second value'
        }))
    })

    it('should correctly set value in specified sub-elements', () => {
        // given
        const control = new ZoriaFormGroup({
            first: new ZoriaFormControl('first value'),
            second: new ZoriaFormControl('second value')
        })

        // when
        control.setValue({
            second: 'new second value'
        })
        const actual = control.getValue()

        // then
        expect(JSON.stringify(actual)).eq(JSON.stringify({
            first: 'first value',
            second: 'new second value'
        }))
    })

    it('should correctly emit value change event', () => {
        // given
        const control = new ZoriaFormGroup({
            first: new ZoriaFormControl('first value'),
            second: new ZoriaFormControl('second value')
        })
        let emittedValue = null
        control.onValueChanges((value) => {
            emittedValue = value
        })

        // when
        control.setValue({
            second: 'new second value'
        })

        // then
        expect(JSON.stringify(emittedValue)).eq(JSON.stringify({
            first: 'first value',
            second: 'new second value'
        }))
    })

    it('should correctly validate and emit value', () => {
        // given
        const control = new ZoriaFormGroup({
            first: new ZoriaFormControl('', [ZoriaValidators.required()]),
            second: new ZoriaFormControl('second value')
        })
        let currentIsValid = control.getIsValid()
        control.onValidityChanges((isValid) => {
            currentIsValid = isValid
        })
        expect(currentIsValid).eq(false)

        // when
        control.setValue({first: 'test'})

        // then
        expect(currentIsValid).eq(control.getIsValid())
        expect(currentIsValid).eq(true)
    })

    describe('getElementFromPath', () => {
        it('should return control 1 level deep', () => {
            // given
            const expectedControl = new ZoriaFormControl('', [ZoriaValidators.required()])
            const formGroup = new ZoriaFormGroup({
                first: expectedControl,
                second: new ZoriaFormControl('second value')
            })

            // when
            const actualControl = formGroup.getElement('first');

            // then
            expect(actualControl).eq(expectedControl)
        })

        it('should return control 2 levels deep', () => {
            // given
            const expectedControl = new ZoriaFormControl('', [ZoriaValidators.required()])
            const formGroup = new ZoriaFormGroup({
                firstLevel: new ZoriaFormGroup({
                    first: expectedControl
                }),
                second: new ZoriaFormControl('second value')
            })

            // when
            const actualControl = formGroup.getElement('firstLevel.first');

            // then
            expect(actualControl).eq(expectedControl)
        })

        it('should return control 2 levels deep from FormArray', () => {
            // given
            const expectedControl = new ZoriaFormControl('', [ZoriaValidators.required()])
            const formGroup = new ZoriaFormGroup({
                firstLevel: new ZoriaFormArray([
                    expectedControl
                ]),
                second: new ZoriaFormControl('second value')
            })

            // when
            const actualControl = formGroup.getElement('firstLevel.0');

            // then
            expect(actualControl).eq(expectedControl)
        })

        it('should return control 3 levels deep', () => {
            // given
            const expectedControl = new ZoriaFormControl('', [ZoriaValidators.required()])
            const formGroup = new ZoriaFormGroup({
                firstLevel: new ZoriaFormGroup({
                    secondLevel: new ZoriaFormGroup({
                        first: expectedControl
                    })
                }),
                second: new ZoriaFormControl('second value')
            })

            // when
            const actualControl = formGroup.getElement('firstLevel.secondLevel.first');

            // then
            expect(actualControl).eq(expectedControl)
        })

        it('should return control 3 levels deep, from FormArray in the middle', () => {
            // given
            const expectedControl = new ZoriaFormControl('', [ZoriaValidators.required()])
            const formGroup = new ZoriaFormGroup({
                firstLevel: new ZoriaFormArray([
                    new ZoriaFormGroup({
                        first: expectedControl
                    })
                ]),
                second: new ZoriaFormControl('second value')
            })

            // when
            const actualControl = formGroup.getElement('firstLevel.0.first');

            // then
            expect(actualControl).eq(expectedControl)
        })
    })
})

