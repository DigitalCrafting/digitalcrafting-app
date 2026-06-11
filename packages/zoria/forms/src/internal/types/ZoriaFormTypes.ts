export type EventConfig = {
    emit?: boolean,
    bubbleUp?: boolean
}

export const FormElementTypeEnum = {
    FORM_GROUP: 'FORM_GROUP',
    FORM_ARRAY: 'FORM_ARRAY',
    FORM_CONTROL: 'FORM_CONTROL'
}
export type FormElementTypeEnumType = (typeof FormElementTypeEnum)[keyof typeof FormElementTypeEnum] | unknown;
