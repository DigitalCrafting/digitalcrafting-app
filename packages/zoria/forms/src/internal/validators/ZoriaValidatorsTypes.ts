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
    MIN_LENGTH: "Field value is too short",
    MAX_LENGTH: "Field value is too long",
    MIN_VALUE: "Field value is too small",
    MAX_VALUE: "Field value is too big",
}