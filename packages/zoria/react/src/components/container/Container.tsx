import * as React from 'react';
import {UiSize} from "../../types/UiSizes";

export interface ContainerProps {
    size?: UiSize
    className?: string
}

export function Container({children, className = '', size = UiSize.MD}: React.PropsWithChildren<ContainerProps>) {
    return <div className={`z-container z-container-${size} ${className}`}>
        {children}
    </div>
}