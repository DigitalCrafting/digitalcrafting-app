import {Calendar, ZCol, ZH2, ZPanel, ZRow} from "@zoria-ui/react";

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