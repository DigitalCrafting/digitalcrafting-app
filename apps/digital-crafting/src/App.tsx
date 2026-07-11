import './App.scss'
import {Layout, ZoriaProvider} from '@zoria-ui/react';
import {DCHeader} from "./components/DCHeader.tsx";
import {DCBody} from "./components/DCBody.tsx";
import {useEffect} from "react";
import {useIsRootRoute} from "./routes/useIsRootRoute.tsx";
import {useIsZoriaRoute} from "./routes/useIsZoriaRoute.tsx";

function App() {
    useEffect(() => {
        import('./pages/zoria-ui-demo/ZoriaUIDemoPage.tsx');
        import('./pages/threejs-drone-game/ThreeJsDroneGamePage.tsx');
    }, []);

    const isRoot = useIsRootRoute();
    const isZoria = useIsZoriaRoute();

    let className = '';
    if (isZoria) {
        className = 'dc-zoria-page';
    } else if (isRoot) {
        className = 'dc-landing-page'
    }

    return (
        <ZoriaProvider>
            <Layout className={`dc ${className}`}>
                <DCHeader/>
                <DCBody/>
            </Layout>
        </ZoriaProvider>
    );
}

export default App
