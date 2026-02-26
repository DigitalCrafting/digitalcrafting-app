import {Calendar, Col, H2, Panel, Row} from "@zoria-ui/react";

export function DatePickerDemo() {
    return <Panel>
        <Panel.Header><H2>Datepicker</H2></Panel.Header>
        <Panel.Body>
            <Row className={'justify-center align-items-start'}>
                <Col span={5} className={'justify-center align-items-center'}>
                    <Calendar onChange={console.log}/>
                </Col>
                <Col span={5} className={'justify-center align-items-center'}>
                    <Calendar onChange={console.log} startingDay='Mon'/>
                </Col>
            </Row>
        </Panel.Body>
    </Panel>
}