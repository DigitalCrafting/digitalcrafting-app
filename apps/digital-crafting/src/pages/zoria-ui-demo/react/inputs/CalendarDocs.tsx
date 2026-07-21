import {Calendar, CodeBlock, Col, DateUtils, Row} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";
import {useMemo} from "react";

export function CalendarDocs() {
    const [rangeStart, rangeEnd, rangeEndNextMonth] = useMemo(() => {
        const today = new Date();
        const rangeStartAsDate = DateUtils.atMidnight(today);
        const rangeEndAsDate = DateUtils.atMidnight(today);
        const rangeEndNextMonthAsDate = DateUtils.atMidnight(today);
        rangeStartAsDate.setDate(5);
        rangeEndAsDate.setDate(25);
        rangeEndNextMonthAsDate.setDate(25);
        rangeEndNextMonthAsDate.setMonth(today.getMonth() + 1);

        const rangeStart = DateUtils.toISODate(rangeStartAsDate);
        const rangeEnd = DateUtils.toISODate(rangeEndAsDate);
        const rangeEndNextMonth = DateUtils.toISODate(rangeEndNextMonthAsDate);

        return [rangeStart, rangeEnd, rangeEndNextMonth];
    }, [])

    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Calendar</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <Calendar onChange={console.log}/>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <Calendar onChange={console.log} startingDay='Mon'/>
                        </Col>
                        <Col span={1}/>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <Calendar rangeStart={rangeStart} rangeEnd={rangeEnd} onChange={console.log}/>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <Calendar rangeStart={rangeStart} rangeEnd={rangeEndNextMonth} onChange={console.log}/>
                        </Col>
                        <Col span={1}/>
                    </Row>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Calendar onChange={console.log}/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Calendar onChange={console.log} startingDay='Mon'/>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}