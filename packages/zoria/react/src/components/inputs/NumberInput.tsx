import * as React from 'react';
import type {KeyboardEventHandler} from 'react';
import {Input, type InputProps} from "./Input";
import {noop} from "../../utils/Utils";

interface NumberInputProps extends Omit<InputProps, 'type' | 'inputMode'> {
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}

const NumberInput = ({children, onKeyDown: externalOnKeyDown = noop, ...props}: NumberInputProps) => {
    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        const functionalKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];
        if (functionalKeys.includes(event.key)) return;

        const isNumber = /^[0-9]$/.test(event.key);

        const isScientificSymbol = /^[.eE+-]$/.test(event.key);

        if (!isNumber && !isScientificSymbol) {
            event.preventDefault();
        }
    }

    return <Input {...props} onKeyDown={onKeyDown} type='text' inputMode='numeric'>{children}</Input>
}

export {NumberInput};