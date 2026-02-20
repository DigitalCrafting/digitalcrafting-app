import * as React from "react";
import type {ZoriaProps} from "../../types/CommonTypes";

interface TopBarProps extends ZoriaProps {
    children?: React.ReactNode
    className?: string

}

export function TopBar({
    children,
    className: externalClassName = ''
}: TopBarProps) {
    return <header className={`z-top-bar ${externalClassName}`}>{children}</header>
}