//@ts-nocheck
import {FormElementTypeEnum, FormGroup} from "./ZoriaForms.ts";
import {DEFAULT_VALIDATION_ERRORS, type ValidatorFunc} from "../validators/ValidatorsTypes.ts";
import {Validators} from "../validators/Validators.ts";

type ZoriaFormElementBaseType = {
    /* required is separate, because requirement is rather useful information to have at hand */
    requiredValidator?: ValidatorFunc,
    validators: ValidatorFunc[]
}

interface ZoriaFormGroupType extends ZoriaFormElementBaseType {
    type: typeof FormElementTypeEnum.FORM_GROUP,
    fields: ZoriaFormSchemaType
}

interface ZoriaFormArrayType extends ZoriaFormElementBaseType {
    type: typeof FormElementTypeEnum.FORM_ARRAY
    template: ZoriaFormElementType
}

interface ZoriaFormControlType extends ZoriaFormElementBaseType {
    type: typeof FormElementTypeEnum.FORM_CONTROL
}

type ZoriaFormElementType = ZoriaFormGroupType | ZoriaFormArrayType | ZoriaFormControlType;

type ZoriaFormSchemaType = {
    [key: string]: ZoriaFormElementType
}

class ZObjectDefinition {
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
        this.config.requiredValidator = Validators.required(message);
        return this;
    }
}

class ZArrayDefinition {
    private config: ZoriaFormArrayType = {
        type: FormElementTypeEnum.FORM_ARRAY,
        template: undefined as ZoriaFormElementType,
        requiredValidator: undefined,
        validators: []
    }

    of(template: ZoriaFormElementType) {
        if (template != undefined) {
            throw new Error('[ZArray] "of" method can only be called once.')
        }

        this.config.template = template;
        return this;
    }

    withValidator(validator: ValidatorFunc) {
        this.config.validators.push(validator);
        return this;
    }

    /* TODO array required validator */
    required(message = DEFAULT_VALIDATION_ERRORS.REQUIRED) {
        this.config.requiredValidator = Validators.required(message);
        return this;
    }
}

class ZControlDefinition {
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
        this.config.requiredValidator = Validators.required(message);
        return this;
    }
}

class ZStringDefinition extends ZControlDefinition {
    minLength(length: number, message: string = DEFAULT_VALIDATION_ERRORS.MIN_LENGTH) {
        this.config.validators.push(Validators.minLength(length, message));
        return this;
    }

    maxLength(length: number, message: string = DEFAULT_VALIDATION_ERRORS.MAX_LENGTH) {
        this.config.validators.push(Validators.maxLength(length, message));
        return this;
    }
}

class ZNumberDefinition extends ZControlDefinition {
    min(val: number, message: string = DEFAULT_VALIDATION_ERRORS.MIN_VALUE) {
        this.config.validators.push(Validators.min(val, message));
        return this;
    }

    max(val: number, message: string = DEFAULT_VALIDATION_ERRORS.MAX_VALUE) {
        this.config.validators.push(Validators.max(val, message));
        return this;
    }
}

const ZObject = () => new ZObjectDefinition();

const ZArray = () => new ZArrayDefinition();

const ZString = () => new ZStringDefinition();

const ZNumber = () => new ZNumberDefinition();

const createForm = (schema: ZoriaFormSchemaType): FormGroup => {

}

const form = createForm({
    customer: ZObject().required().withValidator(customerValidator).withFields({
        firstName: ZString().required().maxLength(20),
        lastName: ZString().required().minLength(3)
    }),
    addresses: ZArray().of(
        ZObject().withFields({
            street: ZString().required().maxLength(),
            homeNbr: ZNumber().required().max(1000).min(0),
        })
    )
})