import {CodeBlock, Col, Row} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../../zoria-docs-panel/ZoriaDocsPanel.tsx";
import {
    TimeRangePickerInput
} from "@zoria-ui/react/src/components/inputs/date-time/time-range-picker/TimeRangePickerInput.tsx";

export const TimeRangePickerInputDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Time Range Picker Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <TimeRangePickerInput onChange={console.log} label='Time Range Picker' />
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