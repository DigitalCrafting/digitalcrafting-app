import type {RefObject} from "react";

const focusableElementsSelectors = [
    'a',
    'input:not([disabled]):not([type=hidden])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    '*[tabindex]'
];

export class FocusTrap<T extends HTMLElement> {
    private rootElRef: RefObject<T | null>;
    private previousFocus: HTMLElement | null = null;
    private focusableElements: HTMLElement[] = [];
    private observer: MutationObserver | null = null;

    private constructor(ref: RefObject<T | null>) {
        this.rootElRef = ref;
    }

    public static for<T extends HTMLElement>(ref: RefObject<T | null>): FocusTrap<T> {
        return new FocusTrap<T>(ref);
    }

    public trap() {
        this.previousFocus = document.activeElement as HTMLElement;
        this.startObserving();
        this.updateFocusableElements();

        window.addEventListener('keydown', this.handleKeyDown);

        if (this.focusableElements.length > 0) {
            this.focusableElements[0].focus();
        }
    }

    public release(restore: boolean = true) {
        this.observer?.disconnect();
        window.removeEventListener('keydown', this.handleKeyDown);

        if (restore && this.previousFocus) {
            const currentFocus = document.activeElement;
            const isFocusStillInside = this.rootElRef.current?.contains(currentFocus);

            if (currentFocus === document.body || isFocusStillInside) {
                this.previousFocus.focus();
            }
        }
    }

    public updateFocusableElements() {
        const element = this.rootElRef.current;
        if (!element) return;

        const selectors = focusableElementsSelectors.join(',');
        this.focusableElements = (Array.from(element.querySelectorAll(selectors)) as HTMLElement[])
            .filter(el => el.tabIndex >= 0);
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') {
            return;
        }

        const first = this.focusableElements[0];
        const last = this.focusableElements[this.focusableElements.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && active === first) {
            last.focus();
            event.preventDefault();
        } else if (!event.shiftKey && active === last) {
            first.focus();
            event.preventDefault();
        }
    };

    private startObserving() {
        const element = this.rootElRef.current;
        if (!element) return;

        this.observer = new MutationObserver(() => {
            this.updateFocusableElements();
        });

        this.observer.observe(element, {
            childList: true,
            subtree: true,
        });
    }
}