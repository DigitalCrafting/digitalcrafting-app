import {CalendarIcon, Col, H2, IconButton, Input, Panel, Row} from "@zoria-ui/react";

export function InputDemo() {
    return <Panel>
        <Panel.Header>
            <H2>Input</H2>
        </Panel.Header>
        <Panel.Body>
            <Col gap='sm'>
                <Row className={'justify-center content-center'}>
                    <Col span={3} className={'justify-center align-items-center'}>
                        <Input onChange={(value) => console.log(value)} label='Test input'/>
                    </Col>
                    <Col span={2}/>
                    <Col span={3} className={'justify-center align-items-center'}>
                        <Input label='Test input with error' error='Terrible error'/>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={3} className={'justify-center align-items-center'}>
                        <Input label='Test input disabled' disabled/>
                    </Col>
                    <Col span={2}/>
                    <Col span={3} className={'justify-center align-items-center'}>
                        <Input label='Test input 2 with error' error='Terrible error'/>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={3} className={'justify-center align-items-center'}>
                        <Input onChange={(value) => console.log(value)} label='Test input'>
                            <IconButton>
                                <CalendarIcon />
                            </IconButton>
                        </Input>
                    </Col>
                    <Col span={2}/>
                    <Col span={3} className={'justify-center align-items-center'}>
                        <Input label='Test input 2 with error' error='Terrible error'/>
                    </Col>
                </Row>
            </Col>
        </Panel.Body>
    </Panel>
}