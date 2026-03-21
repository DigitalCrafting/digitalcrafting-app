import {Button, Col, H2, H3, Modal, ModalService, ModalSize, Panel, Row} from "@zoria-ui/react";

function getModal(size: ModalSize) {
    return <Modal size={size}>
        <Modal.Header>
            <H3>Modal: {size}</H3>
            <Modal.X />
        </Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>
            <Modal.ActionButton onClick={() => {console.log("action")}}>Action</Modal.ActionButton>
            <Modal.SubmitButton onClick={() => {console.log("submit")}}>Submit</Modal.SubmitButton>
        </Modal.Footer>
    </Modal>
}

export function ModalDemo() {
    const showSmallModal = () => ModalService.show(getModal(ModalSize.SM));
    const showMediumModal = () => ModalService.show(getModal(ModalSize.MD));
    const showLargeModal = () => ModalService.show(getModal(ModalSize.LG));
    const showFullscreenModal = () => ModalService.show(getModal(ModalSize.FS));


    return <Panel>
        <Panel.Header>
            <H2>Modal</H2>
        </Panel.Header>
        <Panel.Body>
            <Col gap='sm'>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center content-center'}>
                        <Button onClick={showSmallModal}>Small modal</Button>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center content-center'}>
                        <Button onClick={showMediumModal}>Medium modal</Button>
                    </Col>
                </Row>
                <Row className={'justify-center content-center'}>
                    <Col span={5} className={'justify-center align-items-center content-center'}>
                        <Button onClick={showLargeModal}>Large modal</Button>
                    </Col>
                    <Col span={5} className={'justify-center align-items-center content-center'}>
                        <Button onClick={showFullscreenModal}>Fullscreen modal</Button>
                    </Col>
                </Row>
            </Col>
        </Panel.Body>
    </Panel>;
}