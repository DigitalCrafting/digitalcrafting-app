import * as React from "react";
import {ZSize} from "../../types/ZSizes";

interface SvgIconBaseProps extends React.SVGProps<SVGSVGElement> {
    size?: ZSize
}

export function SvgIconBase({children, ...props}: SvgIconBaseProps) {
    return (<svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable={false}
        {...props}
    >
        {children}
    </svg>);
}

export function XIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="M6 18L18 6"/>
        <path d="M6 6l12 12"/>
    </SvgIconBase>
}

export function ChevronDownIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="m6 9 6 6 6-6"/>
    </SvgIconBase>
}

export function ChevronLeftIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="m15 18-6-6 6-6"/>
    </SvgIconBase>
}

export function ChevronRightIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="m9 18 6-6-6-6"/>
    </SvgIconBase>
}

export function ChevronUpIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="m18 15-6-6-6 6"/>
    </SvgIconBase>
}

export function CalendarIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="M8 2v4"/>
        <path d="M16 2v4"/>
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <path d="M3 10h18"/>
    </SvgIconBase>
}

export function CalendarCheckIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="M8 2v4"/>
        <path d="M16 2v4"/>
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <path d="M3 10h18"/>
        <path d="m9 16 2 2 4-4"/>
    </SvgIconBase>
}

export function ClockIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="M12 6v6l4 2"/>
        <circle cx="12" cy="12" r="10"/>
    </SvgIconBase>
}

export function ClockCheckIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="M12 6v6l4 2"/>
        <path d="M22 12a10 10 0 1 0-11 9.95"/>
        <path d="m22 16-5.5 5.5L14 19"/>
    </SvgIconBase>
}

export function CheckIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="M20 6 9 17l-5-5"/>
    </SvgIconBase>
}

export function CopyIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </SvgIconBase>
}

export function CopyCheckIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="m12 15 2 2 4-4"/>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </SvgIconBase>
}

export function MenuIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <path d="M4 5h16"/>
        <path d="M4 12h16"/>
        <path d="M4 19h16"/>
    </SvgIconBase>
}

export function EllipsisMenuIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <circle cx="12" cy="12" r="1"/>
        <circle cx="12" cy="5" r="1"/>
        <circle cx="12" cy="19" r="1"/>
    </SvgIconBase>
}

export function EllipsisIcon({size = ZSize.MD, ...props}: SvgIconBaseProps) {
    return <SvgIconBase className={`z-icon z-icon-${size}`} {...props}>
        <circle cx="12" cy="12" r="1"/>
        <circle cx="19" cy="12" r="1"/>
        <circle cx="5" cy="12" r="1"/>
    </SvgIconBase>
}

