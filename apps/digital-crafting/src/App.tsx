import './App.css'
import { ZoriaProvider } from '@zoria-ui/react';
import {Outlet} from "react-router-dom";

function App() {
    return <>
        <ZoriaProvider>
            <Outlet />
        </ZoriaProvider>
    </>;
}

export default App
