export const UiSize = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
} as const;
export type UiSize = (typeof UiSize)[keyof typeof UiSize];