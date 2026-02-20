import * as React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';
import {createPortal} from "react-dom";
import {Subject} from "rxjs";
import {useFloatingUiPositioning} from "../../hooks/useFloatingUiPositioning";

interface TooltipEvent {
    triggerRef: React.RefObject<any> | null
    content?: React.ReactElement<any> | null
}

interface TooltipContextType {
    subject: Subject<TooltipEvent>,
    content?: React.ReactElement<any> | null
}

const TooltipContext = React.createContext<TooltipContextType>({} as TooltipContextType);

function useTooltipContext() {
    return useContext(TooltipContext);
}

interface TooltipTriggerProps {
    children: React.ReactElement,
    content?: React.ReactElement<typeof TooltipBody>
}

function TooltipTrigger({children, content}: TooltipTriggerProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const {subject} = useTooltipContext();

    return <div
        ref={triggerRef}
        onMouseEnter={() => {
            subject.next({
                triggerRef,
                content
            })
        }}
        onMouseLeave={() => {
            subject.next({
                triggerRef: null,
                content: null
            });
        }}
    >{children}</div>;
}

function TooltipBody({children}: React.PropsWithChildren<any>) {
    return <div className="z-tooltip-body">
        {children}
    </div>;
}

interface TooltipProps {
    children: [React.ReactElement<typeof TooltipTrigger>, React.ReactElement<typeof TooltipBody>]
}

function Tooltip({children}: TooltipProps) {
    const childrenArray = React.Children.toArray(children)

    // TODO: detect which is which
    const trigger = childrenArray[0] as React.ReactElement<TooltipTriggerProps>;
    const content = childrenArray[1] as React.ReactElement<typeof TooltipBody>;

    return <TooltipTrigger content={content} {...trigger.props}>{trigger.props.children}</TooltipTrigger>
}

const ZTooltip = Object.assign(Tooltip,
    {
        Body: TooltipBody,
        Trigger: TooltipTrigger
    });


function TooltipPortalManager() {
    const {subject} = useTooltipContext();
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<TooltipEvent>({} as TooltipEvent);

    useEffect(() => {
        const sub = subject.subscribe((state) => {
            setState(state);
        })
        return () => {
            sub.unsubscribe();
        }
    }, [subject]);

    useFloatingUiPositioning(state.triggerRef, tooltipRef);

    const visibilityClassName = state.content ? 'visible' : 'hidden';

    return <>{createPortal(
        <div ref={tooltipRef}
             role="tooltip"
             className={`z-tooltip ${visibilityClassName}`}
        >
        {state.content}
    </div>, document.body)}</>
}

interface ZTooltipProviderProps {
    children: React.ReactElement
}

function ZTooltipProvider({children}: ZTooltipProviderProps) {
    const tooltipSubject = useRef<Subject<TooltipEvent>>(new Subject<TooltipEvent>());

    return <TooltipContext.Provider value={{
        subject: tooltipSubject.current,
        content: null
    }}>
        {children}
        <TooltipPortalManager/>
    </TooltipContext.Provider>
}

export {ZTooltip, ZTooltipProvider};