import {ZoriaUIDemoRoutesList} from "./ZoriaUIRoutesTypes.ts";
import type {RouteObject} from "react-router-dom";

export const ZoriaUIRoutesConfig: RouteObject[] = [
    {
        index: true,
        lazy: async () => {
            const {ZoriaUIDemoList} = await import('../ZoriaUIDemoList.tsx');
            return {element: <ZoriaUIDemoList />};
        },
    },
    ...ZoriaUIDemoRoutesList.map(route => ({
        path: `${route}`,
        lazy: async () => {
            const {ZoriaUIDemoList} = await import('../ZoriaUIDemoList.tsx');
            return {element: <ZoriaUIDemoList type={route} />};
        }
    }))
]