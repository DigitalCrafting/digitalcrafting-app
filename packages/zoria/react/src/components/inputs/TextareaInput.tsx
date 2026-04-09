import * as React from "react";
import {CryptoUtils} from "../../utils/Utils";

export interface TextareaInputProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
    className?: string
    'data-testid'?: string
    label?: string
    error?: string
    id?: string
    disabled?: boolean
    onChange?: (value: string) => void
    children?: React.ReactNode;
}

const TextareaInput = ({
    className: externalClassName = '',
    'data-testid': dataTestId,
    label,
    error,
    id,
    disabled,
    onChange,
    children,
    ...textareaProps
}: TextareaInputProps) => {
    if (!id) {
        id = `input-${CryptoUtils.UUID()}`
    }

    if (!dataTestId) {
        dataTestId = `${id}-testId`
    }

    return <div className={`z-input-wrapper ${externalClassName}`}
                data-testid={dataTestId}
    >
        <label className='z-input-label' htmlFor={id}>{label}</label>
        <div className='z-input-container'>
            <textarea className='z-input z-textarea' {...textareaProps} id={id} disabled={disabled}
                      onChange={(e) => onChange?.(e.target.value)}/>
            {children}
        </div>
        {
            error ? <span className='z-input-error'>{error}</span> : null
        }
    </div>
}

export {TextareaInput};