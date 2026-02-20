import * as React from 'react';
import {ZSize} from "../../types/ZSizes";

interface ZTextProps {
    className?: string,
    'data-testid'?: string
    size?: ZSize
    bold?: boolean
}

export function ZText({ children, className = '', 'data-testid': dataTestId, size = ZSize.MD, bold = false}: React.PropsWithChildren<ZTextProps>) {
    const boldClass = bold ? 'z-text-bold' : '';

    return <span
        className={`z-text z-text-${size} ${boldClass} ${className}`.trim()}
        data-testid={dataTestId}
    >{children}</span>
}

interface ZHeaderProps {
    className?: string,
    'data-testid'?: string
}

export function ZH1({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<ZHeaderProps>) {
    return <h1 className={`z-h1 ${className}`.trim()} data-testid={dataTestId}>{children}</h1>
}

export function ZH2({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<ZHeaderProps>) {
    return <h2 className={`z-h2 ${className}`.trim()} data-testid={dataTestId}>{children}</h2>
}

export function ZH3({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<ZHeaderProps>) {
    return <h3 className={`z-h3 ${className}`.trim()} data-testid={dataTestId}>{children}</h3>
}

export function ZH4({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<ZHeaderProps>) {
    return <h4 className={`z-h4 ${className}`.trim()} data-testid={dataTestId}>{children}</h4>
}

export function ZH5({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<ZHeaderProps>) {
    return <h5 className={`z-h5 ${className}`.trim()} data-testid={dataTestId}>{children}</h5>
}

export function ZH6({children, className = '', 'data-testid': dataTestId}: React.PropsWithChildren<ZHeaderProps>) {
    return <h6 className={`z-h z-h6 ${className}`.trim()} data-testid={dataTestId}>{children}</h6>
}