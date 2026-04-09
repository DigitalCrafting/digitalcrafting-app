import * as React from 'react';
import {type Ref} from 'react';
import {CryptoUtils} from "../../utils/Utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    'data-testid'?: string
    label?: string
    error?: string
    id?: string
    disabled?: boolean
    onChange?: (value: any) => void
    children?: React.ReactNode;
    ref?: Ref<HTMLInputElement>
}

export const Input = ({
    className: externalClassName = '',
    'data-testid': dataTestId,
    label,
    error,
    id,
    disabled,
    onChange,
    children,
    ...inputProps
}: InputProps) => {
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
            <input className='z-input' {...inputProps} id={id} disabled={disabled} onChange={(e) => onChange?.(e.target.value)}/>
            {children}
        </div>
        {
            error ? <span className='z-input-error'>{error}</span> : null
        }
    </div>
}