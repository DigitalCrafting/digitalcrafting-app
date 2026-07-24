import {CodeBlock, Col, DateRangePickerInput, Row} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const DateRangePickerInputDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Date Range Picker Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <DateRangePickerInput onChange={console.log} />
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