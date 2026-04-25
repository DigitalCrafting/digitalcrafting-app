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
                <Col className='align-items-center'>
                    <H1>DigitalCrafting</H1>
                    <H2>Where passion meets software</H2>
                </Col>
                <LPArchitectureAnimation/>
            </Col>
        </Row>
    )
}