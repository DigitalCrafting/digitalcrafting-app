import type {ChangeEvent, KeyboardEventHandler} from 'react';
import * as React from 'react';
import {Input} from "../Input";
import {noop} from "../../../utils/Utils";
import {ZoriaInputProps} from "../ZoriaInputProps";
import {useInputValue} from "../internal/useInputValue";
import {useInputError} from "../internal/useInputError";

interface NumberInputProps extends ZoriaInputProps<number> {
    disableNegative?: boolean;
    children?: React.ReactNode
}

const NumberInput = ({
    children,
    className: externalClassName = '',
    'data-testid': dataTestId = 'qa-number-input',
    label,
    value: externalValue,
    defaultValue: externalDefaultValue,
    onChange: externalOnChange = noop,
    error: externalError,
    isControlled = false,
    id,
    disabled,
    disableNegative = false,
    ...props}: NumberInputProps) => {
    const [value, setValue] = useInputValue<number>(externalValue, externalOnChange, externalDefaultValue, isControlled);
    const [error] = useInputError(externalError);

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        const functionalKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];
        const {key, target: inputEl} = event;

        if (functionalKeys.includes(event.key)) return;
        if (event.ctrlKey || event.shiftKey) return;

        const isNumber = /^[0-9]$/.test(event.key);

        const isScientificSymbol = /^[.eE+-]$/.test(event.key);

        if (!isNumber && !isScientificSymbol) {
            event.preventDefault();
        }

        if (key === '-' && disableNegative) {
            const cursorPosition = (inputEl as HTMLInputElement).selectionStart;
            if (cursorPosition === 0) {
                event.preventDefault();
                return;
            }
        }
    }

    const internalOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!value) {
            setValue(undefined);
            return;
        }

        const valueAsNumber = Number(value);
        if (isNaN(valueAsNumber) || (disableNegative && valueAsNumber < 0)) {
            return;
        }
        setValue(valueAsNumber);
    }

    return <Input {...props} data-testid={dataTestId} value={value} error={error} onChange={internalOnChange} onKeyDown={onKeyDown} type='text'
                  inputMode='numeric'>{children}</Input>
}

export {NumberInput};
export type {NumberInputProps};
