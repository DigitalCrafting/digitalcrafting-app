import {useLocation} from "react-router-dom";

export function useIsZoriaRoute() {
    const location = useLocation();
    return location.pathname.includes('/zoria');
}