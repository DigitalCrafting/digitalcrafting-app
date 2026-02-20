import {IconButton, XIcon, ZCol, ZH2, ZPanel, ZRow} from "@zoria-ui/react";

export function IconButtonDemo() {
    return <ZPanel>
        <ZPanel.Header><ZH2>IconButton</ZH2></ZPanel.Header>
        <ZPanel.Body>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={5} className={'justify-center align-items-center'}>
                    <IconButton><XIcon/></IconButton>
                </ZCol>

                <ZCol span={5} className={'justify-center align-items-center'}>
                    <IconButton disabled><XIcon/></IconButton>
                </ZCol>
            </ZRow>
        </ZPanel.Body>
    </ZPanel>;
}