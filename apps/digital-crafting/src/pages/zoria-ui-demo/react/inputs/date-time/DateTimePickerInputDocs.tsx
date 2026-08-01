import {CodeBlock, Col, DateTimePickerInput, Grid, H4} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../../zoria-docs-panel/ZoriaDocsPanel.tsx";
import {useState} from "react";

export const DateTimePickerInputDocs = () => {
    const [value, setValue] = useState<string | undefined>();

    const firstPickerOnChange = (value?: string) => {
        setValue(value);
        console.log('Picker 1 changed value');
        console.log(value);
    };

    const secondPickerOnChange = (value?: string) => {
        setValue(value);
        console.log('Picker 2 changed value');
        console.log(value);
    };

    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Date Time Picker Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col>
                    <Grid>
                        <Grid.Col span={1}/>
                        <Grid.Col span={4}>
                            <H4>Standalone Inputs</H4>
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={1}/>
                        <Grid.Col span={4}>
                            <DateTimePickerInput onChange={(value) => console.log(value)} label='Date Time Picker'/>
                        </Grid.Col>
                        <Grid.Col span={2}/>
                        <Grid.Col span={4}>
                            <DateTimePickerInput minHour={9} maxHour={18} maxMin={0}
                                                 onChange={(value) => console.log(value)}
                                                 label='Date Time Picker 9 - 5'/>
                        </Grid.Col>
                        <Grid.Col span={1}/>
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
                            <DateTimePickerInput isControlled value={value} onChange={firstPickerOnChange}
                                                 label='Date Time Picker 1'/>
                        </Grid.Col>
                        <Grid.Col span={2}/>
                        <Grid.Col span={4}>
                            <DateTimePickerInput isControlled value={value} onChange={secondPickerOnChange}
                                                 label='Date Time Picker 2'/>
                        </Grid.Col>
                        <Grid.Col span={1}/>
                    </Grid>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<DateTimePickerInput onChange={(value) => console.log(value)} label='Date Time Picker'/>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}