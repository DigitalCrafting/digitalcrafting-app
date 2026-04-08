import {Checkbox, Col, H2, Panel, Row} from "@zoria-ui/react";

export function CheckboxDemo() {
    return <Panel>
        <Panel.Header><H2>Checkbox</H2></Panel.Header>
        <Panel.Body>
            <Col gap='sm'>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Checkbox onChange={(value) => console.log(value)}>Test checkbox</Checkbox>
                    </Col>

                    <Col span={5} className={'justify-center align-items-center'}>
                        <Checkbox disabled>Disabled checkbox</Checkbox>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>

                    <Col span={5} className={'justify-center align-items-center'}>
                        <Checkbox onChange={(value) => console.log(value)} checked>Test checked checkbox</Checkbox>
                    </Col>

                    <Col span={5} className={'justify-center align-items-center'}>
                        <Checkbox disabled checked>Disabled checkbox</Checkbox>
                    </Col>
                </Row>
            </Col>
        </Panel.Body>
    </Panel>;
}