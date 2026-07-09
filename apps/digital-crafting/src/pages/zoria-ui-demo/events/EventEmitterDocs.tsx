import {CodeBlock, Col, H2, Panel} from "@zoria-ui/react";

export function EventEmitterDocs() {
    return <Panel>
        <Panel.Header><H2>EventEmitter</H2></Panel.Header>
        <Panel.Body>
            <Col span={12} className='justify-center align-items-center'>
                <CodeBlock>
                    {/* language=text */}
                    {`
        const numberEventEmitter = new EventEmitter<number>();

        const sub = numberEventEmitter.subscribe((value) => {
            console.log(value);
        })

        numberEventEmitter.emit(5);
        
        sub.unsubscribe();
        
                    `}
                </CodeBlock>
            </Col>
        </Panel.Body>
    </Panel>
}