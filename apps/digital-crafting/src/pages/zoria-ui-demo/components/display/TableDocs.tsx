import {Col, H2, ExpandCollapsePanel, Table} from "@zoria-ui/react";
import type {ExpandByDefaultProp} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function TableDocs({expandByDefault}: ExpandByDefaultProp) {
    return <ExpandCollapsePanel expandByDefault={expandByDefault}>
        <ExpandCollapsePanel.Header><H2>Table</H2></ExpandCollapsePanel.Header>
        <ExpandCollapsePanel.Body>
            <Col span={12}>
                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Header>Id</Table.Header>
                            <Table.Header>Name</Table.Header>
                            <Table.Header>Surname</Table.Header>
                            <Table.Header>Age</Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>John</Table.Cell>
                            <Table.Cell>Macmillan</Table.Cell>
                            <Table.Cell>30</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>Tim</Table.Cell>
                            <Table.Cell>Gladstone</Table.Cell>
                            <Table.Cell>50</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Col>
        </ExpandCollapsePanel.Body>
    </ExpandCollapsePanel>
}