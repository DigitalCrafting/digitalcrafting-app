import * as React from 'react';
import {memo, useMemo, useState} from 'react';
import {noop} from "../../utils/Utils";
import {useKeyboardClick} from "../../hooks/useKeyboardClick";

/* Internal */
interface TabsContextType {
    currentlyOpen: string;
    setCurrentlyOpen: React.Dispatch<React.SetStateAction<string>>;
    dataTestId: string;
}

const TabsContext = React.createContext<TabsContextType>({
    currentlyOpen: '',
    setCurrentlyOpen: noop,
    dataTestId: ''
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
    const {currentlyOpen, setCurrentlyOpen, dataTestId} = useTabsContext();

    return <div className='z-tabs-triggers-section' data-testid={`${dataTestId}-triggers`}>
        {
            triggers.map(({id, content}) => {
                const onKeyDown = useKeyboardClick(() => setCurrentlyOpen(id));
                return <div
                    role='tab'
                    key={id}
                    className={`z-tab-trigger ${id === currentlyOpen ? 'active' : ''}`}
                    onClick={() => setCurrentlyOpen(id)}
                    onKeyDown={onKeyDown}
                    data-testid={`${dataTestId}-trigger-${id}`}
                    tabIndex={0}
                >
                    <div className='z-tab-trigger-content-wrapper'>
                        {content}
                    </div>
                </div>
            })
        }
    </div>
}

const TabsBodySection = ({children}: React.PropsWithChildren) => {
    const {dataTestId} = useTabsContext();

    return <div className='z-tabs-body-section' data-testid={`${dataTestId}-body`}>
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


const TabTriggerIcon = ({children}: React.PropsWithChildren) => {
    return children
}

const TabTriggerLabel = ({children}: React.PropsWithChildren) => {
    return <span className='z-tab-trigger-label'>{children}</span>
};

type TabTriggerChildrenType = |
    React.ReactElement<typeof TabTriggerIcon> |
    React.ReactElement<typeof TabTriggerLabel> |
    [React.ReactElement<typeof TabTriggerLabel>, React.ReactElement<typeof TabTriggerIcon>] |
    [React.ReactElement<typeof TabTriggerIcon>, React.ReactElement<typeof TabTriggerLabel>] |
    [React.ReactElement<typeof TabTriggerIcon>, React.ReactElement<typeof TabTriggerLabel>, React.ReactElement<typeof TabTriggerIcon>];

interface TabTriggerProps {
    children: TabTriggerChildrenType
}

const TabTrigger = ({children}: TabTriggerProps) => {
    return children
}

TabTrigger.displayName = 'TabTrigger';
TabTrigger.__type = 'TabTrigger';

interface TabItemProps {
    id: string;
    children: [React.ReactElement<typeof TabTrigger>, React.ReactElement<typeof TabBody>];
}

interface TabItemComponent extends React.FC<TabItemProps> {
    __type: string;
    __isTabItem: boolean;
}

const TabItem: TabItemComponent = ({
    children
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
    removeBorder?: boolean
    className?: string
    defaultOpen?: string
    'data-testid'?: string;
}

const TabsInternal = memo(({
    children,
    vertical = false,
    removeBorder = false,
    className: externalClassName = '',
    defaultOpen = undefined,
    "data-testid": dataTestId = 'qa-tabs',
}: TabsProps) => {
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
    const [currentlyOpen, setCurrentlyOpen] = useState<string>(defaultOpen || triggers[0].id);

    const tabsOrientationClassName = vertical ? 'z-tabs-vertical' : 'z-tabs-horizontal';
    const removeBorderClassName = removeBorder ? 'remove-border' : '';
    const currentBody = bodiesMap.get(currentlyOpen);


    return <TabsContext.Provider value={{
        currentlyOpen,
        setCurrentlyOpen,
        dataTestId
    }}>
        <div className={`z-tabs ${tabsOrientationClassName} ${removeBorderClassName} ${externalClassName}`.trim()}
             data-testid={dataTestId}
        >
            <TabsTriggersSection triggers={triggers}/>
            <TabsBodySection>{currentBody}</TabsBodySection>
        </div>
    </TabsContext.Provider>
})

const Tabs = Object.assign(TabsInternal, {
    Item: TabItem,
    Trigger: TabTrigger,
    TriggerLabel: TabTriggerLabel,
    TriggerIcon: TabTriggerIcon,
    Body: TabBody
})

export {Tabs};