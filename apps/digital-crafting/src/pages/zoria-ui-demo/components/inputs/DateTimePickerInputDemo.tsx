import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {DateTimePickerInput} from "@zoria-ui/react";

export const DateTimePickerInputDemo = () => {
    return <DemoPanel title={'Date Time Picker Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <DateTimePickerInput onChange={(value) => console.log(value)} label='Date Time Picker'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={5}/>
        </DemoPanel.Row>
    </DemoPanel>
}