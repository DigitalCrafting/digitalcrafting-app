import {Col, H2, ExpandCollapsePanel, Row, Text, Toggle, Tooltip} from "@zoria-ui/react";

export function TooltipDocs() {
    return <ExpandCollapsePanel>
        <ExpandCollapsePanel.Header><H2>Tooltip</H2></ExpandCollapsePanel.Header>
        <ExpandCollapsePanel.Body>
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
        </ExpandCollapsePanel.Body>
    </ExpandCollapsePanel>
}