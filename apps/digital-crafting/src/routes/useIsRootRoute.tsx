import {useLocation} from "react-router-dom";

export function useIsRootRoute() {
    const location = useLocation();
    return location.pathname === "/";
}