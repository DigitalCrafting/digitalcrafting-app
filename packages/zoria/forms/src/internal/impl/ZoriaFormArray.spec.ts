import {describe, expect, it, vi} from 'vitest';
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

    it('should correctly reset value', () => {
        // given
        const control = new ZoriaFormArray([
            new ZoriaFormControl('first value', [ZoriaValidators.required()]),
            new ZoriaFormControl('second value')
        ])
        const expectedModifiedValue = ['different value', 'second value'];
        const expectedResetValue = ['first value', 'second value'];

        // when
        control.getElement('0').setValue('different value');
        const actualModifiedValue = control.getValue();

        // then
        expect(actualModifiedValue.sort()).toEqual(expectedModifiedValue.sort())

        // when
        control.reset();
        const actualResetValue = control.getValue();

        // then
        expect(actualResetValue.sort()).toEqual(expectedResetValue.sort())
    })

    it('should correctly clear value', () => {
        // given
        const control = new ZoriaFormArray([
            new ZoriaFormControl('first value', [ZoriaValidators.required()]),
            new ZoriaFormControl('second value')
        ])
        const expectedValue = [null, null];

        // when
        control.clear();
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

    it('should correctly emit value change event', () => {
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

    it('should correctly validate but not emit value', () => {
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
        controlArray.getElement('0').setValue('new first value', {emitEvent: false})
        const currentValid = controlArray.getIsValid()

        // then
        expect(initialValid).eq(false);
        expect(currentValid).eq(true);
        expect(emittedValid).eq(false);
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

    describe('eventEmitters', () => {
        describe('onValueChanges', () => {
            it('should emit events only once per control when all are updated', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const expectedValue = ['new first value', 'new second value'];

                const formArraySpy = vi.fn();
                const control1Spy = vi.fn();
                const control2Spy = vi.fn();

                control.onValueChanges(formArraySpy);
                control.getElement('0').onValueChanges(control1Spy);
                control.getElement('1').onValueChanges(control2Spy);

                // when
                control.setValue(expectedValue)

                // then
                expect(formArraySpy).toHaveBeenCalledOnce();
                expect(formArraySpy).toHaveBeenCalledWith(['new first value', 'new second value']);
                expect(control1Spy).toHaveBeenCalledOnce();
                expect(control1Spy).toHaveBeenCalledWith('new first value');
                expect(control2Spy).toHaveBeenCalledOnce();
                expect(control2Spy).toHaveBeenCalledWith('new second value');
            })

            it('should emit events only for updated control', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const expectedValue = ['new first value', 'second value'];

                const formArraySpy = vi.fn();
                const control1Spy = vi.fn();
                const control2Spy = vi.fn();

                control.onValueChanges(formArraySpy);
                control.getElement('0').onValueChanges(control1Spy);
                control.getElement('1').onValueChanges(control2Spy);

                // when
                control.setValue(expectedValue)

                // then
                expect(formArraySpy).toHaveBeenCalledOnce();
                expect(formArraySpy).toHaveBeenCalledWith(['new first value', 'second value']);
                expect(control1Spy).toHaveBeenCalledOnce();
                expect(control1Spy).toHaveBeenCalledWith('new first value');
                expect(control2Spy).not.toHaveBeenCalled();
            })

            it('should not emit events', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value', [ZoriaValidators.required()]),
                    new ZoriaFormControl('second value')
                ])
                const expectedValue = ['new first value', 'new second value'];

                const formArraySpy = vi.fn();
                const control1Spy = vi.fn();
                const control2Spy = vi.fn();

                control.onValueChanges(formArraySpy);
                control.getElement('0').onValueChanges(control1Spy);
                control.getElement('1').onValueChanges(control2Spy);

                // when
                control.setValue(expectedValue, {emitEvent: false})

                // then
                expect(formArraySpy).not.toHaveBeenCalled();
                expect(control1Spy).not.toHaveBeenCalled();
                expect(control2Spy).not.toHaveBeenCalled();
            })
        })

        describe('onValidityChanges', () => {
            it('should emit events only once per control when all are updated', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('', [ZoriaValidators.required()]),
                    new ZoriaFormControl('', [ZoriaValidators.required()]),
                ])
                const expectedValue = ['new first value', 'new second value'];

                const formArraySpy = vi.fn();
                const control1Spy = vi.fn();
                const control2Spy = vi.fn();

                control.onValidityChanges(formArraySpy);
                control.getElement('0').onValidityChanges(control1Spy);
                control.getElement('1').onValidityChanges(control2Spy);

                // when
                control.setValue(expectedValue)

                // then
                expect(formArraySpy).toHaveBeenCalledOnce();
                expect(formArraySpy).toHaveBeenCalledWith(true);
                expect(control1Spy).toHaveBeenCalledOnce();
                expect(control1Spy).toHaveBeenCalledWith(true);
                expect(control2Spy).toHaveBeenCalledOnce();
                expect(control2Spy).toHaveBeenCalledWith(true);
            })

            it('should emit events only for updated control', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('', [ZoriaValidators.required()]),
                    new ZoriaFormControl('second value')
                ])
                const expectedValue = ['new first value', 'second value'];

                const formArraySpy = vi.fn();
                const control1Spy = vi.fn();
                const control2Spy = vi.fn();

                control.onValidityChanges(formArraySpy);
                control.getElement('0').onValidityChanges(control1Spy);
                control.getElement('1').onValidityChanges(control2Spy);

                // when
                control.setValue(expectedValue)

                // then
                expect(formArraySpy).toHaveBeenCalledOnce();
                expect(formArraySpy).toHaveBeenCalledWith(true);
                expect(control1Spy).toHaveBeenCalledOnce();
                expect(control1Spy).toHaveBeenCalledWith(true);
                expect(control2Spy).not.toHaveBeenCalled();
            })

            it('should not emit events', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value', [ZoriaValidators.required()]),
                    new ZoriaFormControl('second value')
                ])
                const expectedValue = ['new first value', 'new second value'];

                const formArraySpy = vi.fn();
                const control1Spy = vi.fn();
                const control2Spy = vi.fn();

                control.onValidityChanges(formArraySpy);
                control.getElement('0').onValidityChanges(control1Spy);
                control.getElement('1').onValidityChanges(control2Spy);

                // when
                control.setValue(expectedValue, {emitEvent: false})

                // then
                expect(formArraySpy).not.toHaveBeenCalled();
                expect(control1Spy).not.toHaveBeenCalled();
                expect(control2Spy).not.toHaveBeenCalled();
            })
        })

        describe('onErrorChanges', () => {
            it('should emit events only once per control when all are updated', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('', [ZoriaValidators.required()]),
                    new ZoriaFormControl('', [ZoriaValidators.required()]),
                ])
                const expectedValue = ['new first value', 'new second value'];

                const formArraySpy = vi.fn();
                const control1Spy = vi.fn();
                const control2Spy = vi.fn();

                control.onErrorChanges(formArraySpy);
                control.getElement('0').onErrorChanges(control1Spy);
                control.getElement('1').onErrorChanges(control2Spy);

                // when
                control.setValue(expectedValue)

                // then
                expect(formArraySpy).toHaveBeenCalledOnce();
                expect(formArraySpy).toHaveBeenCalledWith(null);
                expect(control1Spy).toHaveBeenCalledOnce();
                expect(control1Spy).toHaveBeenCalledWith(null);
                expect(control2Spy).toHaveBeenCalledOnce();
                expect(control2Spy).toHaveBeenCalledWith(null);
            })

            it('should emit events only for updated control', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('', [ZoriaValidators.required()]),
                    new ZoriaFormControl('first value'),
                ])
                const expectedValue = ['new first value', 'second value'];

                const formArraySpy = vi.fn();
                const control1Spy = vi.fn();
                const control2Spy = vi.fn();

                control.onErrorChanges(formArraySpy);
                control.getElement('0').onErrorChanges(control1Spy);
                control.getElement('1').onErrorChanges(control2Spy);

                // when
                control.setValue(expectedValue)

                // then
                expect(formArraySpy).toHaveBeenCalledOnce();
                expect(formArraySpy).toHaveBeenCalledWith(null);
                expect(control1Spy).toHaveBeenCalledOnce();
                expect(control1Spy).toHaveBeenCalledWith(null);
                expect(control2Spy).not.toHaveBeenCalled();
            })

            it('should not emit events', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value', [ZoriaValidators.required()]),
                    new ZoriaFormControl('second value')
                ])
                const expectedValue = ['new first value', 'new second value'];

                const formArraySpy = vi.fn();
                const control1Spy = vi.fn();
                const control2Spy = vi.fn();

                control.onErrorChanges(formArraySpy);
                control.getElement('0').onErrorChanges(control1Spy);
                control.getElement('1').onErrorChanges(control2Spy);

                // when
                control.setValue(expectedValue, {emitEvent: false})

                // then
                expect(formArraySpy).not.toHaveBeenCalled();
                expect(control1Spy).not.toHaveBeenCalled();
                expect(control2Spy).not.toHaveBeenCalled();
            })
        })
    })
})