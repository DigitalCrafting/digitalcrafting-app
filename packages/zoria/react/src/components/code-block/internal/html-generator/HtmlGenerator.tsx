import type {CodeBlockLine} from "./HtmlGeneratorTypes";
import {type Token, TokenTypeEnum} from "../parser/TokenizerTypes";
import type {ReactNode} from "react";

class HtmlGeneratorImpl {

    generate(codeTokens: Token[]): CodeBlockLine[] {
        const codeBlock: CodeBlockLine[] = [];

        let line: ReactNode[] = [];
        codeTokens.forEach((token) => {
            if (token.type === TokenTypeEnum.BREAKLINE) {
                codeBlock.push(line);
                line = [];
            } else {
                line.push(<span className={`token ${token.type}`}>{token.value}</span>)
            }
        })
        codeBlock.push(line);

        return codeBlock;
    }
}

export const HtmlGenerator = new HtmlGeneratorImpl();