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
            <ZRow className={'justify-center content-center'}>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <XIcon/>
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <ChevronDownIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <ChevronLeftIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <ChevronRightIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <ChevronUpIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <CalendarIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <CalendarCheckIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <ClockIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <ClockCheckIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <CheckIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <CopyIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <CopyCheckIcon />
                </ZCol>
            </ZRow>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <MenuIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <EllipsisMenuIcon />
                </ZCol>
                <ZCol span={1} className={'justify-center align-items-center'}>
                    <EllipsisIcon />
                </ZCol>
            </ZRow>
        </ZPanel.Body>
    </ZPanel>;
}