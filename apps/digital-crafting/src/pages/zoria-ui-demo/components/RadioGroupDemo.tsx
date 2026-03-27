import {Col, H2, Panel, RadioGroup, Row} from "@zoria-ui/react"

export const RadioGroupDemo = () => {
    return <Panel>
        <Panel.Header>
            <H2>Radio Group</H2>
        </Panel.Header>
        <Panel.Body>
            <Col gap='sm'>
                <Row>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <RadioGroup onChange={(value) => console.log(value)} name='radioGroup1'>
                            <RadioGroup.Item value='1'>Option 1</RadioGroup.Item>
                            <RadioGroup.Item value='2'>Option 2</RadioGroup.Item>
                            <RadioGroup.Item value='3'>Option 3</RadioGroup.Item>
                        </RadioGroup>
                    </Col>
                </Row>
            </Col>
        </Panel.Body>
    </Panel>
}