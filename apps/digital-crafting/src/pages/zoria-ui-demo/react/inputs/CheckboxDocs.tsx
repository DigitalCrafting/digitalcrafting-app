import {Checkbox, CodeBlock, Col, Row} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function CheckboxDocs() {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Checkbox</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col span={12}>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <Checkbox onChange={(value) => console.log(value)}>Test checkbox</Checkbox>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <Checkbox disabled>Disabled checkbox</Checkbox>
                        </Col>
                        <Col span={1}/>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <Checkbox onChange={(value) => console.log(value)} checked>Test checked checkbox</Checkbox>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <Checkbox disabled checked>Disabled checkbox</Checkbox>
                        </Col>
                        <Col span={1}/>
                    </Row>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Checkbox onChange={(value) => console.log(value)}>Test checkbox</Checkbox>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Checkbox disabled>Disabled checkbox</Checkbox>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Checkbox onChange={(value) => console.log(value)} checked>Test checked checkbox</Checkbox>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Checkbox disabled checked>Disabled checkbox</Checkbox>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
                        <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}