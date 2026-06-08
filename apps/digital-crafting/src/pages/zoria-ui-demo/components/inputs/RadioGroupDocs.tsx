import {CodeBlock, Col, RadioGroup, Row} from "@zoria-ui/react"
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const RadioGroupDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Radio Group Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <RadioGroup onChange={(value) => console.log(value)} name='radioGroup1'>
                            <RadioGroup.Item value='1'>Option 1</RadioGroup.Item>
                            <RadioGroup.Item value='2'>Option 2</RadioGroup.Item>
                            <RadioGroup.Item value='3'>Option 3</RadioGroup.Item>
                        </RadioGroup>
                    </Col>
                    <Col span={7}/>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<RadioGroup onChange={(value) => console.log(value)} name='radioGroup1'>
                            <RadioGroup.Item value='1'>Option 1</RadioGroup.Item>
                            <RadioGroup.Item value='2'>Option 2</RadioGroup.Item>
                            <RadioGroup.Item value='3'>Option 3</RadioGroup.Item>
                        </RadioGroup>`}
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