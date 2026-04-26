import {Col, H2, Chip, Panel, Row, CheckIcon, CircleInfoIcon, TriangleAlertIcon, BanIcon} from "@zoria-ui/react";

export function ChipDemo() {
    return <Panel>
        <Panel.Header>
            <H2>Chip</H2>
        </Panel.Header>
        <Panel.Body>
            <Col gap='sm'>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip>Primary Filled Chip</Chip>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip variant='outline'>Primary Outline Chip</Chip>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip color='secondary'>Secondary Filled Chip</Chip>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip color='secondary' variant='outline'>Secondary Outline Chip</Chip>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip color='info'>
                            <CircleInfoIcon/>
                            Info Filled Chip
                        </Chip>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip color='info' variant='outline'>
                            <CircleInfoIcon/>
                            Info Outline Chip
                        </Chip>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip color='success'>
                            <CheckIcon/>
                            Success Filled Chip
                        </Chip>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip color='success' variant='outline'>
                            <CheckIcon/>
                            Success Outline Chip
                        </Chip>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip color='warning'>
                            <TriangleAlertIcon/>
                            Warning Filled Chip
                        </Chip>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip color='warning' variant='outline'>
                            <TriangleAlertIcon/>
                            Warning Outline Chip
                        </Chip>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip color='error'>
                            <BanIcon/>
                            Error Filled Chip
                        </Chip>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip color='error' variant='outline'>
                            <BanIcon/>
                            Error Outline Chip
                        </Chip>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip compact>Compact Chip</Chip>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip compact variant='outline'>Compact Chip</Chip>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip compact color='error'>
                            <BanIcon/>
                            Compact Chip
                        </Chip>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center'}>
                        <Chip compact color='error' variant='outline'>
                            <BanIcon/>
                            Compact Chip
                        </Chip>
                    </Col>
                </Row>
            </Col>
        </Panel.Body>
    </Panel>
}