import {Col, Row} from "@zoria-ui/react";
import {InputDemo} from "./components/inputs/InputDemo.tsx";
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
import {SpinnerDemo} from "./components/SpinnerDemo.tsx";
import styles from "./ZoriaUIDemoList.module.scss";
import {ZoriaUIRoutePathsEnum} from "./config/ZoriaUIRoutesTypes.ts";
import {type FunctionComponent, useMemo} from "react";
import {RadioGroupDemo} from "./components/RadioGroupDemo.tsx";
import {ChipDemo} from "./components/ChipDemo.tsx";
import {TextInputDemo} from "./components/inputs/TextInputDemo.tsx";
import {NumberInputDemo} from "./components/inputs/NumberInputDemo.tsx";
import {PasswordInputDemo} from "./components/inputs/PasswordInputDemo.tsx";
import {TextareaInputDemo} from "./components/inputs/TextareaInputDemo.tsx";

const ZoriaUiDemoComponentsMap = new Map<ZoriaUIRoutePathsEnum, FunctionComponent[]>([
    [ZoriaUIRoutePathsEnum.TYPOGRAPHY, [TextDemo]],
    [ZoriaUIRoutePathsEnum.BUTTONS, [ButtonDemo, IconButtonDemo]],
    [ZoriaUIRoutePathsEnum.INPUTS, [InputDemo, TextInputDemo, TextareaInputDemo, NumberInputDemo, PasswordInputDemo, DatePickerDemo, CheckboxDemo, ToggleDemo, RadioGroupDemo]],
    [ZoriaUIRoutePathsEnum.MODAL, [ModalDemo]],
    [ZoriaUIRoutePathsEnum.POPOVER, [PopoverDemo]],
    [ZoriaUIRoutePathsEnum.DISPLAY, [TooltipDemo, ChipDemo]],
    [ZoriaUIRoutePathsEnum.SPINNER, [SpinnerDemo]],
    [ZoriaUIRoutePathsEnum.ICONS, [IconsDemo]]
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