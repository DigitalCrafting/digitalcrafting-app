import * as React from 'react';

interface ZCardProps {
    className?: string
    'data-testid'?: string
}

export function ZCard({children, className: externalClassName = '', 'data-testid': dataTestId}: React.PropsWithChildren<ZCardProps>) {
    return <div className={`z-card ${externalClassName}`}
                data-testid={dataTestId}
    >
        {children}
    </div>
}