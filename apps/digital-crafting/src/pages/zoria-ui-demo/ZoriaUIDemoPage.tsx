import {capitalizeWord, Container, Main, Navigation, Sidebar} from "@zoria-ui/react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {ZoriaUIDemoRoutesList} from "./config/ZoriaUIRoutesTypes.ts";

export const ZoriaUIDemoPage = () => {
    const {pathname} = useLocation();

    return <>
        <Sidebar defaultOpen>
            <Sidebar.Header>Zoria UI</Sidebar.Header>
            <Sidebar.Body>
                <Navigation>
                    <Navigation.Section defaultOpen title={'Components'}>
                        {
                            ZoriaUIDemoRoutesList.map(route => {
                                return <Navigation.Item key={route} as={Link} active={pathname.includes(route)} to={`/zoria/${route}`}>{capitalizeWord(route)}</Navigation.Item>
                            })
                        }
                    </Navigation.Section>
                    {/*<Navigation.Section title={'Forms'}>*/}
                    {/*    <Navigation.Item as={Link} to='/zoria/forms/about'>About</Navigation.Item>*/}
                    {/*    <Navigation.Item as={Link} to='/zoria/forms/form-group'>Form Group</Navigation.Item>*/}
                    {/*    <Navigation.Item as={Link} to='/zoria/forms/validation'>Validation</Navigation.Item>*/}
                    {/*    <Navigation.Item as={Link} to='/zoria/forms/exmaples'>Examples</Navigation.Item>*/}
                    {/*</Navigation.Section>*/}
                </Navigation>
            </Sidebar.Body>
        </Sidebar>
        <Main>
            <Container>
                <Outlet/>
            </Container>
        </Main>
    </>
}