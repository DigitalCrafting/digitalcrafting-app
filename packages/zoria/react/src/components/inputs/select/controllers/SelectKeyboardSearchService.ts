import * as React from 'react';
import type {ZoriaSelectOption} from "../SelectInput";

export class SelectKeyboardSearchService {
    private searchString = "";
    private searchTimeoutId!: number;
    private currentMatchIndex: number = -1;
    private isSearchBySameLetter: boolean = false;
    private readonly options: ZoriaSelectOption<any, any>[];

    private constructor(_options: ZoriaSelectOption[]) {
        this.options = _options;
    }

    public static forOptions(_options: ZoriaSelectOption[]): SelectKeyboardSearchService {
        return new SelectKeyboardSearchService(_options);
    }

    public search(event: React.KeyboardEvent | KeyboardEvent): ZoriaSelectOption<any, any> | null {
        const key = event.key.toLowerCase();

        clearTimeout(this.searchTimeoutId);
        this.searchTimeoutId = setTimeout(() => {
            this.searchString = "";
            this.isSearchBySameLetter = false;
        }, 500);

        if (this.searchString.length === 0) {
            this.isSearchBySameLetter = false;
            this.searchString += key;
        } else if (this.searchString.length === 1 && key === this.searchString) {
            this.isSearchBySameLetter = true;
            return this.searchByLetter();
        } else if (this.isSearchBySameLetter) {
            this.isSearchBySameLetter = false;
            this.searchString = key;
            this.currentMatchIndex = -1;
        } else {
            this.searchString += key;
        }

        return this.searchByPhrase();
    }

    private searchByLetter(): ZoriaSelectOption<any, any> | null {
        clearTimeout(this.searchTimeoutId);
        let startIndex = this.currentMatchIndex + 1;
        if (startIndex === this.options.length) {
            startIndex = 0;
        }
        let foundIndex = this.options.findIndex((opt, index) => index >= startIndex && opt.searchValue.toLowerCase().startsWith(this.searchString));

        if (foundIndex === -1 && startIndex > 0) {
            foundIndex = this.options.findIndex((opt, index) => index < startIndex && opt.searchValue.toLowerCase().startsWith(this.searchString));
        }

        if (foundIndex > -1) {
            this.currentMatchIndex = foundIndex;
            return this.options[foundIndex];
        }

        return null;
    }

    private searchByPhrase(): ZoriaSelectOption<any, any> | null {
        this.currentMatchIndex = this.options.findIndex((opt) => opt.searchValue.toLowerCase().startsWith(this.searchString));

        if (this.currentMatchIndex > -1) {
            return this.options[this.currentMatchIndex];
        }

        return null;
    }
}