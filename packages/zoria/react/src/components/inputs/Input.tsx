import {CryptoUtils} from "../../utils/Utils";

interface InputProps {
    className?: string
    'data-testid'?: string
    label?: string
    error?: string
    id?: string
    disabled?: boolean
    onChange?: (value: any) => void
}

export function Input({
    className: externalClassName = '',
    'data-testid': dataTestId,
    label,
    error,
    id,
    disabled,
    onChange
}: InputProps) {
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
        <input className='z-input' id={id} disabled={disabled} onChange={(e) => onChange?.(e.target.value)}/>
        {
            error ? <span className='z-input-error'>{error}</span> : null
        }
    </div>
}