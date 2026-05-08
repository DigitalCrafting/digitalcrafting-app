import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {TimePickerInput} from "@zoria-ui/react";

export const TimePickerInputDemo = () => {
    return <DemoPanel title={'Time Picker Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <TimePickerInput onChange={(value) => console.log(value)} label='Time Picker'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={5}/>
        </DemoPanel.Row>
    </DemoPanel>
}