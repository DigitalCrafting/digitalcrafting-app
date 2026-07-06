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
                    <Navigation.Section defaultOpen title={'@zoria-ui/react'}>
                        <Navigation.Item key={'about'} as={Link} active={pathname.endsWith('about')} to={`/zoria/about`}>About</Navigation.Item>
                        {
                            ZoriaUIDocsRoutesList.map(route => {
                                return <Navigation.Subsection key={route} title={StringUtils.capitalizeWord(route)}>
                                    {
                                        ZoriaUIDocsRoutes[route]!.map((subroute) => {
                                            return <Navigation.Item key={subroute} as={Link} active={pathname.endsWith(subroute)} to={`/zoria/${route}/${subroute}`}>{StringUtils.toPascalCase(subroute)}</Navigation.Item>
                                        })
                                    }
                                </Navigation.Subsection>
                            })
                        }
                    </Navigation.Section>
                    <Navigation.Section defaultOpen={pathname.endsWith('/forms')} title={'@zoria-ui/forms'}>
                        <Navigation.Item as={Link} active={pathname.endsWith('/about')} to='/zoria/forms/about'>About</Navigation.Item>
                        <Navigation.Item as={Link} active={pathname.endsWith('/demo')} to='/zoria/forms/demo'>Demo</Navigation.Item>
                        {/*<Navigation.Item as={Link} to='/zoria/forms/form-group'>Form Group</Navigation.Item>*/}
                        {/*<Navigation.Item as={Link} to='/zoria/forms/validation'>Validation</Navigation.Item>*/}
                        {/*<Navigation.Item as={Link} to='/zoria/forms/exmaples'>Examples</Navigation.Item>*/}
                    </Navigation.Section>
                </Navigation>
            </Sidebar.Body>
        </Sidebar>
        <Main>
            <Container>
                <Row className={`justify-center`} >
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