import {CodeLine, H2, Link, Panel, Text} from "@zoria-ui/react";

export const ZoriaUiFormsAbout = () => {
    return <Panel>
        <Panel.Header><H2>@zoria-ui/forms</H2></Panel.Header>
        <Panel.Body>
            <Text>
                <CodeLine>@zoria-ui/forms</CodeLine> is my custom forms library inspired by Angular FormGroup.
            </Text>
            <Text>You can see the code at <Link href='https://github.com/DigitalCrafting/digitalcrafting-app/tree/master/packages/zoria/forms'>https://github.com/DigitalCrafting</Link></Text>
        </Panel.Body>
    </Panel>
}