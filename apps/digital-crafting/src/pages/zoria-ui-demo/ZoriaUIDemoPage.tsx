import {Container, Main, Navigation, Sidebar} from "@zoria-ui/react";
import {Link, Outlet, useLocation} from "react-router-dom";

export const ZoriaUIDemoPage = () => {
    const {pathname} = useLocation();

    return <>
        <Sidebar defaultOpen>
            <Sidebar.Header>Zoria UI</Sidebar.Header>
            <Sidebar.Body>
                <Navigation>
                    <Navigation.Section defaultOpen title={'Components'}>
                        <Navigation.Item as={Link} active={pathname.includes('/about') || pathname === '/zoria'} to='/zoria/about'>About</Navigation.Item>
                        <Navigation.Item as={Link} active={pathname.includes('/typography')} to='/zoria/typography'>Typography</Navigation.Item>
                        <Navigation.Item as={Link} active={pathname.includes('/buttons')} to='/zoria/buttons'>Buttons</Navigation.Item>
                        <Navigation.Item as={Link} active={pathname.includes('/inputs')} to='/zoria/inputs'>Inputs</Navigation.Item>
                        <Navigation.Item as={Link} active={pathname.includes('/modal')} to='/zoria/modal'>Modal</Navigation.Item>
                        <Navigation.Item as={Link} active={pathname.includes('/popover')} to='/zoria/popover'>Popover</Navigation.Item>
                        <Navigation.Item as={Link} active={pathname.includes('/tooltip')} to='/zoria/tooltip'>Tooltip</Navigation.Item>
                        <Navigation.Item as={Link} active={pathname.includes('/spinner')} to='/zoria/spinner'>Spinner</Navigation.Item>
                        <Navigation.Item as={Link} active={pathname.includes('/icons')} to='/zoria/icons'>Icons</Navigation.Item>
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