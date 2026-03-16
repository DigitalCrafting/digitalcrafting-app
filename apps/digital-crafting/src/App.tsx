import './App.css'
import {Container, IconButton, Layout, MenuIcon, SidePanelService, TopBar, ZoriaProvider} from '@zoria-ui/react';
import {Outlet, useLocation} from "react-router-dom";

function MainTopBar() {
    return <TopBar>
        <Container>
            <IconButton onClick={() => {
                SidePanelService.toggle()
            }}>
                <MenuIcon/>
            </IconButton>
        </Container>
    </TopBar>
}

function App() {
    const location = useLocation();
    const isRoot = location.pathname === "/";

    return <>
        <ZoriaProvider>
            <Layout className={isRoot ? 'dc-landing-page' : ''}>
                <Layout.Header>
                    {
                        !isRoot ?
                            <MainTopBar/> : null
                    }
                </Layout.Header>
                <Layout.Body>
                    <Outlet/>
                </Layout.Body>
            </Layout>
        </ZoriaProvider>
    </>;
}

export default App
