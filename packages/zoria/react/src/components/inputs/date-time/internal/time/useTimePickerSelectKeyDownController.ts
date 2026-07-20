import * as React from "react";
import {type RefObject, useEffect, useRef} from "react";
import {CircularArray} from "../../../../../data-structures/CircularArray";
import {type KeyDownHandlerType} from "../../../../../types/CommonTypes";

export function useTimePickerSelectKeyDownController(listRef: RefObject<HTMLUListElement | null>) {
    const keyDownControllerRef = useRef<TimePickerSelectKeyDownController>(null);

    const getController = () => {
        if (!listRef.current) return null;
        if (!keyDownControllerRef.current) {
            keyDownControllerRef.current = TimePickerSelectKeyDownController.for(listRef);
        }
        keyDownControllerRef.current.syncElements();
        return keyDownControllerRef.current;
    };

    const onKeyDown = (event: React.KeyboardEvent | KeyboardEvent) => {
        const controller = getController();
        if (controller) {
            controller.handleKeyDown(event);
        }
    }

    useEffect(() => {
        const controller = getController();
        if (controller) {
            controller.syncElements(true);
        }
    }, []);

    return onKeyDown;
}

class TimePickerSelectKeyDownController {
    private selectElements!: CircularArray<HTMLElement>;

    private constructor(private listRef: RefObject<HTMLUListElement | null>) {
        this.syncElements();
    }

    public static for(listRef: RefObject<HTMLUListElement | null>): TimePickerSelectKeyDownController {
        return new TimePickerSelectKeyDownController(listRef);
    }

    public syncElements = (isInit: boolean = false) => {
        const element = this.listRef.current;
        if (!element) return;

        const items = Array.from(element.querySelectorAll('li')) as HTMLElement[];
        this.selectElements = CircularArray.of(items);

        const currentlySelected = items.find(el => el.getAttribute('aria-selected') === 'true');
        const currentlyFocused = items.find(el => el === document.activeElement);

        const activeNode = currentlyFocused || currentlySelected;
        if (activeNode) {
            this.selectElements.setCurrent(activeNode);
            if (isInit) {
                activeNode.scrollIntoView({
                    behavior: 'auto',
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }
    }

    public handleKeyDown: KeyDownHandlerType = (event: React.KeyboardEvent | KeyboardEvent) => {
        this.syncElements();

        if (event.key === 'Tab') {
            if (event.shiftKey && !this.selectElements.isFirst()) {
                this.selectElements.getPrev();
            } else if (!event.shiftKey && !this.selectElements.isLast()) {
                this.selectElements.getNext();
            }
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            const currentElement = this.selectElements.getCurrent();
            currentElement.click();
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            event.stopPropagation();
            this.focusOption(this.selectElements.getNext());
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation();
            this.focusOption(this.selectElements.getPrev());
            return;
        }

        if (event.key === 'Home') {
            event.preventDefault();
            event.stopPropagation();
            this.focusOption(this.selectElements.getFirst());
            return;
        }

        if (event.key === 'End') {
            event.preventDefault();
            event.stopPropagation();
            this.focusOption(this.selectElements.getLast());
            return;
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