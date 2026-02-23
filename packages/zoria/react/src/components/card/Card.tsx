import * as React from 'react';

interface CardProps {
    className?: string
    'data-testid'?: string
}

export function Card({children, className: externalClassName = '', 'data-testid': dataTestId}: React.PropsWithChildren<CardProps>) {
    return <div className={`z-card ${externalClassName}`}
                data-testid={dataTestId}
    >
        {children}
    </div>
}