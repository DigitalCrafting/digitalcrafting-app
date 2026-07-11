import * as React from 'react';
import {useRef, useState} from 'react';
import type {PolymorphicComponentProps} from "../../types/PolimorphicType";
import {ChevronDownIcon, ChevronUpIcon} from "../icons/Icons";
import {useKeyboardClick} from "../../hooks/useKeyboardClick";

interface NavSectionContextType {
    isOpen: boolean
}

const NavSectionContext = React.createContext<NavSectionContextType | null>(null);

const useNavSectionContext = () => React.useContext(NavSectionContext);

type NavItemProps<C extends React.ElementType> = PolymorphicComponentProps<C, {
    className?: string,
    active?: boolean,
}>

const NavItem = <C extends React.ElementType = "a">({
    children,
    as,
    active,
    className: externalClassName = '',
    onClick,
    ...rest
}: React.PropsWithChildren<NavItemProps<C>>) => {
    const Component = as || 'a';
    const {isOpen} = useNavSectionContext() || {isOpen: true};

    const onKeyDown = useKeyboardClick(onClick);

    return <Component tabIndex={isOpen ? 0 : -1}
                      onClick={onClick}
                      onKeyDown={onKeyDown}
                      className={`z-navigation-item ${active ? 'is-selected' : ''} ${externalClassName}`.trim()} {...rest}>{children}</Component>
}


interface NavSubSectionProps {
    title: string,
    defaultOpen?: boolean,
    children: React.ReactElement<NavItemProps<any>>[] | React.ReactElement<NavItemProps<any>>
}

const NavSubsection = ({title, defaultOpen = false, children}: NavSubSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
    const {isOpen: parentOpen} = useNavSectionContext() || {isOpen: true};

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    }

    const onKeyDown = useKeyboardClick(toggleOpen);

    return <section className={`z-navigation-subsection ${isOpen ? 'z-navigation-subsection-open' : ''}`}>
        <div className={`z-navigation-subsection-header ${isOpen ? 'z-navigation-subsection-open' : ''}`}
             onClick={toggleOpen} onKeyDown={onKeyDown} tabIndex={parentOpen ? 0 : -1}>
            {title} {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
        <div className={`z-navigation-subsection-animate-wrapper ${isOpen ? 'z-open' : ''}`}>
            <NavSectionContext.Provider value={{isOpen}}>
                <div className={`z-navigation-subsection-body`} ref={ref}>
                    {children}
                </div>
            </NavSectionContext.Provider>
        </div>
    </section>
}

export type NavSectionChildType = React.ReactElement<typeof NavSubsection> | React.ReactElement<typeof NavItem>;

interface NavSectionProps {
    title: string,
    defaultOpen?: boolean,
    children: NavSectionChildType[] | NavSectionChildType
}

const NavSection = ({children, defaultOpen = false, title}: NavSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    }

    const onKeyDown = useKeyboardClick(toggleOpen);

    return <section className={`z-navigation-section ${isOpen ? 'z-navigation-section-open' : ''}`}>
        <div tabIndex={0} className={`z-navigation-section-header ${isOpen ? 'z-navigation-section-open' : ''}`}
             onClick={toggleOpen} onKeyDown={onKeyDown}>
            {title} {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
        <div className={`z-navigation-section-animate-wrapper ${isOpen ? 'z-open' : ''}`}>
            <NavSectionContext.Provider value={{isOpen}}>
                <div className={`z-navigation-section-body`} ref={ref}>
                    {children}
                </div>
            </NavSectionContext.Provider>
        </div>
    </section>

}


export type NavElement = React.ReactElement<NavSectionProps> | NavSectionChildType;

interface NavigationProps {
    children: NavElement[] | NavElement
}

const NavigationInternal = ({children}: NavigationProps) => {
    return <nav className='z-navigation'>{children}</nav>
}

const Navigation = Object.assign(NavigationInternal, {
    Section: NavSection,
    Subsection: NavSubsection,
    Item: NavItem
});

export {Navigation};
export type {NavigationProps};