import { H1 } from "@zoria-ui/react";
import './LandingPage.scss';
import {LPArchitectureAnimation} from "./components/LPArchitectureAnimation.tsx";

export const LandingPage = () => {
    return <main className='dc-landing-page'>
        <H1>Landing page</H1>
        <LPArchitectureAnimation />
    </main>
}