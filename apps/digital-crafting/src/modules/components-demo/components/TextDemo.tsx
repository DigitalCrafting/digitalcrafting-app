import {ZCol, ZH2, ZPanel, ZRow, ZSize, ZText} from "@zoria-ui/react";

export function TextDemo() {
    return <ZPanel>
        <ZPanel.Header><ZH2>Text</ZH2></ZPanel.Header>
        <ZPanel.Body>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={5} className={'justify-center text-center'}>
                    <ZText>Example normal text</ZText>
                </ZCol>

                <ZCol span={5} className={'justify-center text-center'}>
                    <ZText bold>Example bold text</ZText>
                </ZCol>
            </ZRow>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={5} className={'justify-center text-center'}>
                    <ZText size={ZSize.SM}>Example small text</ZText>
                </ZCol>

                <ZCol span={5} className={'justify-center text-center'}>
                    <ZText size={ZSize.LG}>Example large text</ZText>
                </ZCol>
            </ZRow>
        </ZPanel.Body>
    </ZPanel>
}