import {ZCol, ZRow} from "@zoria-ui/react/components/layout/ZLayout.tsx";
import {ZPanel} from "@zoria-ui/react/components/panel/ZPanel.tsx";
import {ZH2} from "@zoria-ui/react/components/typography/ZTypography.tsx";
import {IconButton} from "@zoria-ui/react/components/buttons/IconButton.tsx";
import {XIcon} from "@zoria-ui/react/components/icons/Icons.tsx";

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