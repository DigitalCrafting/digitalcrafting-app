import * as React from "react";
import {ZUtils} from "../../utils/ZUtils";

interface ZInputProps {
    className?: string
    'data-testid'?: string
    label?: string
    error?: string
    id?: string
    disabled?: boolean
}

export function ZInput({
    className: externalClassName = '',
    'data-testid': dataTestId,
    label,
    error,
    id,
    disabled
}: ZInputProps) {
    if (!id) {
        id = `input-${ZUtils.UUID()}`
    }

    if (!dataTestId) {
        dataTestId = `${id}-testId`
    }

    return <div className={`z-input-wrapper ${externalClassName}`}
                data-testid={dataTestId}
    >
        <label className='z-input-label' htmlFor={id}>{label}</label>
        <input className='z-input' id={id} disabled={disabled}/>
        {
            error ? <span className='z-input-error'>{error}</span> : null
        }
    </div>
}