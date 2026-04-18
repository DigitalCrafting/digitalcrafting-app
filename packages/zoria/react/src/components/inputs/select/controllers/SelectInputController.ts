import * as React from "react";
import type {ZoriaSelectOption} from "../SelectInput";
import {SelectKeyboardSearchService} from "./SelectKeyboardSearchService";

export class SelectInputController {
    private options: ZoriaSelectOption<any, any>[];
    private callback!: (value: ZoriaSelectOption<any, any>) => void;
    private keyboardSearchService!: SelectKeyboardSearchService;

    private constructor(_options: ZoriaSelectOption[]) {
        this.options = _options;
        this.keyboardSearchService = SelectKeyboardSearchService.forOptions(this.options);
    }

    public static forOptions(_options: ZoriaSelectOption[]): SelectInputController {
        return new SelectInputController(_options);
    }

    public withOnMatched = (_callback: (value: ZoriaSelectOption<any, any>) => void): SelectInputController => {
        this.callback = _callback;
        return this;
    }

    public handleKeyDown = (event: React.KeyboardEvent | KeyboardEvent) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation();
            (event.target as HTMLElement).click();
            return;
        }

        if (event.key.length === 1 && event.key !== ' ' && !event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            event.stopPropagation();
            const match = this.keyboardSearchService.search(event);
            if (match) {
                this.callback(match);
            }
        }
    }
}