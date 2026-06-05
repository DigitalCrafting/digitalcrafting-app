import {CodeBlockLine} from "./HtmlGenerator.types";
import {Token, TokenTypeEnum} from "../parser/Tokenizer.types";

class HtmlGeneratorImpl {

    generate(codeTokens: Token[]): CodeBlockLine[] {
        const codeBlock: CodeBlockLine[] = [];

        let line = [];
        codeTokens.forEach((token) => {
            if (token.type === TokenTypeEnum.BREAKLINE) {
                line.push(<br/>)
                codeBlock.push(line);
                line = [];
            }

            line.push(<span className={`token ${token.type}`}>{token.value}</span>)
        })

        return codeBlock;
    }
}

export const HtmlGenerator = new HtmlGeneratorImpl();