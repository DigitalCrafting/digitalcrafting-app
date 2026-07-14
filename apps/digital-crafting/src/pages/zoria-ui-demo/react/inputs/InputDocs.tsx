import {CalendarIcon, CodeBlock, Col, IconButton, Input, Row} from "@zoria-ui/react";
import {type ExpandByDefaultProp, ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const InputDocs = ({expandByDefault}: ExpandByDefaultProp) => {
    return <ZoriaDocsPanel expandByDefault={expandByDefault}>
        <ZoriaDocsPanel.Title>Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col span={12}>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <Input onChange={(event) => console.log(event.target.value)} label='Test input'/>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <Input label='Test input with error' error='Terrible error'/>
                        </Col>
                        <Col span={1}/>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <Input label='Test input disabled' disabled/>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <Input label='Test input 2 with error' error='Terrible error'/>
                        </Col>
                        <Col span={1}/>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <Input onChange={(event) => console.log(event.target.value)} label='Test input'>
                    <IconButton>
                        <CalendarIcon/>
                    </IconButton>
                </Input>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <Input label='Test input 2 with error' error='Terrible error'/>
                        </Col>
                        <Col span={1}/>
                    </Row>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Input onChange={(event) => console.log(event.target.value)} label='Test input'/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Input label='Test input with error' error='Terrible error'/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {` <Input label='Test input disabled' disabled/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Input label='Test input 2 with error' error='Terrible error'/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Input onChange={(event) => console.log(event.target.value)} label='Test input'>
                    <IconButton>
                        <CalendarIcon/>
                    </IconButton>
                </Input>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Input label='Test input 2 with error' error='Terrible error'/>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
                        <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}