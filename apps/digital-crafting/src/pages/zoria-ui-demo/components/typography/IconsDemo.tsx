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
    Panel,
    RouterIcon,
    SatelliteDishIcon, SatelliteIcon, ServerClockIcon,
    ServerCogIcon,
    ServerCrashIcon,
    ServerIcon,
    ServerOffIcon, ShareIcon,
    SmartphoneIcon,
    Text,
    Tooltip,
    TriangleAlertIcon,
    WifiIcon,
    XIcon
} from "@zoria-ui/react";

const ICONS = [
    XIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    CalendarIcon,
    CalendarCheckIcon,
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
    EyeOffIcon
]

export function IconsDemo() {
    return <Panel>
        <Panel.Header><H2>Icons</H2></Panel.Header>
        <Panel.Body>
            <Grid cols={12} className='justify-items-anchor-center'>
                {
                    ICONS.map((Icon) => {
                        return <Tooltip key={`${Icon.name}-demo`}>
                            <Tooltip.Trigger>
                                <Icon size='md'/>
                            </Tooltip.Trigger>
                            <Tooltip.Body><Text>{Icon.name}</Text></Tooltip.Body>
                        </Tooltip>
                    })
                }
            </Grid>
        </Panel.Body>
    </Panel>;
}