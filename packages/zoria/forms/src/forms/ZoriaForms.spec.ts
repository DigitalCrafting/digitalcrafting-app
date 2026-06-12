// @ts-nocheck
import {describe, expect, it} from 'vitest';
import {FormArray, FormGroup, FormControl} from "./ZoriaForms.ts";
import {Validators} from "../validators/Validators.ts";

describe('Custom forms', () => {
    describe('FormInput', () => {
        it('should correctly store value', () => {
            // given
            const control = new FormControl('test')

            // when
            const actual = control.getValue()

            // then
            expect(actual).eq('test')
        })

        it('should correctly set value and emit event', () => {
            // given
            const control = new FormControl('test');
            let emittedValue = null;
            control.onValueChanges((value) => {
                emittedValue = value
            })

            // when
            control.setValue('test 2')
            const actual = control.getValue();

            // then
            expect(actual).eq('test 2');
            expect(emittedValue).eq('test 2');
        })

        it('should correctly set value and NOT emit event', () => {
            // given
            const control = new FormControl('test');
            let emittedValue = null;
            control.onValueChanges((value) => {
                emittedValue = value
            })

            // when
            control.setValue('test 2', {emit: false})
            const actual = control.getValue();

            // then
            expect(actual).eq('test 2');
            expect(emittedValue).eq(null);
        })

        it('should validate field and emit event', () => {
            // given
            const control = new FormControl('', [Validators.required()])
            let currentIsValid = control.getIsValid()
            control.onValidityChanges((valid) => {
                currentIsValid = !valid
            })

            // when
            control.setValue('test')

            // then
            expect(currentIsValid).eq(control.getIsValid())
            expect(currentIsValid).eq(true)
        })
    })

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
                first: new FormControl('', [Validators.required()]),
                second: new FormControl('second value')
            })
            let currentIsValid = control.getIsValid()
            control.onValidityChanges((error) => {
                currentIsValid = !error
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
                const expectedControl = new FormControl('', [Validators.required()])
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
                const expectedControl = new FormControl('', [Validators.required()])
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
                const expectedControl = new FormControl('', [Validators.required()])
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
                const expectedControl = new FormControl('', [Validators.required()])
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
                const expectedControl = new FormControl('', [Validators.required()])
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

    describe('FormArray', () => {
        it('should correctly store value', () => {
            // given
            const control = new FormArray([
                new FormControl('first value', [Validators.required()]),
                new FormControl('second value')
            ])
            const expectedValue = ['first value', 'second value'];

            // when
            const actualValue = control.getValue();

            // then
            expect(actualValue.sort()).toEqual(expectedValue.sort())
        })

        it('should correctly set value in all sub-elements', () => {
            // given
            const control = new FormArray([
                new FormControl('first value', [Validators.required()]),
                new FormControl('second value')
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
            const control = new FormControl('first value', [Validators.required()]);
            const controlArray = new FormArray([
                control,
                new FormControl('second value')
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

        it('should emit but NOT bubble-up value change event', () => {
            // given
            const control = new FormControl('first value', [Validators.required()]);
            const controlArray = new FormArray([
                control,
                new FormControl('second value')
            ])
            let controlEmitted = false
            let arrayEmitted = false
            control.onValueChanges(() => {
                controlEmitted = true
            })
            controlArray.onValueChanges(() => {
                arrayEmitted = true
            })

            // when
            control.setValue('new first value', {emit: true, bubbleUp: false})

            // then
            expect(controlEmitted).eq(true)
            expect(arrayEmitted).eq(false)
        })

        it('should correctly validate and emit value', () => {
            // given
            const controlArray = new FormArray([
                new FormControl('', [Validators.required()]),
                new FormControl('second value')
            ])
            const initialValid = controlArray.getIsValid()

            let emittedValid = false
            controlArray.onValidityChanges((isValid) => {
                emittedValid = !isValid
            })

            // when
            controlArray.getElement<FormControl>('0').setValue('new first value', {emit: true, bubbleUp: false})
            const currentValid = controlArray.getIsValid()

            // then
            expect(initialValid).eq(false);
            expect(currentValid).eq(true);
            expect(emittedValid).eq(true);
        })

        describe('removeElement', () => {
            it('should correctly remove element', () => {
                // given
                const controlArray = new FormArray([
                    new FormControl('', [Validators.required()]),
                    new FormControl('second value')
                ])

                // when
                controlArray.removeElement(0)

                // then
                expect(controlArray.length).eq(1)
            })

            it('should correctly update and emit value change', () => {
                // given
                const controlArray = new FormArray([
                    new FormControl('', [Validators.required()]),
                    new FormControl('second value')
                ])
                const oldValue = controlArray.getValue()
                let emittedValue: any[] | null = null

                controlArray.onValueChanges((value) => {
                    emittedValue = value
                })
                const expectedValue = ['second value'];

                // when
                controlArray.removeElement(0)

                // then
                expect(oldValue.sort()).not.toEqual(expectedValue)
                expect(emittedValue).not.eq(null)
                // @ts-ignore
                expect(emittedValue).toEqual(expectedValue)
                expect(controlArray.getValue().sort()).toEqual(expectedValue)
            })

            it('should correctly update and emit validity change', () => {
                // given
                const controlArray = new FormArray([
                    new FormControl('', [Validators.required()]),
                    new FormControl('second value')
                ])

                const currentValidity = controlArray.getIsValid()
                let emittedValidity: boolean | null = null
                controlArray.onValidityChanges((isValid) => {
                    emittedValidity = !isValid
                })

                // when
                controlArray.removeElement(0)

                // then
                expect(currentValidity).toBe(false);
                expect(emittedValidity).toBe(true);
                expect(controlArray.getIsValid()).toBe(true);
            })
        })

        describe('pushElement', () => {
            it('should correctly add element', () => {
                // given
                const controlArray = new FormArray([
                    new FormControl('', [Validators.required()]),
                ])

                // when
                controlArray.pushElement(new FormControl('second value'))

                // then
                expect(controlArray.length).eq(2)
            })

            it('should correctly update and emit value change', () => {
                // given
                const controlArray = new FormArray([
                    new FormControl('first value', [Validators.required()])
                ])
                const oldValue = controlArray.getValue()
                let emittedValue: any[] | null = null

                controlArray.onValueChanges((value) => {
                    emittedValue = value
                })
                const expectedValue = ['first value', 'second value'];

                // when
                controlArray.pushElement(new FormControl('second value'))

                // then
                expect(oldValue.sort()).not.toEqual(expectedValue)
                expect(emittedValue).not.eq(null)
                // @ts-ignore
                expect(emittedValue).toEqual(expectedValue)
                expect(controlArray.getValue().sort()).toEqual(expectedValue)
            })

            it('should correctly update and emit validity change', () => {
                // given
                const controlArray = new FormArray([
                    new FormControl('first value'),
                    new FormControl('second value')
                ])

                const currentValidity = controlArray.getIsValid()
                let emittedValidity: boolean | null = null
                controlArray.onValidityChanges((isValid) => {
                    emittedValidity = !!isValid
                })

                // when
                controlArray.pushElement(new FormControl('', [Validators.required()]))

                // then
                expect(currentValidity).toBe(true);
                expect(emittedValidity).toBe(false);
                expect(controlArray.getIsValid()).toBe(false);
            })
        })
    })
})