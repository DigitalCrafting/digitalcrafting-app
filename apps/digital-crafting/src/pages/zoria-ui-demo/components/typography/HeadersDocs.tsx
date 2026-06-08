import {Col, H1, H2, H3, H4, H5, H6, ExpandCollapsePanel, Row} from "@zoria-ui/react";

export function HeadersDocs() {
    return <ExpandCollapsePanel>
        <ExpandCollapsePanel.Header><H2>Headers</H2></ExpandCollapsePanel.Header>
        <ExpandCollapsePanel.Body>
            <Col gap='sm'>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center text-start'}>
                        <H1>Header H1</H1>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center text-start'}>
                        <H2>Header H2</H2>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center text-start'}>
                        <H3>Header H3</H3>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center text-start'}>
                        <H4>Header H4</H4>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center text-start'}>
                        <H5>Header H5</H5>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center text-start'}>
                        <H6>Header H6</H6>
                    </Col>
                </Row>
            </Col>
        </ExpandCollapsePanel.Body>
    </ExpandCollapsePanel>
}