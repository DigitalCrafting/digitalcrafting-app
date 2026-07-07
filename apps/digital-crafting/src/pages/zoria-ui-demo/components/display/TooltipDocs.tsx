import {CodeBlock, Col, Row, Text, Toggle, Tooltip} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function TooltipDocs() {
    return <ZoriaDocsPanel expandByDefault={true}>
        <ZoriaDocsPanel.Title>Tooltip</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Tooltip>
                            <Tooltip.Trigger>
                                <Toggle>Test toggle</Toggle>
                            </Tooltip.Trigger>
                            <Tooltip.Body>
                                <Text>This is a toggle tooltip</Text>
                            </Tooltip.Body>
                        </Tooltip>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Tooltip>
                            <Tooltip.Trigger>
                                <Text>Lorem ipsum</Text>
                            </Tooltip.Trigger>
                            <Tooltip.Body>
                                <Text>dolor sit amet, consectetur adipiscing elit.</Text>
                            </Tooltip.Body>
                        </Tooltip>
                    </Col>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`
                               <Tooltip>
                                <Tooltip.Trigger>
                                    <Toggle>Test toggle</Toggle>
                                </Tooltip.Trigger>
                                <Tooltip.Body>
                                    <Text>This is a toggle tooltip</Text>
                                </Tooltip.Body>
                            </Tooltip>
                        `}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`
                               <Tooltip>
                            <Tooltip.Trigger>
                                <Text>Lorem ipsum</Text>
                            </Tooltip.Trigger>
                            <Tooltip.Body>
                                <Text>dolor sit amet, consectetur adipiscing elit.</Text>
                            </Tooltip.Body>
                        </Tooltip>
                        `}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs>
                <Row className='justify-center'>
                    WIP
                </Row>
            </ZoriaDocsPanel.Docs>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>
}