import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import {ZoriaProvider} from "@zoria-ui/react";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ZoriaProvider>
            <App />
        </ZoriaProvider>
    </StrictMode>,
)
