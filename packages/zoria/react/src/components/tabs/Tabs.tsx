import * as React from 'react';
import {memo, useMemo, useState} from 'react';
import {CryptoUtils, noop} from "../../utils/Utils";

/* Internal */
interface TabsContextType {
    currentlyOpen: string,
    setCurrentlyOpen: React.Dispatch<React.SetStateAction<string>>
}

const TabsContext = React.createContext<TabsContextType>({
    currentlyOpen: '',
    setCurrentlyOpen: noop
});

const useTabsContext = () => {
    return React.useContext(TabsContext);
}

interface InternalTabTrigger {
    id: string,
    content: React.ReactElement<typeof TabTrigger>
}

interface TabsTriggersSectionProps {
    triggers: InternalTabTrigger[]
}

const TabsTriggersSection = ({triggers}: TabsTriggersSectionProps) => {
    const {currentlyOpen, setCurrentlyOpen} = useTabsContext();

    return <div className='z-tabs-triggers-section'>
        {
            triggers.map(({id, content}) => {
                return <button
                        key={id}
                        className={`z-tab-trigger ${id === currentlyOpen ? 'active' : ''}`}
                        onClick={() => setCurrentlyOpen(id)}>
                    {content}
                </button>
            })
        }
    </div>
}

const TabsBodySection = ({children}: React.PropsWithChildren) => {
    return <div className='z-tabs-body-section-section'>
        {children}
    </div>
}

/* Public */
interface TabBodyProps {

}

const TabBody = ({children}: React.PropsWithChildren<TabBodyProps>) => {
    return children
}
TabBody.displayName = 'TabBody';
TabBody.__type = 'TabBody';

interface TabTriggerProps {

}

const TabTrigger = ({children}: React.PropsWithChildren<TabTriggerProps>) => {
    return children
}

TabTrigger.displayName = 'TabTrigger';
TabTrigger.__type = 'TabTrigger';

interface TabItemProps {
    id?: string;
    children: [React.ReactElement<typeof TabTrigger>, React.ReactElement<typeof TabBody>];
}

interface TabItemComponent extends React.FC<TabItemProps> {
    __type: string;
    __isTabItem: boolean;
}

const TabItem: TabItemComponent = ({
    children,
    id = CryptoUtils.UUID()
}: TabItemProps) => {
    return <div>{children}</div>
}
TabItem.displayName = 'TabItem';
TabItem.__type = 'TabItem';
TabItem.__isTabItem = true;

function isTabItem(child: React.ReactNode): child is React.ReactElement<TabItemProps, TabItemComponent> {
    return React.isValidElement(child) && typeof child.type !== 'string' && (child.type as TabItemComponent).__type === 'TabItem';
}

interface TabsProps {
    children: React.ReactElement<typeof TabItem>[] | React.ReactElement<typeof TabItem>
    vertical?: boolean
    className?: string
    defaultOpen?: string
    'data-testid'?: string;
}

const TabsInternal = memo(({
    children,
    vertical = false,
    className: externalClassName = '',
    defaultOpen = null,
    "data-testid": dataTestId = '',
}: TabsProps) => {
    const [currentlyOpen, setCurrentlyOpen] = useState<string>(defaultOpen);

    const tabsOrientationClassName = vertical ? 'z-tabs-vertical' : 'z-tabs-horizontal';

    const [triggers, bodiesMap] = useMemo(() => {
        const triggers: InternalTabTrigger[] = [];
        const bodiesMap = new Map<string, React.ReactElement<typeof TabBody>>();

        React.Children.forEach(children, (child) => {
            if (isTabItem(child)) {
                const {id, children: itemChildren} = child.props;
                const [trigger, body] = itemChildren;

                triggers.push({id, content: trigger});
                bodiesMap.set(id, body);
            }
        })

        return [triggers, bodiesMap];
    }, [children])

    const currentBody = bodiesMap.get(currentlyOpen);

    return <TabsContext.Provider value={{
        currentlyOpen,
        setCurrentlyOpen
    }}>
        <div className={`z-tabs ${tabsOrientationClassName} ${externalClassName}`.trim()}>
            <TabsTriggersSection triggers={triggers}/>
            <TabsBodySection>{currentBody}</TabsBodySection>
        </div>
    </TabsContext.Provider>
})

const Tabs = Object.assign(TabsInternal, {
    Item: TabItem,
    Trigger: TabTrigger,
    Body: TabBody
})

export {Tabs};