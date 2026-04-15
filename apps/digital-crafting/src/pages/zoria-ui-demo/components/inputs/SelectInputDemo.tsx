import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {SelectInput, type SelectOption} from "@zoria-ui/react";

const DemoSelectOption: SelectOption[] = [
    {
        display: 'first',
        value: 'first'
    },
    {
        display: 'second',
        value: 'second'
    },
    {
        display: 'third',
        value: 'third'
    },
    {
        display: 'fourth',
        value: 'fourth'
    },
]

export const SelectInputDemo = () => {
    return <DemoPanel title={'Select Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <SelectInput options={DemoSelectOption} onChange={(value) => console.log(value)} label='Select input'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={2}/>
            <DemoPanel.Col span={3}>
                <SelectInput native options={DemoSelectOption} onChange={(value) => console.log(value)} label='Native select input'/>
            </DemoPanel.Col>
        </DemoPanel.Row>
        {/*<DemoPanel.Row>*/}
        {/*    <DemoPanel.Col span={3}>*/}
        {/*        <SelectInput compact options={DemoSelectOption} onChange={(value) => console.log(value)} hideLabel label='Select input'/>*/}
        {/*    </DemoPanel.Col>*/}
        {/*    <DemoPanel.Col span={5}/>*/}
        {/*</DemoPanel.Row>*/}
    </DemoPanel>
}