import * as React from 'react';
import {
    type Dispatch,
    type Ref,
    type RefObject,
    type SetStateAction,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef
} from 'react';
import {createPortal} from "react-dom";
import {useFloatingUiPositioning} from "../../hooks/useFloatingUiPositioning";
import {FocusTrap} from "../../utils/FocusTrap";

interface PopoverContextType {
    persistent: boolean,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>;
    triggerRef: React.RefObject<HTMLDivElement | HTMLButtonElement | null> | undefined
}

const PopoverContext = React.createContext<PopoverContextType>({} as PopoverContextType);

function usePopoverContext() {
    return useContext(PopoverContext);
}

interface PopoverTriggerProps {
    children: React.ReactElement<any>,
    content?: React.ReactElement<typeof PopoverBody>,
    disabled?: boolean,
}

function PopoverTrigger({children, disabled = false}: PopoverTriggerProps) {
    const {open, setOpen, triggerRef} = usePopoverContext();

    const onClick = () => {
        if (disabled) {
            return;
        }

        setOpen((prev) => {return !prev});
    }

    return <span
        ref={triggerRef}
        aria-expanded={open}
        aria-haspopup='dialog'
        data-state={open ? 'open' : 'closed'}
        onClick={onClick}
    >
        {children}
    </span>;
}

interface PopoverBodyProps {
    trapFocus?: boolean
    disableEscape?: boolean
    positionRef?: RefObject<HTMLElement | null>
    offset?: number
}

function PopoverBody({children, trapFocus = false, disableEscape = false, positionRef, offset }: React.PropsWithChildren<PopoverBodyProps>) {
    const popoverRef = useRef<HTMLDivElement>(null);
    const focusTrapInstanceRef = useRef<FocusTrap<HTMLDivElement>>(FocusTrap.for(popoverRef));
    const {open, setOpen, triggerRef, persistent} = usePopoverContext();
    const relativeElementRef = positionRef && positionRef.current ? positionRef : triggerRef;

    useFloatingUiPositioning(relativeElementRef, popoverRef, 'bottom', offset);

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

            const isInsideAnyPopover = (target as HTMLElement).closest('[data-z-popover]');

            if (
                popoverEl.contains(target) ||
                triggerEl?.contains(target) ||
                isInsideAnyPopover
            ) {
                return;
            }

            setOpen(false);
        };

        const escCallback = (event: React.KeyboardEvent | KeyboardEvent) => {
            if (event.key === 'Escape') {
                const target = event.target as Node;
                const isInsideAnyPopover = (target as HTMLElement).closest('[data-z-popover]');

                if (isInsideAnyPopover && isInsideAnyPopover === popoverRef.current || !isInsideAnyPopover) {
                    event.preventDefault();
                    event.stopPropagation();
                    setOpen(false);
                }
            }
        }

        document.addEventListener('pointerdown', callback);
        if (!disableEscape) {
            document.addEventListener('keydown', escCallback);
        }
        if (trapFocus) {
            focusTrapInstanceRef.current.trap();
        }

        return () => {
            document.removeEventListener('pointerdown', callback);
            if (!disableEscape) {
                document.removeEventListener('keydown', escCallback);
            }
            if (trapFocus) {
                focusTrapInstanceRef.current.release(true);
            }
        }
    }, [open, persistent, trapFocus]);

    const visibilityClassName = open ? 'z-tooltip-visible' : 'z-tooltip-hidden';

     {/* TODO remove styling completely, styling should be provided by component shown */}
    /* Also, create separate directory for non-styled mechanisms like this Popover, Expandable, Selectable, DataView */
    return <>{createPortal(
        <div ref={popoverRef}
             role="dialog"
             className={`z-popover z-popover-body ${visibilityClassName}`}
             data-z-popover
             aria-expanded={open}
        >
            {
                open ? children : null
            }
        </div>,
        document.body
    )}
    </>

}

interface PopoverHandle {
    close: () => void
}

interface PopoverProps {
    ref?: Ref<PopoverHandle>,
    children: [React.ReactElement<typeof PopoverTrigger>, React.ReactElement<typeof PopoverBody>],
    persistent?: boolean,
    onStatusChanged?: (open: boolean) => void
}

function InternalPopover({children, ref, persistent = false}: PopoverProps) {
    const [open, setOpen] = React.useState(false);
    // @ts-ignore
    const triggerRef = React.useRef<HTMLDivElement | HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
        close: () => setOpen(false)
    }))

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
export type {PopoverHandle};