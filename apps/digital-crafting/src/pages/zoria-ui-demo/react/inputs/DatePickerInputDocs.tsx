import {CodeBlock, Col, DatePickerInput, DateUtils, Row} from "@zoria-ui/react";
import {useMemo} from "react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

export const DatePickerInputDocs = () => {
    const [min, max] = useMemo(() => {
        const today = DateUtils.atMidnight(new Date());
        const minDate = DateUtils.subtractDays(DateUtils.atMidnight(today), 10);
        const maxDate = DateUtils.addDays(DateUtils.atMidnight(today), 10);

        return [DateUtils.toISODate(minDate), DateUtils.toISODate(maxDate)];
    }, [])

    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Date Picker Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <DatePickerInput onChange={(value) => console.log(value)} label='Date Picker'/>
                    </Col>
                    <Col span={2}/>
                    <Col span={4}>
                        <DatePickerInput onChange={(value) => console.log(value)} min={min} max={max} label='Date Picker with Min/Max'/>
                    </Col>
                    <Col span={1}/>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<DatePickerInput onChange={(value) => console.log(value)} label='Date Picker'/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<DatePickerInput onChange={(value) => console.log(value)} min={min} max={max} label='Date Picker with Min/Max'/>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs>
                <Row className='justify-center'>
                    WIP
                </Row>
            </ZoriaDocsPanel.Docs>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}