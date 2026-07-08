import {CodeBlock, Col, Row, Table} from "@zoria-ui/react";
import {type ExpandByDefaultProp, ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function TableDocs({expandByDefault = true}: ExpandByDefaultProp) {
    return <ZoriaDocsPanel expandByDefault={expandByDefault}>
        <ZoriaDocsPanel.Title>Table</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
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
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`
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
                        `}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs>
                <Row className='justify-center'>
                    WIP
                </Row>
            </ZoriaDocsPanel.Docs>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>
}