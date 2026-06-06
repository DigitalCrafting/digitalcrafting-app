import {useMemo} from "react";
import {CodeBlockController} from "./CodeBlockController";
import {IconButton} from "../buttons/IconButton";
import {CopyIcon} from "../icons/Icons";

/* TODO move to util */
function cleanUpNewLines(code: string): string {
    const lines = code.split(/(\r?\n)/);

    for (let i = 0; i< lines.length; i++) {
        const line = lines[i];
        lines[i] = line.trim();
    }

    console.log(lines)
    return lines.filter(line => !!line).join('\n');
}

interface CodeBlockProps {
    children: string
}

const CodeBlock = ({children}: CodeBlockProps) => {
    const codeBlock = useMemo(() => {
        const cleanCode = cleanUpNewLines(children);
        return CodeBlockController.createHtmlCodeBlock(cleanCode);
    }, [children])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(children);
    }

    return <div className='z-code-block'>
        {
            codeBlock.map((block, index) => {
                return <div className='z-code-block-line'>
                    <div className='z-code-block-side-panel'>
                        <span className='z-code-block-line-number'>{index}</span>
                    </div>
                    <div className='z-code-block-code'>
                        {block}
                    </div>
                </div>
            })
        }
        <IconButton onClick={copyToClipboard} className='z-code-block-copy-icon'>
            <CopyIcon/>
        </IconButton>
    </div>
}

export {CodeBlock};