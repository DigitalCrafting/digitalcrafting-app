import * as React from 'react';
import {useRef, useState} from 'react';
import type {PolymorphicComponentProps} from "../../types/PolimorphicType";
import {ChevronDownIcon, ChevronUpIcon} from "../icons/Icons";
import {useKeyboardClick} from "../../hooks/useKeyboardClick";

interface NavSectionContextType {
    isOpen: boolean
}

const NavSectionContext = React.createContext<NavSectionContextType>({isOpen: false});

const useNavSectionContext = () => React.useContext(NavSectionContext);

type NavItemProps<C extends React.ElementType> = PolymorphicComponentProps<C,  {
    className?: string,
    active?: boolean
}>

const NavItem = <C extends React.ElementType = "a">({children, as, active, className: externalClassName = '', ...rest}: React.PropsWithChildren<NavItemProps<C>>) => {
    const Component = as || 'a';
    const {isOpen} = useNavSectionContext() || {isOpen: true};
    return <Component tabIndex={isOpen ? 0 : -1} className={`z-navigation-item ${externalClassName}`.trim()} {...rest}>{children}</Component>
}

interface NavSectionProps {
    title: string,
    children: React.ReactElement<NavItemProps<any>>[] | React.ReactElement<NavItemProps<any>>
}

const NavSection = ({children, title}: NavSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    }

    const onKeyDown = useKeyboardClick(toggleOpen);

    return <section className={`z-navigation-section ${isOpen ? 'z-navigation-section-open' : ''}`}>
        <div tabIndex={0} className={`z-navigation-section-header ${isOpen ? 'z-navigation-section-open' : ''}`} onClick={toggleOpen} onKeyDown={onKeyDown}>
            {title} {isOpen ? <ChevronUpIcon/> : <ChevronDownIcon/>}
        </div>
        <div
            style={{
                height: isOpen ? ref.current?.scrollHeight : 0,
                overflow: "hidden",
                transition: "height 0.2s ease"
            }}
        >
            <NavSectionContext.Provider value={{isOpen}}>
                <div className={`z-navigation-section-body`} ref={ref}>
                    {children}
                </div>
            </NavSectionContext.Provider>
        </div>
    </section>

}


type NavElement = React.ReactElement<NavItemProps<any>> | React.ReactElement<NavSectionProps>;

interface NavigationProps {
    children: NavElement[] | NavElement
}

const NavigationInternal = ({children}: NavigationProps) => {
    return <nav className='z-navigation'>{children}</nav>
}

const Navigation = Object.assign(NavigationInternal, {
    Section: NavSection,
    Item: NavItem
});

export { Navigation };