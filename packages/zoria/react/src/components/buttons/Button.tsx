import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    secondary?: boolean;
    'data-testid'?: string;
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
                       className={`z-button ${buttonStyle} ${externalClassName}`}
                       onClick={onClick}
                       // onKeyDown={onKeyDown}
                       disabled={disabled}>{children}</button>
    }
)
export const TextButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'secondary'>>(
    ({
        children,
        disabled,
        onClick,
        className: externalClassName = '',
        'data-testid': dataTestid = 'qa-text-button'
    }: ButtonProps, ref) => {
        return <button ref={ref} data-testid={dataTestid} role="button"
                       className={`z-button-text ${externalClassName}`}
                       onClick={onClick}
                       disabled={disabled}>{children}</button>
    }
)

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: string
    'data-testid'?: string
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
    ({
        children,
        href,
        className: externalClassName = '',
        'data-testid': dataTestid = 'qa-link-button'
    }: LinkButtonProps, ref) => {

        return <a tabIndex={0} ref={ref} data-testid={dataTestid} role="button"
                  className={`z-button-link ${externalClassName}`} href={href}
        >{children}</a>
    }
)
