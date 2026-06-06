import type {Token} from "./TokenizerTypes";
import {CodeBlockTokenizer} from "./CodeBlockTokenizer";
import {TsxTokenConfig} from "./TokensConfig";

class ParserImpl {
    parse(code: string): Token[] {

        const tokenizer = CodeBlockTokenizer.forString(code).withConfig(TsxTokenConfig);
        const tokens: Token[] = [];

        while (tokenizer.hasMoreTokens()) {
            /* Should never return null */
            tokens.push(tokenizer.getNextToken()!);
        }

        return tokens;
    }
}

export const Parser = new ParserImpl();