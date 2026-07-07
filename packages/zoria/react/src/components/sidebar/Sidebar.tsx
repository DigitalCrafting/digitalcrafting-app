import type {ZoriaProps} from "../../types/CommonTypes";
import * as React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {EventEmitter} from "@zoria-ui/events";
import {IconButton} from "../buttons/IconButton";
import {MenuIcon, XIcon} from "../icons/Icons";
import {H4} from "../typography/Typography";

const SidebarContext = createContext({
    isOpen: false
});

const SidebarHeader = ({children}: React.PropsWithChildren) => {
    const {isOpen} = useContext(SidebarContext);

    return <div className='z-sidebar-header'>
        <H4 className='z-sidebar-header-title'>{children}</H4>
        <IconButton className='z-sidebar-trigger' onClick={() => {
            SidePanelService.toggle()
        }}>
            {
                isOpen ? <XIcon/> : <MenuIcon/>
            }
        </IconButton>
    </div>
}

const SidebarBody = ({children}: React.PropsWithChildren) => {
    return <div className='z-sidebar-body'>
        {children}
    </div>
}

interface SidePanelProps extends ZoriaProps {
    defaultOpen?: boolean,
    children: React.ReactNode[]
}

class SidePanelServiceImpl {
    readonly subject: EventEmitter<boolean | undefined> = new EventEmitter<boolean | undefined>();

    toggle() {
        this.subject.emit(undefined);
    }
}

export const SidePanelService = new SidePanelServiceImpl();

const SidebarInternal = ({children, defaultOpen = false}: SidePanelProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    useEffect(() => {
        const subscription = SidePanelService.subject.subscribe(() => {
            setIsOpen(prev => !prev);
        })

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return <SidebarContext.Provider value={{isOpen}}>
        <aside className={`z-sidebar ${isOpen ? '' : 'collapsed'}`}>
            {children}
        </aside>
    </SidebarContext.Provider>
}

const Sidebar = Object.assign(SidebarInternal, {
    Header: SidebarHeader,
    Body: SidebarBody
})

export {Sidebar};