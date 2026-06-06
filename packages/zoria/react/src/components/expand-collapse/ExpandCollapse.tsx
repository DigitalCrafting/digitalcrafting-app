import * as React from 'react';
import {createContext, type PropsWithChildren, useContext, useState} from "react";
import {noop} from "../../utils/Utils";
import {ChevronDownIcon, ChevronUpIcon} from "../icons/Icons";
import {IconButton} from "../buttons/IconButton";

type ExpandCollapseContextType = {
    toggle: () => void;
    isExpanded: boolean;
}

const ExpandCollapseContext = createContext<ExpandCollapseContextType>({
    isExpanded: false,
    toggle: noop
})

const useExpandCollapseContext = () => {
    const ctx = useContext(ExpandCollapseContext);

    if (!ctx) {
        throw new Error("Calling useExpandCollapseContext without a provider.")
    }

    return ctx;
}

const TriggerChevron = () => {
    const {toggle, isExpanded} = useExpandCollapseContext();

    const onClick = (event: MouseEvent | React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        toggle();
    }

    return <div className='z-expand-collapse-trigger-chevron'>
        <IconButton onClick={onClick}>
            {isExpanded ? <ChevronUpIcon/> : <ChevronDownIcon/>}
        </IconButton>
    </div>
}

interface InjectedTriggerProps extends React.HTMLAttributes<HTMLElement> {
    'data-expanded': boolean;
}

interface TriggerProps {
    asChild?: boolean
}

const Trigger = ({children, asChild}: PropsWithChildren<TriggerProps>) => {
    const {toggle, isExpanded} = useExpandCollapseContext();

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<InjectedTriggerProps>, {
            'aria-expanded': isExpanded,
            'data-expanded': isExpanded,
            onClick: (e: React.MouseEvent) => {
                if (children.props?.hasOwnProperty('onClick')) {
                    // @ts-ignore
                    children.props.onClick?.(e);
                }
                toggle();
            }
        })
    }

    return <div
        onClick={toggle}
        aria-expanded={isExpanded}
        data-expanded={isExpanded}
        className='z-expand-collapse-trigger'
    >
        {children}
        <TriggerChevron />
    </div>
}

const Body = ({children}: PropsWithChildren) => {
    const {isExpanded} = useExpandCollapseContext();

    return isExpanded ? children : null;
}

interface ExpandCollapseProps {
    children: [React.ReactElement<typeof Trigger>, React.ReactElement<typeof Body>];
    expandByDefault?: boolean;
}

const InternalExpandCollapse = ({children, expandByDefault = false}: ExpandCollapseProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(expandByDefault)

    const toggle = () => setIsExpanded((prev) => !prev);

    return <ExpandCollapseContext.Provider value={{
        isExpanded: isExpanded,
        toggle
    }}>
        {children}
    </ExpandCollapseContext.Provider>
}

const ExpandCollapse = Object.assign(InternalExpandCollapse, {
    Trigger,
    Body,
    Chevron: TriggerChevron
});

export {ExpandCollapse, useExpandCollapseContext};