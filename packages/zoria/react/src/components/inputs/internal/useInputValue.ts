import {useState} from "react";

export type UseInputValueReturnType<V> = [V | undefined, (value?: V) => void];

export function useInputValue<ValueType = any>(externalValue?: ValueType, externalOnChange?: (value?: ValueType) => void, defaultValue?: ValueType, isControlled = false): UseInputValueReturnType<ValueType> {
    const [internalValue, setInternalValue] = useState<ValueType | undefined>(defaultValue);

    let value: ValueType | undefined;
    let setValue: (value?: ValueType) => void;

    if (isControlled) {
        value = externalValue;
        setValue = externalOnChange!;
    } else {
        value = internalValue;
        // @ts-ignore
        setValue = (value?: ValueType) => setInternalValue(value);
    }

    return [value, setValue]
}