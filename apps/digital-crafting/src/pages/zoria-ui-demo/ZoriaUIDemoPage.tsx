// @ts-nocheck
// TODO figure out why is typescript complaining about Navigation.Item children
import {Col, Container, Main, Navigation, Row, Sidebar, StringUtils} from "@zoria-ui/react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {ZoriaUIDocsRoutes, ZoriaUIDocsRoutesList} from "./config/ZoriaUIRoutesTypes.ts";
import styles from "./ZoriaUIDemoPage.module.scss";

export const ZoriaUIDemoPage = () => {
    const {pathname} = useLocation();

    return <>
        <Sidebar defaultOpen>
            <Sidebar.Header>Zoria UI</Sidebar.Header>
            <Sidebar.Body>
                <Navigation>
                    <Navigation.Item as={Link} active={pathname.endsWith('/zoria') || pathname.endsWith('/zoria/')}
                                     to={`/zoria`}>About</Navigation.Item>
                    <Navigation.Section defaultOpen={pathname.includes('/react')} title={'@zoria-ui/react'}>
                        <Navigation.Item as={Link} active={pathname.endsWith('react/about')}
                                         to={`/zoria/react/about`}>About</Navigation.Item>
                        {
                            ZoriaUIDocsRoutesList.map(route => {
                                return <Navigation.Subsection defaultOpen={pathname.includes(`/react/${route}`)}
                                                              key={route} title={StringUtils.capitalizeWord(route)}>
                                    {
                                        ZoriaUIDocsRoutes[route]!.map((subroute) => {
                                            return <Navigation.Item key={subroute} as={Link}
                                                                    active={pathname.endsWith(`react/${route}/${subroute}`)}
                                                                    to={`/zoria/react/${route}/${subroute}`}>{StringUtils.toPascalCase(subroute)}</Navigation.Item>
                                        })
                                    }
                                </Navigation.Subsection>
                            })
                        }
                    </Navigation.Section>
                    <Navigation.Section defaultOpen={pathname.includes('/forms')} title={'@zoria-ui/forms'}>
                        <Navigation.Item as={Link} active={pathname.endsWith('forms/about')}
                                         to='/zoria/forms/about'>About</Navigation.Item>
                        <Navigation.Item as={Link} active={pathname.endsWith('forms/demo')}
                                         to='/zoria/forms/demo'>Demo</Navigation.Item>
                    </Navigation.Section>
                    <Navigation.Section defaultOpen={pathname.includes('/events')} title={'@zoria-ui/events'}>
                        <Navigation.Item as={Link} active={pathname.endsWith('events/about')}
                                         to='/zoria/events/about'>About</Navigation.Item>
                        <Navigation.Item as={Link} active={pathname.endsWith('events/event-emitter')}
                                         to='/zoria/events/event-emitter'>EventEmitter</Navigation.Item>
                    </Navigation.Section>


                </Navigation>
            </Sidebar.Body>
        </Sidebar>
        <Main>
            <Container>
                <Row className={`justify-center`}>
                    <Col
                        className={styles.ZoriaUIDemoPage}
                    >
                        <Outlet/>
                    </Col>
                </Row>
            </Container>
        </Main>
    </>
}