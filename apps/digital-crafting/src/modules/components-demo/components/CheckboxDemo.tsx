import {ZCol, ZRow} from "@zoria-ui/react/components/layout/ZLayout.tsx";
import {ZCheckbox} from "@zoria-ui/react/components/checkbox/ZCheckbox.tsx";
import {ZPanel} from "@zoria-ui/react/components/panel/ZPanel.tsx";
import {ZH2} from "@zoria-ui/react/components/typography/ZTypography.tsx";

export function CheckboxDemo() {
    return <ZPanel>
        <ZPanel.Header><ZH2>Checkbox</ZH2></ZPanel.Header>
        <ZPanel.Body>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZCheckbox>Test checkbox</ZCheckbox>
                </ZCol>

                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZCheckbox disabled>Disabled checkbox</ZCheckbox>
                </ZCol>
            </ZRow>
            <ZRow className={'justify-center content-center'}>

                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZCheckbox checked>Test checked checkbox</ZCheckbox>
                </ZCol>

                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZCheckbox disabled checked>Disabled checkbox</ZCheckbox>
                </ZCol>
            </ZRow>
        </ZPanel.Body>
    </ZPanel>;
}