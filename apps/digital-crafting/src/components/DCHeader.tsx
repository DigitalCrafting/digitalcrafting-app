import {Container, Layout, Row, Text, TopBar} from "@zoria-ui/react";
import {Link} from "react-router-dom";

export const DCHeader = () => {
    return (<Layout.Header>
        <TopBar>
            <Container>
                <Row>
                    <Link className='nav-link' to="/"><Text>Home</Text></Link>
                    <Link className='nav-link' to="/zoria"><Text>Zoria UI</Text></Link>
                </Row>
            </Container>
        </TopBar>
    </Layout.Header>);
}