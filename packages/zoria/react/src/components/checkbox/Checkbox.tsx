import * as React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>{
    children: string,
    onChange?: (value: boolean) => void
}

export function Checkbox({children, disabled, className: externalClassName = '', checked, onChange, ...rest}: CheckboxProps) {
    return <label className={`z-checkbox ${externalClassName}`}>
        <input type='checkbox' disabled={disabled} checked={checked} onChange={(e) => onChange?.(e.target.checked)} {...rest}/>
        <span className='z-checkbox-box'/>
        <span className='z-checkbox-label'>{children}</span>
    </label>
}