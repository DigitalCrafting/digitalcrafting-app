export interface AutocompleteDropdownOption<T = string, D = string> {
    value: T,
    display: D,
    searchValue: string
}