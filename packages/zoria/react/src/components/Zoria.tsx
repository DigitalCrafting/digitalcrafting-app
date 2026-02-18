import React from "react";
import {ZTooltipProvider} from "./tooltip/ZTooltip";
import {ZModalProvider} from "./modal/ZModal";

interface ZoriaProviderProps {
    children: React.ReactElement
}

export function ZoriaProvider({children}: ZoriaProviderProps) {
    return (
        <ZModalProvider>
            <ZTooltipProvider>
                {children}
            </ZTooltipProvider>
        </ZModalProvider>
    );
}