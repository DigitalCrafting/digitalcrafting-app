import {createBrowserRouter} from "react-router-dom";
import {LandingPage} from "../pages/landing-page/LandingPage.tsx";
import {ComponentsDemoPage} from "../pages/components-demo/ComponentsDemoPage.tsx";
import App from "../App.tsx";

export const Router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: 'zoria',
                element: <ComponentsDemoPage />
            }
        ]
    },
])