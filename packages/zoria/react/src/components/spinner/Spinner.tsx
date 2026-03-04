import * as React from "react";
import {UiSize} from "../../types/UiSizes";

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
    className?: string
    size?: UiSize
}

export const SpinnerCircle = ({className: externalClassName = '', size = UiSize.MD, ...rest}: SpinnerProps) => {
    return <svg
        className={`z-spinner z-spinner-${size} ${externalClassName}`.trim()}
        stroke="currentColor"
        {...rest}
        viewBox="0 0 24 24"
    >
        <g className="z-spinner-circle">
            <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"/>
        </g>
    </svg>;
}

export const SpinnerLeaves = ({className: externalClassName = '', size = UiSize.MD, ...rest}: SpinnerProps) => {
    return <svg
        className={`z-spinner z-spinner-${size} ${externalClassName}`.trim()}
        fill="currentColor"
        {...rest}
        viewBox="0 0 24 24"
    >
        <g className="z-spinner-leaves">
            <rect x="11" y="1" width="2" height="5" opacity=".08"/>
            <rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".16"/>
            <rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".25"/>
            <rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".33"/>
            <rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".41"/>
            <rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".50"/>
            <rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)" opacity=".58"/>
            <rect x="11" y="1" width="2" height="5" transform="rotate(210 12 12)" opacity=".66"/>
            <rect x="11" y="1" width="2" height="5" transform="rotate(240 12 12)" opacity=".75"/>
            <rect x="11" y="1" width="2" height="5" transform="rotate(270 12 12)" opacity=".83"/>
            <rect x="11" y="1" width="2" height="5" transform="rotate(300 12 12)" opacity=".91"/>
            <rect x="11" y="1" width="2" height="5" transform="rotate(330 12 12)"/>
        </g>
    </svg>;
}

