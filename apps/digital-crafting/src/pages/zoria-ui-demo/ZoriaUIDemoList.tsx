import {Col, Row} from "@zoria-ui/react";
import {InputDemo} from "./components/inputs/InputDemo.tsx";
import {TextDemo} from "./components/typography/TextDemo.tsx";
import {CheckboxDemo} from "./components/inputs/CheckboxDemo.tsx";
import {ToggleDemo} from "./components/inputs/ToggleDemo.tsx";
import {ButtonDemo} from "./components/ButtonDemo.tsx";
import {TooltipDemo} from "./components/TooltipDemo.tsx";
import {PopoverDemo} from "./components/PopoverDemo.tsx";
import {ModalDemo} from "./components/ModalDemo.tsx";
import {IconsDemo} from "./components/typography/IconsDemo.tsx";
import {IconButtonDemo} from "./components/IconButtonDemo.tsx";
import {CalendarDemo} from "./components/inputs/CalendarDemo.tsx";
import {SpinnerDemo} from "./components/SpinnerDemo.tsx";
import styles from "./ZoriaUIDemoList.module.scss";
import {ZoriaUIRoutePathsEnum} from "./config/ZoriaUIRoutesTypes.ts";
import {type FunctionComponent, useMemo} from "react";
import {RadioGroupDemo} from "./components/inputs/RadioGroupDemo.tsx";
import {ChipDemo} from "./components/ChipDemo.tsx";
import {TextInputDemo} from "./components/inputs/TextInputDemo.tsx";
import {NumberInputDemo} from "./components/inputs/NumberInputDemo.tsx";
import {PasswordInputDemo} from "./components/inputs/PasswordInputDemo.tsx";
import {TextareaInputDemo} from "./components/inputs/TextareaInputDemo.tsx";
import {DatePickerInputDemo} from "./components/inputs/DatePickerInputDemo.tsx";
import {SelectInputDemo} from "./components/inputs/SelectInputDemo.tsx";
import {HeadersDemo} from "./components/typography/HeadersDemo.tsx";

const ZoriaUiDemoComponentsMap = new Map<ZoriaUIRoutePathsEnum, FunctionComponent[]>([
    [ZoriaUIRoutePathsEnum.TYPOGRAPHY, [TextDemo, HeadersDemo, IconsDemo]],
    [ZoriaUIRoutePathsEnum.BUTTONS, [ButtonDemo, IconButtonDemo]],
    [ZoriaUIRoutePathsEnum.INPUTS, [InputDemo, TextInputDemo, TextareaInputDemo, NumberInputDemo, SelectInputDemo,  PasswordInputDemo, DatePickerInputDemo, CalendarDemo, CheckboxDemo, ToggleDemo, RadioGroupDemo]],
    [ZoriaUIRoutePathsEnum.MODAL, [ModalDemo]],
    [ZoriaUIRoutePathsEnum.POPOVER, [PopoverDemo]],
    [ZoriaUIRoutePathsEnum.DISPLAY, [TooltipDemo, ChipDemo]],
    [ZoriaUIRoutePathsEnum.SPINNER, [SpinnerDemo]]
]);

interface ZoriaUIDemoListProps {
    type?: ZoriaUIRoutePathsEnum
}

export function ZoriaUIDemoList({type}: ZoriaUIDemoListProps) {
    const demosToShow = useMemo(() => {
        if (!type || !ZoriaUiDemoComponentsMap.has(type)) {
            return Array.from(ZoriaUiDemoComponentsMap.values()).flat();
        }
        return ZoriaUiDemoComponentsMap.get(type);
    }, [type]);

    return <Row className={`justify-center`}>
        <Col
            className={styles.ZoriaUIDemoList}
            >
            {
                demosToShow!.map((DemoComponent) => {
                    return <Row key={DemoComponent.name}>
                        <DemoComponent />
                    </Row>
                })
            }
        </Col>
    </Row>
}