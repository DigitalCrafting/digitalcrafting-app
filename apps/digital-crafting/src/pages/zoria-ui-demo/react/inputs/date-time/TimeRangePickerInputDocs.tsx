import {CodeBlock, Col, Grid, H4} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../../zoria-docs-panel/ZoriaDocsPanel.tsx";
import {
    TimeRangePickerInput
} from "@zoria-ui/react/src/components/inputs/date-time/time-range-picker/TimeRangePickerInput.tsx";
import {useState} from "react";
import type {TimeRangeValue} from "@zoria-ui/react/src/components/inputs/date-time/types/DateTimeTypes.ts";

export const TimeRangePickerInputDocs = () => {
    const [value, setValue] = useState<TimeRangeValue | undefined>();

    const firstPickerOnChange = (value?: TimeRangeValue) => {
        setValue(value);
        console.log('Picker 1 changed value');
        console.log(value);
    };

    const secondPickerOnChange = (value?: TimeRangeValue) => {
        setValue(value);
        console.log('Picker 2 changed value');
        console.log(value);
    };

    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Time Range Picker Input</ZoriaDocsPanel.Title>
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
                            <TimeRangePickerInput onChange={console.log} label='Time Range Picker' />
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
                            <TimeRangePickerInput isControlled value={value} onChange={firstPickerOnChange} label='Time Range Picker 1' />
                        </Grid.Col>
                        <Grid.Col span={2}/>
                        <Grid.Col span={4}>
                            <TimeRangePickerInput isControlled value={value} onChange={secondPickerOnChange} label='Time Range Picker 2' />
                        </Grid.Col>
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