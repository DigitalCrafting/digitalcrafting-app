import type {RefObject} from "react";
import {useEffect} from "react";
import {FocusTrap} from "../utils/FocusTrap";

export const useFocusTrap = <T extends HTMLElement>(ref: RefObject<T | null>) => {
    useEffect(() => {
        const focusTrap = FocusTrap.for(ref);
        focusTrap.trap();

        return () => {
            focusTrap.release();
        }
    }, [ref]);
}
