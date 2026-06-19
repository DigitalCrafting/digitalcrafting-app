//@ts-nocheck
import {ZoriaFormGroup} from "../internal/impl/ZoriaFormGroup.ts";
import {ZoriaValidators} from "../internal/validators/ZoriaValidators.ts";
import {FormElementTypeEnum, type ValidatorFunc} from "../internal/types/ZoriaFormElement.ts";
import {DEFAULT_VALIDATION_ERRORS} from "../internal/validators/ZoriaValidatorsTypes.ts";
import type {AbstractZoriaFormElement} from "../internal/impl/AbstractZoriaFormElement.ts";
import {ZoriaFormControl} from "../internal/impl/ZoriaFormControl.ts";
import {ZoriaFormArray} from "../internal/impl/ZoriaFormArray.ts";

type ZoriaFormElementBaseType = {
    /* required is separate, because requirement is rather useful information to have at hand */
    requiredValidator?: ValidatorFunc,
    validators: ValidatorFunc[]
}

interface ZoriaFormGroupType extends ZoriaFormElementBaseType {
    type: FormElementTypeEnum.FORM_GROUP;
    fields: ZoriaFormSchemaType;
}

interface ZoriaFormArrayType extends ZoriaFormElementBaseType {
    type: FormElementTypeEnum.FORM_ARRAY
    template: ZoriaFormElementType
}

interface ZoriaFormControlType extends ZoriaFormElementBaseType {
    type: FormElementTypeEnum.FORM_CONTROL
}

interface ZoriaFormElementType {
    config: {
        type: ZoriaFormElementType
    }
}

type ZoriaFormSchemaType = {
    [key: string]: ZoriaFormElementType
}

class ZObjectDefinition implements ZoriaFormElementType {
    config: ZoriaFormGroupType = {
        type: FormElementTypeEnum.FORM_GROUP,
        requiredValidator: undefined,
        fields: {},
        validators: []
    }

    withField(path: string, field: ZoriaFormElementType) {
        this.config.fields[path] = field;
        return this;
    }

    withFields(fields: ZoriaFormSchemaType) {
        this.config.fields = {
            ...this.config.fields,
            ...fields
        };
        return this;
    }

    withValidator(validator: ValidatorFunc) {
        this.config.validators.push(validator);
        return this;
    }

    /* TODO object required validator */
    required(message = DEFAULT_VALIDATION_ERRORS.REQUIRED) {
        this.config.requiredValidator = ZoriaValidators.required(message);
        return this;
    }
}

class ZArrayDefinition implements ZoriaFormElementType {
    config: ZoriaFormArrayType = {
        type: FormElementTypeEnum.FORM_ARRAY,
        template: undefined as ZoriaFormElementType,
        requiredValidator: undefined,
        validators: []
    }

    of(template: ZoriaFormElementType) {
        this.config.template = template;
        return this;
    }

    withValidator(validator: ValidatorFunc) {
        this.config.validators.push(validator);
        return this;
    }

    /* TODO array required validator */
    required(message = DEFAULT_VALIDATION_ERRORS.REQUIRED) {
        this.config.requiredValidator = ZoriaValidators.required(message);
        return this;
    }
}

class ZControlDefinition implements ZoriaFormElementType {
    config: ZoriaFormControlType = {
        type: FormElementTypeEnum.FORM_CONTROL,
        requiredValidator: undefined,
        validators: []
    }

    withValidator(validator: ValidatorFunc) {
        this.config.validators.push(validator);
        return this;
    }

    required(message = DEFAULT_VALIDATION_ERRORS.REQUIRED) {
        this.config.requiredValidator = ZoriaValidators.required(message);
        return this;
    }
}

class ZStringDefinition extends ZControlDefinition {
    minLength(length: number, message: string = DEFAULT_VALIDATION_ERRORS.MIN_LENGTH) {
        this.config.validators.push(ZoriaValidators.minLength(length, message));
        return this;
    }

    maxLength(length: number, message: string = DEFAULT_VALIDATION_ERRORS.MAX_LENGTH) {
        this.config.validators.push(ZoriaValidators.maxLength(length, message));
        return this;
    }
}

class ZNumberDefinition extends ZControlDefinition {
    min(val: number, message: string = DEFAULT_VALIDATION_ERRORS.MIN_VALUE) {
        this.config.validators.push(ZoriaValidators.min(val, message));
        return this;
    }

    max(val: number, message: string = DEFAULT_VALIDATION_ERRORS.MAX_VALUE) {
        this.config.validators.push(ZoriaValidators.max(val, message));
        return this;
    }
}

export const ZObject = () => new ZObjectDefinition();

export const ZArray = () => new ZArrayDefinition();

export const ZString = () => new ZStringDefinition();

export const ZNumber = () => new ZNumberDefinition();

const createFormGroup = (def: ZObjectDefinition) => {
    const formGroupElements: {[key: string]: AbstractZoriaFormElement} = {};

    const fields = def.config.fields;
    for (const element in fields) {
        /* TODO Validators */
        formGroupElements[element] = createForm(fields[element]);
    }

    return new ZoriaFormGroup(formGroupElements);
}

const createFormArray = (def: ZArrayDefinition) => {
    /* TODO Validators */
    const formArray = new ZoriaFormArray();
    formArray.setElementsFactory(() => createFormGroup(def.config.template));
    return formArray;
}

const createFormControl = (def: ZControlDefinition) => {
    /* TODO Validators */
    return new ZoriaFormControl();
}

export const createForm = (schema: ZoriaFormElementType): ZoriaFormGroup => {
    switch (schema.config.type) {
        case FormElementTypeEnum.FORM_GROUP: {
            return createFormGroup(schema);
        }
        case FormElementTypeEnum.FORM_ARRAY: {
            return createFormArray(schema);
        }
        case FormElementTypeEnum.FORM_CONTROL: {
            return createFormControl(schema);
        }
        default: {
            throw new Error(`createForm::Incorrect form element type ${schema}`)
        }
    }
}