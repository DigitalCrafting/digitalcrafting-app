import {Calendar, CodeBlock, Col, Row} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function CalendarDocs() {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Calendar</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <Calendar onChange={console.log}/>
                    </Col>
                    <Col span={2}/>
                    <Col span={4}>
                        <Calendar onChange={console.log} startingDay='Mon'/>
                    </Col>
                    <Col span={1}/>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Calendar onChange={console.log}/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Calendar onChange={console.log} startingDay='Mon'/>`}
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