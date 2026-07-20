import {
    BanIcon,
    CalendarCheckIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    CircleAlertIcon,
    CircleCheckIcon,
    CircleInfoIcon,
    CircleQuestionIcon,
    ClockCheckIcon,
    ClockIcon,
    CopyCheckIcon,
    CopyIcon,
    DatabaseBackupIcon,
    DatabaseIcon,
    DatabaseSearchIcon,
    EllipsisIcon,
    EllipsisMenuIcon, EyeIcon, EyeOffIcon,
    Grid,
    H2,
    HardDriveDownloadIcon,
    HardDriveIcon,
    HardDriveUploadIcon,
    LaptopIcon,
    MenuIcon, MessageBrokerIcon,
    MonitorIcon,
    NetworkIcon,
    ExpandCollapsePanel,
    RouterIcon,
    SatelliteDishIcon, SatelliteIcon, SearchIcon, ServerClockIcon,
    ServerCogIcon,
    ServerCrashIcon,
    ServerIcon,
    ServerOffIcon, ShareIcon,
    SmartphoneIcon,
    Text,
    Tooltip,
    TriangleAlertIcon,
    WifiIcon,
    XIcon, CirclePlusIcon, CircleMinusIcon, PaletteIcon, CalendarClockIcon
} from "@zoria-ui/react";

const ICONS = [
    XIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    CalendarIcon,
    CalendarCheckIcon,
    CalendarClockIcon,
    ClockIcon,
    ClockCheckIcon,
    CheckIcon,
    CopyIcon,
    CopyCheckIcon,
    MenuIcon,
    EllipsisMenuIcon,
    EllipsisIcon,
    DatabaseIcon,
    DatabaseBackupIcon,
    DatabaseSearchIcon,
    ServerIcon,
    ServerCogIcon,
    ServerCrashIcon,
    ServerOffIcon,
    ServerClockIcon,
    HardDriveIcon,
    HardDriveDownloadIcon,
    HardDriveUploadIcon,
    MonitorIcon,
    LaptopIcon,
    SmartphoneIcon,
    WifiIcon,
    RouterIcon,
    SatelliteIcon,
    SatelliteDishIcon,
    NetworkIcon,
    MessageBrokerIcon,
    TriangleAlertIcon,
    CircleAlertIcon,
    CircleCheckIcon,
    CircleQuestionIcon,
    CircleInfoIcon,
    BanIcon,
    ShareIcon,
    EyeIcon,
    EyeOffIcon,
    SearchIcon,
    CirclePlusIcon,
    CircleMinusIcon,
    PaletteIcon
]

export function IconsDocs() {
    return <ExpandCollapsePanel expandByDefault={true}>
        <ExpandCollapsePanel.Header><H2>Icons</H2></ExpandCollapsePanel.Header>
        <ExpandCollapsePanel.Body>
            <Grid cols={12} className='justify-items-anchor-center'>
                {
                    ICONS.map((Icon) => {
                        return <Tooltip key={`${Icon.name}-demo`}>
                            <Tooltip.Trigger>
                                <Icon size='md'/>
                            </Tooltip.Trigger>
                            <Tooltip.Body><Text>{Icon.displayName}</Text></Tooltip.Body>
                        </Tooltip>
                    })
                }
            </Grid>
        </ExpandCollapsePanel.Body>
    </ExpandCollapsePanel>;
}