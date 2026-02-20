import {ZButton, ZCol, ZH2, ZH3, ZModal, ZModalService, ZModalSize, ZPanel, ZRow} from "@zoria-ui/react";

function getModal(size: ZModalSize) {
    return <ZModal size={size}>
        <ZModal.Header>
            <ZH3>Modal: {size}</ZH3>
            <ZModal.X />
        </ZModal.Header>
        <ZModal.Body>Body</ZModal.Body>
        <ZModal.Footer>
            <ZModal.ActionButton onClick={() => {console.log("action")}}>Action</ZModal.ActionButton>
            <ZModal.SubmitButton onClick={() => {console.log("submit")}}>Submit</ZModal.SubmitButton>
        </ZModal.Footer>
    </ZModal>
}

export function ModalDemo() {
    const showSmallModal = () => ZModalService.show(getModal(ZModalSize.SM));
    const showMediumModal = () => ZModalService.show(getModal(ZModalSize.MD));
    const showLargeModal = () => ZModalService.show(getModal(ZModalSize.LG));
    const showFullscreenModal = () => ZModalService.show(getModal(ZModalSize.FS));


    return <ZPanel>
        <ZPanel.Header>
            <ZH2>Modal</ZH2>
        </ZPanel.Header>
        <ZPanel.Body>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={5} className={'justify-center align-items-center content-center'}>
                    <ZButton onClick={showSmallModal}>Small modal</ZButton>
                </ZCol>
                <ZCol span={5} className={'justify-center align-items-center content-center'}>
                    <ZButton onClick={showMediumModal}>Medium modal</ZButton>
                </ZCol>
            </ZRow>
            <ZRow className={'justify-center content-center'}>
                <ZCol span={5} className={'justify-center align-items-center content-center'}>
                    <ZButton onClick={showLargeModal}>Large modal</ZButton>
                </ZCol>
                <ZCol span={5} className={'justify-center align-items-center content-center'}>
                    <ZButton onClick={showFullscreenModal}>Fullscreen modal</ZButton>
                </ZCol>
            </ZRow>
        </ZPanel.Body>
    </ZPanel>;
}