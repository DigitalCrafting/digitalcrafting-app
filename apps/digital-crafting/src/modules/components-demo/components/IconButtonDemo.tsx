import {IconButton, XIcon, Col, H2, Panel, Row} from "@zoria-ui/react";

export function IconButtonDemo() {
    return <Panel>
        <Panel.Header><H2>IconButton</H2></Panel.Header>
        <Panel.Body>
            <Row className={'justify-center content-center'}>
                <Col span={5} className={'justify-center align-items-center'}>
                    <IconButton><XIcon/></IconButton>
                </Col>

                <Col span={5} className={'justify-center align-items-center'}>
                    <IconButton disabled><XIcon/></IconButton>
                </Col>
            </Row>
        </Panel.Body>
    </Panel>;
}