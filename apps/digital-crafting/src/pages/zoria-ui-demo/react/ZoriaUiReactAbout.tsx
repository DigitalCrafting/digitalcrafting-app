import {Col, H2, Li, Link, Panel, Text, Ul} from "@zoria-ui/react";

export const ZoriaUiReactAbout = () => {
    return <Panel>
        <Panel.Header><H2>@zoria-ui/react</H2></Panel.Header>
        <Panel.Body>
            <Col>
                <Text>
                    My custom components library for React.
                </Text>
                <Col gap='none'>
                    <Text>
                        It consists of of following packages available on <Link href='https://npmjs.com'>nmpjs</Link>:
                    </Text>
                    <Ul>
                        <Li><Link href='https://www.npmjs.com/package/@zoria-ui/styles'>@zoria-ui/styles</Link></Li>
                        <Li><Link
                            href='https://www.npmjs.com/package/@zoria-ui/react'>@zoria-ui/react</Link></Li>
                        <Li><Link
                            href='https://www.npmjs.com/package/@zoria-ui/events'>@zoria-ui/events</Link></Li>
                        <Li><Link
                            href='https://www.npmjs.com/package/@zoria-ui/utils'>@zoria-ui/utils</Link></Li>
                    </Ul>
                </Col>
                <Text>You can see the code at <Link href='https://github.com/DigitalCrafting/digitalcrafting-app/tree/master/packages/zoria/react'>https://github.com/DigitalCrafting</Link></Text>
                <Text>If you find it useful, you can <Link href='https://buymeacoffee.com/digitalcrafting'>buy me a coffee</Link>.</Text>
            </Col>
        </Panel.Body>
    </Panel>
}