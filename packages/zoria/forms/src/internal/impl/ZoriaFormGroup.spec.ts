import {describe, expect, it} from 'vitest';
import {FormControl} from "./ZoriaFormControl.ts";
import {FormGroup} from "./ZoriaFormGroup.ts";
import {ZoriaValidators} from "../validators/ZoriaValidators.ts";
import {FormArray} from "./ZoriaFormArray.ts";

describe('FormGroup', () => {
    it('should correctly store value', () => {
        // given
        const control = new FormGroup({
            first: new FormControl('first value'),
            second: new FormControl('second value')
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
        const control = new FormGroup({
            first: new FormControl('first value'),
            second: new FormControl('second value')
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
        const control = new FormGroup({
            first: new FormControl('first value'),
            second: new FormControl('second value')
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
        const control = new FormGroup({
            first: new FormControl('first value'),
            second: new FormControl('second value')
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

    it('should correctly emit and bubble-up value change event', () => {
        // given
        const control = new FormGroup({
            first: new FormControl('first value'),
            second: new FormControl('second value')
        })
        let emittedValue = null
        control.onValueChanges((value) => {
            emittedValue = value
        })

        // when
        const secondControl = control.getElement('second') as FormControl
        secondControl.setValue('new second value')

        // then
        expect(JSON.stringify(emittedValue)).eq(JSON.stringify({
            first: 'first value',
            second: 'new second value'
        }))
    })

    it('should emit but NOT bubble-up value change event', () => {
        // given
        const control = new FormGroup({
            first: new FormControl('first value'),
            second: new FormControl('second value')
        })
        const secondControl = control.getElement('second') as FormControl
        let emittedValue = null
        secondControl.onValueChanges((value) => {
            emittedValue = value
        })
        let bubbledUpValue = null
        control.onValueChanges((value) => {
            bubbledUpValue = value
        })

        // when
        secondControl.setValue('new second value', {emit: true, bubbleUp: false})

        // then
        expect(emittedValue).eq('new second value')
        expect(bubbledUpValue).eq(null)
    })

    it('should correctly validate and emit value', () => {
        // given
        const control = new FormGroup({
            first: new FormControl('', [ZoriaValidators.required()]),
            second: new FormControl('second value')
        })
        let currentIsValid = control.getIsValid()
        control.onValidityChanges((isValid) => {
            currentIsValid = isValid
        })
        expect(currentIsValid).eq(false)

        // when
        control.setValue({first: 'test'})

        // then
        expect(currentIsValid).eq(true)
        expect(currentIsValid).eq(control.getIsValid())
    })

    describe('getElementFromPath', () => {
        it('should return control 1 level deep', () => {
            // given
            const expectedControl = new FormControl('', [ZoriaValidators.required()])
            const formGroup = new FormGroup({
                first: expectedControl,
                second: new FormControl('second value')
            })

            // when
            const actualControl = formGroup.getElement('first');

            // then
            expect(actualControl).eq(expectedControl)
        })

        it('should return control 2 levels deep', () => {
            // given
            const expectedControl = new FormControl('', [ZoriaValidators.required()])
            const formGroup = new FormGroup({
                firstLevel: new FormGroup({
                    first: expectedControl
                }),
                second: new FormControl('second value')
            })

            // when
            const actualControl = formGroup.getElement('firstLevel.first');

            // then
            expect(actualControl).eq(expectedControl)
        })

        it('should return control 2 levels deep from FormArray', () => {
            // given
            const expectedControl = new FormControl('', [ZoriaValidators.required()])
            const formGroup = new FormGroup({
                firstLevel: new FormArray([
                    expectedControl
                ]),
                second: new FormControl('second value')
            })

            // when
            const actualControl = formGroup.getElement('firstLevel.0');

            // then
            expect(actualControl).eq(expectedControl)
        })

        it('should return control 3 levels deep', () => {
            // given
            const expectedControl = new FormControl('', [ZoriaValidators.required()])
            const formGroup = new FormGroup({
                firstLevel: new FormGroup({
                    secondLevel: new FormGroup({
                        first: expectedControl
                    })
                }),
                second: new FormControl('second value')
            })

            // when
            const actualControl = formGroup.getElement('firstLevel.secondLevel.first');

            // then
            expect(actualControl).eq(expectedControl)
        })

        it('should return control 3 levels deep, from FormArray in the middle', () => {
            // given
            const expectedControl = new FormControl('', [ZoriaValidators.required()])
            const formGroup = new FormGroup({
                firstLevel: new FormArray([
                    new FormGroup({
                        first: expectedControl
                    })
                ]),
                second: new FormControl('second value')
            })

            // when
            const actualControl = formGroup.getElement('firstLevel.0.first');

            // then
            expect(actualControl).eq(expectedControl)
        })
    })
})

