import {Col, H2, Link, Panel, Text} from "@zoria-ui/react";

export const ZoriaUiEventsAbout = () => {
    return <Panel>
        <Panel.Header><H2>@zoria-ui/events</H2></Panel.Header>
        <Panel.Body>
            <Col>
                <Text>
                    My custom reactive js library.
                </Text>
                <Text>
                    Available at npmjs: <Link
                    href='https://www.npmjs.com/package/@zoria-ui/events'>@zoria-ui/events</Link>
                </Text>
                <Text>You can see the code at <Link href='https://github.com/DigitalCrafting/digitalcrafting-app/tree/master/packages/zoria/events'>https://github.com/DigitalCrafting</Link></Text>
            </Col>
        </Panel.Body>
    </Panel>
}