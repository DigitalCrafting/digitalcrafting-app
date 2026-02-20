import {ZButton, ZCol, ZH2, ZPanel, ZRow} from "@zoria-ui/react";

export function ButtonDemo() {
    return <ZPanel>
        <ZPanel.Header>
            <ZH2>Button</ZH2>
        </ZPanel.Header>
        <ZPanel.Body>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={5} className={'justify-center align-items-center content-center'}>
                    <ZButton secondary onClick={() => console.log('working')}>Secondary button</ZButton>
                </ZCol>
                <ZCol span={5} className={'justify-center align-items-center content-center'}>
                    <ZButton onClick={() => console.log('working')}>Primary button</ZButton>
                </ZCol>
            </ZRow>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={5} className={'justify-center align-items-center content-center'}>
                    <ZButton secondary onClick={() => console.log('working')} disabled>Secondary button disabled</ZButton>
                </ZCol>
                <ZCol span={5} className={'justify-center align-items-center content-center'}>
                    <ZButton onClick={() => console.log('working')} disabled>Primary button disabled</ZButton>
                </ZCol>
            </ZRow>
        </ZPanel.Body>
    </ZPanel>;
}