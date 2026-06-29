import {describe, expect, it} from "vitest";
import {createForm, ZArray, ZNumber, ZObject, ZString} from "./ZoriaFormsBuilder.ts";
import type {ZoriaFormArray} from "../internal/impl/ZoriaFormArray.ts";

describe('ZoriaFormsBuilder', () => {
    it('should build form', () => {
        // given
        const formDefinition = ZObject().withFields({
            customer: ZObject().required().withFields({
                firstName: ZString().required().maxLength(20),
                lastName: ZString().required().minLength(3)
            }),
            addresses: ZArray().of(
                ZObject().withFields({
                    street: ZString().required().maxLength(20),
                    homeNbr: ZNumber().required().max(1000).min(0),
                })
            )
        });

        const formValue = {
            customer: {
                firstName: 'John',
                lastName: 'Doe'
            },
            addresses: [
                {
                    street: 'None',
                    homeNbr: 24
                },{
                    street: 'Non-existent',
                    homeNbr: 59
                },
            ]
        };

        // when
        const form = createForm(formDefinition);
        form.setValue(formValue);

        // then
        expect(form).toBeTruthy();
        expect(JSON.stringify(form.getValue())).toEqual(JSON.stringify(formValue));
    });

    describe('ZArray', () => {
        it('should build form array', () => {
            // given
            const def = ZArray().of(ZString());

            // when
            const formArray = createForm(def);

            // then
            expect(formArray).toBeTruthy();
            expect(formArray.getType()).toEqual('FORM_ARRAY');
        });

        it('should build form array with default value', () => {
            // given
            const defaultValue = ['Value 1', 'Value 2'];
            const def = ZArray().of(ZString()).defaultValue(defaultValue);

            // when
            const formArray = createForm(def);
            const value = formArray.getValue();

            // then
            expect(value).toEqual(defaultValue);
        });

        it('should build form array with minLength and maxLength', () => {
            // given
            const defaultValue = ['Value 1', 'Value 2'];
            const def = ZArray()
                .of(ZString())
                .defaultValue(defaultValue)
                .minLength(2)
                .maxLength(2);

            // when
            const formArray = createForm(def) as ZoriaFormArray;

            // then
            expect(formArray.canAdd()).toBe(false);
            expect(formArray.canRemove()).toBe(false);
        });
    })
})