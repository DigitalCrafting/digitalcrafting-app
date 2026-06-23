import './LandingPage.scss';
import {Col, H1, H2} from "@zoria-ui/react";
import {LPArchitectureAnimation} from "./components/LPArchitectureAnimation.tsx";

export const LandingPage = () => {
    return (
        <Col span={12} className='align-items-center'>
            <Col className='justify-center'>
                <H1 className='align-self-center'>DigitalCrafting</H1>
                <H2 className='align-self-center'>Where passion meets software</H2>
            </Col>
            <LPArchitectureAnimation/>
        </Col>
    )
}