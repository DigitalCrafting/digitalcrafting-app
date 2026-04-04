import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {TextInput} from "@zoria-ui/react/src/components/inputs/TextInput.tsx";

export const TextInputDemo = () => {
    return <DemoPanel title={'Text Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <TextInput onChange={(value) => console.log(value)} label='Text input'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={5}/>
        </DemoPanel.Row>
    </DemoPanel>
}