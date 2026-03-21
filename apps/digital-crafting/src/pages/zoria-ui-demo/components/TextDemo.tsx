import {Col, H2, Panel, Row, Text} from "@zoria-ui/react";

export function TextDemo() {
    return <Panel>
        <Panel.Header><H2>Text</H2></Panel.Header>
        <Panel.Body>
            <Row className={'justify-center content-center'}>
                <Col span={5} className={'justify-center text-center'}>
                    <Text>Example normal text</Text>
                </Col>

                <Col span={5} className={'justify-center text-center'}>
                    <Text bold>Example bold text</Text>
                </Col>
            </Row>
            <Row className={'justify-center content-center'}>
                <Col span={5} className={'justify-center text-center'}>
                    <Text size='sm'>Example small text</Text>
                </Col>

                <Col span={5} className={'justify-center text-center'}>
                    <Text size='lg'>Example large text</Text>
                </Col>
            </Row>
        </Panel.Body>
    </Panel>
}