//@ts-nocheck
import {ZoriaFormGroup} from "../internal/impl/ZoriaFormGroup.ts";
import {ZoriaValidators} from "../internal/validators/ZoriaValidators.ts";
import {FormElementTypeEnum, type ValidatorFunc} from "../internal/types/ZoriaFormElement.ts";
import {DEFAULT_VALIDATION_ERRORS} from "../internal/validators/ZoriaValidatorsTypes.ts";
import type {AbstractZoriaFormElement} from "../internal/impl/AbstractZoriaFormElement.ts";
import {ZoriaFormControl} from "../internal/impl/ZoriaFormControl.ts";
import {type FormArrayMetadata, ZoriaFormArray} from "../internal/impl/ZoriaFormArray.ts";

type ZoriaFormElementBaseType = {
    /* required is separate, because requirement is rather useful information to have at hand */
    requiredValidator?: ValidatorFunc,
    validators: ValidatorFunc[]
    defaultValue: any
}

interface ZoriaFormGroupType extends ZoriaFormElementBaseType {
    type: FormElementTypeEnum.FORM_GROUP;
    fields: ZoriaFormSchemaType;
}

interface ZoriaFormArrayType extends ZoriaFormElementBaseType {
    type: FormElementTypeEnum.FORM_ARRAY;
    template: ZoriaFormElementType;
    metadata: FormArrayMetadata;
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
        defaultValue: null,
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

    withDefaultValue(value?: any = null) {
        this.config.defaultValue = value;
        return this;
    }

    required(message = DEFAULT_VALIDATION_ERRORS.REQUIRED) {
        this.config.requiredValidator = ZoriaValidators.required(message);
        return this;
    }
}

class ZArrayDefinition implements ZoriaFormElementType {
    config: ZoriaFormArrayType = {
        defaultValue: null,
        type: FormElementTypeEnum.FORM_ARRAY,
        template: undefined as ZoriaFormElementType,
        requiredValidator: undefined,
        validators: [],
        metadata: {}
    }

    of(template: ZoriaFormElementType) {
        this.config.template = template;
        return this;
    }

    withValidator(validator: ValidatorFunc) {
        this.config.validators.push(validator);
        return this;
    }

    defaultValue(value?: any[] = null) {
        this.config.defaultValue = value;
        return this;
    }

    required(message = DEFAULT_VALIDATION_ERRORS.REQUIRED) {
        this.config.metadata.required = {value: true, message, validator: ZoriaValidators.arrayRequired(message)};
        return this;
    }

    minLength(value: number, message = DEFAULT_VALIDATION_ERRORS.MIN_LENGTH) {
        this.config.metadata.minLength = {value, message, validator: ZoriaValidators.minLength(value, message)};
        return this;
    }

    maxLength(value: number, message = DEFAULT_VALIDATION_ERRORS.MAX_LENGTH) {
        this.config.metadata.maxLength = {value, message, validator: ZoriaValidators.maxLength(value, message)};
        return this;
    }
}

class ZControlDefinition implements ZoriaFormElementType {
    config: ZoriaFormControlType = {
        defaultValue: null,
        type: FormElementTypeEnum.FORM_CONTROL,
        requiredValidator: undefined,
        validators: []
    }

    withValidator(validator: ValidatorFunc) {
        this.config.validators.push(validator);
        return this;
    }

    withDefaultValue(value?: any = null) {
        this.config.defaultValue = value;
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
    formArray.setElementsFactory(() => createForm(def.config.template));
    formArray.setMetadata(def.config.metadata);
    formArray.setDefaultValue(def.config.defaultValue);
    return formArray;
}

const createFormControl = (def: ZControlDefinition) => {
    /* TODO Validators */
    return new ZoriaFormControl();
}

export const createForm = (schema: ZoriaFormElementType): AbstractZoriaFormElement => {
    switch (schema.config.type) {
        case FormElementTypeEnum.FORM_GROUP: {
            return createFormGroup(schema) as ZoriaFormGroup;
        }
        case FormElementTypeEnum.FORM_ARRAY: {
            return createFormArray(schema) as ZoriaFormArray;
        }
        case FormElementTypeEnum.FORM_CONTROL: {
            return createFormControl(schema) as ZoriaFormControl;
        }
        default: {
            throw new Error(`createForm::Incorrect form element type ${schema}`)
        }
    }
}