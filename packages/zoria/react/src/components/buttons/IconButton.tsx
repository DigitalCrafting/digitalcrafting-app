import * as React from 'react';
import {UiSize} from "../../types/UiSizes";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    disabled?: boolean
    size?: UiSize,
    'data-testid'?: string
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
    children,
    disabled = false,
    size = UiSize.MD,
    onClick,
    className: externalClassName = '',
    'data-testid': dataTestId = 'qa-icon-button'
}, ref) => {
    return <button data-testid={dataTestId}
                   ref={ref}
                   disabled={disabled}
                   role='button'
                   className={`z-icon-button z-icon-button-${size} ${externalClassName}`}
                   onClick={onClick}
    >
        {children}
    </button>
})