import {useMemo} from "react";
import {CodeBlockController} from "./CodeBlockController";

interface CodeBlockProps {
    children: string
}

const CodeBlock = ({children}: CodeBlockProps) => {
    const codeBlock = useMemo(() => {
        return CodeBlockController.createHtmlCodeBlock(children);
    }, [children])

    return <div className='z-code-block'>
        <div className='z-code-block-side-panel'>
            {
                codeBlock.map((_, index) => {
                    return <span className='z-code-block-line-number'>{index}</span>
                })
            }
        </div>
        <div className='z-code-block-code'>
            {codeBlock}
        </div>
    </div>
}

export {CodeBlock};