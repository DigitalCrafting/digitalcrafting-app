import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {PasswordInput} from "@zoria-ui/react";

export const PasswordInputDemo = () => {
    return <DemoPanel title={'Password Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <PasswordInput onChange={(value) => console.log(value)} label='Password'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={5}/>
        </DemoPanel.Row>
    </DemoPanel>
}