import * as React from 'react';
import type {RefObject} from "react";
import {FocusableElementsObserver} from "../../../utils/FocusableElementsObserver";
import {CircularArray} from "../../../data-structures/CircularArray";

export class SelectDropdownController<T extends HTMLElement> {
    private readonly rootElRef: RefObject<T | null>;
    private selectElements!: CircularArray<HTMLElement>;
    private observer: FocusableElementsObserver<T>;
    private sentinelRef!: RefObject<HTMLButtonElement | null>;
    private closeDropdown!: () => void;

    private constructor(ref: RefObject<T | null>) {
        this.rootElRef = ref;
        this.observer = FocusableElementsObserver.for(this.rootElRef);
    }

    public static for<T extends HTMLElement>(ref: RefObject<T | null>): SelectDropdownController<T> {
        return new SelectDropdownController<T>(ref);
    }

    public withFocusSentinel(sentinelRef: RefObject<HTMLButtonElement | null>): SelectDropdownController<T> {
        this.sentinelRef = sentinelRef;
        return this;
    }

    public withCloseCallback(close: () => void): SelectDropdownController<T> {
        this.closeDropdown = close;
        return this;
    }

    public control(): SelectDropdownController<T> {
        this.observer.startObserving(this.updateSelectElements);
        this.updateSelectElements();

        window.addEventListener('keydown', this.handleKeyDown);

        const currentlySelected = this.selectElements.getItems().find(el => el.getAttribute('aria-selected') === 'true');

        const target = currentlySelected || this.selectElements.getFirst();

        if (target) {
            this.selectElements.setCurrent(target);
            target.focus({preventScroll: true});
            target.scrollIntoView({block: 'center'});
        }

        return this;
    }

    public release() {
        this.observer.stopObserving();
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    private updateSelectElements = () => {
        const element = this.rootElRef.current;
        if (!element) return;

        this.selectElements = CircularArray.of(Array.from(element.querySelectorAll('li')) as HTMLElement[]);
    }

    private handleKeyDown = (event: React.KeyboardEvent | KeyboardEvent) => {
        event.preventDefault();
        if (event.key === 'Tab') {
            this.closeDropdown();
            const currentElement = this.selectElements.getCurrent();
            currentElement.click();
            this.sentinelRef?.current?.focus();
            return;
        }

        event.stopPropagation();

        if (event.key === 'Enter' || event.key === ' ') {
            const currentElement = this.selectElements.getCurrent();
            currentElement.click();
        }

        if (event.key === 'ArrowDown') {
            this.focusOption(this.selectElements.getNext());
        }

        if (event.key === 'ArrowUp') {
            this.focusOption(this.selectElements.getPrev());
        }

        if (event.key === 'Home') {
            this.focusOption(this.selectElements.getFirst());
        }

        if (event.key === 'End') {
            this.focusOption(this.selectElements.getLast());
        }

        if (event.key === 'Escape') {
            this.sentinelRef?.current?.focus();
            this.closeDropdown();
        }
    }

    private focusOption(option: HTMLElement) {
        option.focus({preventScroll: true});
        option.scrollIntoView({
            behavior: 'auto',
            block: 'nearest',
            inline: 'nearest'
        });
    }
}