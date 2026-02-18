import type {RefObject} from "react";
import {useCallback, useEffect} from "react";

const focusableElementsSelectors = [
    'a',
    'input:not([disabled]):not([type=hidden])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    '*[tabindex]'
];

export const useFocusTrap = <T extends HTMLElement>(ref: RefObject<T | null>) => {
    const selectNextFocusableElement = useCallback((focusableElements: T[], event: KeyboardEvent) => {
        const lastIndex = focusableElements.length - 1;
        const currentIndex = focusableElements.indexOf(document.activeElement as T);
        const nextIndex = !!event.shiftKey ? currentIndex - 1 : currentIndex + 1;

        if (nextIndex > lastIndex || currentIndex === -1) {
            focusableElements[0].focus();
            event.preventDefault();
        }

        if (nextIndex < 0) {
            focusableElements[focusableElements.length - 1].focus();
            event.preventDefault();
        }
    }, []);

    const trapFocus = useCallback((event: KeyboardEvent) => {
        const element: T | null = ref.current;
        if (element !== null) {
            if (event.key !== 'Tab') {
                return;
            }

            const elementsList = Array.from(element.querySelectorAll(focusableElementsSelectors.join(','))) as T[];
            const focusableElements: T[] = elementsList.filter((el: T) => el.tabIndex >= 0);
            selectNextFocusableElement(focusableElements, event);
        }
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', trapFocus);

        const element: T | null = ref.current;
        if (element !== null) {
            const elementsList = Array.from(element.querySelectorAll(focusableElementsSelectors.join(','))) as T[];
            const focusableElements: T[] = elementsList.filter((el: T) => el.tabIndex >= 0);
            focusableElements[0].focus();
        }

        return () => {
            window.removeEventListener('keydown', trapFocus);
        }
    }, [ref]);
}
