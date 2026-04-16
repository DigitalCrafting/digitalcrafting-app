import type {RefObject} from "react";

export class FocusableElementsObserver<T extends HTMLElement> {
    private rootElRef: RefObject<T | null>;
    private observer: MutationObserver | null = null;

    private constructor(ref: RefObject<T | null>) {
        this.rootElRef = ref;
    }

    public static for<T extends HTMLElement>(ref: RefObject<T | null>): FocusableElementsObserver<T> {
        return new FocusableElementsObserver(ref);
    }

    public startObserving(callback: () => void) {
        const rootEl = this.rootElRef.current;
        if (!rootEl) {
            return;
        }

        this.observer = new MutationObserver(callback);

        this.observer.observe(rootEl, {
            childList: true,
            subtree: true
        })
    }

    public stopObserving() {
        this.observer?.disconnect();
    }
}