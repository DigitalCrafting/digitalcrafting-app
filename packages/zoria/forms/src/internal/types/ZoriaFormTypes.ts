import type {ValidationError} from "../../validators/ValidatorsTypes.ts";

export type EventConfig = {
    emit?: boolean,
    bubbleUp?: boolean
}

export type FormValidationError = ValidationError

export const FormElementTypeEnum = {
    FORM_GROUP: 'FORM_GROUP',
    FORM_ARRAY: 'FORM_ARRAY',
    FORM_CONTROL: 'FORM_CONTROL'
}
export type FormElementTypeEnum = (typeof FormElementTypeEnum)[keyof typeof FormElementTypeEnum];
