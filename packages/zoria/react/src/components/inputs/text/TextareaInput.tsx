import type {ChangeEvent} from "react";
import {CryptoUtils, noop} from "../../../utils/Utils";
import {ZoriaInputProps} from "../ZoriaInputProps";
import {useInputValue} from "../internal/useInputValue";
import {useInputError} from "../internal/useInputError";

interface TextareaInputProps extends ZoriaInputProps<string> {
    children?: any
}

const TextareaInput = ({
    className: externalClassName = '',
    'data-testid': dataTestId = 'qa-textarea-input',
    label,
    value: externalValue = '',
    defaultValue: externalDefaultValue = '',
    onChange: externalOnChange = noop,
    error: externalError,
    isControlled = false,
    id,
    disabled,
    children,
    ...textareaProps
}: TextareaInputProps) => {
    const [value, setValue] = useInputValue(externalValue, externalOnChange, externalDefaultValue, isControlled);
    const [error] = useInputError(externalError);

    if (!id) {
        id = `input-${CryptoUtils.UUID()}`
    }

    const internalOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setValue(value);
    }

    return <div className={`z-input-wrapper ${externalClassName}`}
                data-testid={`${dataTestId}-wrapper`}
    >
        <label className='z-input-label' htmlFor={id}>{label}</label>
        <div className='z-input-container'>
            <textarea className='z-input z-textarea'
                      {...textareaProps}
                      data-testid={dataTestId}
                      id={id}
                      disabled={disabled}
                      value={value}
                      onChange={internalOnChange}/>
            {children}
        </div>
        {
            error ? <span className='z-input-error'>{error}</span> : null
        }
    </div>
}

export {TextareaInput};
export type { TextareaInputProps };
