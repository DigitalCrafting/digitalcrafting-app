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
    compact?: boolean
    children: string | React.ReactNode[]
}

export const Chip = ({
    color = 'primary',
    variant = 'filled',
    className: externalClassName = '',
    compact = false,
    children
}: ChipProps) => {
    const compactClassName = compact ? 'z-chip-compact' : '';
    const className = `z-chip-${color} z-chip-${variant} ${compactClassName} ${externalClassName}`.trim();
    return <span className={`z-chip ${className}`}>{children}</span>
}