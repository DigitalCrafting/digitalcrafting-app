import {createBrowserRouter} from "react-router-dom";
import {LandingPage} from "../pages/landing-page/LandingPage.tsx";
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
                lazy: async () => {
                    const {ComponentsDemoPage} = await import('../pages/components-demo/ComponentsDemoPage.tsx');
                    return {element: <ComponentsDemoPage />};
                },
            }
        ]
    },
])