import * as React from "react";
import {UiVariant} from "../../types/UiSizes";

type ChipColor = |
    'primary' |
    'secondary' |
    'error' |
    'warning' |
    'info' |
    'success';

interface ChipProps {
    className?: string,
    color?: ChipColor,
    variant?: UiVariant,
    children: string | React.ReactNode[]
}

export const Chip = ({
    color = 'primary',
    variant = 'filled',
    className: externalClassName = '',
    children
}: ChipProps) => {
    const className = `z-chip-${color} z-chip-${variant} ${externalClassName}`.trim();
    return <span className={`z-chip ${className}`}>{children}</span>
}