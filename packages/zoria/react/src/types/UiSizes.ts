export const UiSize = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
} as const;
export type UiSize = (typeof UiSize)[keyof typeof UiSize];

export const UiVariant = {
    FILLED: 'filled',
    OUTLINE: 'outline'
} as const;
export type UiVariant = (typeof UiVariant)[keyof typeof UiVariant];

