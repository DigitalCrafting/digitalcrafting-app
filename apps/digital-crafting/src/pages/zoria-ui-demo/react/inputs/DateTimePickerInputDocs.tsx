import {CodeBlock, Col, DateTimePickerInput, Row} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const DateTimePickerInputDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Date Time Picker Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <DateTimePickerInput onChange={(value) => console.log(value)} label='Date Time Picker'/>
                    </Col>
                    <Col span={2}/>
                    <Col span={4}>
                        <DateTimePickerInput minHour={9} maxHour={18} maxMin={0} onChange={(value) => console.log(value)} label='Date Time Picker 9 - 5'/>
                    </Col>
                    <Col span={1}/>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<DateTimePickerInput onChange={(value) => console.log(value)} label='Date Time Picker'/>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs>
                <Row className='justify-center'>
                    WIP
                </Row>
            </ZoriaDocsPanel.Docs>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}