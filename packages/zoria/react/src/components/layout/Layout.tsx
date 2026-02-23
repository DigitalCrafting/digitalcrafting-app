import * as React from 'react';
import {UiSize} from "../../types/UiSizes";

interface RowProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    gap?: UiSize
}

export function Row({children, gap = UiSize.MD, className: externalClassName = '', ...rest}: React.PropsWithChildren<RowProps>) {
    return <div className={`z-row z-row-${gap} ${externalClassName}`} {...rest}>{children}</div>
}

interface BstColProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    gap?: UiSize;
    span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export function Col({children, span = undefined, gap = UiSize.MD, className: externalClassName = '', ...rest}: React.PropsWithChildren<BstColProps>) {
    let colClassName = `z-col z-col-${gap} `;
    if (span) {
        colClassName += 'z-col-' + span;
    }

    return <div className={`${colClassName} ${externalClassName}`} {...rest}>{children}</div>
}