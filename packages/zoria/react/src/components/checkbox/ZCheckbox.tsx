import React from 'react';

interface ZCheckboxProps extends React.InputHTMLAttributes<HTMLLabelElement>{
    children: string
}

export function ZCheckbox({children, disabled, onClick, className: externalClassName = '', checked}: ZCheckboxProps) {
    return <label className={`z-checkbox ${externalClassName}`} onClick={onClick}>
        <input type='checkbox' disabled={disabled} checked={checked}/>
        <span className='z-checkbox-box'/>
        <span className='z-checkbox-label'>{children}</span>
    </label>
}