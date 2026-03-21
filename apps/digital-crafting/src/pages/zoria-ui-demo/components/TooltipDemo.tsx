import {Col, H2, Panel, Row, Text, Toggle, Tooltip} from "@zoria-ui/react";

export function TooltipDemo() {
    return <Panel>
        <Panel.Header><H2>Tooltip</H2></Panel.Header>
        <Panel.Body>
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
        </Panel.Body>
    </Panel>
}