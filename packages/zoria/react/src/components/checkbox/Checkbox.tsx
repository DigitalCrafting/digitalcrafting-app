import * as React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement>{
    children: string,
}

export function Checkbox({children, disabled, className: externalClassName = '', checked, onChange, ...rest}: CheckboxProps) {
    return <label className={`z-checkbox ${externalClassName}`}>
        <input type='checkbox' disabled={disabled} checked={checked} onChange={(e) => onChange?.(e)} {...rest}/>
        <span className='z-checkbox-box'/>
        <span className='z-checkbox-label'>{children}</span>
    </label>
}