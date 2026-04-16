import * as React from 'react';
import type {RefObject} from "react";
import {FocusableElementsObserver} from "../../../utils/FocusableElementsObserver";

export class SelectDropdownTrap<T extends HTMLElement> {
    private readonly rootElRef: RefObject<T | null>;
    private selectElements: HTMLElement[] = [];
    private observer: FocusableElementsObserver<T>;
    private previousFocus: HTMLElement | null = null;

    private constructor(ref: RefObject<T | null>) {
        this.rootElRef = ref;
        this.observer = FocusableElementsObserver.for(this.rootElRef);
    }

    public static for<T extends HTMLElement>(ref: RefObject<T | null>): SelectDropdownTrap<T> {
        return new SelectDropdownTrap<T>(ref);
    }

    public trap() {
        this.previousFocus = document.activeElement as HTMLElement;
        this.observer.startObserving(this.updateSelectElements);
        this.updateSelectElements();

        window.addEventListener('keydown', this.handleKeyDown);

        const currentlySelected = this.selectElements.find(el => el.getAttribute('aria-selected') === 'true');

        const target = currentlySelected || this.selectElements[0];

        if (target) {
            target.focus({ preventScroll: true });
            target.scrollIntoView({ block: 'center' });
        }
    }

    public release(restore: boolean = true) {
        this.observer.stopObserving();
        window.removeEventListener('keydown', this.handleKeyDown);

        if (restore && this.previousFocus) {
            const currentFocus = document.activeElement;
            const isFocusStillInside = this.rootElRef.current?.contains(currentFocus);

            if (currentFocus === document.body || isFocusStillInside) {
                this.previousFocus.focus();
            }
        }
    }

    private updateSelectElements = () => {
        const element = this.rootElRef.current;
        if (!element) return;

        this.selectElements = (Array.from(element.querySelectorAll('li')) as HTMLElement[]);
    }

    private handleKeyDown = (event: React.KeyboardEvent | KeyboardEvent) => {

    }
}