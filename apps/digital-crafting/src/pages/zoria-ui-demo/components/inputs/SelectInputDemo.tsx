import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {SelectInput, type ZoriaSelectOption} from "@zoria-ui/react";

const DemoSelectOption: ZoriaSelectOption[] = [
    {
        display: 'first',
        value: 'first',
        searchValue: 'first'
    },
    {
        display: 'second',
        value: 'second',
        searchValue: 'second'
    },
    {
        display: 'third',
        value: 'third',
        searchValue: 'third'
    },
    {
        display: 'fourth',
        value: 'fourth',
        searchValue: 'fourth'
    },
]

export const SelectInputDemo = () => {
    return <DemoPanel title={'Select Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <SelectInput options={DemoSelectOption} onChange={(value) => console.log(value)} label='Select input'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={2} />
            <DemoPanel.Col span={3}>
                <SelectInput native options={DemoSelectOption} onChange={(value) => console.log(value)} label='Native select input'/>
            </DemoPanel.Col>
        </DemoPanel.Row>
    </DemoPanel>
}