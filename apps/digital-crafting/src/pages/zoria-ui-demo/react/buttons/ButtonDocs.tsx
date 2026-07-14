import {Button, CodeBlock, Col, LinkButton, Row, TextButton} from "@zoria-ui/react";
import {type ExpandByDefaultProp, ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function ButtonDocs({expandByDefault}: ExpandByDefaultProp) {
    return <ZoriaDocsPanel expandByDefault={expandByDefault}>
        <ZoriaDocsPanel.Title>Buttons</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col span={12}>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <Button secondary onClick={() => console.log('working')}>Secondary button</Button>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <Button onClick={() => console.log('working')}>Primary button</Button>
                        </Col>
                        <Col span={1}/>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <Button secondary onClick={() => console.log('working')} disabled>Secondary button
                                disabled</Button>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <Button onClick={() => console.log('working')} disabled>Primary button disabled</Button>
                        </Col>
                        <Col span={1}/>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <TextButton onClick={() => console.log('working')}>Text button</TextButton>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <TextButton onClick={() => console.log('working')} disabled>Text button
                                disabled</TextButton>
                        </Col>
                        <Col span={1}/>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <LinkButton onClick={() => console.log('working')}>Link button</LinkButton>
                        </Col>
                        <Col span={7}/>
                    </Row>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Button secondary onClick={() => console.log('working')}>Secondary button</Button>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Button onClick={() => console.log('working')}>Primary button</Button>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Button secondary onClick={() => console.log('working')} disabled>Secondary button disabled</Button>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Button onClick={() => console.log('working')} disabled>Primary button disabled</Button>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<TextButton onClick={() => console.log('working')}>Text button</TextButton>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<TextButton onClick={() => console.log('working')} disabled>Text button disabled</TextButton>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<LinkButton onClick={() => console.log('working')}>Link button</LinkButton>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}