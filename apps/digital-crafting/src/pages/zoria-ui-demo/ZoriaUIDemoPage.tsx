import {ZoriaUIDemoList} from "./ZoriaUIDemoList.tsx";
import {Container, Main, SidePanel, Text} from "@zoria-ui/react";

export const ZoriaUIDemoPage = () => {
    return <>
        <SidePanel>
            <Text>Hello</Text>
        </SidePanel>
        <Main>
            <Container>
                <ZoriaUIDemoList/>
            </Container>
        </Main>
    </>
}