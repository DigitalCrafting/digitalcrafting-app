import {CodeLine, Col, H2, Li, Link, Panel, Text, Ul} from "@zoria-ui/react";

export const ZoriaUiAbout = () => {
    return <Panel>
        <Panel.Header><H2>@zoria-ui</H2></Panel.Header>
        <Panel.Body>
            <Col>
                <Text>
                    My custom set of libraries for writing React applications.
                </Text>
                <Col gap='none'>
                    <Text>
                        It consists of of following packages available on <Link href='https://npmjs.com'>nmpjs</Link>:
                    </Text>
                    <Ul>
                        <Li><Link href='https://www.npmjs.com/package/@zoria-ui/styles'>@zoria-ui/styles</Link></Li>
                        <Li><Link href='https://www.npmjs.com/package/@zoria-ui/react'>@zoria-ui/react</Link></Li>
                        <Li><Link href='https://www.npmjs.com/package/@zoria-ui/forms'>@zoria-ui/forms</Link></Li>
                        <Li><Link
                            href='https://www.npmjs.com/package/@zoria-ui/forms-react'>@zoria-ui/forms-react</Link></Li>
                        <Li><Link
                            href='https://www.npmjs.com/package/@zoria-ui/forms-inputs-react'>@zoria-ui/forms-inputs-react</Link></Li>
                        <Li><Link href='https://www.npmjs.com/package/@zoria-ui/events'>@zoria-ui/events</Link></Li>
                        <Li><Link href='https://www.npmjs.com/package/@zoria-ui/utils'>@zoria-ui/utils</Link></Li>
                    </Ul>
                    <Text>You can see the code at <Link
                        href='https://github.com/DigitalCrafting/digitalcrafting-app/tree/master/packages/zoria'>https://github.com/DigitalCrafting</Link></Text>
                </Col>
                <Col gap='sm'>
                    <H2>Motivation</H2>
                    <Text>Firstly, as a fun learning exercise. I really enjoy writing code, and a full suite of libraries is an interesting challenge.</Text>
                    <Text>
                        Secondly, I really like React because when used right, it gives you pretty much full control over when the
                        DOM update happens and it's pretty lightweight. However, the libraries ecosystem is fragmented, written in various styles,
                        and in various degree of understanding of how React handles the DOM changes.
                        I don't want to search for a right library to use, learn it, and then pick something new when the old thing is retired.
                        I want to have a suite of them waiting, written in consistent style, updated when needed.
                        Having such suite on my own solves pretty much all my problems.
                    </Text>
                    <Text>
                        And last but not least: I want to create a set of libraries in a performance aware way,
                        both in library size, number of dependencies and React component re-renders.
                        I don't want to trigger whole tree re-render when I change only 1 of the inputs. I don't want to download 100MB of libraries to simply display a Modal.
                        In order to limit the number of re-renders wherever possible, the libraries rely heavily on the <CodeLine>EventEmitter</CodeLine> - a <CodeLine>rxjs</CodeLine> style
                        event dispatcher instead of React state management. Also the goal is to have 100% of the library code (except React of course) written from scratch.
                        So far the only external library used is <CodeLine>@floating-ui</CodeLine>, but hopefully I will replace it with custom solution.
                        As such, the library will not have many of the bells and whistles available in other libraries, like floating modal which you can drag anywhere. At least not until I need it.
                    </Text>
                </Col>
                <Col gap='sm'>
                    <H2>Future Features & Updates</H2>
                    <Text>
                        The libraries are supposed to solve problems or implement requirements I encountered during my 12+ years of experience.
                    </Text>
                    <Text>
                        For additional features, I plan to create <CodeLine>@zoria-ui/rest-client</CodeLine> and <CodeLine>@zoria-ui/store</CodeLine>.
                    </Text>
                </Col>
                <Col gap='sm'>
                    <H2>Disclaimer</H2>
                    <Text>
                        I will update them for as long I need or feel like it, and, for now at least, I will not accept any contributions,
                        because the "shape" of the libraries is still work in progress, I learn new things all the time, better or simpler ways of doing something,
                        and I need to understand everything about my code until the general style and conventions are stable and unified.
                        You are free to look at the source code as an inspiration if you're solo developer.
                    </Text>
                    <Text>If you find it useful, you can <Link href='https://buymeacoffee.com/digitalcrafting'>buy me a coffee</Link>.</Text>
                </Col>
            </Col>
        </Panel.Body>
    </Panel>
}