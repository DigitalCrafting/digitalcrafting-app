import {describe, expect, it} from "vitest";
import {ZoriaFormControl} from "./ZoriaFormControl.ts";
import {ZoriaValidators} from "../validators/ZoriaValidators.ts";

describe('FormControl', () => {
    it('should correctly store value', () => {
        // given
        const control = new ZoriaFormControl('test')

        // when
        const actual = control.getValue()

        // then
        expect(actual).eq('test')
    })

    it('should correctly set value and emit event', () => {
        // given
        const control = new ZoriaFormControl('test');
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
        const control = new ZoriaFormControl('test');
        let emittedValue = null;
        control.onValueChanges((value) => {
            emittedValue = value
        })

        // when
        control.setValue('test 2', {emitEvent: false})
        const actual = control.getValue();

        // then
        expect(actual).eq('test 2');
        expect(emittedValue).eq(null);
    })

    it('should validate field and emit event', () => {
        // given
        const control = new ZoriaFormControl('', [ZoriaValidators.required()])
        let currentIsValid = control.getIsValid()
        control.onValidityChanges((valid) => {
            currentIsValid = valid
        })

        // when
        control.setValue('test')

        // then
        expect(currentIsValid).eq(control.getIsValid())
        expect(currentIsValid).eq(true)
    })
})
