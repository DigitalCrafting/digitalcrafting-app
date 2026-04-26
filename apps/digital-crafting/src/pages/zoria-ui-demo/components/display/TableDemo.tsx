import {Col, H2, Panel, Table} from "@zoria-ui/react";

export function TableDemo() {
    return <Panel>
        <Panel.Header><H2>Table</H2></Panel.Header>
        <Panel.Body>
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
        </Panel.Body>
    </Panel>
}