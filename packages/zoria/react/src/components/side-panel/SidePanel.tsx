import type {ZoriaProps} from "../../types/CommonTypes";
import * as React from "react";
import {useEffect, useState} from "react";
import {Subject} from "rxjs";
import {IconButton} from "../buttons/IconButton";
import {MenuIcon} from "../icons/Icons";

interface SidePanelProps extends ZoriaProps {
    children: React.ReactNode
}

class SidePanelServiceImpl {
    readonly subject: Subject<boolean | undefined> = new Subject<boolean | undefined>();

    toggle() {
        this.subject.next(undefined);
    }
}

export const SidePanelService = new SidePanelServiceImpl();

export function SidePanel({children}: SidePanelProps) {
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const subscription = SidePanelService.subject.subscribe(() => {
            setIsOpen(prev => !prev);
        })

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return <aside className={`z-side-panel ${isOpen ? '' : 'collapsed'}`}>
        <div className='z-side-panel-content'>
            {children}
        </div>
        <div className='z-side-panel-trigger'>
            <IconButton onClick={() => {
                SidePanelService.toggle()
            }}>
                <MenuIcon/>
            </IconButton>
        </div>
    </aside>
}