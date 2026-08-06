import {Input} from "../Input";
import {noop} from "../../../utils/Utils";
import type {ChangeEvent} from "react";
import {useInputValue} from "../internal/useInputValue";
import {useInputError} from "../internal/useInputError";
import {ZoriaInputProps} from "../ZoriaInputProps";

interface TextInputProps extends ZoriaInputProps<string> {
    children?: any
}

const TextInput = ({
    children,
    value: externalValue = '',
    defaultValue: externalDefaultValue = '',
    onChange: externalOnChange = noop,
    error: externalError,
    isControlled = false,
    "data-testid": dataTestId = 'qa-text-input',
    ...props
}: TextInputProps) => {
    const [value, setValue] = useInputValue(externalValue, externalOnChange, externalDefaultValue, isControlled);
    const [error] = useInputError(externalError);

    const internalOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
    }

    return <Input {...props} data-testid={dataTestId} value={value} error={error} onChange={internalOnChange}
                  type='text'>{children}</Input>
};

export {TextInput};
export type {TextInputProps};
