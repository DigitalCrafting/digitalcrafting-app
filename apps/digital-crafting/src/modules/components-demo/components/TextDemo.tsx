import {ZCol, ZRow} from "@zoria-ui/react/components/layout/ZLayout.tsx";
import {ZH2, ZText} from "@zoria-ui/react/components/typography/ZTypography.tsx";
import {ZSize} from "@zoria-ui/react/types/ZSizes.ts";
import {ZPanel} from "@zoria-ui/react/components/panel/ZPanel.tsx";

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