import {Button, Card, CodeBlock, Col, Popover, Row, Text} from "@zoria-ui/react";
import {type ExpandByDefaultProp, ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function PopoverDocs({expandByDefault}: ExpandByDefaultProp) {
    return <ZoriaDocsPanel expandByDefault={expandByDefault}>
        <ZoriaDocsPanel.Title>Popover</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4} className='align-items-center'>
                        <Popover>
                            <Popover.Trigger>
                                <Button >Popover 1</Button>
                            </Popover.Trigger>
                            <Popover.Body>
                                <Card>
                                    <Text>This is a popover 1 body</Text>
                                </Card>
                            </Popover.Body>
                        </Popover>
                    </Col>
                    <Col span={2}/>
                    <Col span={4} className='align-items-center'>
                        <Popover persistent>
                            <Popover.Trigger>
                                <Button>Lorem ipsum (persistent)</Button>
                            </Popover.Trigger>
                            <Popover.Body>
                                <Card>
                                    <Text>dolor sit amet, consectetur adipiscing elit.</Text>
                                </Card>
                            </Popover.Body>
                        </Popover>
                    </Col>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Popover>
                        <Popover.Trigger>
                            <Button >Popover 1</Button>
                        </Popover.Trigger>
                        <Popover.Body>
                            <Card>
                                <Text>This is a popover 1 body</Text>
                            </Card>
                        </Popover.Body>
                    </Popover>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Popover persistent>
                        <Popover.Trigger>
                            <Button>Lorem ipsum (persistent)</Button>
                        </Popover.Trigger>
                        <Popover.Body>
                            <Card>
                                <Text>dolor sit amet, consectetur adipiscing elit.</Text>
                            </Card>
                        </Popover.Body>
                    </Popover>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
                        <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}