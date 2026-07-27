import {CodeBlock, Col, Row} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../../zoria-docs-panel/ZoriaDocsPanel.tsx";
import {
    DateTimeRangePickerInput
} from "@zoria-ui/react/src/components/inputs/date-time/date-time-range-picker/DateTimeRangePickerInput.tsx";

export const DateTimeRangePickerInputDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Date Time Range Picker Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={5}>
                        <DateTimeRangePickerInput
                            onChange={console.log}
                            label='Date Time Range Picker'
                        />
                    </Col>
                    <Col span={6}/>
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