import {Col, H2, Panel, Row, Toggle} from "@zoria-ui/react";

export function ToggleDemo() {
    return <Panel>
        <Panel.Header><H2>Toggle</H2></Panel.Header>
        <Panel.Body>
            <Col gap='sm'>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Toggle onChange={(value) => console.log(value)}>Test toggle</Toggle>
                    </Col>

                    <Col span={5} className={'justify-center align-items-center'}>
                        <Toggle disabled>Disabled toggle</Toggle>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>

                    <Col span={5} className={'justify-center align-items-center'}>
                        <Toggle checked>Test checked toggle</Toggle>
                    </Col>

                    <Col span={5} className={'justify-center align-items-center'}>
                        <Toggle disabled checked>Disabled toggle</Toggle>
                    </Col>
                </Row>
            </Col>
        </Panel.Body>
    </Panel>
}