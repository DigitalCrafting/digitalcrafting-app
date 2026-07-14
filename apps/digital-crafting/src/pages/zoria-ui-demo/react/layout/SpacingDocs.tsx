import {Col} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const SpacingDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Spacing</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col span={12}>
                    Spacing
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>

            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs />
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>
}