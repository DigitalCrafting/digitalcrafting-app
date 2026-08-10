import * as React from 'react';
import {type ChangeEvent, type KeyboardEventHandler} from 'react';
import {Input} from "../Input";
import {noop} from "../../../utils/Utils";
import {ZoriaInputProps} from "../ZoriaInputProps";
import {useInputValue} from "../internal/useInputValue";
import {useInputError} from "../internal/useInputError";

interface EmailInputProps extends ZoriaInputProps<string> {
    invalidMailMessage?: string;
    children?: any
}

const blockedEmailKeysRegex = /[^a-zA-Z0-9@._+\-!#$%&'*\/=?^`{|}~]/;
const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const EmailInput = ({
    className: externalClassName = '',
    'data-testid': dataTestId = 'qa-email-input',
    label,
    value: externalValue = '',
    defaultValue: externalDefaultValue = '',
    onChange: externalOnChange = noop,
    error: externalError,
    isControlled = false,
    id,
    disabled,
    children,
    placeholder = 'example@mail.com',
    invalidMailMessage = "Email invalid", ...props
}: EmailInputProps) => {
    const [value, setValue] = useInputValue(externalValue, externalOnChange, externalDefaultValue, isControlled);
    const [error, setError] = useInputError(externalError);

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        const functionalKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];
        if (event.ctrlKey || event.shiftKey) return;

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
        setValue(value);
    }

    return <Input placeholder={placeholder}
                  {...props}
                  error={error}
                  data-testid={dataTestId}
                  value={value}
                  onChange={internalOnChange}
                  onKeyDown={onKeyDown} onBlur={onBlur} type='email'
                  inputMode='email'>{children}</Input>
}

export {EmailInput};
export type {EmailInputProps};