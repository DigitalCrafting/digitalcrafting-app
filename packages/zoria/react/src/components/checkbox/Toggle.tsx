import * as React from 'react';

interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    children?: string
    onChange?: (value: boolean) => void
}

export function Toggle({children, disabled, onChange, className: externalClassName = '', checked}: ToggleProps) {
    return <label className={`z-toggle ${externalClassName}`} >
        <input type='checkbox' disabled={disabled} checked={checked} onChange={(e) => onChange?.(e.target.checked)}/>
        <span className='z-toggle-slider'/>
        <span className='z-toggle-label'>{children}</span>
    </label>
}