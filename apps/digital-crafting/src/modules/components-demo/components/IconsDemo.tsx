import {ZCol, ZRow} from "@zoria-ui/react/components/layout/ZLayout.tsx";
import {ZPanel} from "@zoria-ui/react/components/panel/ZPanel.tsx";
import {ZH2} from "@zoria-ui/react/components/typography/ZTypography.tsx";
import {
    CalendarCheckIcon,
    CalendarIcon, CheckIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon, ClockCheckIcon, ClockIcon, CopyCheckIcon, CopyIcon, EllipsisIcon, EllipsisMenuIcon, MenuIcon,
    XIcon
} from "@zoria-ui/react/components/icons/Icons.tsx";

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