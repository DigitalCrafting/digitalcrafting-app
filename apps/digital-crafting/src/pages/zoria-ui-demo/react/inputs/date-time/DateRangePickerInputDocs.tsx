import {CodeBlock, Col, DateRangePickerInput, Grid, H4} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../../zoria-docs-panel/ZoriaDocsPanel.tsx";
import {useState} from "react";
import type {DateRangeValue} from "@zoria-ui/react/src/components/inputs/date-time/types/DateTimeTypes.ts";

export const DateRangePickerInputDocs = () => {
    const [value, setValue] = useState<DateRangeValue | undefined>();

    const firstPickerOnChange = (value?: DateRangeValue) => {
        setValue(value);
        console.log('Picker 1 changed value');
        console.log(value);
    };

    const secondPickerOnChange = (value?: DateRangeValue) => {
        setValue(value);
        console.log('Picker 2 changed value');
        console.log(value);
    };

    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Date Range Picker Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col>
                    <Grid>
                        <Grid.Col span={1}/>
                        <Grid.Col span={4}>
                            <H4>Standalone Input</H4>
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={1}/>
                        <Grid.Col span={4}>
                            <DateRangePickerInput onChange={console.log} label='Date Range Picker'/>
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={1}/>
                        <Grid.Col span={4}>
                            <H4>Controlled Inputs</H4>
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={1}/>
                        <Grid.Col span={4}>
                            <DateRangePickerInput isControlled value={value} onChange={firstPickerOnChange} label='Date Range Picker 1'/>
                        </Grid.Col>
                        <Grid.Col span={2}/>
                        <Grid.Col span={4}>
                            <DateRangePickerInput isControlled value={value} onChange={secondPickerOnChange} label='Date Range Picker 2'/>
                        </Grid.Col>
                        <Grid.Col span={1}/>
                    </Grid>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        WIP
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
                        <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}