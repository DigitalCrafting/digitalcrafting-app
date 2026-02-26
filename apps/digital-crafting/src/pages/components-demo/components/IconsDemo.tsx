import {
    CalendarCheckIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    ClockCheckIcon,
    ClockIcon,
    CopyCheckIcon,
    CopyIcon,
    EllipsisIcon,
    EllipsisMenuIcon,
    MenuIcon,
    XIcon,
    Col,
    H2,
    Panel,
    Row
} from "@zoria-ui/react";

export function IconsDemo() {
    return <Panel>
        <Panel.Header><H2>Icons</H2></Panel.Header>
        <Panel.Body>
            <Col gap='sm'>
                <Row gap='lg' className={'justify-center content-center'}>
                    <XIcon/>
                    <ChevronDownIcon/>
                    <ChevronLeftIcon/>
                    <ChevronRightIcon/>
                    <ChevronUpIcon/>
                    <CalendarIcon/>
                    <CalendarCheckIcon/>
                    <ClockIcon/>
                    <ClockCheckIcon/>
                    <CheckIcon/>
                    <CopyIcon/>
                    <CopyCheckIcon/>
                </Row>
                <Row gap='lg' className={'justify-center content-center'}>
                    <MenuIcon/>
                    <EllipsisMenuIcon/>
                    <EllipsisIcon/>
                </Row>
            </Col>
        </Panel.Body>
    </Panel>;
}