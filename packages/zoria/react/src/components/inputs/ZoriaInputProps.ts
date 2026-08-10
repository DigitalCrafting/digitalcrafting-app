
export interface ZoriaInputProps<T = any> {
    value?: T;
    defaultValue?: T;
    onChange?: (value?: T) => void;
    isControlled?: boolean

    label?: string;
    className?: string
    'data-testid'?: string
    error?: string
    id?: string
    disabled?: boolean
    placeholder?: string
}