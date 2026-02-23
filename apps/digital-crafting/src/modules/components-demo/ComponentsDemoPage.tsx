import {Col, Row} from "@zoria-ui/react";
import {InputDemo} from "./components/InputDemo.tsx";
import {TextDemo} from "./components/TextDemo.tsx";
import {CheckboxDemo} from "./components/CheckboxDemo.tsx";
import {ToggleDemo} from "./components/ToggleDemo.tsx";
import {ButtonDemo} from "./components/ButtonDemo.tsx";
import {TooltipDemo} from "./components/TooltipDemo.tsx";
import {PopoverDemo} from "./components/PopoverDemo.tsx";
import {ModalDemo} from "./components/ModalDemo.tsx";
import {IconsDemo} from "./components/IconsDemo.tsx";
import {IconButtonDemo} from "./components/IconButtonDemo.tsx";
import {DatePickerDemo} from "./components/DatePickerDemo.tsx";

export function ComponentsDemoPage() {
    return <Row className={`justify-center`}>
        <Col span={8}>
            <Row >
                <ButtonDemo />
            </Row>
            <Row>
                <IconButtonDemo />
            </Row>
            <Row>
                <DatePickerDemo />
            </Row>
            <Row>
                <CheckboxDemo />
            </Row>
            <Row>
                <ToggleDemo />
            </Row>
            <Row>
                <InputDemo />
            </Row>
            <Row>
                <TextDemo />
            </Row>
            <Row>
                <PopoverDemo />
            </Row>
            <Row>
                <TooltipDemo />
            </Row>
            <Row>
                <ModalDemo/>
            </Row>
            <Row>
                <IconsDemo/>
            </Row>
        </Col>
    </Row>
}