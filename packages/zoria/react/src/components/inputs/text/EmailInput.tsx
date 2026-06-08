import * as React from 'react';
import {Input, type InputProps} from "../Input";
import {type ChangeEvent, type KeyboardEventHandler, useState} from "react";
import {noop} from "../../../utils/Utils";

interface EmailInputProps extends Omit<InputProps, 'type' | 'inputMode' | 'onChange'> {
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>
    onChange?: (value?: string) => void;
    invalidMailMessage?: string;
}

const blockedEmailKeysRegex = /[^a-zA-Z0-9@._+\-!#$%&'*\/=?^`{|}~]/;
const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const EmailInput = ({children, onKeyDown: externalOnKeyDown = noop, onChange = noop, invalidMailMessage = "Email invalid", ...props}: EmailInputProps) => {
    const [error, setError] = useState<string | undefined>();

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        const functionalKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];

        if (functionalKeys.includes(event.key)) return;

        if (blockedEmailKeysRegex.test(event.key)) {
            event.preventDefault();
        }
    }

    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (!value) {
            setError(undefined);
            return;
        }

        const isValid = emailValidationRegex.test(event.target.value);
        setError(!isValid ? invalidMailMessage : undefined);
    };

    const internalOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (!value) {
            onChange(undefined);
            return;
        }
        const isValid = emailValidationRegex.test(value);
        if (isValid) {
            setError(undefined);
        }
        onChange(value);

    }

    return <Input placeholder="example@mail.com" error={error} {...props} onChange={internalOnChange} onKeyDown={onKeyDown} onBlur={onBlur} type='email'
                  inputMode='email'>{children}</Input>
}

export {EmailInput};
export type {EmailInputProps};