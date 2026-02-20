import * as React from 'react';
import {ZSize} from "../../types/ZSizes";

interface ZContainerProps {
    size?: ZSize
}

export function ZContainer({children, size = ZSize.MD}: React.PropsWithChildren<ZContainerProps>) {
    return <div className={`z-container-${size}`}>
        {children}
    </div>
}