import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {type AutocompleteDropdownOption, AutocompleteInput, StringUtils} from "@zoria-ui/react";

const ALL_OPTIONS = [
    {
        value: 'test1',
        display: 'test 1',
        searchValue: 'test 1'
    },
    {
        value: 'test2',
        display: 'testing 2',
        searchValue: 'testing 2'
    },
    {
        value: 'test3',
        display: 'testiiiiing 3',
        searchValue: 'testiiiiing 3'
    },
    {
        value: 'val1',
        display: 'val 1',
        searchValue: 'val 1'
    },
    {
        value: 'val2',
        display: 'value 2',
        searchValue: 'value 2'
    },
    {
        value: 'val3',
        display: 'valuable 3',
        searchValue: 'valuable 3'
    },
]

export const AutocompleteInputDemo = () => {
    const queryOptions = (value: string): Promise<AutocompleteDropdownOption[]> => {
        return new Promise((res) => {
            setTimeout(() => {
                if (StringUtils.isEmpty(value)) {
                    res([]);
                }

                if (value.startsWith('tes')) {
                    res([
                        {
                            value: 'test1',
                            display: 'test 1',
                            searchValue: 'test 1'
                        },
                        {
                            value: 'test2',
                            display: 'testing 2',
                            searchValue: 'testing 2'
                        },
                        {
                            value: 'test3',
                            display: 'testiiiiing 3',
                            searchValue: 'testiiiiing 3'
                        },
                    ])
                }

                if (value.startsWith('val')) {
                    res([
                        {
                            value: 'val1',
                            display: 'val 1',
                            searchValue: 'val 1'
                        },
                        {
                            value: 'val2',
                            display: 'value 2',
                            searchValue: 'value 2'
                        },
                        {
                            value: 'val3',
                            display: 'valuable 3',
                            searchValue: 'valuable 3'
                        },
                    ])
                }


                res([]);
            }, 1000)
        })
    }


    return <DemoPanel title={'Autocomplete Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <AutocompleteInput onChange={(value) => console.log(value)} queryOptions={queryOptions} label='Autocomplete with query'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={2}/>
            <DemoPanel.Col span={3}>
                <AutocompleteInput onChange={(value) => console.log(value)} options={ALL_OPTIONS} label='Autocomplete with static options'/>
            </DemoPanel.Col>
        </DemoPanel.Row>
    </DemoPanel>
}