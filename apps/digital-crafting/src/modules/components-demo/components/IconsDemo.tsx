import {
    CalendarCheckIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    ClockCheckIcon,
    ClockIcon,
    CopyCheckIcon,
    CopyIcon,
    EllipsisIcon,
    EllipsisMenuIcon,
    MenuIcon,
    XIcon,
    ZCol,
    ZH2,
    ZPanel,
    ZRow
} from "@zoria-ui/react";

export function IconsDemo() {
    return <ZPanel>
        <ZPanel.Header><ZH2>Icons</ZH2></ZPanel.Header>
        <ZPanel.Body>
            <ZCol gap='sm'>
                <ZRow gap='lg' className={'justify-center content-center'}>
                    <XIcon/>
                    <ChevronDownIcon/>
                    <ChevronLeftIcon/>
                    <ChevronRightIcon/>
                    <ChevronUpIcon/>
                    <CalendarIcon/>
                    <CalendarCheckIcon/>
                    <ClockIcon/>
                    <ClockCheckIcon/>
                    <CheckIcon/>
                    <CopyIcon/>
                    <CopyCheckIcon/>
                </ZRow>
                <ZRow gap='lg' className={'justify-center content-center'}>
                    <MenuIcon/>
                    <EllipsisMenuIcon/>
                    <EllipsisIcon/>
                </ZRow>
            </ZCol>
        </ZPanel.Body>
    </ZPanel>;
}