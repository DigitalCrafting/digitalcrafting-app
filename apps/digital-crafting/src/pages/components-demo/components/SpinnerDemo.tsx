import {Col, H2, Panel, Row, SpinnerCircle, SpinnerLeaves, Text, Tooltip} from "@zoria-ui/react";

export function SpinnerDemo() {
    return <Panel>
        <Panel.Header><H2>Spinner</H2></Panel.Header>
        <Panel.Body>
            <Row className={'justify-center content-center'}>
                <Col span={5} className={'justify-center align-items-center'}>
                    <Tooltip>
                        <Tooltip.Trigger>
                            <SpinnerCircle/>
                        </Tooltip.Trigger>
                        <Tooltip.Body>
                            <Text>SpinnerCircle</Text>
                        </Tooltip.Body>
                    </Tooltip>
                </Col>
                <Col span={5} className={'justify-center align-items-center'}>
                    <Tooltip>
                        <Tooltip.Trigger>
                            <SpinnerLeaves/>
                        </Tooltip.Trigger>
                        <Tooltip.Body>
                            <Text>SpinnerLeaves</Text>
                        </Tooltip.Body>
                    </Tooltip>
                </Col>
            </Row>
        </Panel.Body>
    </Panel>
}