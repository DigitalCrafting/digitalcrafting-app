import * as React from "react";
import {TooltipProvider} from "./tooltip/Tooltip";
import {ModalProvider} from "./modal/Modal";

interface ZoriaProviderProps {
    children: React.ReactElement
}

export function ZoriaProvider({children}: ZoriaProviderProps) {
    return (
        <ModalProvider>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </ModalProvider>
    );
}