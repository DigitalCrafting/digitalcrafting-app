import {BanIcon, CheckIcon, Chip, CircleInfoIcon, CodeBlock, Col, Row, TriangleAlertIcon} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export function ChipDocs() {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Chip</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col span={12}>
                    <Row>
                        <Col span={1}/>
                        <Col span={4} className='align-items-center'>
                            <Chip>Primary Filled Chip</Chip>
                        </Col>
                        <Col span={2}/>
                        <Col span={4} className='align-items-center'>
                            <Chip variant='outline'>Primary Outline Chip</Chip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4} className='align-items-center'>
                            <Chip color='secondary'>Secondary Filled Chip</Chip>
                        </Col>
                        <Col span={2}/>
                        <Col span={4} className='align-items-center'>
                            <Chip color='secondary' variant='outline'>Secondary Outline Chip</Chip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4} className='align-items-center'>
                            <Chip color='info'>
                                <CircleInfoIcon/>
                                Info Filled Chip
                            </Chip>
                        </Col>
                        <Col span={2}/>
                        <Col span={4} className='align-items-center'>
                            <Chip color='info' variant='outline'>
                                <CircleInfoIcon/>
                                Info Outline Chip
                            </Chip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4} className='align-items-center'>
                            <Chip color='success'>
                                <CheckIcon/>
                                Success Filled Chip
                            </Chip>
                        </Col>
                        <Col span={2}/>
                        <Col span={4} className='align-items-center'>
                            <Chip color='success' variant='outline'>
                                <CheckIcon/>
                                Success Outline Chip
                            </Chip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4} className='align-items-center'>
                            <Chip color='warning'>
                                <TriangleAlertIcon/>
                                Warning Filled Chip
                            </Chip>
                        </Col>
                        <Col span={2}/>
                        <Col span={4} className='align-items-center'>
                            <Chip color='warning' variant='outline'>
                                <TriangleAlertIcon/>
                                Warning Outline Chip
                            </Chip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4} className='align-items-center'>
                            <Chip color='error'>
                                <BanIcon/>
                                Error Filled Chip
                            </Chip>
                        </Col>
                        <Col span={2}/>
                        <Col span={4} className='align-items-center'>
                            <Chip color='error' variant='outline'>
                                <BanIcon/>
                                Error Outline Chip
                            </Chip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4} className='align-items-center'>
                            <Chip compact>Compact Chip</Chip>
                        </Col>
                        <Col span={2}/>
                        <Col span={4} className='align-items-center'>
                            <Chip compact variant='outline'>Compact Chip</Chip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4} className='align-items-center'>
                            <Chip compact color='error'>
                                <BanIcon/>
                                Compact Chip
                            </Chip>
                        </Col>
                        <Col span={2}/>
                        <Col span={4} className='align-items-center'>
                            <Chip compact color='error' variant='outline'>
                                <BanIcon/>
                                Compact Chip
                            </Chip>
                        </Col>
                    </Row>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip>Primary Filled Chip</Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip variant='outline'>Primary Outline Chip</Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip color='secondary'>Secondary Filled Chip</Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip color='secondary' variant='outline'>Secondary Outline Chip</Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip color='info'>
                            <CircleInfoIcon/>
                            Info Filled Chip
                        </Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip color='info' variant='outline'>
                            <CircleInfoIcon/>
                            Info Outline Chip
                        </Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip color='success'>
                            <CheckIcon/>
                            Success Filled Chip
                        </Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip color='success' variant='outline'>
                            <CheckIcon/>
                            Success Outline Chip
                        </Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip color='warning'>
                            <TriangleAlertIcon/>
                            Warning Filled Chip
                        </Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip color='warning' variant='outline'>
                            <TriangleAlertIcon/>
                            Warning Outline Chip
                        </Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip color='error'>
                            <BanIcon/>
                            Error Filled Chip
                        </Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip color='error' variant='outline'>
                            <BanIcon/>
                            Error Outline Chip
                        </Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip compact>Compact Chip</Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip compact variant='outline'>Compact Chip</Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip compact color='error'>
                            <BanIcon/>
                            Compact Chip
                        </Chip>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Chip compact color='error' variant='outline'>
                            <BanIcon/>
                            Compact Chip
                        </Chip>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
                        <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}