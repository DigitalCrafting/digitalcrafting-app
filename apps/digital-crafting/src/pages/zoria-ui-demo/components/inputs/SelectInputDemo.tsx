import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {SelectInput, type ZoriaSelectOption} from "@zoria-ui/react";

const DemoSelectOption: ZoriaSelectOption[] = [
    {
        display: 'first',
        value: 'first',
        searchValue: 'first'
    },
    {
        display: 'first for the second time',
        value: 'first for the second time',
        searchValue: 'first for the second time'
    },
    {
        display: 'first for the third time',
        value: 'first for the third time',
        searchValue: 'first for the third time'
    },
    {
        display: 'second',
        value: 'second',
        searchValue: 'second'
    },
    {
        display: 'second for the second time',
        value: 'second for the second time',
        searchValue: 'second for the second time'
    },
    {
        display: 'second for the third time',
        value: 'second for the third time',
        searchValue: 'second for the third time'
    },
    {
        display: 'third',
        value: 'third',
        searchValue: 'third'
    },
    {
        display: 'third for the second time',
        value: 'third for the second time',
        searchValue: 'third for the second time'
    },
    {
        display: 'third for the third time',
        value: 'third for the third time',
        searchValue: 'third for the third time'
    },
    {
        display: 'fourth',
        value: 'fourth',
        searchValue: 'fourth'
    },
    {
        display: 'fourth for the second time',
        value: 'fourth for the second time',
        searchValue: 'fourth for the second time'
    },
    {
        display: 'fourth for the third time',
        value: 'fourth for the third time',
        searchValue: 'fourth for the third time'
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