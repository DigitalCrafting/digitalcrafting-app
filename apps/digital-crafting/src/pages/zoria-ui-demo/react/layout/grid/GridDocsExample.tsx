import {CodeBlock, CodeLine, Col, Grid, H4, Row, UiSize} from "@zoria-ui/react";

export interface GridDocsExampleProps {
    gap: UiSize | 'none';
    spans: (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12)[];
    cols: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export const GridDocsDemo = ({gap, spans, cols}: GridDocsExampleProps) => {
    return <Col gap='sm'>
        <Row gap='sm'>
            <H4>Grid</H4><CodeLine>cols={cols} gap='{gap}'</CodeLine>
            <H4>Grid.Col</H4>{spans.map(span => <CodeLine>span=`{span}`</CodeLine>)}
        </Row>
        <Grid cols={cols} gap={gap} className='grid-docs-grid'>
            {
                spans.map((span, index) => (
                    <Grid.Col span={span} className='grid-docs-item'>
                        Grid Item {index + 1}
                    </Grid.Col>
                ))
            }
        </Grid>
    </Col>;
}

export const GridDocsCode = ({gap, spans, cols}: GridDocsExampleProps) => {
    return <CodeBlock>
        {/* language=text */}
        {`
            <Grid cols={${cols}} gap='${gap}'>
            ${
                spans.map((span, index) => (
                    /* language=text */
                    `<Grid.Col span={${span}}>
                        Grid Item ${index+1}
                    </Grid.Col>`
                )).join('\n')
            }
            </Grid>
        `}
    </CodeBlock>
}