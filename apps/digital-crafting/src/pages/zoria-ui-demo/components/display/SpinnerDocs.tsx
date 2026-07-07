import {Col, ExpandCollapsePanel, H2, Row, SpinnerCircle, SpinnerLeaves, Text, Tooltip} from "@zoria-ui/react";

export function SpinnerDocs() {
    return <ExpandCollapsePanel expandByDefault={true}>
        <ExpandCollapsePanel.Header><H2>Spinner</H2></ExpandCollapsePanel.Header>
        <ExpandCollapsePanel.Body>
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
        </ExpandCollapsePanel.Body>
    </ExpandCollapsePanel>
}