import {CodeBlock, Col, Row, SelectInput, type ZoriaSelectOption} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../../zoria-docs-panel/ZoriaDocsPanel.tsx";

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

const DemoSelectOptionWithEmpty = [
    {
        display: '',
        value: undefined,
        searchValue: ''
    },
    ...DemoSelectOption
]

export const SelectInputDocs = () => {
    return <ZoriaDocsPanel>
        <ZoriaDocsPanel.Title>Select Input</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col span={12}>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <SelectInput placeholder='Select one' options={DemoSelectOption}
                                         onChange={(value) => console.log(value)} label='Select input'/>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <SelectInput native options={DemoSelectOption} onChange={(value) => console.log(value)}
                                         label='Native select input'/>
                        </Col>
                        <Col span={1}/>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <SelectInput placeholder='Select one' options={DemoSelectOptionWithEmpty}
                             onChange={(value) => console.log(value)} label='Select with empty option'/>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}>
                            <SelectInput native options={DemoSelectOptionWithEmpty} onChange={(value) => console.log(value)}
                             label='Native select input'/>
                        </Col>
                        <Col span={1}/>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4}>
                            <SelectInput disabled placeholder='Select one' options={DemoSelectOptionWithEmpty}
                             onChange={(value) => console.log(value)} label='Select disabled'/>
                        </Col>
                        <Col span={2}/>
                        <Col span={4}/>
                        <Col span={1}/>
                    </Row>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<SelectInput placeholder='Select one' options={DemoSelectOption} onChange={(value) => console.log(value)} label='Select input'/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<SelectInput native options={DemoSelectOption} onChange={(value) => console.log(value)} label='Native select input'/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<SelectInput placeholder='Select one' options={DemoSelectOptionWithEmpty} onChange={(value) => console.log(value)} label='Select with empty option'/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<SelectInput native options={DemoSelectOptionWithEmpty} onChange={(value) => console.log(value)} label='Native select input'/>`}
                    </CodeBlock>
                    <CodeBlock>
                        {/* language=text */}
                        {`<SelectInput disabled placeholder='Select one' options={DemoSelectOptionWithEmpty}
                             onChange={(value) => console.log(value)} label='Select disabled'/>
                        `}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
                        <ZoriaDocsPanel.Docs/>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}