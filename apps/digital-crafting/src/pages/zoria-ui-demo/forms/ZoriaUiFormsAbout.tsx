import {Col, H2, Li, Link, Panel, Text, Ul} from "@zoria-ui/react";

export const ZoriaUiFormsAbout = () => {
    return <Panel>
        <Panel.Header><H2>@zoria-ui/forms</H2></Panel.Header>
        <Panel.Body>
            <Col>
                <Text>
                    My custom forms library inspired by Angular FormGroup.
                </Text>
                <Col gap='none'>
                    <Text>
                        It consists of of following packages available on <Link href='https://npmjs.com'>nmpjs</Link>:
                    </Text>
                    <Ul>
                        <Li><Link href='https://www.npmjs.com/package/@zoria-ui/forms'>@zoria-ui/forms</Link></Li>
                        <Li><Link
                            href='https://www.npmjs.com/package/@zoria-ui/forms-react'>@zoria-ui/forms-react</Link></Li>
                        <Li><Link
                            href='https://www.npmjs.com/package/@zoria-ui/forms-inputs-react'>@zoria-ui/forms-inputs-react</Link></Li>
                    </Ul>
                </Col>
                <Text>You can see the code at <Link
                    href='https://github.com/DigitalCrafting/digitalcrafting-app/tree/master/packages/zoria/forms'>https://github.com/DigitalCrafting</Link></Text>
            </Col>
        </Panel.Body>
    </Panel>
}