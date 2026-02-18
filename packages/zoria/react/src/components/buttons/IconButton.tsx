import React from 'react';
import {ZSize} from "../../types/ZSizes.ts";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    disabled?: boolean
    size?: ZSize,
    'data-testid'?: string
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
    children,
    disabled = false,
    size = ZSize.MD,
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