import './App.scss'
import {Layout, ZoriaProvider} from '@zoria-ui/react';
import {DCHeader} from "./components/DCHeader.tsx";
import {DCBody} from "./components/DCBody.tsx";
import {useEffect} from "react";
import {useIsRootRoute} from "./routes/useIsRootRoute.tsx";

function App() {
    useEffect(() => {
        import('./pages/zoria-ui-demo/ZoriaUIDemoPage.tsx');
        import('./pages/threejs-drone-game/ThreeJsDroneGamePage.tsx');
    }, []);

    const isRoot = useIsRootRoute();

    return (
        <ZoriaProvider>
            <Layout className={`dc ${isRoot ? 'dc-landing-page' : ''}`}>
                <DCHeader/>
                <DCBody/>
            </Layout>
        </ZoriaProvider>
    );
}

export default App
