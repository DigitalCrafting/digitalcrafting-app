import {ZCol, ZH2, ZPanel, ZRow, ZText, ZToggle, ZTooltip} from "@zoria-ui/react";

export function TooltipDemo() {
    return <ZPanel>
        <ZPanel.Header><ZH2>Tooltip</ZH2></ZPanel.Header>
        <ZPanel.Body>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZTooltip>
                        <ZTooltip.Trigger>
                            <ZToggle>Test toggle</ZToggle>
                        </ZTooltip.Trigger>
                        <ZTooltip.Body>
                            <ZText>This is a toggle tooltip</ZText>
                        </ZTooltip.Body>
                    </ZTooltip>
                </ZCol>
                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZTooltip>
                        <ZTooltip.Trigger>
                            <ZText>Lorem ipsum</ZText>
                        </ZTooltip.Trigger>
                        <ZTooltip.Body>
                            <ZText>dolor sit amet, consectetur adipiscing elit.</ZText>
                        </ZTooltip.Body>
                    </ZTooltip>
                </ZCol>
            </ZRow>
        </ZPanel.Body>
    </ZPanel>
}