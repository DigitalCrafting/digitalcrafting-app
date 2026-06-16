import {describe, expect, it} from "vitest";
import {createForm, ZArray, ZNumber, ZObject, ZString} from "./ZoriaFormsBuilder.ts";
import type {FormGroup} from "../internal/impl/ZoriaFormGroup.ts";

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
        const form: FormGroup = createForm(formDefinition);
        form.setValue(formValue);

        // then
        expect(form).toBeTruthy();
        expect(JSON.stringify(form.getValue())).toEqual(JSON.stringify(formValue));
    });
})