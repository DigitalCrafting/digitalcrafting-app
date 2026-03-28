import * as React from "react";
import {UiSize, UiVariant} from "../../types/UiSizes";

interface SvgIconBaseProps extends React.SVGProps<SVGSVGElement> {
    size?: UiSize
    variant?: UiVariant
}

export const SvgIconBase = ({children, ...props}: SvgIconBaseProps) => {
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

export const XIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M6 18L18 6"/>
        <path d="M6 6l12 12"/>
    </SvgIconBase>
}

export const ChevronDownIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="m6 9 6 6 6-6"/>
    </SvgIconBase>
}

export const ChevronLeftIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="m15 18-6-6 6-6"/>
    </SvgIconBase>
}

export const ChevronRightIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="m9 18 6-6-6-6"/>
    </SvgIconBase>
}

export const ChevronUpIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="m18 15-6-6-6 6"/>
    </SvgIconBase>
}

export const CalendarIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M8 2v4"/>
        <path d="M16 2v4"/>
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <path d="M3 10h18"/>
    </SvgIconBase>
}

export const CalendarCheckIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M8 2v4"/>
        <path d="M16 2v4"/>
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <path d="M3 10h18"/>
        <path d="m9 16 2 2 4-4"/>
    </SvgIconBase>
}

export const ClockIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M12 6v6l4 2"/>
        <circle cx="12" cy="12" r="10"/>
    </SvgIconBase>
}

export const ClockCheckIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M12 6v6l4 2"/>
        <path d="M22 12a10 10 0 1 0-11 9.95"/>
        <path d="m22 16-5.5 5.5L14 19"/>
    </SvgIconBase>
}

export const CheckIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M20 6 9 17l-5-5"/>
    </SvgIconBase>
}

export const CopyIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </SvgIconBase>
}

export const CopyCheckIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="m12 15 2 2 4-4"/>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </SvgIconBase>
}

export const MenuIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M4 5h16"/>
        <path d="M4 12h16"/>
        <path d="M4 19h16"/>
    </SvgIconBase>
}

export const EllipsisMenuIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <circle cx="12" cy="12" r="1"/>
        <circle cx="12" cy="5" r="1"/>
        <circle cx="12" cy="19" r="1"/>
    </SvgIconBase>
}

export const EllipsisIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <circle cx="12" cy="12" r="1"/>
        <circle cx="19" cy="12" r="1"/>
        <circle cx="5" cy="12" r="1"/>
    </SvgIconBase>
}


export const DatabaseIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
        <path d="M3 12A9 3 0 0 0 21 12"/>
    </SvgIconBase>
}

export const DatabaseBackupIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 12a9 3 0 0 0 5 2.69"/>
        <path d="M21 9.3V5"/>
        <path d="M3 5v14a9 3 0 0 0 6.47 2.88"/>
        <path d="M12 12v4h4"/>
        <path d="M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16"/>
    </SvgIconBase>
}

export const DatabaseSearchIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M21 11.693V5"/>
        <path d="m22 22-1.875-1.875"/>
        <path d="M3 12a9 3 0 0 0 8.697 2.998"/>
        <path d="M3 5v14a9 3 0 0 0 9.28 2.999"/>
        <circle cx="18" cy="18" r="3"/>
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
    </SvgIconBase>
}

export const ServerIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
        <line x1="6" x2="6.01" y1="6" y2="6"/>
        <line x1="6" x2="6.01" y1="18" y2="18"/>
    </SvgIconBase>
}

export const ServerCogIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="m10.852 14.772-.383.923"/>
        <path d="M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923"/>
        <path d="m13.148 9.228.383-.923"/>
        <path d="m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544"/>
        <path d="m14.772 10.852.923-.383"/>
        <path d="m14.772 13.148.923.383"/>
        <path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"/>
        <path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"/>
        <path d="M6 18h.01"/>
        <path d="M6 6h.01"/>
        <path d="m9.228 10.852-.923-.383"/>
        <path d="m9.228 13.148-.923.383"/>
    </SvgIconBase>
}

export const ServerCrashIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/>
        <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"/>
        <path d="M6 6h.01"/>
        <path d="M6 18h.01"/>
        <path d="m13 6-4 6h6l-4 6"/>
    </SvgIconBase>
}

export const ServerOffIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5"/>
        <path d="M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z"/>
        <path d="M22 17v-1a2 2 0 0 0-2-2h-1"/>
        <path d="M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z"/>
        <path d="M6 18h.01"/>
        <path d="m2 2 20 20"/>
    </SvgIconBase>
}

