import {Col, Container, Layout, Row, Text, Toggle, TopBar} from "@zoria-ui/react";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export const DCHeader = () => {
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (darkThemeEnabled && location.pathname !== '/') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }, [darkThemeEnabled, location]);

    const toggleDartTheme = () => {
        setDarkThemeEnabled(prev => !prev);
    }

    return (<Layout.Header>
        <TopBar className='w-100'>
            <Container className='w-100'>
                <Row className='justify-space-between'>
                    <Col>
                        <Row>
                            <Link className='nav-link' to="/"><Text>Home</Text></Link>
                            <Link className='nav-link' to="/zoria"><Text>Zoria UI</Text></Link>
                            <Link className='nav-link' to="/drone-game"><Text>Drone Game</Text></Link>
                        </Row>
                    </Col>
                    <Col>
                        <Toggle checked={darkThemeEnabled} onChange={toggleDartTheme}/>
                    </Col>
                </Row>
            </Container>
        </TopBar>
    </Layout.Header>);
}