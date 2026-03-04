import {ComponentsDemoList} from "./ComponentsDemoList.tsx";
import {Container, Layout, Main} from "@zoria-ui/react";
import {TopBar} from "@zoria-ui/react";
import {IconButton} from "@zoria-ui/react";
import {MenuIcon} from "@zoria-ui/react";
import {SidePanel, SidePanelService} from "@zoria-ui/react";
import {Text} from "@zoria-ui/react";

function BastionTopBar() {
    return <TopBar>
        <IconButton onClick={() => {
            SidePanelService.toggle()
        }}>
            <MenuIcon/>
        </IconButton>
    </TopBar>
}

export const ComponentsDemoPage = () => {
    return <Layout>
        <Layout.Header>
            <BastionTopBar/>
        </Layout.Header>
        <Layout.Body>
            <SidePanel>
                <Text>Hello</Text>
            </SidePanel>
            <Main>
                <Container>
                    <ComponentsDemoList/>
                </Container>
            </Main>
        </Layout.Body>
    </Layout>
}