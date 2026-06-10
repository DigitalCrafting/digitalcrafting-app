export type ValidationError = string | null

/* TODO types */
export type ValidatorFunc = (value: any, message?: string, control?: any) => ValidationError

export interface ValidatorsComposition<T = any> {
    validate(value: T): ValidationError;
}

export const BuiltInValidators = {
    REQUIRED: 'REQUIRED',
    MIN_LENGTH: 'MIN_LENGTH',
    MAX_LENGTH: 'MAX_LENGTH',
    MIN_VALUE: 'MIN_VALUE',
    MAX_VALUE: 'MAX_VALUE'
} as const;
export type BuiltInValidators = (typeof BuiltInValidators)[keyof typeof BuiltInValidators];

export const DEFAULT_VALIDATION_ERRORS: Record<BuiltInValidators, string> = {
    REQUIRED: 'Field is required',
    MIN_LENGTH: "Field's value is too short",
    MAX_LENGTH: "Field's value is too long",
    MIN_VALUE: "Field's value is too small",
    MAX_VALUE: "Field's value is too big",
}