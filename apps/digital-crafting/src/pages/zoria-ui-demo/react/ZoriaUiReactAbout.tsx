import {CodeLine, H2, Link, Panel, Text} from "@zoria-ui/react";

export const ZoriaUiReactAbout = () => {
    return <Panel>
        <Panel.Header><H2>@zoria-ui/react</H2></Panel.Header>
        <Panel.Body>
            <Text>
                <CodeLine>@zoria-ui/react</CodeLine> is my custom components library for React.
            </Text>
            <Text>You can see the code at <Link href='https://github.com/DigitalCrafting/digitalcrafting-app/tree/master/packages/zoria/react'>https://github.com/DigitalCrafting</Link></Text>
        </Panel.Body>
    </Panel>
}