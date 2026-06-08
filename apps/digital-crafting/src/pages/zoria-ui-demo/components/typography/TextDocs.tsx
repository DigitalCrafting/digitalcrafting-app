import {Col, H2, ExpandCollapsePanel, Row, Text} from "@zoria-ui/react";

export function TextDocs() {
    return <ExpandCollapsePanel>
        <ExpandCollapsePanel.Header><H2>Text</H2></ExpandCollapsePanel.Header>
        <ExpandCollapsePanel.Body>
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
        </ExpandCollapsePanel.Body>
    </ExpandCollapsePanel>
}