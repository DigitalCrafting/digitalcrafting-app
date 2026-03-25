import type {ZoriaProps} from "../../types/CommonTypes";
import * as React from "react";
import {useEffect, useState} from "react";
import {Subject} from "rxjs";
import {IconButton} from "../buttons/IconButton";
import {MenuIcon} from "../icons/Icons";
import {H4} from "../typography/Typography";

const SidebarHeader = ({children}: React.PropsWithChildren) => {
    return <div className='z-sidebar-header'>
        <H4>{children}</H4>
    </div>
}

const SidebarBody = ({children}: React.PropsWithChildren) => {
    return <div className='z-sidebar-body'>
        {children}
    </div>
}

interface SidePanelProps extends ZoriaProps {
    children: React.ReactNode[]
}

class SidePanelServiceImpl {
    readonly subject: Subject<boolean | undefined> = new Subject<boolean | undefined>();

    toggle() {
        this.subject.next(undefined);
    }
}

export const SidePanelService = new SidePanelServiceImpl();

const SidebarInternal = ({children}: SidePanelProps) => {
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const subscription = SidePanelService.subject.subscribe(() => {
            setIsOpen(prev => !prev);
        })

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return <aside className={`z-sidebar ${isOpen ? '' : 'collapsed'}`}>
            {children}
            <IconButton className='z-sidebar-trigger' onClick={() => {
                SidePanelService.toggle()
            }}>
                <MenuIcon/>
            </IconButton>
        </aside>
}

const Sidebar = Object.assign(SidebarInternal, {
    Header: SidebarHeader,
    Body: SidebarBody
})

export {Sidebar};