import * as React from "react";
import type {ZoriaSelectOption} from "./SelectInput";

export class SelectInputController {
    private searchString = "";
    private searchTimeoutId!: number;
    private options: ZoriaSelectOption<any, any>[];
    private callback!: (value: ZoriaSelectOption<any, any>) => void;

    private constructor(_options: ZoriaSelectOption[]) {
        this.options = _options;
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

            this.searchString += event.key.toLowerCase();

            const match = this.options.find(opt => opt.searchValue.toLowerCase().startsWith(this.searchString));

            if (match) {
                this.callback(match);
            }

            clearTimeout(this.searchTimeoutId);
            this.searchTimeoutId = setTimeout(() => {
                this.searchString = "";
            }, 500);
        }
    }
}