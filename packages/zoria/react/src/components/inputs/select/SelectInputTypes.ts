export const ZoriaSelectEmptyOption = {
    value: undefined,
    display: '',
    searchValue: ''
}

export type NativeSelectOption = {
    value: string
    display: string
} | typeof ZoriaSelectEmptyOption;

/* TODO remove generic ? */
export type ZoriaSelectOption<T = string, D = string> = {
    value: T
    display: D
    searchValue: string
} | typeof ZoriaSelectEmptyOption;
