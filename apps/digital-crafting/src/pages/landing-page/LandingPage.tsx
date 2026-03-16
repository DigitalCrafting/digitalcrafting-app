import {Col, H1, H2} from "@zoria-ui/react";
import './LandingPage.scss';
import {LPArchitectureAnimation} from "./components/LPArchitectureAnimation.tsx";

export const LandingPage = () => {
    return <Col>
            <Col className='align-items-center'>
                <H1>DigitalCrafting</H1>
                <H2>Where passion meets software</H2>
            </Col>
            <LPArchitectureAnimation/>
    </Col>
}