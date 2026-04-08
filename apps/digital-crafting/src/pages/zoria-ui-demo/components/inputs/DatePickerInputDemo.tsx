import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {DatePickerInput} from "@zoria-ui/react";

export const DatePickerInputDemo = () => {
    return <DemoPanel title={'Date Picker Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <DatePickerInput onChange={(value) => console.log(value)} label='Date Picker'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={5}/>
        </DemoPanel.Row>
    </DemoPanel>
}