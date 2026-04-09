import {Input, type InputProps} from "./Input";
import {noop} from "../../utils/Utils";
import type {ChangeEvent} from "react";

interface TextInputProps extends Omit<InputProps, 'type' | 'onChange'> {
    onChange?: (value: string) => void
}

const TextInput = ({children, onChange = noop, ...props}: TextInputProps) => {
    const internalOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value);
    }

    return <Input {...props} onChange={internalOnChange} type='text'>{children}</Input>
};

export {TextInput};