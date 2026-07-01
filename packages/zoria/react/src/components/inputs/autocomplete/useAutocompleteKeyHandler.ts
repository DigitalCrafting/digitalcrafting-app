import type {Dispatch, SetStateAction} from "react";
import * as React from "react";
import type {UniversalInteractionEvent} from "../../../types/CommonTypes";
import type {AutocompleteDropdownOption} from "./AutocompleteTypes";

export const useAutocompleteKeyHandler = (
    isDropdownOpen: boolean,
    setIsDropdownOpen: Dispatch<SetStateAction<boolean>>,
    currentlyFocusedIdx: number,
    setCurrentlyFocusedIdx: Dispatch<SetStateAction<number>>,
    options: AutocompleteDropdownOption[],
    onOptionSelected: (event: UniversalInteractionEvent, option: AutocompleteDropdownOption<any, any>) => void
) => {
    return (event: React.KeyboardEvent | KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
            event.stopPropagation();
            event.preventDefault();

            if (!isDropdownOpen) {
                setIsDropdownOpen(true);
                return;
            } else {
                // move focus
                if (options && currentlyFocusedIdx < options?.length - 1) {
                    setCurrentlyFocusedIdx(prev => ++prev);
                }
                if (options && currentlyFocusedIdx >= options?.length) {
                    setCurrentlyFocusedIdx(0);
                }
                return;
            }
        }

        if (event.key === 'ArrowUp') {
            event.stopPropagation();
            event.preventDefault();

            if (isDropdownOpen) {
                if (currentlyFocusedIdx <= 0) {
                    setCurrentlyFocusedIdx(-1);
                    setIsDropdownOpen(false);
                } else {
                    if (options && options.length && currentlyFocusedIdx >= options.length) {
                        setCurrentlyFocusedIdx(options.length - 1)
                    } else {
                        setCurrentlyFocusedIdx(prev => --prev);
                    }
                }
                return;
            }
        }

        if (event.key === 'Escape') {
            event.stopPropagation();
            event.preventDefault();
            setIsDropdownOpen(false);
            return;
        }

        if (event.key === 'Enter') {
            if (isDropdownOpen) {
                event.stopPropagation();
                event.preventDefault();

                if (currentlyFocusedIdx >= 0) {
                    onOptionSelected(event, options![currentlyFocusedIdx]);
                }
            }
        }
    }
}