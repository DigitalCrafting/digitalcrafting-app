import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string
    secondary?: boolean
    'data-testid'?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
({
     children,
     disabled,
     onClick,
     className: externalClassName = '',
     secondary = false,
     'data-testid': dataTestid = 'qa-button'
}: ButtonProps, ref) => {
const buttonStyle = secondary ? 'z-button-secondary' : 'z-button-primary';

return <button ref={ref} data-testid={dataTestid} role="button"
               className={`z-button ${buttonStyle} ${externalClassName}`} onClick={onClick}
               disabled={disabled}>{children}</button>
}
)