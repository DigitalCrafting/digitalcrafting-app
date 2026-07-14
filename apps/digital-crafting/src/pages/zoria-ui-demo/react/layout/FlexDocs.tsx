import './FlexDocs.scss';
import {CodeBlock, CodeLine, Col, H3, Row} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const FlexDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Flex</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col gap='lg'>
                    <Col gap='md'>
                        <H3>Flex Row</H3>
                        <Col>
                            <CodeLine>gap='sm'</CodeLine>
                            <Row gap='sm' className='flex-docs-flex'>
                                <div className='flex-docs-item'>Row Item 1</div>
                                <div className='flex-docs-item'>Row Item 2</div>
                                <div className='flex-docs-item'>Row Item 2</div>
                            </Row>
                        </Col>
                        <Col>
                            <CodeLine>gap='md'</CodeLine>
                            <Row gap='md' className='flex-docs-flex'>
                                <div className='flex-docs-item'>Row Item 1</div>
                                <div className='flex-docs-item'>Row Item 2</div>
                                <div className='flex-docs-item'>Row Item 2</div>
                            </Row>
                        </Col>
                        <Col>
                            <CodeLine>gap='lg'</CodeLine>
                            <Row gap='lg' className='flex-docs-flex'>
                                <div className='flex-docs-item'>Row Item 1</div>
                                <div className='flex-docs-item'>Row Item 2</div>
                                <div className='flex-docs-item'>Row Item 2</div>
                            </Row>
                        </Col>
                    </Col>

                    <Col gap='md'>
                        <H3>Flex Column</H3>
                        <Row gap='lg'>
                            <Col>
                                <CodeLine>gap='sm'</CodeLine>
                                <Col gap='sm' className='flex-docs-flex'>
                                    <div className='flex-docs-item'>Column Item 1</div>
                                    <div className='flex-docs-item'>Column Item 2</div>
                                    <div className='flex-docs-item'>Column Item 2</div>
                                </Col>
                            </Col>
                            <Col>
                                <CodeLine>gap='md'</CodeLine>
                                <Col gap='md' className='flex-docs-flex'>
                                    <div className='flex-docs-item'>Column Item 1</div>
                                    <div className='flex-docs-item'>Column Item 2</div>
                                    <div className='flex-docs-item'>Column Item 2</div>
                                </Col>
                            </Col>
                            <Col>
                                <CodeLine>gap='lg'</CodeLine>
                                <Col gap='lg' className='flex-docs-flex'>
                                    <div className='flex-docs-item'>Column Item 1</div>
                                    <div className='flex-docs-item'>Column Item 2</div>
                                    <div className='flex-docs-item'>Column Item 2</div>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col gap='lg'>
                    <Col>
                        <H3>Flex Row</H3>
                        <CodeBlock>
                            {/* language=text */}
                            {`
                            <Row gap='sm'>
                                <div>Row Item 1</div>
                                <div>Row Item 2</div>
                                <div>Row Item 2</div>
                            </Row>
                            `}
                        </CodeBlock>
                        <CodeBlock>
                            {/* language=text */}
                            {`
                            <Row gap='md'>
                                <div>Row Item 1</div>
                                <div>Row Item 2</div>
                                <div>Row Item 2</div>
                            </Row>
                            `}
                        </CodeBlock>
                        <CodeBlock>
                            {/* language=text */}
                            {`
                            <Row gap='lg'>
                                <div>Row Item 1</div>
                                <div>Row Item 2</div>
                                <div>Row Item 2</div>
                            </Row>
                            `}
                        </CodeBlock>
                    </Col>
                    <Col>
                        <H3>Flex Column</H3>
                        <CodeBlock>
                            {/* language=text */}
                            {`
                            <Col gap='sm'>
                                <div>Row Item 1</div>
                                <div>Row Item 2</div>
                                <div>Row Item 2</div>
                            </Col>
                            `}
                        </CodeBlock>
                        <CodeBlock>
                            {/* language=text */}
                            {`
                            <Col gap='md'>
                                <div>Row Item 1</div>
                                <div>Row Item 2</div>
                                <div>Row Item 2</div>
                            </Col>
                            `}
                        </CodeBlock>
                        <CodeBlock>
                            {/* language=text */}
                            {`
                            <Col gap='lg'>
                                <div>Row Item 1</div>
                                <div>Row Item 2</div>
                                <div>Row Item 2</div>
                            </Col>
                            `}
                        </CodeBlock>
                    </Col>
                </Col>

            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>
}