import {CodeBlock, Col, IconButton, Row, XIcon} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function IconButtonDocs() {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Icon Button</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4} className={'align-items-center'}>
                        <IconButton onClick={() => console.log("working")}><XIcon/></IconButton>
                    </Col>
                    <Col span={1}/>
                    <Col span={4} className={'align-items-center'}>
                        <IconButton disabled><XIcon/></IconButton>
                    </Col>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<IconButton onClick={() => console.log("working")}><XIcon/></IconButton>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<IconButton disabled><XIcon/></IconButton>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
                        <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}