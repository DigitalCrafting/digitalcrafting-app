import {ZoriaUIDemoList} from "./ZoriaUIDemoList.tsx";
import {Container, Main, Navigation, Sidebar} from "@zoria-ui/react";
import {Link} from "react-router-dom";

export const ZoriaUIDemoPage = () => {
    return <>
        <Sidebar defaultOpen>
            <Sidebar.Header>Zoria UI</Sidebar.Header>
            <Sidebar.Body>
                <Navigation>
                    <Navigation.Section title={'Components'}>
                        <Navigation.Item as={Link} to='/zoria-ui/about'>About</Navigation.Item>
                        <Navigation.Item as={Link} to='/zoria-ui/buttons'>Buttons</Navigation.Item>
                        <Navigation.Item as={Link} to='/zoria-ui/icons'>Icons</Navigation.Item>
                        <Navigation.Item as={Link} to='/zoria-ui/inputs'>Inputs</Navigation.Item>
                        <Navigation.Item as={Link} to='/zoria-ui/modal'>Modal</Navigation.Item>
                    </Navigation.Section>
                    <Navigation.Section title={'Forms'}>
                        <Navigation.Item as={Link} to='/zoria-ui/about'>About</Navigation.Item>
                        <Navigation.Item as={Link} to='/zoria-ui/form-group'>Form Group</Navigation.Item>
                        <Navigation.Item as={Link} to='/zoria-ui/validation'>Validation</Navigation.Item>
                        <Navigation.Item as={Link} to='/zoria-ui/exmaples'>Examples</Navigation.Item>
                    </Navigation.Section>

                </Navigation>
            </Sidebar.Body>
        </Sidebar>
        <Main>
            <Container>
                <ZoriaUIDemoList/>
            </Container>
        </Main>
    </>
}