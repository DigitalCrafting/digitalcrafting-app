import * as React from "react";
import {RefObject} from "react";

const useSelectDropdownNavigation = <T>(rootElRef: RefObject<T extends HTMLElement>) => {

    const inputKeyDownHandler = () => {
        /*
        Enter / Space / ArrowDown: Opens the dropdown and moves focus to the first item (or the currently selected item).
        ArrowUp: Opens the dropdown and moves focus to the last item.
        Alt + ArrowDown: Opens the dropdown without changing the selection.
        Type-ahead (Alphanumeric keys): If the user types "B", it should automatically select the first option starting with "B" (e.g., "Belgium") without opening the menu.

        Multi-character Search: If a user types "C-H" quickly, focus should jump to "Chad" or "Chile," not just restart at "C" for every keypress.
        Clear Timeout: You need a small timer (usually ~500ms) that clears the "search string" so if they wait a second and type "A", it looks for "A" rather than "CHA".
        */
    }

    const dropDownKeyDownHandler = (event: React.KeyboardEvent | KeyboardEvent) => {
        /*
        ArrowDown: Moves focus to the next item. If at the bottom, it should loop to the top.
        ArrowUp: Moves focus to the previous item. If at the top, it should loop to the bottom.
        Home: Jumps focus to the very first item in the list.
        End: Jumps focus to the very last item in the list.
        PageUp / PageDown: (Optional but nice) Skips focus up or down by 10 items or to the boundaries.
        Enter / Space: Selects the currently focused item and closes the dropdown.
        Escape: Closes the dropdown without changing the selection and returns focus to the trigger.
        Tab: Should ideally close the dropdown and move focus to the next element in the form (standard browser behavior).
        * */
    }
}

export {useSelectDropdownNavigation}