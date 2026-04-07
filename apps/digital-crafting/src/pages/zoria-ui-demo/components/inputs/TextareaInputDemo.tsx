import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {TextareaInput} from "@zoria-ui/react";

export const TextareaInputDemo = () => {
    return <DemoPanel title={'Text Area Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <TextareaInput onChange={(value) => console.log(value)} label='Text area input'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={5}/>
        </DemoPanel.Row>
    </DemoPanel>
}