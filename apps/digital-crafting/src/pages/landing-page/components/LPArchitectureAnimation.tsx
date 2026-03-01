import * as React from "react";

export const LPArchitectureAnimation = () => {
    return <svg
        id='architectureAnimation'
        viewBox='0 0 700 700'
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <defs>
            <symbol id='server' viewBox='0 0 24 24'>
                <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
                <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
                <line x1="6" x2="6.01" y1="6" y2="6"/>
                <line x1="6" x2="6.01" y1="18" y2="18"/>
            </symbol>
            <symbol id='database' viewBox='0 0 24 24'>
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
                <path d="M3 12A9 3 0 0 0 21 12"/>
            </symbol>
            <symbol id='hardDrive' viewBox='0 0 24 24'>
                <path d="M10 16h.01"/>
                <path
                    d="M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                <path d="M21.946 12.013H2.054"/>
                <path d="M6 16h.01"/>
            </symbol>
            <symbol id='monitor' viewBox='0 0 24 24'>
                <rect width="20" height="14" x="2" y="3" rx="2"/>
                <line x1="8" x2="16" y1="21" y2="21"/>
                <line x1="12" x2="12" y1="17" y2="21"/>
            </symbol>
            <symbol id='laptop' viewBox='0 0 24 24'>
                <path
                    d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/>
                <path d="M20.054 15.987H3.946"/>
            </symbol>
            <symbol id='smartphone' viewBox='0 0 24 24'>
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                <path d="M12 18h.01"/>
            </symbol>
            <symbol id='wifi' viewBox='0 0 24 24'>
                <path d="M12 20h.01"/>
                <path d="M2 8.82a15 15 0 0 1 20 0"/>
                <path d="M5 12.859a10 10 0 0 1 14 0"/>
                <path d="M8.5 16.429a5 5 0 0 1 7 0"/>
            </symbol>
            <symbol id='router' viewBox='0 0 24 24'>
                <rect width="20" height="8" x="2" y="14" rx="2"/>
                <path d="M6.01 18H6"/>
                <path d="M10.01 18H10"/>
                <path d="M15 10v4"/>
                <path d="M17.84 7.17a4 4 0 0 0-5.66 0"/>
                <path d="M20.66 4.34a8 8 0 0 0-11.31 0"/>
            </symbol>
            <symbol id='satellite' viewBox='0 0 24 24'>
                <path
                    d="m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5"/>
                <path d="M16.5 7.5 19 5"/>
                <path
                    d="m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5"/>
                <path d="M9 21a6 6 0 0 0-6-6"/>
                <path
                    d="M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z"/>
            </symbol>
            <symbol id='network' viewBox='0 0 24 24'>
                <rect x="16" y="16" width="6" height="6" rx="1"/>
                <rect x="2" y="16" width="6" height="6" rx="1"/>
                <rect x="9" y="2" width="6" height="6" rx="1"/>
                <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
                <path d="M12 12V8"/>
            </symbol>
            <symbol id='messageBroker' viewBox='0 0 24 24'>
                <circle cx="12" cy="12" r="3"/>
                <circle cx="12" cy="5" r="2"/>
                <line x1="12" y1="7" x2="12" y2="9"/>
                <circle cx="19" cy="12" r="2"/>
                <line x1="15" y1="12" x2="17" y2="12"/>
                <circle cx="12" cy="19" r="2"/>
                <line x1="12" y1="15" x2="12" y2="17"/>
            </symbol>
        </defs>

        <g id='connections'></g>
        <g id='nodes'>
            <use href='#server' x={300} y={200} width={24} height={24} />
        </g>
        <g id='particles'></g>
    </svg>
}