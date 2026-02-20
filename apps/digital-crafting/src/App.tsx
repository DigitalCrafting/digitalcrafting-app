import './App.css'
import {ComponentsDemoPage} from "./modules/components-demo/ComponentsDemoPage";
import {ZContainer} from "@zoria-ui/react";
import {TopBar} from "@zoria-ui/react";
import {IconButton} from "@zoria-ui/react";
import {MenuIcon} from "@zoria-ui/react";
import {SidePanel, SidePanelService} from "@zoria-ui/react";
import {ZText} from "@zoria-ui/react";

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
                    <ZText>Hello</ZText>
                </SidePanel>
                <ZContainer>
                    <ComponentsDemoPage/>
                </ZContainer>
            </main>
        </>
    )
}

export default App
