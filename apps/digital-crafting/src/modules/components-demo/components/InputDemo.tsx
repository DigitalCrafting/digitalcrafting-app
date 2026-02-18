import {ZCol, ZRow} from "@zoria-ui/react/components/layout/ZLayout.tsx";
import {ZInput} from "@zoria-ui/react/components/inputs/ZInput.tsx";
import {ZPanel} from "@zoria-ui/react/components/panel/ZPanel.tsx";
import {ZH2} from "@zoria-ui/react/components/typography/ZTypography.tsx";

export function InputDemo() {
    return <ZPanel>
        <ZPanel.Header>
            <ZH2>Input</ZH2>
        </ZPanel.Header>
        <ZPanel.Body>
            <ZRow className={'justify-center content-center'}>

                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZInput label='Test input'/>
                </ZCol>

                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZInput label='Test input with error' error='Terrible error'/>
                </ZCol>
            </ZRow>
            <ZRow className={'justify-center content-center'}>

                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZInput label='Test input disabled' disabled/>
                </ZCol>

                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZInput label='Test input 2 with error' error='Terrible error'/>
                </ZCol>
            </ZRow>
        </ZPanel.Body>
    </ZPanel>
}