import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {NumberInput} from "@zoria-ui/react/src/components/inputs/NumberInput.tsx";

export const NumberInputDemo = () => {
    return <DemoPanel title={'Number Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <NumberInput onChange={(value) => console.log(value)} label='Number input'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={5}/>
        </DemoPanel.Row>
    </DemoPanel>
}