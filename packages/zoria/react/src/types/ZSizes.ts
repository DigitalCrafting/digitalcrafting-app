export const ZSize = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
} as const;
export type ZSize = (typeof ZSize)[keyof typeof ZSize];