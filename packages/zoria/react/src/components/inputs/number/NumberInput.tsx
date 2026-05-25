import * as React from 'react';
import type {ChangeEvent, KeyboardEventHandler} from 'react';
import {Input, type InputProps} from "../Input";
import {noop} from "../../../utils/Utils";

interface NumberInputProps extends Omit<InputProps, 'type' | 'inputMode' | 'onChange'> {
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>
    onChange?: (value?: number) => void;
    disableNegative?: boolean
}

const NumberInput = ({children, onKeyDown: externalOnKeyDown = noop, onChange = noop, disableNegative = false, ...props}: NumberInputProps) => {
    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        const functionalKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];
        const {key, target: inputEl} = event;

        if (functionalKeys.includes(event.key)) return;

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
            onChange(undefined);
            return;
        }

        const valueAsNumber = Number(value);
        if (isNaN(valueAsNumber) || (disableNegative && valueAsNumber < 0)) {
            return;
        }
        onChange(valueAsNumber);
    }

    return <Input {...props} onChange={internalOnChange} onKeyDown={onKeyDown} type='text'
                  inputMode='numeric'>{children}</Input>
}

export {NumberInput};
export type {NumberInputProps};
