import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {EmailInput} from "@zoria-ui/react";

export const EmailInputDemo = () => {
    return <DemoPanel title={'Email Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <EmailInput onChange={(value) => console.log(value)} label='Email input'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={5}/>
        </DemoPanel.Row>
    </DemoPanel>
}