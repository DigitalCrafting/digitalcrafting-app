import {CalendarIcon, IconButton, Input} from "@zoria-ui/react";
import {DemoPanel} from "../demo-panel/DemoPanel";

export const InputDemo = () => {
    return <DemoPanel title={'Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <Input onChange={(event) => console.log(event.target.value)} label='Test input'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={2}/>
            <DemoPanel.Col span={3}>
                <Input label='Test input with error' error='Terrible error'/>
            </DemoPanel.Col>
        </DemoPanel.Row>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <Input label='Test input disabled' disabled/>
            </DemoPanel.Col>
            <DemoPanel.Col span={2}/>
            <DemoPanel.Col span={3}>
                <Input label='Test input 2 with error' error='Terrible error'/>
            </DemoPanel.Col>
        </DemoPanel.Row>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <Input onChange={(event) => console.log(event.target.value)} label='Test input'>
                    <IconButton>
                        <CalendarIcon/>
                    </IconButton>
                </Input>
            </DemoPanel.Col>
            <DemoPanel.Col span={2}/>
            <DemoPanel.Col span={3}>
                <Input label='Test input 2 with error' error='Terrible error'/>
            </DemoPanel.Col>
        </DemoPanel.Row>
    </DemoPanel>
}