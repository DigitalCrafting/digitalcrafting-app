import * as React from 'react';
import {UiSize} from "../../types/UiSizes";

interface TextProps {
    className?: string,
    'data-testid'?: string
    size?: UiSize
    bold?: boolean
}

export function Text({ children, className = '', 'data-testid': dataTestId, size = UiSize.MD, bold = false}: React.PropsWithChildren<TextProps>) {
    const boldClass = bold ? 'z-text-bold' : '';

    return <span
        className={`z-text z-text-${size} ${boldClass} ${className}`.trim()}
        data-testid={dataTestId}
    >{children}</span>
}

interface HeaderProps {
    className?: string,
    'data-testid'?: string
}

export function H1({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<HeaderProps>) {
    return <h1 className={`z-h1 ${className}`.trim()} data-testid={dataTestId}>{children}</h1>
}

export function H2({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<HeaderProps>) {
    return <h2 className={`z-h2 ${className}`.trim()} data-testid={dataTestId}>{children}</h2>
}

export function H3({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<HeaderProps>) {
    return <h3 className={`z-h3 ${className}`.trim()} data-testid={dataTestId}>{children}</h3>
}

export function H4({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<HeaderProps>) {
    return <h4 className={`z-h4 ${className}`.trim()} data-testid={dataTestId}>{children}</h4>
}

export function H5({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<HeaderProps>) {
    return <h5 className={`z-h5 ${className}`.trim()} data-testid={dataTestId}>{children}</h5>
}

export function H6({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<HeaderProps>) {
    return <h6 className={`z-h z-h6 ${className}`.trim()} data-testid={dataTestId}>{children}</h6>
}