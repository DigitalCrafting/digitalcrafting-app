import {CodeBlock, Col, Row, TimePickerInput} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const TimePickerInputDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Time Picker Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <TimePickerInput onChange={(value) => console.log(value)} label='Time Picker'/>
                    </Col>
                    <Col span={2}/>
                    <Col span={4}>
                        <TimePickerInput minHour={9} maxHour={18} maxMin={0} onChange={(value) => console.log(value)} label='Time Picker 9 - 5'/>
                    </Col>
                    <Col span={1}/>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<TimePickerInput onChange={(value) => console.log(value)} label='Time Picker'/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<TimePickerInput minHour={9} maxHour={18} maxMin={0} onChange={(value) => console.log(value)} label='Time Picker 9 - 5'/>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
                        <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}