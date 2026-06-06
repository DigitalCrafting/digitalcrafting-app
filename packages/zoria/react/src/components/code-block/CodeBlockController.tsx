import {Parser} from "./internal/parser/Parser";
import {HtmlGenerator} from "./internal/html-generator/HtmlGenerator";
import {type CodeBlockLine} from "./internal/html-generator/HtmlGeneratorTypes";

class CodeBlockControllerImpl {
    createHtmlCodeBlock(code: string): CodeBlockLine[] {
        const tokens = Parser.parse(code);
        return HtmlGenerator.generate(tokens);
    }
}

export const CodeBlockController = new CodeBlockControllerImpl();