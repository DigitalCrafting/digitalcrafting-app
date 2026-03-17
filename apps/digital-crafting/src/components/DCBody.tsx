import {Outlet} from "react-router-dom";
import {Layout} from '@zoria-ui/react';

export const DCBody = () => {
    return <Layout.Body>
        <Outlet/>
    </Layout.Body>

}