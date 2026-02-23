import * as React from 'react';

interface ToggleProps extends React.InputHTMLAttributes<HTMLLabelElement>{
    children: string
}

export function Toggle({children, disabled, onClick, className: externalClassName = '', checked}: ToggleProps) {
    return <label className={`z-toggle ${externalClassName}`} onClick={onClick}>
        <input type='checkbox' disabled={disabled} checked={checked}/>
        <span className='z-toggle-slider'/>
        <span className='z-toggle-label'>{children}</span>
    </label>
}