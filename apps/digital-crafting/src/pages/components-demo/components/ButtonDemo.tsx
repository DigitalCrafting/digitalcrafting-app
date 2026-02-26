import {Button, Col, H2, Panel, Row} from "@zoria-ui/react";

export function ButtonDemo() {
    return <Panel>
        <Panel.Header>
            <H2>Button</H2>
        </Panel.Header>
        <Panel.Body>
            <Col gap='sm'>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center content-center'}>
                        <Button secondary onClick={() => console.log('working')}>Secondary button</Button>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center content-center'}>
                        <Button onClick={() => console.log('working')}>Primary button</Button>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center content-center'}>
                        <Button secondary onClick={() => console.log('working')} disabled>Secondary button disabled</Button>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center content-center'}>
                        <Button onClick={() => console.log('working')} disabled>Primary button disabled</Button>
                    </Col>
                </Row>
            </Col>
        </Panel.Body>
    </Panel>;
}