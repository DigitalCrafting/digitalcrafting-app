import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {NumberInput} from "@zoria-ui/react";

export const NumberInputDemo = () => {
    return <DemoPanel title={'Number Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <NumberInput onChange={(value) => console.log(value)} label='Number input'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={2}/>
            <DemoPanel.Col span={3}>
                <NumberInput disableNegative onChange={(value) => console.log(value)} label='Number input disabled negative'/>
            </DemoPanel.Col>
        </DemoPanel.Row>
    </DemoPanel>
}