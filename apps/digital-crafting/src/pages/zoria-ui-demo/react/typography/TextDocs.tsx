import {Col, H2, ExpandCollapsePanel, Row, Text, Link, CodeLine} from "@zoria-ui/react";
import type {ExpandByDefaultProp} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function TextDocs({expandByDefault = true}: ExpandByDefaultProp) {
    return <ExpandCollapsePanel expandByDefault={expandByDefault}>
        <ExpandCollapsePanel.Header><H2>Text</H2></ExpandCollapsePanel.Header>
        <ExpandCollapsePanel.Body>
            <Row className={'justify-center content-center'}>
                <Col span={5} className={'justify-center text-center'}>
                    <Text>Example normal text</Text>
                </Col>
                <Col span={5} className={'justify-center text-center'}>
                    <Text bold>Example bold text</Text>
                </Col>
            </Row>
            <Row className={'justify-center content-center'}>
                <Col span={5} className={'justify-center text-center'}>
                    <Text size='sm'>Example small text</Text>
                </Col>
                <Col span={5} className={'justify-center text-center'}>
                    <Text size='lg'>Example large text</Text>
                </Col>
            </Row>
            <Row className={'justify-center content-center'}>
                <Col span={5} className={'justify-center text-center'}>
                    <Link href=''>Example link</Link>
                </Col>
                <Col span={5} className={'justify-center text-center align-items-center'}>
                    <CodeLine>Example Code Line</CodeLine>
                </Col>
            </Row>
        </ExpandCollapsePanel.Body>
    </ExpandCollapsePanel>
}