import {ZCheckbox, ZCol, ZH2, ZPanel, ZRow} from "@zoria-ui/react";

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