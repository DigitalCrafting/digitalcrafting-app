import React, {useCallback, useEffect} from "react";
import {autoUpdate, computePosition, flip, offset, shift} from "@floating-ui/dom";

export function useFloatingUiPositioning(
    triggerRef: React.RefObject<any> | undefined | null,
    floatingElRef: React.RefObject<any> | undefined | null,
    placement: 'top' | 'right' | 'bottom' | 'left' = 'top'
) {

    const updatePosition = useCallback(async () => {
        const trigger = triggerRef?.current;
        const floatingEl = floatingElRef?.current;

        if (!trigger || !floatingEl) return;

        const {x, y} = await computePosition(trigger, floatingEl,
            {
                placement,
                middleware: [
                    offset(8),
                    flip(),
                    shift({padding: 8})
                ]
            });

        Object.assign(floatingEl.style, {
            left: `${x}px`,
            top: `${y}px`,
        });
    }, [triggerRef?.current, placement]);

    useEffect(() => {
        const trigger = triggerRef?.current;
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
    }, [updatePosition, triggerRef?.current]);
}