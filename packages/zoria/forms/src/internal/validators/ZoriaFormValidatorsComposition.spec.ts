import {beforeEach, describe, expect, it, vi} from 'vitest';
import {ZoriaFormValidatorsComposition} from "./ZoriaFormValidatorsComposition.ts";
import type {FormElement} from "../types/ZoriaFormElement.ts";

describe('ZoriaFormValidatorsComposition', () => {
    let validatorComposition: ZoriaFormValidatorsComposition;

    beforeEach(() => {
        validatorComposition = new ZoriaFormValidatorsComposition();
    })

    it('should add validator', () => {
        // given
        const validator = vi.fn().mockReturnValue('Error');
        const initialSize = validatorComposition.size();

        // when
        validatorComposition.add(validator);

        // then
        expect(initialSize).toBe(0);
        expect(validatorComposition.size()).toBe(1);
    });

    it('should remove validator', () => {
        // given
        const validator = vi.fn().mockReturnValue('Error');
        validatorComposition.add(validator);

        // when
        const initialSize = validatorComposition.size();
        validatorComposition.remove(validator);
        const error = validatorComposition.validate('', vi.mockObject<FormElement<any>>({} as FormElement<any>));

        // then
        expect(initialSize).toBe(1);
        expect(validatorComposition.size()).toBe(0);
        expect(error).toBe(null);
        expect(validator).not.toHaveBeenCalled();
    });

    it('should clear validators', () => {
        // given
        const validator_1 = vi.fn().mockReturnValue('Error_1');
        const validator_2 = vi.fn().mockReturnValue('Error_2');
        validatorComposition.add(validator_1);
        validatorComposition.add(validator_2);

        // when
        const initialSize = validatorComposition.size();
        validatorComposition.clear();
        const error = validatorComposition.validate('', vi.mockObject<FormElement<any>>({} as FormElement<any>));

        // then
        expect(initialSize).toBe(2);
        expect(validatorComposition.size()).toBe(0);
        expect(error).toBe(null);
        expect(validator_1).not.toHaveBeenCalled();
        expect(validator_2).not.toHaveBeenCalled();
    });

    it('should set validators', () => {
        // given
        const validator_1 = vi.fn().mockReturnValue('Error_1');
        const validator_2 = vi.fn().mockReturnValue('Error_2');
        const validator_3 = vi.fn().mockReturnValue('Error_3');
        validatorComposition.add(validator_1);

        // when
        const initialSize = validatorComposition.size();
        validatorComposition.set([validator_2, validator_3]);
        const error = validatorComposition.validate('', vi.mockObject<FormElement<any>>({} as FormElement<any>));

        // then
        expect(initialSize).toBe(1);
        expect(validatorComposition.size()).toBe(2);
        expect(error).toBe('Error_2');
        expect(validator_1).not.toHaveBeenCalled();
        expect(validator_2).toHaveBeenCalled();
    });

    it('should validate and return 1st error', () => {
        // given
        const validator_1 = vi.fn().mockReturnValue('Error_1');
        const validator_2 = vi.fn().mockReturnValue('Error_2');
        const validator_3 = vi.fn().mockReturnValue('Error_3');

        validatorComposition.set([validator_1, validator_2, validator_3]);

        // when
        const error = validatorComposition.validate('', vi.mockObject<FormElement<any>>({} as FormElement<any>));

        // then
        expect(validator_1).toHaveBeenCalled();
        expect(validator_2).not.toHaveBeenCalled();
        expect(validator_3).not.toHaveBeenCalled();
        expect(error).toBe('Error_1');
    });

    it('should validate and return 2nd error', () => {
        // given
        const validator_1 = vi.fn().mockReturnValue(null);
        const validator_2 = vi.fn().mockReturnValue('Error_2');
        const validator_3 = vi.fn().mockReturnValue('Error_3');

        validatorComposition.set([validator_1, validator_2, validator_3]);

        // when
        const error = validatorComposition.validate('', vi.mockObject<FormElement<any>>({} as FormElement<any>));

        // then
        expect(validator_1).toHaveBeenCalled();
        expect(validator_2).toHaveBeenCalled();
        expect(validator_3).not.toHaveBeenCalled();
        expect(error).toBe('Error_2');
    });

    it('should validate and return 3rd error', () => {
        // given
        const validator_1 = vi.fn().mockReturnValue(null);
        const validator_2 = vi.fn().mockReturnValue(null);
        const validator_3 = vi.fn().mockReturnValue('Error_3');

        validatorComposition.set([validator_1, validator_2, validator_3]);

        // when
        const error = validatorComposition.validate('', vi.mockObject<FormElement<any>>({} as FormElement<any>));

        // then
        expect(validator_1).toHaveBeenCalled();
        expect(validator_2).toHaveBeenCalled();
        expect(validator_3).toHaveBeenCalled();
        expect(error).toBe('Error_3');
    });
})