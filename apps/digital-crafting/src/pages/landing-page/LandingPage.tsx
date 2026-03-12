import {Col, H1, H2, Layout} from "@zoria-ui/react";
import './LandingPage.scss';
import {LPArchitectureAnimation} from "./components/LPArchitectureAnimation.tsx";

export const LandingPage = () => {
    return <Layout className='dc-landing-page'>
        <Layout.Header>
            <Col className='align-items-center'>
                <H1>DigitalCrafting</H1>
                <H2>Where passion meets software</H2>
            </Col>
        </Layout.Header>
        <Layout.Body>
            <LPArchitectureAnimation/>
        </Layout.Body>
    </Layout>
}