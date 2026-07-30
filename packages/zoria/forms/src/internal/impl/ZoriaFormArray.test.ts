import {afterAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {type FormArrayMetadata, ZoriaFormArray} from "./ZoriaFormArray.ts";
import {ZoriaFormControl} from "./ZoriaFormControl.ts";
import {ZoriaValidators} from "../validators/ZoriaValidators.ts";

describe('FormArray', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    })

    afterAll(() => {
        vi.clearAllMocks();
    })

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

    describe('metadata', () => {
        it('should not add any metadata', () => {
            // given
            const control = new ZoriaFormArray([
                new ZoriaFormControl('first value'),
                new ZoriaFormControl('second value')
            ])
            const metadataSpy = vi.spyOn(control, 'setMetadata');

            // when
            const canAdd = control.canAdd();
            const canRemove = control.canRemove();

            // then
            expect(metadataSpy).not.toHaveBeenCalled();
            expect(canAdd).toBe(true);
            expect(canRemove).toBe(true);
        });

        describe('minLength', () => {
            it('should not add metadata nor validator', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const metadata = {
                    maxLength: {
                        value: 5,
                        message: 'Max length message',
                        validator: vi.fn()
                    }
                }

                // when
                control.setMetadata(metadata);
                control.removeLast();
                control.removeLast();

                // then
                expect(control.canRemove()).toBe(true);
            });

            it('should add metadata and validator via setMetadata', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const metadata: FormArrayMetadata = {
                    minLength: {
                        value: 2,
                        message: 'Min length message',
                        validator: ZoriaValidators.minLength(2, 'Min length message')
                    }
                }

                // when
                control.setMetadata(metadata);

                // then
                expect(control.canRemove()).toBe(false);
            });

            it('should add metadata and validator via setMinLength', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const metadataChangesSpy = vi.fn();

                // when
                control.onMetadataChanges(metadataChangesSpy);
                control.setMinLength(2, 'Min length message');

                // then
                expect(metadataChangesSpy).toHaveBeenCalledOnce();
                expect(control.canRemove()).toBe(false);
            });

            it('should update metadata and validator', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const metadataChangesSpy = vi.fn();

                // when
                control.onMetadataChanges(metadataChangesSpy);
                control.setMinLength(2, 'Min length message');
                const initialCanRemove = control.canRemove();

                control.setMinLength(1, 'Min length message');
                const currentCanRemove = control.canRemove();

                // then
                expect(metadataChangesSpy).toHaveBeenCalledTimes(2);
                expect(initialCanRemove).toBe(false);
                expect(currentCanRemove).toBe(true);
            });

            it('should remove metadata and validator', () => {
                // given
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const metadataChangesSpy = vi.fn();

                // when
                control.onMetadataChanges(metadataChangesSpy);
                control.setMinLength(2, 'Min length message');
                const initialCanRemove = control.canRemove();

                // when
                control.setMinLength(-1);
                const currentCanRemove = control.canRemove();

                // then
                expect(metadataChangesSpy).toHaveBeenCalledTimes(2);
                expect(initialCanRemove).toBe(false);
                expect(currentCanRemove).toBe(true);
            });
        })

        describe('maxLength', () => {
            it('should not add metadata', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const metadata = {
                    minLength: {
                        value: 2,
                        message: 'Min length message',
                        validator: vi.fn()
                    }
                }

                // when
                control.setMetadata(metadata);

                // then
                expect(control.canAdd()).toBe(true);
                expect(control.canRemove()).toBe(false);
            });

            it('should add metadata and validator via setMetadata', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const metadata = {
                    maxLength: {
                        value: 2,
                        message: 'Max length message',
                        validator: ZoriaValidators.maxLength(2, 'Max length message')
                    }
                }

                // when
                control.setMetadata(metadata);

                // then
                expect(control.canAdd()).toBe(false);
            });

            it('should add metadata and validator via setMaxLength', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const metadataChangesSpy = vi.fn();

                // when
                control.onMetadataChanges(metadataChangesSpy);
                control.setMaxLength(2, 'Max length message');

                // then
                expect(metadataChangesSpy).toHaveBeenCalledOnce();
                expect(control.canAdd()).toBe(false);
            });

            it('should update metadata and validator', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const metadataChangesSpy = vi.fn();

                // when
                control.onMetadataChanges(metadataChangesSpy);
                control.setMaxLength(2, 'Max length message');
                const initialCanAdd = control.canAdd();
                control.setMaxLength(3, 'Max length message');
                const currentCanAdd = control.canAdd();

                // then
                expect(metadataChangesSpy).toHaveBeenCalledTimes(2);
                expect(initialCanAdd).toBe(false);
                expect(currentCanAdd).toBe(true);
            });

            it('should remove metadata and validator', () => {
                // given
                const control = new ZoriaFormArray([
                    new ZoriaFormControl('first value'),
                    new ZoriaFormControl('second value')
                ])
                const metadataChangesSpy = vi.fn();

                // when
                control.onMetadataChanges(metadataChangesSpy);
                control.setMaxLength(2, 'Max length message');
                const initialCanAdd = control.canAdd();
                control.setMaxLength(-1);
                const currentCanAdd = control.canAdd();

                // then
                expect(metadataChangesSpy).toHaveBeenCalledTimes(2);
                expect(initialCanAdd).toBe(false);
                expect(currentCanAdd).toBe(true);
            });
        })

        describe('required', () => {
            it('should not add metadata', () => {
                // given
                // when
                // then
            });

            it('should add metadata and validator via setMetadata', () => {
                // given
                // when
                // then
            });

            it('should add metadata and validator via setRequired', () => {
                // given
                // when
                // then
            });

            it('should update metadata and validator', () => {
                // given
                // when
                // then
            });

            it('should remove metadata and validator', () => {
                // given
                // when
                // then
            });
        })
    });
})