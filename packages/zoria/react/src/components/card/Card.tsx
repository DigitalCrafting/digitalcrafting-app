import * as React from 'react';
import {UiSize} from "../../types/UiSizes";

interface CardProps {
    padding?: UiSize | 'none',
    shadow?: UiSize | 'none',
    className?: string
    'data-testid'?: string
}

export function Card({children, padding = 'md', shadow = 'md', className: externalClassName = '', 'data-testid': dataTestId}: React.PropsWithChildren<CardProps>) {
    return <div className={`z-card z-card-p-${padding} z-card-s-${shadow} ${externalClassName}`}
                data-testid={dataTestId}
    >
        {children}
    </div>
}