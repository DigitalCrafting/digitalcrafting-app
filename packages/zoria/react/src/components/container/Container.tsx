import * as React from 'react';
import {UiSize} from "../../types/UiSizes";

interface ContainerProps {
    size?: UiSize
}

export function Container({children, size = UiSize.MD}: React.PropsWithChildren<ContainerProps>) {
    return <div className={`z-container-${size}`}>
        {children}
    </div>
}