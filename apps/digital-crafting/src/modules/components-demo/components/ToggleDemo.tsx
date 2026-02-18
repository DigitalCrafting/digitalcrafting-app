import {ZCol, ZRow} from "@zoria-ui/react/components/layout/ZLayout.tsx";
import {ZToggle} from "@zoria-ui/react/components/checkbox/ZToggle.tsx";
import {ZPanel} from "@zoria-ui/react/components/panel/ZPanel.tsx";
import {ZH2} from "@zoria-ui/react/components/typography/ZTypography.tsx";

export function ToggleDemo() {
    return <ZPanel>
        <ZPanel.Header><ZH2>Toggle</ZH2></ZPanel.Header>
        <ZPanel.Body>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZToggle>Test toggle</ZToggle>
                </ZCol>

                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZToggle disabled>Disabled toggle</ZToggle>
                </ZCol>
            </ZRow>
            <ZRow className={'justify-center content-center'}>

                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZToggle checked>Test checked toggle</ZToggle>
                </ZCol>

                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZToggle disabled checked>Disabled toggle</ZToggle>
                </ZCol>
            </ZRow>
        </ZPanel.Body>
    </ZPanel>
}