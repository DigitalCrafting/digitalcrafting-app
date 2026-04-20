import {Button, Card, Col, H2, Panel, Popover, Row, Text} from "@zoria-ui/react";

export function PopoverDemo() {
    return <Panel>
        <Panel.Header><H2>Popover</H2></Panel.Header>
        <Panel.Body>
            <Row className={'justify-center content-center'}>
                <Col span={5} className={'justify-center align-items-center'}>
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
                <Col span={5} className={'justify-center align-items-center'}>
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
        </Panel.Body>
    </Panel>
}