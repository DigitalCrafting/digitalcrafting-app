import {CodeBlock, Col, Row, TextareaInput} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const TextareaInputDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Text Area Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <TextareaInput placeholder='Funny placeholder' onChange={(value) => console.log(value)}
                                       label='Text area input'/>
                    </Col>
                    <Col span={7}/>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<TextareaInput placeholder='Funny placeholder' onChange={(value) => console.log(value)} label='Text area input'/>`}
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