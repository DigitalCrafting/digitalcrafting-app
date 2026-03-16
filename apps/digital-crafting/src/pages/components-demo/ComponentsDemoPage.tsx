import {ComponentsDemoList} from "./ComponentsDemoList.tsx";
import {Container, Main, SidePanel, Text} from "@zoria-ui/react";

export const ComponentsDemoPage = () => {
    return <>
        <SidePanel>
            <Text>Hello</Text>
        </SidePanel>
        <Main>
            <Container>
                <ComponentsDemoList/>
            </Container>
        </Main>
    </>
}