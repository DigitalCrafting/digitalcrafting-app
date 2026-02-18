import './App.css'
import {ComponentsDemoPage} from "./modules/components-demo/ComponentsDemoPage.tsx";
import {ZContainer} from "@zoria-ui/react/components/container/ZContainer.tsx";
import {TopBar} from "@zoria-ui/react/components/top-bar/TopBar.tsx";
import {IconButton} from "@zoria-ui/react/components/buttons/IconButton.tsx";
import {MenuIcon} from "@zoria-ui/react/components/icons/Icons.tsx";
import {SidePanel, SidePanelService} from "@zoria-ui/react/components/side-panel/SidePanel.tsx";
import {ZText} from "@zoria-ui/react/components/typography/ZTypography.tsx";

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
