import * as React from "react";
import {useCallback, useEffect} from "react";
import {autoUpdate, computePosition, flip, offset, shift} from "@floating-ui/dom";

export function useFloatingUiPositioning(
    relativeElementRef: React.RefObject<any> | undefined | null,
    floatingElRef: React.RefObject<any> | undefined | null,
    placement: 'top' | 'right' | 'bottom' | 'left' = 'top',
    offsetBy: number = 8
) {

    const updatePosition = useCallback(async () => {
        const trigger = relativeElementRef?.current;
        const floatingEl = floatingElRef?.current;

        if (!trigger || !floatingEl) return;

        const {x, y} = await computePosition(trigger, floatingEl,
            {
                placement,
                middleware: [
                    offset(offsetBy),
                    flip(),
                    shift({padding: 8})
                ]
            });

        Object.assign(floatingEl.style, {
            left: `${x}px`,
            top: `${y}px`,
        });
    }, [relativeElementRef?.current, placement]);

    useEffect(() => {
        const trigger = relativeElementRef?.current;
        const floatingEl = floatingElRef?.current;

        if (!trigger || !floatingEl) return;

        const cleanup = autoUpdate(trigger, floatingEl, updatePosition, {animationFrame: true});
        updatePosition();

        const observer = new MutationObserver(updatePosition);
        observer.observe(trigger, { attributes: true, childList: true, subtree: true })

        return () => {
            cleanup();
            observer.disconnect();
        };
    }, [updatePosition, relativeElementRef?.current]);
}