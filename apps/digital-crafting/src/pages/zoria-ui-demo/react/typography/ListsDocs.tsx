import {Col, ExpandCollapsePanel, H2, Li, Ol, Row, Text, Ul} from "@zoria-ui/react";
import type {ExpandByDefaultProp} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function ListsDocs({expandByDefault = true}: ExpandByDefaultProp) {
    return <ExpandCollapsePanel expandByDefault={expandByDefault}>
        <ExpandCollapsePanel.Header><H2>Lists</H2></ExpandCollapsePanel.Header>
        <ExpandCollapsePanel.Body>
            <Row className={'justify-center content-center'}>
                <Col span={5} className={'justify-center'}>
                    <Ul>
                        <Li><Text>First element</Text></Li>
                        <Li><Text>Second element</Text></Li>
                        <Li><Text>Third element</Text></Li>
                    </Ul>
                </Col>
                <Col span={5} className={'justify-center'}>
                    <Ol>
                        <Li><Text>First element</Text></Li>
                        <Li><Text>Second element</Text></Li>
                        <Li><Text>Third element</Text></Li>
                    </Ol>
                </Col>
            </Row>
        </ExpandCollapsePanel.Body>
    </ExpandCollapsePanel>
}