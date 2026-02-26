import {Col, H2, Input, Panel, Row} from "@zoria-ui/react";

export function InputDemo() {
    return <Panel>
        <Panel.Header>
            <H2>Input</H2>
        </Panel.Header>
        <Panel.Body>
            <Col gap='sm'>
                <Row className={'justify-center content-center'}>

                    <Col span={5} className={'justify-center align-items-center'}>
                        <Input label='Test input'/>
                    </Col>

                    <Col span={5} className={'justify-center align-items-center'}>
                        <Input label='Test input with error' error='Terrible error'/>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>

                    <Col span={5} className={'justify-center align-items-center'}>
                        <Input label='Test input disabled' disabled/>
                    </Col>

                    <Col span={5} className={'justify-center align-items-center'}>
                        <Input label='Test input 2 with error' error='Terrible error'/>
                    </Col>
                </Row>
            </Col>
        </Panel.Body>
    </Panel>
}