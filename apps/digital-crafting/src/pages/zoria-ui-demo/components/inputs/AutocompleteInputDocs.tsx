import {type AutocompleteDropdownOption, AutocompleteInput, CodeBlock, Col, Row, StringUtils} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

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

export const AutocompleteInputDocs = () => {
    const queryOptions = (value: string): Promise<AutocompleteDropdownOption[]> => {
        return new Promise((res) => {
            setTimeout(() => {
                if (StringUtils.isEmpty(value)) {
                    res(ALL_OPTIONS);
                }
                const filtered = ALL_OPTIONS.filter(option => option.searchValue.indexOf(value) > -1)
                res(filtered);
            }, 1000)
        })
    }

    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Autocomplete Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <AutocompleteInput placeholder='Type to search' onChange={(value) => console.log(value)}
                                           queryOptions={queryOptions} label='Autocomplete with query'/>
                    </Col>
                    <Col span={2}/>
                    <Col span={4}>

                        <AutocompleteInput placeholder='Type to filter' onChange={(value) => console.log(value)}
                                           options={ALL_OPTIONS} label='Autocomplete with static options'/>
                    </Col>
                    <Col span={1}/>
                </Row>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<AutocompleteInput placeholder='Type to search' onChange={(value) => console.log(value)} queryOptions={queryOptions} label='Autocomplete with query'/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<AutocompleteInput placeholder='Type to filter' onChange={(value) => console.log(value)} options={ALL_OPTIONS} label='Autocomplete with static options'/>`}
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