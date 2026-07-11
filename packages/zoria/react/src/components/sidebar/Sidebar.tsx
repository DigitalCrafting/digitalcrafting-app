import type {ZoriaProps} from "../../types/CommonTypes";
import * as React from "react";
import {createContext, useContext, useEffect, useRef, useState} from "react";
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
    const scrollRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollable = scrollRef.current;
        const wrapper = wrapperRef.current;
        if (!scrollable || !wrapper) return;

        const updateMasks = () => {
            const isTopFaded = scrollable.scrollTop > 5;
            const isBottomFaded = scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 1;

            scrollable.setAttribute('data-scroll-top', isTopFaded.toString());
            scrollable.setAttribute('data-scroll-bottom', isBottomFaded.toString());
        };

        updateMasks();

        scrollable.addEventListener('scroll', updateMasks, { passive: true });

        const observer = new ResizeObserver(() => {
            requestAnimationFrame(updateMasks);
        });

        observer.observe(wrapper);

        return () => {
            scrollable.removeEventListener('scroll', updateMasks);
            observer.disconnect();
        };
    }, []);

    return <div
        ref={scrollRef}
        className={`z-sidebar-body`}>
        <div ref={wrapperRef} className={`z-sidebar-children-wrapper`}>
            {children}
        </div>
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