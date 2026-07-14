import {
    Card,
    Col,
    Container,
    IconButton,
    Layout,
    PaletteIcon,
    Popover,
    RadioGroup,
    Row,
    Text,
    TopBar
} from "@zoria-ui/react";
import {Link} from "react-router-dom";
import {useIsRootRoute} from "../routes/useIsRootRoute.tsx";
import {useEffect, useState} from "react";

export const DCHeader = () => {
    const [currentTheme, setCurrentTheme] = useState('zoria');
    const isRoot = useIsRootRoute();

    const toggleTheme = (theme: string) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('zoria-default-theme', theme);
        setCurrentTheme(theme);
    }

    useEffect(() => {
        const defaultTheme = localStorage.getItem('zoria-default-theme');
        if (!defaultTheme || !defaultTheme.trim().length) {
            toggleTheme(defaultTheme!);
        }
        toggleTheme('zoria');
    }, []);

    return (<Layout.Header>
        <TopBar className='w-100'>
            <Container className='dc-header w-100'>
                <Row className='justify-space-between align-items-center'>
                    <Col>
                        <Row>
                            <Link className='nav-link' to="/"><Text>Home</Text></Link>
                            <Link className='nav-link' to="/zoria"><Text>Zoria UI</Text></Link>
                            <Link className='nav-link' to="/drone-game"><Text>Drone Game</Text></Link>
                        </Row>
                    </Col>
                    {
                        isRoot ? null :
                            <Col span={1} className='justify-items-end'>
                                <Popover>
                                    <Popover.Trigger className='align-self-end'>
                                        <IconButton>
                                            <PaletteIcon size='md'/>
                                        </IconButton>
                                    </Popover.Trigger>
                                    <Popover.Body trapFocus>
                                        <Card>
                                            <RadioGroup defaultValue={currentTheme} name='theme-group'
                                                        onChange={toggleTheme}>
                                                <RadioGroup.Item value='zoria'>zoria</RadioGroup.Item>
                                                <RadioGroup.Item value='ligth'>light</RadioGroup.Item>
                                                <RadioGroup.Item value='dark'>dark</RadioGroup.Item>
                                            </RadioGroup>
                                        </Card>
                                    </Popover.Body>
                                </Popover>
                            </Col>
                    }
                </Row>
            </Container>
        </TopBar>
    </Layout.Header>);
}