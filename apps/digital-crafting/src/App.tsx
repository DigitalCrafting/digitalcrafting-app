import './App.css'
import {ComponentsDemoPage} from "./modules/components-demo/ComponentsDemoPage";
import {Container} from "@zoria-ui/react";
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

function App() {

    return (
        <>
            <BastionTopBar/>
            <main>
                <SidePanel>
                    <Text>Hello</Text>
                </SidePanel>
                <Container>
                    <ComponentsDemoPage/>
                </Container>
            </main>
        </>
    )
}

export default App
