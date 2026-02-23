import * as React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLLabelElement>{
    children: string
}

export function Checkbox({children, disabled, onClick, className: externalClassName = '', checked}: CheckboxProps) {
    return <label className={`z-checkbox ${externalClassName}`} onClick={onClick}>
        <input type='checkbox' disabled={disabled} checked={checked}/>
        <span className='z-checkbox-box'/>
        <span className='z-checkbox-label'>{children}</span>
    </label>
}