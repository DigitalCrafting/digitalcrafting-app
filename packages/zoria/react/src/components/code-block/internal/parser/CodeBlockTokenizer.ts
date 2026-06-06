import type {Token, TokenizerConfig} from "./TokenizerTypes";

export class CodeBlockTokenizer {
    private _config!: TokenizerConfig;
    private _string: string;
    private _cursor: number = 0;

    private constructor(_string: string) {
        this._string = _string;
        this._cursor = 0;
    }

    public static forString(_string: string): CodeBlockTokenizer {
        return new CodeBlockTokenizer(_string);
    }

    public withConfig(_config: TokenizerConfig): CodeBlockTokenizer {
        this._config = _config;
        return this;
    }

    public hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    public getNextToken(): Token | null {
        if (!this._config) {
            throw new Error('[SimpleTokenizer] Config not specified')
        }

        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._string.slice(this._cursor);

        for (const [regexp, type] of this._config) {
            const value = this._match(regexp, string);

            /* For whoever reads this code:
            *  there is no skipping whitespaces, as this is CodeBlock tokenizer,
            *  which should preserve every indentation.
            *
            *  Might actually make indentation part of the display in the future.
            * */
            if (value !== null) {
                return {
                    type,
                    value
                }
            }
        }

        throw new SyntaxError(`Unexpected token: "${string[0]}"`)
    }

    private _match(regex: RegExp, string: string): string | null {
        const matched = regex.exec(string);
        if (matched == null) {
            return null;
        }
        this._cursor += matched[0].length;
        return matched[0];
    }
}