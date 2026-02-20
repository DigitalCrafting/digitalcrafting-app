import * as React from 'react';

interface ZToggleProps extends React.InputHTMLAttributes<HTMLLabelElement>{
    children: string
}

export function ZToggle({children, disabled, onClick, className: externalClassName = '', checked}: ZToggleProps) {
    return <label className={`z-toggle ${externalClassName}`} onClick={onClick}>
        <input type='checkbox' disabled={disabled} checked={checked}/>
        <span className='z-toggle-slider'/>
        <span className='z-toggle-label'>{children}</span>
    </label>
}