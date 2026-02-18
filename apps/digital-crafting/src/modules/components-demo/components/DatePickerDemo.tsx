import {ZPanel} from "@zoria-ui/react/components/panel/ZPanel.tsx";
import {ZH2} from "@zoria-ui/react/components/typography/ZTypography.tsx";
import {ZCol, ZRow} from "@zoria-ui/react/components/layout/ZLayout.tsx";
import {Calendar} from "@zoria-ui/react/components/date/DatePicker.tsx";

export function DatePickerDemo() {
    return <ZPanel>
        <ZPanel.Header><ZH2>Datepicker</ZH2></ZPanel.Header>
        <ZPanel.Body>
            <ZRow className={'justify-center align-items-start'}>
                <ZCol span={5} className={'justify-center align-items-center'}>
                    <Calendar onChange={console.log}/>
                </ZCol>
                <ZCol span={5} className={'justify-center align-items-center'}>
                    <Calendar onChange={console.log} startingDay='Mon'/>
                </ZCol>
            </ZRow>
        </ZPanel.Body>
    </ZPanel>
}