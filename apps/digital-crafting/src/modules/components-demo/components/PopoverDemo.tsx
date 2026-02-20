import {ZButton, ZCol, ZH2, ZPanel, ZPopover, ZRow, ZText} from "@zoria-ui/react";

export function PopoverDemo() {
    return <ZPanel>
        <ZPanel.Header><ZH2>Popover</ZH2></ZPanel.Header>
        <ZPanel.Body>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZPopover>
                        <ZPopover.Trigger>
                            <ZButton >Popover 1</ZButton>
                        </ZPopover.Trigger>
                        <ZPopover.Body>
                            <ZText>This is a popover 1 body</ZText>
                        </ZPopover.Body>
                    </ZPopover>
                </ZCol>
                <ZCol span={5} className={'justify-center align-items-center'}>
                    <ZPopover autoDismiss>
                        <ZPopover.Trigger>
                            <ZButton>Lorem ipsum (autoDismiss)</ZButton>
                        </ZPopover.Trigger>
                        <ZPopover.Body>
                            <ZText>dolor sit amet, consectetur adipiscing elit.</ZText>
                        </ZPopover.Body>
                    </ZPopover>
                </ZCol>
            </ZRow>
        </ZPanel.Body>
    </ZPanel>
}