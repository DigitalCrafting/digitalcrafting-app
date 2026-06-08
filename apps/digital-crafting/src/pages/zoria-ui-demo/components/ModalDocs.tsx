import {Button, CodeBlock, Col, H3, Modal, ModalService, ModalSize, Row} from "@zoria-ui/react";
import {ZoriaDocsPanel} from "../zoria-docs-panel/ZoriaDocsPanel.tsx";

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

export function ModalDocs() {
    const showSmallModal = () => ModalService.show(getModal(ModalSize.SM));
    const showMediumModal = () => ModalService.show(getModal(ModalSize.MD));
    const showLargeModal = () => ModalService.show(getModal(ModalSize.LG));
    const showFullscreenModal = () => ModalService.show(getModal(ModalSize.FS));


    return <ZoriaDocsPanel expandByDefault>
        <ZoriaDocsPanel.Title>Modal</ZoriaDocsPanel.Title>
        <ZoriaDocsPanel.Body>
            <ZoriaDocsPanel.Demo>
                <Col span={12}>
                    <Row>
                        <Col span={1}/>
                        <Col span={4} className={'align-items-center'}>
                            <Button onClick={showSmallModal}>Small modal</Button>
                        </Col>
                        <Col span={1}/>
                        <Col span={4} className={'align-items-center'}>
                            <Button onClick={showMediumModal}>Medium modal</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}/>
                        <Col span={4} className={'align-items-center'}>
                            <Button onClick={showLargeModal}>Large modal</Button>
                        </Col>
                        <Col span={1}/>
                        <Col span={4} className={'align-items-center'}>
                            <Button onClick={showFullscreenModal}>Fullscreen modal</Button>
                        </Col>
                    </Row>
                </Col>
            </ZoriaDocsPanel.Demo>
            <ZoriaDocsPanel.Code>
                <Col span={12}>
                    <CodeBlock>
                        {/* language=text */}
                        {`<Modal size={size}>
        <Modal.Header>
            <H3>Modal: {size}</H3>
            <Modal.X />
        </Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>
            <Modal.ActionButton onClick={() => {console.log("action")}}>Action</Modal.ActionButton>
            <Modal.SubmitButton onClick={() => {console.log("submit")}}>Submit</Modal.SubmitButton>
        </Modal.Footer>
    </Modal>`}
                    </CodeBlock>
                </Col>
            </ZoriaDocsPanel.Code>
            <ZoriaDocsPanel.Docs>
                <Row className='justify-center'>
                    WIP
                </Row>
            </ZoriaDocsPanel.Docs>
        </ZoriaDocsPanel.Body>
    </ZoriaDocsPanel>;
}