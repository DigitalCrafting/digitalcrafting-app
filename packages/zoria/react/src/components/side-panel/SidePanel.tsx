import type {ZoriaProps} from "../../types/CommonTypes.ts";
import React, {useEffect, useState} from "react";
import {Subject} from "rxjs";

interface SidePanelProps extends ZoriaProps {
    children: React.ReactNode
    location?: 'left' | 'right'
}

class SidePanelServiceImpl {
    readonly subject: Subject<boolean | undefined> = new Subject<boolean | undefined>();

    toggle() {
        this.subject.next(undefined);
    }
}

export const SidePanelService = new SidePanelServiceImpl();

export function SidePanel({children, location = 'left'}: SidePanelProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const subscription = SidePanelService.subject.subscribe(() => {
            console.log('triggered')
            setIsOpen(prev => !prev);
        })

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return <aside className={`z-side-panel z-side-panel__${location} ${isOpen ? 'open' : ''}`}>{children}</aside>
}