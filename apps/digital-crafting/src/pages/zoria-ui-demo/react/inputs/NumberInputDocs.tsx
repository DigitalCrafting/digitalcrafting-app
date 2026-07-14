import {CodeBlock, Col, NumberInput, Row} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const NumberInputDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Number Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <NumberInput placeholder='Funny placeholder' onChange={(value) => console.log(value)} label='Number input'/>
                    </Col>
                    <Col span={2}/>
                    <Col span={4}>
                        <NumberInput placeholder='Only positive' disableNegative onChange={(value) => console.log(value)} label='Number input disabled negative'/>
                    </Col>
                    <Col span={1}/>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<NumberInput placeholder='Funny placeholder' onChange={(value) => console.log(value)} label='Number input'/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<NumberInput placeholder='Only positive' disableNegative onChange={(value) => console.log(value)} label='Number input disabled negative'/>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
                        <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}