import {CodeBlock, Col, Row, TextInput} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const TextInputDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Text Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <TextInput placeholder='Funny placeholder' onChange={(value) => console.log(value)} label='Text input'/>
                    </Col>
                    <Col span={7}/>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <CodeBlock>
                    {/* language=text */}
                    {`<TextInput placeholder='Funny placeholder' onChange={(value) => console.log(value)} label='Text input'/>`}
                </CodeBlock>
            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs>
                <Row className='text-center'>
                    WIP
                </Row>
            </ZoriaDocsPanel.Docs>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>
}