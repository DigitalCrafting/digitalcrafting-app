import './LandingPage.scss';
import {Col, H1, H2, Row} from "@zoria-ui/react";
import {LPArchitectureAnimation} from "./components/LPArchitectureAnimation.tsx";
import {useEffect} from "react";

export const LandingPage = () => {
    useEffect(() => {

    }, []);

    return (
        <Row className='align-items-center justify-center'>
            <Col>
                <H1 className='align-self-center'>DigitalCrafting</H1>
                <H2 className='align-self-center'>Where passion meets software</H2>
                <LPArchitectureAnimation/>
            </Col>
        </Row>
    )
}