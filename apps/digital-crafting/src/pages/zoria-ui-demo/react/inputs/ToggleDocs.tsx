import {CodeBlock, Col, Row, Toggle} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function ToggleDocs() {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Toggle Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col span={12}>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <Toggle onChange={(value) => console.log(value)}>Test toggle</Toggle>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <Toggle disabled>Disabled toggle</Toggle>
                        </Col>
                        <Col span={1}/>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <Toggle checked>Test checked toggle</Toggle>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <Toggle disabled checked>Disabled toggle</Toggle>
                        </Col>
                        <Col span={1}/>
                    </Row>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Toggle onChange={(value) => console.log(value)}>Test toggle</Toggle>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Toggle disabled>Disabled toggle</Toggle>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Toggle checked>Test checked toggle</Toggle>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Toggle disabled checked>Disabled toggle</Toggle>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
                        <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}