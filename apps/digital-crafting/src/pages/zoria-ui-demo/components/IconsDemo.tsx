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
    EllipsisMenuIcon,
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

export function IconsDemo() {
    return <Panel>
        <Panel.Header><H2>Icons</H2></Panel.Header>
        <Panel.Body>
            <Grid cols={12}>
                <Tooltip>
                    <Tooltip.Trigger>
                        <XIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>XIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ChevronDownIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ChevronDownIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ChevronLeftIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ChevronLeftIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ChevronRightIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ChevronRightIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ChevronUpIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ChevronUpIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <CalendarIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>CalendarIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <CalendarCheckIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>CalendarCheckIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ClockIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ClockIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ClockCheckIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ClockCheckIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <CheckIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>CheckIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <CopyIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>CopyIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <CopyCheckIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>CopyCheckIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <MenuIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>MenuIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <EllipsisMenuIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>EllipsisMenuIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <EllipsisIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>EllipsisIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <DatabaseIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>DatabaseIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <DatabaseBackupIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>DatabaseBackupIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <DatabaseSearchIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>DatabaseSearchIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ServerIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ServerIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ServerCogIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ServerCogIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ServerCrashIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ServerCrashIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ServerOffIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ServerOffIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ServerClockIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ServerClockIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <HardDriveIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>HardDriveIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <HardDriveDownloadIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>HardDriveDownloadIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <HardDriveUploadIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>HardDriveUploadIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <MonitorIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>MonitorIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <LaptopIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>LaptopIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <SmartphoneIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>SmartphoneIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <WifiIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>WifiIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <RouterIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>RouterIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <SatelliteDishIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>SatelliteDishIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <SatelliteIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>SatelliteIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <NetworkIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>NetworkIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <MessageBrokerIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>MessageBrokerIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <TriangleAlertIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>TriangleAlertIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <CircleAlertIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>CircleAlertIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <CircleCheckIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>CircleCheckIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <CircleQuestionIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>CircleQuestionIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <CircleInfoIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>CircleInfoIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <BanIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>BanIcon</Text></Tooltip.Body>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger>
                        <ShareIcon size='md'/>
                    </Tooltip.Trigger>
                    <Tooltip.Body><Text>ShareIcon</Text></Tooltip.Body>
                </Tooltip>
            </Grid>
        </Panel.Body>
    </Panel>;
}