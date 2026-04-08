import * as React from 'react';
import {useContext, useEffect, useRef} from 'react';
import {createPortal} from "react-dom";
import {useFloatingUiPositioning} from "../../hooks/useFloatingUiPositioning";
import {UiSize} from "../../types/UiSizes";

interface PopoverContextType {
    persistent: boolean,
    open: boolean,
    setOpen: (open: boolean) => void;
    triggerRef: React.RefObject<HTMLDivElement | HTMLButtonElement | null> | undefined
}

const PopoverContext = React.createContext<PopoverContextType>({} as PopoverContextType);

function usePopoverContext() {
    return useContext(PopoverContext);
}

interface PopoverTriggerProps {
    children: React.ReactElement<any>,
    content?: React.ReactElement<typeof PopoverBody>
}

function PopoverTrigger({children}: PopoverTriggerProps) {
    const {open, setOpen, triggerRef} = usePopoverContext();

    const triggerEl = React.cloneElement(children, {
        ref: triggerRef,
        open,
        'aria-expanded': open,
        'aria-haspopup': 'dialog',
        'data-state': open ? 'open' : 'closed',
        onClick: () => setOpen(!open)
    });

    return triggerEl;
}

interface PopoverBodyProps {
    padding?: UiSize | 'none'
}

function PopoverBody({children, padding = 'md'}: React.PropsWithChildren<PopoverBodyProps>) {
    const popoverRef = useRef<HTMLDivElement>(null);
    const {open, setOpen, triggerRef, persistent} = usePopoverContext();

    useFloatingUiPositioning(triggerRef, popoverRef, 'bottom');

    useEffect(() => {
        if (!open || persistent) {
            return;
        }

        const callback = (event: PointerEvent) => {
            const target = event.target as Node;
            const popoverEl = popoverRef.current;
            const triggerEl =
                typeof triggerRef === 'object' ? triggerRef.current : null;

            if (!popoverEl) return;

            if (
                popoverEl.contains(target) ||
                triggerEl?.contains(target)
            ) {
                return;
            }

            setOpen(false);
        };
        document.addEventListener('pointerdown', callback);
        return () => {
            document.removeEventListener('pointerdown', callback);
        }
    }, [open, persistent]);

    const visibilityClassName = open ? 'z-tooltip-visible' : 'z-tooltip-hidden';

    return <>{createPortal(
        <div ref={popoverRef}
             role="dialog"
             className={`z-popover z-popover-body z-popover-p-${padding} ${visibilityClassName}`}
        >
            {children}
        </div>,
        document.body
    )}
    </>

}

interface PopoverProps {
    persistent?: boolean,
    children: [React.ReactElement<typeof PopoverTrigger>, React.ReactElement<typeof PopoverBody>]
}

function InternalPopover({children, persistent = false}: PopoverProps) {
    const [open, setOpen] = React.useState(false);
    // @ts-ignore
    const triggerRef = React.useRef<HTMLDivElement | HTMLButtonElement>(null);

    return (
        <PopoverContext.Provider value={{open, setOpen, triggerRef, persistent}}>
            {children}
        </PopoverContext.Provider>
    );
}

const Popover = Object.assign(InternalPopover,
    {
        Body: PopoverBody,
        Trigger: PopoverTrigger
    });


export {Popover};