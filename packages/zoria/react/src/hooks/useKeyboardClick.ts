import {type KeyboardEvent, type MouseEvent, useCallback } from "react";
import {noop} from "../utils/Utils";

type KeyboardClickHandler = (e: MouseEvent | KeyboardEvent) => void;

export function useKeyboardClick(onClick?: KeyboardClickHandler) {
    if (!onClick) {
        return noop;
    }

    return useCallback(
        (e: KeyboardEvent<HTMLElement>) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(e);
            }
        },
        [onClick]
    );
}