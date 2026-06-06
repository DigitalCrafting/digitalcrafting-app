import {Children, type PropsWithChildren, type ReactElement} from "react";
import {Col, Container, ExpandCollapse, H2, Panel, Tabs} from "@zoria-ui/react";
import "./ZoriaDocsPanel.scss";

const Demo = ({children}: PropsWithChildren) => {
    return <Container>
        {children ?? 'WIP'}
    </Container>;
}

const Code = ({children}: PropsWithChildren) => {
    return <Container>
        {children ?? 'WIP'}
    </Container>;

}

const Docs = ({children}: PropsWithChildren) => {
    return <Container>
        {children ?? 'WIP'}
    </Container>;
}

const Title = ({children}: PropsWithChildren) => {
    return <H2>{children}</H2>
}

interface BodyProps {
    children: [ReactElement<typeof Demo>, ReactElement<typeof Code>, ReactElement<typeof Docs>]
}

const Body = ({children}: BodyProps) => {
    const [DemoComponent, CodeComponent, DocsComponent] = Children.toArray(children);

    return <Tabs removeBorder>
        <Tabs.Item id='demo'>
            <Tabs.Trigger>
                <Tabs.TriggerLabel>Demo</Tabs.TriggerLabel>
            </Tabs.Trigger>
            <Tabs.Body>
                {DemoComponent}
            </Tabs.Body>
        </Tabs.Item>
        <Tabs.Item id='code'>
            <Tabs.Trigger>
                <Tabs.TriggerLabel>Code</Tabs.TriggerLabel>
            </Tabs.Trigger>
            <Tabs.Body>
                {CodeComponent}
            </Tabs.Body>
        </Tabs.Item>
        <Tabs.Item id='docs'>
            <Tabs.Trigger>
                <Tabs.TriggerLabel>Docs</Tabs.TriggerLabel>
            </Tabs.Trigger>
            <Tabs.Body>
                {DocsComponent}
            </Tabs.Body>
        </Tabs.Item>
    </Tabs>
}

interface DocsPanelProps {
    children: [ReactElement<typeof Title>, ReactElement<typeof Body>];
}

const DocsPanel = ({children}: DocsPanelProps) => {
    const [TitleComponent, BodyComponent] = Children.toArray(children);

    return <Panel className='zoria-docs-panel'>
        <ExpandCollapse expandByDefault>
            <ExpandCollapse.Trigger>
                <Panel.Header>
                    {TitleComponent}
                </Panel.Header>
            </ExpandCollapse.Trigger>
            <ExpandCollapse.Body>
                <Panel.Body>
                    <Col gap='sm'>
                        {BodyComponent}
                    </Col>
                </Panel.Body>
            </ExpandCollapse.Body>
        </ExpandCollapse>
    </Panel>
}

const ZoriaDocsPanel = Object.assign(DocsPanel, {
    Title,
    Body,
    Docs,
    Code,
    Demo
})

export {ZoriaDocsPanel};