import {DemoPanel} from "../demo-panel/DemoPanel.tsx";
import {DatePickerInput, DateUtils} from "@zoria-ui/react";
import {useMemo} from "react";

export const DatePickerInputDemo = () => {
    const [min, max] = useMemo(() => {
        const today = DateUtils.atMidnight(new Date());
        const minDate = DateUtils.subtractDays(DateUtils.atMidnight(today), 10);
        const maxDate = DateUtils.addDays(DateUtils.atMidnight(today), 10);

        return [DateUtils.toISODate(minDate), DateUtils.toISODate(maxDate)];
    }, [])

    return <DemoPanel title={'Date Picker Input'}>
        <DemoPanel.Row>
            <DemoPanel.Col span={3}>
                <DatePickerInput onChange={(value) => console.log(value)} label='Date Picker'/>
            </DemoPanel.Col>
            <DemoPanel.Col span={2}/>
            <DemoPanel.Col span={3}>
                <DatePickerInput onChange={(value) => console.log(value)} min={min} max={max} label='Date Picker with Min/Max'/>
            </DemoPanel.Col>
        </DemoPanel.Row>
    </DemoPanel>
}