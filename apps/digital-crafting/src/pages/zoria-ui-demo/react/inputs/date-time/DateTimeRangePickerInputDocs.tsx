import {CodeBlock, Col, Row} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const DateTimeRangePickerInputDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Date Time Range Picker Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        WIP
                    </Col>
                    <Col span={2}/>
                    <Col span={4}>
                    </Col>
                    <Col span={1}/>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        WIP
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
                        <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}