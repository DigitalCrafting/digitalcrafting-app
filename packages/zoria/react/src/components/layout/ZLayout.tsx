import * as React from 'react';
import {ZSize} from "../../types/ZSizes";

interface BstRowProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    gap?: ZSize
}

export function ZRow({children, gap = ZSize.MD, className: externalClassName = '', ...rest}: React.PropsWithChildren<BstRowProps>) {
    return <div className={`z-row z-row-${gap} ${externalClassName}`} {...rest}>{children}</div>
}

interface BstColProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    gap?: ZSize;
    span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export function ZCol({children, span = undefined, gap = ZSize.MD, className: externalClassName = '', ...rest}: React.PropsWithChildren<BstColProps>) {
    let colClassName = `z-col z-col-${gap} `;
    if (span) {
        colClassName += 'z-col-' + span;
    }

    return <div className={`${colClassName} ${externalClassName}`} {...rest}>{children}</div>
}