export const ServerClockIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 10v2l1.4 .7"/>
        <path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"/>
        <path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"/>
        <path d="M6 18h.01"/>
        <path d="M6 6h.01"/>
    </SvgIconBase>
}

export const HardDriveIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M10 16h.01"/>
        <path
            d="M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
        <path d="M21.946 12.013H2.054"/>
        <path d="M6 16h.01"/>
    </SvgIconBase>
}

export const HardDriveDownloadIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M12 2v8"/>
        <path d="m16 6-4 4-4-4"/>
        <rect width="20" height="8" x="2" y="14" rx="2"/>
        <path d="M6 18h.01"/>
        <path d="M10 18h.01"/>
    </SvgIconBase>
}

export const HardDriveUploadIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="m16 6-4-4-4 4"/>
        <path d="M12 2v8"/>
        <rect width="20" height="8" x="2" y="14" rx="2"/>
        <path d="M6 18h.01"/>
        <path d="M10 18h.01"/>
    </SvgIconBase>
}


export const MonitorIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <rect width="20" height="14" x="2" y="3" rx="2"/>
        <line x1="8" x2="16" y1="21" y2="21"/>
        <line x1="12" x2="12" y1="17" y2="21"/>
    </SvgIconBase>
}

export const LaptopIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path
            d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/>
        <path d="M20.054 15.987H3.946"/>
    </SvgIconBase>
}

export const SmartphoneIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
        <path d="M12 18h.01"/>
    </SvgIconBase>
}

export const WifiIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M12 20h.01"/>
        <path d="M2 8.82a15 15 0 0 1 20 0"/>
        <path d="M5 12.859a10 10 0 0 1 14 0"/>
        <path d="M8.5 16.429a5 5 0 0 1 7 0"/>
    </SvgIconBase>
}

export const RouterIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <rect width="20" height="8" x="2" y="14" rx="2"/>
        <path d="M6.01 18H6"/>
        <path d="M10.01 18H10"/>
        <path d="M15 10v4"/>
        <path d="M17.84 7.17a4 4 0 0 0-5.66 0"/>
        <path d="M20.66 4.34a8 8 0 0 0-11.31 0"/>
    </SvgIconBase>
}

export const SatelliteIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5"/>
        <path d="M16.5 7.5 19 5"/>
        <path
            d="m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5"/>
        <path d="M9 21a6 6 0 0 0-6-6"/>
        <path
            d="M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z"/>
    </SvgIconBase>
}

export const SatelliteDishIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="M4 10a7.31 7.31 0 0 0 10 10Z"/>
        <path d="m9 15 3-3"/>
        <path d="M17 13a6 6 0 0 0-6-6"/>
        <path d="M21 13A10 10 0 0 0 11 3"/>
    </SvgIconBase>
}

export const NetworkIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <rect x="16" y="16" width="6" height="6" rx="1"/>
        <rect x="2" y="16" width="6" height="6" rx="1"/>
        <rect x="9" y="2" width="6" height="6" rx="1"/>
        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
        <path d="M12 12V8"/>
    </SvgIconBase>
}

export const MessageBrokerIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <circle cx="12" cy="12" r="3"/>

        <circle cx="12" cy="4" r="2"/>
        <line x1="12" y1="7" x2="12" y2="9"/>
        <circle cx="19" cy="8" r="2"/>
        <circle cx="19" cy="16" r="2"/>
        <line x1="15" y1="10" x2="17" y2="9"/>
        <line x1="15" y1="14" x2="17" y2="15"/>
        <circle cx="12" cy="20" r="2"/>
        <line x1="12" y1="15" x2="12" y2="17"/>
    </SvgIconBase>
}

export const TriangleAlertIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
        <path d="M12 9v4"/>
        <path d="M12 17h.01"/>
    </SvgIconBase>
}

export const CircleAlertIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" x2="12" y1="8" y2="12"/>
        <line x1="12" x2="12.01" y1="16" y2="16"/>
    </SvgIconBase>
}

export const CircleCheckIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <circle cx="12" cy="12" r="10"/>
        <path d="m9 12 2 2 4-4"/>
    </SvgIconBase>
}

export const CircleQuestionIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <path d="M12 17h.01"/>
    </SvgIconBase>
}

export const CircleInfoIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
    </SvgIconBase>
}

export const BanIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M4.929 4.929 19.07 19.071"/>
    </SvgIconBase>
}

export const ShareIcon = ({size = undefined, ...props}: SvgIconBaseProps) => {
    const sizeClassName = !!size ? `z-icon-${size}` : '';
    return <SvgIconBase className={`z-icon ${sizeClassName}`} {...props}>
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
    </SvgIconBase>
}



